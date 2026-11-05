/**
 * Shopify Storefront API Integration for TRAITIST
 * Handles cart creation, buyer identity attachment, and checkout URL redirection.
 *
 * Security & Architecture:
 * - Uses public Storefront Access Token only (never Admin API tokens).
 * - Directs users to Shopify's secure hosted checkout.
 * - Frontend does not simulate or handle raw card/UPI payment processing.
 */

import { CartItem } from '../components/CartDrawer';

export interface ShopifyConfig {
  storeDomain: string;
  storefrontAccessToken: string;
  apiVersion: string;
}

export interface CustomerCheckoutDetails {
  fullName: string;
  email: string;
  phone: string; // 10-digit Indian phone (without +91 or with)
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ShopifyCheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  cartId?: string;
  errorMessage?: string;
  isConfigurationMissing?: boolean;
}

// Retrieve public config from Vite environment
export function getShopifyConfig(): ShopifyConfig | null {
  const storeDomain = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string) || '';
  const storefrontAccessToken = (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string) || '';
  const apiVersion = (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || '2025-01';

  if (!storeDomain || !storefrontAccessToken) {
    return null;
  }

  // Normalize store domain (remove https:// and trailing slashes)
  const cleanDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return {
    storeDomain: cleanDomain,
    storefrontAccessToken,
    apiVersion,
  };
}

/**
 * Execute GraphQL query against Shopify Storefront API
 */
async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const config = getShopifyConfig();
  if (!config) {
    throw new Error('Shopify Storefront configuration is missing.');
  }

  const endpoint = `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data as T;
}

/**
 * Creates a Shopify Cart with lines, attaches customer delivery identity,
 * and returns the authenticated Shopify checkoutUrl.
 */
export async function createShopifyCheckout(
  items: CartItem[],
  customer: CustomerCheckoutDetails,
  discountCode?: string
): Promise<ShopifyCheckoutResult> {
  const config = getShopifyConfig();
  if (!config) {
    return {
      success: false,
      isConfigurationMissing: true,
      errorMessage:
        'Shopify Storefront configuration is not yet configured. Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN in your environment.',
    };
  }

  try {
    // 1. Prepare Cart Lines
    // Map items to variant IDs if available, or merchandise handles
    const lines = items.map((item) => {
      // If product has a mapped shopify variant GID use it, otherwise format standard GID
      const merchandiseId = item.product.sku
        ? `gid://shopify/ProductVariant/${item.product.sku}`
        : `gid://shopify/ProductVariant/${item.product.id}`;

      return {
        merchandiseId,
        quantity: item.quantity,
        attributes: [
          { key: 'Size', value: item.size },
          { key: 'Colorway', value: item.product.colorway || 'Black' },
          { key: 'Weight', value: item.product.gsm || '200 GSM' },
        ],
      };
    });

    // 2. Prepare Buyer Identity
    const formattedPhone = customer.phone.startsWith('+91')
      ? customer.phone
      : `+91${customer.phone.replace(/\D/g, '')}`;

    const [firstName, ...restName] = customer.fullName.trim().split(' ');
    const lastName = restName.join(' ') || '.';

    const buyerIdentity = {
      email: customer.email.trim(),
      phone: formattedPhone,
      countryCode: 'IN',
      deliveryAddressPreferences: [
        {
          deliveryAddress: {
            address1: customer.addressLine.trim(),
            city: customer.city.trim(),
            province: customer.state.trim() || undefined,
            zip: customer.pincode.trim(),
            country: 'IN',
            firstName,
            lastName,
            phone: formattedPhone,
          },
        },
      ],
    };

    const cartCreateMutation = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    interface CartCreateResponse {
      cartCreate: {
        cart?: {
          id: string;
          checkoutUrl: string;
        };
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }

    const cartInput: Record<string, unknown> = {
      lines,
      buyerIdentity,
    };

    if (discountCode) {
      cartInput.discountCodes = [discountCode];
    }

    const data = await shopifyFetch<CartCreateResponse>(cartCreateMutation, {
      input: cartInput,
    });

    const userErrors = data.cartCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      return {
        success: false,
        errorMessage: userErrors.map((e) => e.message).join(' | '),
      };
    }

    const checkoutUrl = data.cartCreate?.cart?.checkoutUrl;
    const cartId = data.cartCreate?.cart?.id;

    if (!checkoutUrl) {
      return {
        success: false,
        errorMessage: 'Shopify did not return a valid checkout URL.',
      };
    }

    return {
      success: true,
      checkoutUrl,
      cartId,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown network error';
    return {
      success: false,
      errorMessage: message,
    };
  }
}


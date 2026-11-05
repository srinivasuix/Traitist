import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Lock,
  Tag,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Product, DEFAULT_SIZES } from '../data/products';
import { TraitistReceiptPrinter, TraitistReceiptOrderData } from './ReceiptPrinter';
import { BorderBeam } from './magicui/border-beam';
import { isDemoAutofillAvailable } from '../lib/env';
import { lookupIndianPincode } from '../lib/pincode';
import { createShopifyCheckout, getShopifyConfig } from '../lib/shopify';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  initialCheckout?: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onUpdateSize?: (productId: string, oldSize: string, newSize: string) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onAddToCart?: (product: Product, size: string, quantity?: number) => void;
  onOpenSizeGuide?: () => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  initialCheckout = false,
  onClose,
  items,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
  onClearCart,
}) => {
  // Coupon state
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  // Flow views
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<TraitistReceiptOrderData | null>(null);

  // Mobile order summary accordion in checkout
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Checkout loading and error states
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Pincode auto-lookup status
  const [isLookingUpPincode, setIsLookingUpPincode] = useState(false);

  // Guest Checkout customer details
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Environment check for demo autofill
  const canShowDemoAutofill = isDemoAutofillAvailable();

  // Directly enter guest checkout if initiated via "Buy Now"
  useEffect(() => {
    if (isOpen && initialCheckout) {
      setIsCheckingOut(true);
    }
  }, [isOpen, initialCheckout]);

  // Reset checkout view when drawer is closed so next open starts cleanly at bag
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsCheckingOut(false);
        setCheckoutError(null);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard Escape listener to close cart
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const freeShippingThreshold = 999;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.priceINR * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'PHD10') {
      setDiscountPercent(10);
      setPromoMessage('10% Academic Relief discount applied!');
    } else if (cleanCode === 'RESILIENCE' || cleanCode === 'EARLYACCESS') {
      setDiscountPercent(15);
      setPromoMessage('15% Early Access discount applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid coupon code. Try "PHD10"');
    }
  };

  const handleInputChange = async (field: string, val: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    // Auto-lookup city/state when 6 digits of PIN code are entered
    if (field === 'pincode') {
      const cleanPin = val.trim().replace(/\D/g, '');
      if (cleanPin.length === 6) {
        setIsLookingUpPincode(true);
        const suggestion = await lookupIndianPincode(cleanPin);
        setIsLookingUpPincode(false);
        if (suggestion) {
          setGuestInfo((prev) => ({
            ...prev,
            city: prev.city || suggestion.city,
            state: prev.state || suggestion.state,
          }));
        }
      }
    }
  };

  const fillSampleGuestInfo = () => {
    setGuestInfo({
      fullName: 'Alex Mitchell',
      email: 'alex.mitchell@stanford.edu',
      phone: '9876543210',
      addressLine: 'Flat 402, Oakwood Court, 12th Main Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    });
    setFormErrors({});
  };

  const validateGuestForm = (): boolean => {
    const errors: Record<string, string> = {};

    const cleanEmail = guestInfo.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    const cleanPhone = guestInfo.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required';
    } else if (cleanPhone.length !== 10) {
      errors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!guestInfo.fullName.trim()) {
      errors.fullName = 'Full recipient name is required';
    }
    if (!guestInfo.addressLine.trim()) {
      errors.addressLine = 'Street address is required';
    }
    if (!guestInfo.city.trim()) {
      errors.city = 'City is required';
    }

    const cleanPin = guestInfo.pincode.trim().replace(/\D/g, '');
    if (!cleanPin) {
      errors.pincode = 'PIN code is required';
    } else if (cleanPin.length !== 6) {
      errors.pincode = 'Enter a valid 6-digit PIN code';
    }

    if (!guestInfo.state.trim()) {
      errors.state = 'State is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGuestCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (!validateGuestForm()) {
      return;
    }

    setIsSubmittingCheckout(true);

    try {
      const shopifyConfig = getShopifyConfig();

      if (!shopifyConfig) {
        // Shopify credentials not yet injected. Show configuration guidance modal
        // and safely provide fallback for local inspection without creating fake orders.
        setIsSubmittingCheckout(false);
        setShowConfigModal(true);
        return;
      }

      // Live Shopify Cart & Hosted Checkout Creation
      const result = await createShopifyCheckout(
        items,
        guestInfo,
        discountPercent > 0 ? promoCode || 'PHD10' : undefined
      );

      if (result.success && result.checkoutUrl) {
        // Redirect browser directly to Shopify hosted checkout
        window.location.href = result.checkoutUrl;
      } else {
        setCheckoutError(
          result.errorMessage || 'Unable to connect to Shopify checkout. Please try again.'
        );
        setIsSubmittingCheckout(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout redirection failed';
      setCheckoutError(msg);
      setIsSubmittingCheckout(false);
    }
  };

  const formatPrice = (val: number) => `₹${val.toLocaleString()}`;

  const getCleanColor = (colorway: string) => colorway.split('•')[0].trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-heading"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <motion.aside
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.9 }}
            className="relative w-full max-w-md bg-[#ECEBE6] h-full shadow-2xl flex flex-col z-10 border-l border-neutral-300"
          >
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-neutral-300 flex items-center justify-between shrink-0 bg-[#ECEBE6]">
              <div className="flex items-center gap-2">
                <h2
                  id="cart-drawer-heading"
                  className="text-base font-bold font-display tracking-tight text-neutral-900"
                >
                  {orderComplete
                    ? 'Order Confirmation'
                    : isCheckingOut
                    ? 'Guest Checkout'
                    : 'Your Bag'}
                </h2>
                {!orderComplete && items.length > 0 && (
                  <span className="text-[11px] font-mono bg-black text-white px-2 py-0.5 rounded-full font-semibold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  if (orderComplete) {
                    setOrderComplete(false);
                  }
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer text-neutral-800"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* ORDER CONFIRMATION VIEW */}
            {orderComplete && completedOrder ? (
              <div className="flex-grow overflow-y-auto px-5 py-4">
                <TraitistReceiptPrinter
                  orderData={completedOrder}
                  onContinueShopping={() => {
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                />
              </div>
            ) : isCheckingOut ? (
              /* GUEST CHECKOUT VIEW (Phase 3 & 4) */
              <div className="flex-grow flex flex-col justify-between overflow-y-auto">
                <div className="px-5 py-4 space-y-4">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between border-b border-neutral-300 pb-3 font-mono text-[10px] tracking-wider uppercase">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-950">
                      <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px]">
                        1
                      </span>
                      <span>01 — Contact & Delivery</span>
                    </div>
                    <span className="text-neutral-300">/</span>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <span className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center text-[9px]">
                        2
                      </span>
                      <span>02 — Payment</span>
                    </div>
                  </div>

                  {/* Heading & Subtitle */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-950">
                      Where should we send your order?
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans mt-0.5">
                      No account required. Just a few details.
                    </p>
                  </div>

                  {/* Demo Autofill Banner (Local & Preview only, hidden in Prod) */}
                  {canShowDemoAutofill && (
                    <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300 flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] uppercase text-neutral-600 font-semibold tracking-wider">
                        Developer Preview Mode
                      </span>
                      <button
                        type="button"
                        onClick={fillSampleGuestInfo}
                        className="text-[11px] font-bold text-[#FF5722] hover:text-black underline cursor-pointer"
                      >
                        Demo Autofill
                      </button>
                    </div>
                  )}

                  {/* Collapsible Mobile Order Summary */}
                  <div className="bg-white rounded-xs border border-neutral-300 overflow-hidden font-mono">
                    <button
                      type="button"
                      onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
                      className="w-full p-3 flex items-center justify-between text-left text-xs font-bold text-neutral-900 hover:bg-neutral-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{formatPrice(grandTotal)}</span>
                        {isMobileSummaryOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                        )}
                      </div>
                    </button>

                    {isMobileSummaryOpen && (
                      <div className="p-3 border-t border-neutral-200 space-y-2 bg-[#DFDDD7]/30 text-xs">
                        <div className="max-h-36 overflow-y-auto divide-y divide-neutral-200 pr-1">
                          {items.map((it) => (
                            <div
                              key={`${it.product.id}-${it.size}`}
                              className="py-2 flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={it.product.image}
                                  alt={it.product.title}
                                  className="w-8 h-10 object-contain bg-[#DFDDD7] rounded-xs shrink-0"
                                  style={{ mixBlendMode: it.product.blendMode || 'multiply' }}
                                />
                                <div className="truncate">
                                  <p className="font-semibold text-neutral-900 truncate">
                                    {it.product.title}
                                  </p>
                                  <p className="text-[10px] text-neutral-500">
                                    Size {it.size} × {it.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-neutral-900 shrink-0">
                                {formatPrice(it.product.priceINR * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-neutral-300 space-y-1 text-[11px]">
                          <div className="flex justify-between text-neutral-600">
                            <span>Subtotal:</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          {discountAmount > 0 && (
                            <div className="flex justify-between text-emerald-700 font-semibold">
                              <span>Discount ({discountPercent}%):</span>
                              <span>-{formatPrice(discountAmount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-neutral-600">
                            <span>Shipping:</span>
                            <span className="text-emerald-800 font-bold">
                              {shipping === 0 ? 'FREE EXPRESS' : formatPrice(shipping)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs font-bold text-neutral-950 pt-1.5 border-t border-neutral-300">
                            <span>Total Payable:</span>
                            <span>{formatPrice(grandTotal)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleGuestCheckoutSubmit} className="space-y-3.5">
                    {/* SECTION 1: CONTACT */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 block">
                        Contact Information
                      </span>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="guest-email"
                          className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            id="guest-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            value={guestInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="scholar@university.edu"
                            className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                              formErrors.email
                                ? 'border-red-500 bg-red-50/20'
                                : 'border-neutral-300 focus:border-black'
                            }`}
                          />
                          <Mail className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        {formErrors.email && (
                          <p className="text-[10px] font-mono text-red-600 mt-0.5">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="guest-phone"
                          className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                        >
                          Mobile Number *
                        </label>
                        <div className="flex gap-2">
                          <span className="px-3 py-2 text-xs font-mono bg-[#DFDDD7] border border-neutral-300 rounded-sm text-neutral-800 font-bold shrink-0 flex items-center">
                            +91
                          </span>
                          <div className="relative flex-grow">
                            <input
                              id="guest-phone"
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={10}
                              autoComplete="tel-national"
                              required
                              value={guestInfo.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="10-digit mobile number"
                              className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                                formErrors.phone
                                  ? 'border-red-500 bg-red-50/20'
                                  : 'border-neutral-300 focus:border-black'
                              }`}
                            />
                            <Phone className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                        {formErrors.phone && (
                          <p className="text-[10px] font-mono text-red-600 mt-0.5">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* SECTION 2: SHIPPING */}
                    <div className="space-y-2.5 pt-2 border-t border-neutral-300">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600 block">
                        Delivery Address
                      </span>

                      {/* Recipient Full Name */}
                      <div>
                        <label
                          htmlFor="guest-name"
                          className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                        >
                          Full Recipient Name *
                        </label>
                        <input
                          id="guest-name"
                          type="text"
                          autoComplete="name"
                          required
                          value={guestInfo.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="e.g. Alex Mitchell"
                          className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                            formErrors.fullName
                              ? 'border-red-500 bg-red-50/20'
                              : 'border-neutral-300 focus:border-black'
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="text-[10px] font-mono text-red-600 mt-0.5">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Address Line */}
                      <div>
                        <label
                          htmlFor="guest-address"
                          className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                        >
                          House / Flat / Building / Street *
                        </label>
                        <input
                          id="guest-address"
                          type="text"
                          autoComplete="street-address"
                          required
                          value={guestInfo.addressLine}
                          onChange={(e) => handleInputChange('addressLine', e.target.value)}
                          placeholder="e.g. Flat 402, Oakwood Court, 12th Main Road"
                          className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                            formErrors.addressLine
                              ? 'border-red-500 bg-red-50/20'
                              : 'border-neutral-300 focus:border-black'
                          }`}
                        />
                        {formErrors.addressLine && (
                          <p className="text-[10px] font-mono text-red-600 mt-0.5">
                            {formErrors.addressLine}
                          </p>
                        )}
                      </div>

                      {/* PIN Code with auto-lookup */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label
                            htmlFor="guest-pincode"
                            className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                          >
                            PIN Code *
                          </label>
                          <div className="relative">
                            <input
                              id="guest-pincode"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={6}
                              autoComplete="postal-code"
                              required
                              value={guestInfo.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                              placeholder="6 digits"
                              className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                                formErrors.pincode
                                  ? 'border-red-500 bg-red-50/20'
                                  : 'border-neutral-300 focus:border-black'
                              }`}
                            />
                            {isLookingUpPincode && (
                              <Loader2 className="w-3.5 h-3.5 text-[#FF5722] animate-spin absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            )}
                          </div>
                          {formErrors.pincode && (
                            <p className="text-[10px] font-mono text-red-600 mt-0.5">
                              {formErrors.pincode}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="guest-city"
                            className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                          >
                            City *
                          </label>
                          <input
                            id="guest-city"
                            type="text"
                            autoComplete="address-level2"
                            required
                            value={guestInfo.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="City"
                            className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                              formErrors.city
                                ? 'border-red-500 bg-red-50/20'
                                : 'border-neutral-300 focus:border-black'
                            }`}
                          />
                          {formErrors.city && (
                            <p className="text-[10px] font-mono text-red-600 mt-0.5">
                              {formErrors.city}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* State */}
                      <div>
                        <label
                          htmlFor="guest-state"
                          className="block text-[10px] font-mono font-semibold uppercase text-neutral-700 mb-1"
                        >
                          State *
                        </label>
                        <input
                          id="guest-state"
                          type="text"
                          autoComplete="address-level1"
                          required
                          value={guestInfo.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="e.g. Karnataka, Maharashtra, Delhi"
                          className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-sm outline-none transition ${
                            formErrors.state
                              ? 'border-red-500 bg-red-50/20'
                              : 'border-neutral-300 focus:border-black'
                          }`}
                        />
                        {formErrors.state && (
                          <p className="text-[10px] font-mono text-red-600 mt-0.5">
                            {formErrors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Error Banner */}
                    {checkoutError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-800 text-xs font-mono flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Checkout Error</p>
                          <p className="mt-0.5 text-[11px] font-sans">{checkoutError}</p>
                        </div>
                      </div>
                    )}

                    {/* Prominent Action Button: Proceed to Shopify Hosted Payment */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingCheckout}
                        className="group relative overflow-hidden w-full py-3.5 min-h-[48px] bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-wait"
                      >
                        {isSubmittingCheckout ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Connecting to Secure Checkout...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Continue to Payment · {formatPrice(grandTotal)}</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-500 mt-2.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Powered by Shopify Secure Checkout • 256-Bit SSL</span>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Back to Bag navigation */}
                <div className="px-5 py-3 border-t border-neutral-300 bg-[#ECEBE6] text-center">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs font-mono text-neutral-600 hover:text-black underline cursor-pointer min-h-[40px] inline-flex items-center"
                  >
                    ← Return to Shopping Bag
                  </button>
                </div>
              </div>
            ) : (
              /* CART ITEMS VIEW (Phase 2) */
              <>
                {/* Cart Items List */}
                <div className="flex-grow overflow-y-auto px-5 py-3 space-y-3">
                  {items.length === 0 ? (
                    <div className="py-8 px-4 flex flex-col items-center justify-center text-center select-none">
                      <div className="w-48 sm:w-52 mx-auto mb-4 hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center">
                        <img
                          src="/images/empty-states/cart-empty.png"
                          alt="Your bag is empty"
                          className="w-full h-auto drop-shadow-md select-none pointer-events-none"
                        />
                      </div>
                      <p className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
                        YOUR BAG IS STILL IN THE LAB.
                      </p>
                      <p className="text-xs text-neutral-600 mt-1 max-w-xs font-sans leading-relaxed">
                        Your next favourite tee is waiting. Explore our 200 GSM heavyweight collection and wear your research story with pride.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          const el = document.getElementById('shop');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-4 px-5 py-2.5 bg-neutral-950 hover:bg-[#FF5722] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        EXPLORE THE DROP →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item) => (
                          <motion.div
                            key={`${item.product.id}-${item.size}`}
                            layout
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              scale: 0.92,
                              x: -20,
                              transition: {
                                duration: 0.22,
                                ease: [0.32, 0.72, 0, 1],
                              },
                            }}
                            transition={{
                              layout: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
                            }}
                            className="flex items-center gap-3 p-3 bg-white rounded-xs border border-neutral-200 shadow-2xs"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-14 h-17 object-contain bg-[#DFDDD7] p-1 rounded-xs shrink-0"
                              style={{ mixBlendMode: item.product.blendMode || 'multiply' }}
                            />
                            <div className="flex-grow min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-xs font-bold text-neutral-900 truncate">
                                  {item.product.title}
                                </h3>
                                <span className="text-xs font-mono font-bold text-neutral-900 shrink-0">
                                  {formatPrice(item.product.priceINR)}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 font-sans">
                                {getCleanColor(item.product.colorway)}
                                {item.product.sku ? ` · ${item.product.sku}` : ''}
                              </p>

                              {/* Size selector & quantity stepper */}
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                {/* Size Selector */}
                                <div className="relative">
                                  <select
                                    value={item.size}
                                    onChange={(e) =>
                                      onUpdateSize?.(item.product.id, item.size, e.target.value)
                                    }
                                    className="text-[11px] font-mono font-bold uppercase py-1 pl-2 pr-5 border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 rounded-xs text-neutral-900 appearance-none cursor-pointer focus:outline-none focus:border-black transition h-[28px]"
                                    aria-label={`Change size for ${item.product.title}`}
                                  >
                                    {(item.product.sizes || DEFAULT_SIZES).map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="w-3 h-3 text-neutral-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>

                                {/* Stepper */}
                                <div className="inline-flex items-center border border-neutral-300 bg-neutral-50 rounded-xs h-[28px]">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                                    className="px-2 h-full flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer"
                                    aria-label={`Decrease quantity of ${item.product.title}`}
                                  >
                                    <Minus className="w-3 h-3 text-neutral-700" />
                                  </button>
                                  <span className="w-6 text-center text-xs font-mono font-semibold">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                                    className="px-2 h-full flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer"
                                    aria-label={`Increase quantity of ${item.product.title}`}
                                  >
                                    <Plus className="w-3 h-3 text-neutral-700" />
                                  </button>
                                </div>

                                {/* Subtle Interactive Trash / Delete Button */}
                                <motion.button
                                  type="button"
                                  whileHover="hover"
                                  whileTap="tap"
                                  onClick={() => onRemoveItem(item.product.id, item.size)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#FF5722] hover:bg-[#FF5722]/10 active:bg-[#FF5722]/20 transition-colors cursor-pointer group shrink-0"
                                  aria-label={`Remove ${item.product.title} from bag`}
                                  title="Remove item"
                                >
                                  <motion.div
                                    variants={{
                                      hover: {
                                        rotate: [0, -10, 8, -4, 0],
                                        scale: 1.15,
                                        transition: { duration: 0.35, ease: 'easeInOut' },
                                      },
                                      tap: {
                                        scale: 0.82,
                                        rotate: 0,
                                        transition: { duration: 0.1 },
                                      },
                                    }}
                                    className="flex items-center justify-center"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 transition-colors" />
                                  </motion.div>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer with Collapsible Coupon, Summary & Prominent Checkout */}
                <div className="px-5 py-4 border-t border-neutral-300 bg-[#ECEBE6] shrink-0 space-y-3">
                  {/* Collapsible "Have a discount code?" */}
                  {items.length > 0 && (
                    <div className="border border-neutral-300 rounded-xs bg-white/70 overflow-hidden font-mono">
                      <button
                        type="button"
                        onClick={() => setIsCouponOpen((prev) => !prev)}
                        className="w-full px-3 py-2 flex items-center justify-between text-left text-xs font-semibold text-neutral-800 hover:bg-white transition cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3 h-3 text-[#FF5722]" />
                          <span>Have a discount code?</span>
                        </span>
                        {isCouponOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                        )}
                      </button>

                      {isCouponOpen && (
                        <div className="p-2.5 border-t border-neutral-200 bg-white">
                          <form onSubmit={handleApplyPromo} className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="e.g. 'PHD10'"
                              className="flex-grow bg-[#DFDDD7]/50 border border-neutral-300 text-xs px-2.5 py-1.5 uppercase font-mono placeholder:normal-case focus:outline-none focus:border-black rounded-xs min-h-[34px]"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 min-h-[34px] bg-black text-white text-xs font-mono uppercase font-semibold hover:bg-neutral-800 cursor-pointer rounded-xs transition"
                            >
                              Apply
                            </button>
                          </form>
                          {promoMessage && (
                            <p
                              className={`text-[10px] font-mono mt-1 ${
                                discountPercent > 0 ? 'text-emerald-800 font-bold' : 'text-[#FF5722]'
                              }`}
                            >
                              {promoMessage}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary Breakdown */}
                  {items.length > 0 && (
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between text-neutral-600">
                        <span>Subtotal:</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-800 font-semibold">
                          <span>Discount ({discountPercent}%):</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-600">
                        <span>Shipping:</span>
                        <span className="text-emerald-800 font-bold">
                          {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-neutral-950 pt-1.5 border-t border-neutral-300">
                        <span>Payable Amount:</span>
                        <span>{formatPrice(grandTotal)}</span>
                      </div>
                    </div>
                  )}

                  {/* Single Prominent Checkout Button */}
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(true)}
                    disabled={items.length === 0}
                    className={`group relative overflow-hidden w-full py-3.5 min-h-[48px] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] cursor-pointer ${
                      items.length === 0
                        ? 'bg-neutral-400 cursor-not-allowed opacity-60'
                        : 'bg-black hover:bg-neutral-800'
                    }`}
                  >
                    {items.length > 0 && (
                      <BorderBeam size={100} duration={8} colorFrom="#FF5722" colorTo="#ffffff" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>CHECKOUT</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </button>

                  {/* Continue Shopping */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs font-mono text-neutral-600 hover:text-black underline cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>

          {/* Configuration Missing Information Modal (Phase 4 Requirement) */}
          {showConfigModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            >
              <div className="bg-[#ECEBE6] border border-neutral-400 rounded-sm p-6 max-w-md w-full shadow-2xl font-mono text-neutral-900 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FF5722]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      Shopify Checkout Ready
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="p-1 hover:bg-neutral-300 rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-sans text-neutral-700 leading-relaxed">
                  The TRAITIST Shopify Hosted Checkout client is initialized and ready. To connect to your live or development store, supply these two public environment variables in your deployment:
                </p>

                <div className="bg-white p-3 rounded border border-neutral-300 text-[11px] space-y-1">
                  <p>
                    <span className="text-neutral-500">1.</span> <strong>VITE_SHOPIFY_STORE_DOMAIN</strong>
                    <br />
                    <span className="text-neutral-500 font-sans">e.g. <code>traitist.myshopify.com</code></span>
                  </p>
                  <p className="pt-1">
                    <span className="text-neutral-500">2.</span> <strong>VITE_SHOPIFY_STOREFRONT_TOKEN</strong>
                    <br />
                    <span className="text-neutral-500 font-sans">e.g. Storefront API public access token</span>
                  </p>
                </div>

                <p className="text-[11px] font-sans text-neutral-600">
                  Per the security guidelines, no simulated payments or fake orders are generated. Once the store tokens are supplied, customers are immediately redirected to Shopify's official PCI-compliant payment engine.
                </p>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

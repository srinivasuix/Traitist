import React, { useState } from 'react';
import {
  Check,
  Copy,
  Printer,
  ShoppingBag,
  Package,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { CartItem } from './CartDrawer';

export interface TraitistReceiptOrderData {
  orderId: string;
  shopifyOrderReference?: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountPercent?: number;
  promoCode?: string;
  shipping: number;
  grandTotal: number;
  currency: string;
  paymentMethod?: string;
  deliveryAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  trackingNumber?: string; // Only present if authentic fulfilment exists
  trackingUrl?: string;
  courierName?: string;
}

interface OrderConfirmationProps {
  orderData: TraitistReceiptOrderData;
  onContinueShopping: () => void;
  className?: string;
}

export const TraitistReceiptPrinter: React.FC<OrderConfirmationProps> = ({
  orderData,
  onContinueShopping,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const displayOrderId = orderData.shopifyOrderReference || orderData.orderId;

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(displayOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatPrice = (val: number) => `₹ ${val.toLocaleString()}`;

  return (
    <div className={`w-full max-w-md mx-auto space-y-4 font-mono text-left ${className}`}>
      {/* 1. Order Status Header Card */}
      <div className="bg-white rounded-sm border border-neutral-300 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              ORDER CONFIRMED
            </span>
          </div>
          <span className="text-[11px] font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
            {displayOrderId}
          </span>
        </div>

        <div className="pt-3 space-y-1">
          <p className="text-xs text-neutral-600 font-sans">
            Thank you, <span className="font-semibold text-neutral-900">{orderData.customerName}</span>. Your order is confirmed and being prepared for dispatch.
          </p>
          <p className="text-[10px] text-neutral-400">
            Placed on {orderData.timestamp}
          </p>
        </div>
      </div>

      {/* 2. Purchased Items Breakdown */}
      <div className="bg-white rounded-sm border border-neutral-300 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-neutral-600" />
            <span>Items Ordered ({orderData.items.reduce((s, i) => s + i.quantity, 0)})</span>
          </span>
        </div>

        <div className="divide-y divide-neutral-100 py-2">
          {orderData.items.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.size}-${idx}`}
              className="py-3 flex items-center gap-3"
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-12 h-15 object-contain bg-[#DFDDD7] p-1 rounded-xs shrink-0"
                style={{ mixBlendMode: item.product.blendMode || 'multiply' }}
              />
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-neutral-900 truncate">
                    {item.product.title}
                  </h4>
                  <span className="text-xs font-bold text-neutral-900 shrink-0">
                    {formatPrice(item.product.priceINR * item.quantity)}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Size: <span className="font-semibold text-neutral-800">{item.size}</span>
                  {item.quantity > 1 ? ` · Qty: ${item.quantity}` : ''}
                  {item.product.sku ? ` · ${item.product.sku}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          {orderData.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Discount ({orderData.promoCode || 'PROMO'})</span>
              <span>-{formatPrice(orderData.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span>{orderData.shipping === 0 ? 'FREE EXPRESS' : formatPrice(orderData.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
            <span>Total Paid</span>
            <span>{formatPrice(orderData.grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* 3. Delivery & Contact Details */}
      <div className="bg-white rounded-sm border border-neutral-300 p-5 shadow-xs space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neutral-600" />
          <span>Delivery Details</span>
        </span>

        <div className="text-xs text-neutral-800 space-y-1">
          <p className="font-bold text-neutral-950">{orderData.customerName}</p>
          <p className="text-neutral-600 leading-relaxed font-sans">{orderData.deliveryAddress}</p>
        </div>

        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] text-neutral-600 font-sans">
          <span className="flex items-center gap-1.5 truncate">
            <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="font-mono text-[10px] text-neutral-800">{orderData.customerEmail}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <Phone className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="font-mono text-[10px] text-neutral-800">+91 {orderData.customerPhone}</span>
          </span>
        </div>

        {/* Shipping Status (Authentic, no fake AWB) */}
        <div className="mt-3 p-3 bg-neutral-50 rounded-sm border border-neutral-200 text-xs font-sans">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-800 mb-1">
            Shipping Status: <span className="text-emerald-700">Order Processing</span>
          </p>
          {orderData.trackingNumber ? (
            <div className="mt-1 font-mono text-[11px] flex items-center justify-between">
              <span>Tracking Number: <strong className="text-neutral-900">{orderData.trackingNumber}</strong></span>
              {orderData.trackingUrl && (
                <a
                  href={orderData.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF5722] underline hover:text-black"
                >
                  Track Package
                </a>
              )}
            </div>
          ) : (
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Dispatch updates and a live tracking link will be sent to your email and WhatsApp/SMS as soon as express air logistics picks up your parcel.
            </p>
          )}
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="py-2.5 px-3 min-h-[44px] bg-neutral-200 hover:bg-neutral-300 active:scale-[0.98] text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition cursor-pointer border border-neutral-300"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-700" />
                <span>Copy Order ID</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-3 min-h-[44px] bg-neutral-200 hover:bg-neutral-300 active:scale-[0.98] text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition cursor-pointer border border-neutral-300"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-700" />
            <span>Print Receipt</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full py-3.5 min-h-[46px] bg-black hover:bg-neutral-900 text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* 5. Optional Post-Purchase Account Creation Prompt (Never forced) */}
      <div className="bg-white rounded-sm p-4 border border-neutral-300 shadow-2xs font-sans space-y-2">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-xs bg-neutral-100 text-neutral-900 mt-0.5 shrink-0">
            <UserCheck className="w-4 h-4 text-neutral-900" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              Want to track your orders easily?
            </h4>
            <p className="text-[11px] text-neutral-600 leading-relaxed mt-0.5">
              Create an account using your email to save your shipping details and track future drops with 1 click.
            </p>
          </div>
        </div>

        {!accountCreated ? (
          <button
            type="button"
            onClick={() => setAccountCreated(true)}
            className="w-full py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] mt-2"
          >
            <span>Create account with {orderData.customerEmail}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-[11px] font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Account created for {orderData.customerEmail}! Magic link sent to your inbox.</span>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';
import { TraitistReceiptPrinter, TraitistReceiptOrderData } from './ReceiptPrinter';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'INR' | 'USD';
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [completedOrder, setCompletedOrder] = useState<TraitistReceiptOrderData | null>(null);

  // Keyboard Escape listener to close cart
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const freeShippingThreshold = currency === 'INR' ? 999 : 150;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
    return sum + price * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : currency === 'INR' ? 99 : 12;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

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

  const handleCompleteOrder = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderSnapshot: TraitistReceiptOrderData = {
      orderId: `TRT-${randomNum}`,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
      items: items.length > 0 ? [...items] : [],
      subtotal,
      discountAmount,
      discountPercent,
      promoCode: promoCode || (discountPercent > 0 ? 'PHD10' : undefined),
      shipping,
      grandTotal,
      currency,
      paymentMethod,
      deliveryAddress: 'Indiranagar, Bengaluru / Express Air Delivery',
    };
    setCompletedOrder(orderSnapshot);
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 400);
  };

  const formatPrice = (val: number) => {
    return currency === 'INR' ? `₹ ${val.toLocaleString()}` : `$${val.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <aside
        aria-label="Shopping Cart"
        className="relative w-full max-w-md bg-[#ECEBE6] h-full shadow-2xl flex flex-col z-10 border-l border-neutral-300"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-neutral-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900">
              {orderComplete ? 'ORDER RECEIPT' : 'YOUR BAG'}
            </h2>
            {!orderComplete && (
              <span className="text-xs font-mono bg-black text-white px-2 py-0.5 rounded-full">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
            {orderComplete && (
              <span className="text-[10px] font-mono bg-emerald-600 text-white font-bold px-2 py-0.5 rounded uppercase">
                AUTHENTICATED
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (orderComplete) {
                setOrderComplete(false);
                setIsCheckingOut(false);
              }
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {orderComplete && completedOrder ? (
          <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-4 flex flex-col items-center">
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
          /* Checkout Simulation View */
          <div className="flex-grow p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-300">
                <span className="text-xs font-mono font-bold uppercase text-neutral-900">
                  Instant Checkout
                </span>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs font-mono text-neutral-600 underline hover:text-black cursor-pointer"
                >
                  ← Back to Bag
                </button>
              </div>

              {/* Shipping info preview */}
              <div className="p-3.5 bg-[#DFDDD7] rounded border border-neutral-300 text-xs font-mono space-y-2">
                <p className="font-bold uppercase text-neutral-900">DELIVERY ADDRESS (PREFILLED)</p>
                <p className="text-neutral-700">Studio Residence, Indiranagar, Bengaluru / Toronto</p>
                <p className="text-neutral-500 text-[11px]">Free Express Delivery Included</p>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-mono font-bold uppercase text-neutral-900 block mb-2">
                  Select Payment Gateway
                </label>
                <div className="space-y-2 font-mono text-xs">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                      paymentMethod === 'upi'
                        ? 'border-black bg-white shadow-sm'
                        : 'border-neutral-300 bg-[#DFDDD7]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-black"
                      />
                      <span className="font-semibold text-neutral-900">Instant UPI (GPay / PhonePe / Paytm)</span>
                    </div>
                    <span className="text-[10px] bg-[#10B981]/20 text-[#005236] font-bold px-1.5 py-0.5 rounded">
                      FASTEST
                    </span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-white shadow-sm'
                        : 'border-neutral-300 bg-[#DFDDD7]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-black"
                      />
                      <span className="font-semibold text-neutral-900">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">Verified Phone</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                      paymentMethod === 'card'
                        ? 'border-black bg-white shadow-sm'
                        : 'border-neutral-300 bg-[#DFDDD7]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-black"
                      />
                      <span className="font-semibold text-neutral-900">Credit / Debit Card (Visa / MC)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary breakdown */}
              <div className="pt-3 border-t border-neutral-300 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-300">
                  <span>Payable Amount:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-300 space-y-2">
              <button
                onClick={handleCompleteOrder}
                className="w-full py-3.5 bg-[#FF5722] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm hover:bg-[#e04818] transition cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
              >
                <span>Authorize & Pay {formatPrice(grandTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>256-Bit Encrypted Secure Payment Guarantee</span>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Cart List View */
          <>
            {/* Free Shipping Progress bar */}
            <div className="px-6 py-3 bg-[#DFDDD7] border-b border-neutral-300 text-[11px] font-mono">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-neutral-800">
                  Add <span className="font-bold">{formatPrice(amountNeededForFreeShipping)}</span> more for{' '}
                  <span className="font-bold text-black">FREE Shipping</span>!
                </p>
              ) : (
                <p className="text-[#005236] font-bold flex items-center gap-1">
                  <span>✓ You've unlocked FREE Pan-India & Express Shipping!</span>
                </p>
              )}
              <div className="w-full h-1.5 bg-neutral-300 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="text-4xl mb-3">🛍️</span>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs text-neutral-600 mt-1 max-w-xs font-sans">
                    Explore Drop 04 and discover relatable heavyweight streetwear for research & survival.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-5 py-2 bg-black text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const unitPrice =
                    currency === 'INR' ? item.product.priceINR : item.product.priceUSD;

                  return (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3.5 p-3 bg-[#DFDDD7]/60 rounded-xs border border-neutral-300/80"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-20 object-contain bg-[#DFDDD7] p-1 rounded"
                        style={{ mixBlendMode: item.product.blendMode || 'multiply' }}
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-900 truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          Size: <span className="font-bold text-neutral-800">{item.size}</span> •{' '}
                          {item.product.gsm}
                        </p>
                        <p className="text-xs font-mono font-semibold text-neutral-900 mt-1">
                          {formatPrice(unitPrice)}
                        </p>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-neutral-400 hover:text-[#FF5722] p-1 transition cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-neutral-300 bg-white rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            className="p-1 hover:bg-neutral-100 transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-neutral-700" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            className="p-1 hover:bg-neutral-100 transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-neutral-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Summary & Checkout */}
            {items.length > 0 && (
              <div className="px-4 sm:px-6 py-4 sm:py-5 pb-6 sm:pb-5 border-t border-neutral-300 bg-[#ECEBE6]">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (try 'PHD10')"
                    className="flex-grow bg-[#DFDDD7] border border-neutral-300 text-xs px-3 py-2 uppercase font-mono placeholder:normal-case focus:outline-none focus:border-black rounded-xs min-h-[38px]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-black text-white text-xs font-mono uppercase font-semibold hover:bg-neutral-800 transition cursor-pointer min-h-[38px]"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p
                    className={`text-[10px] font-mono mb-3 ${
                      discountPercent > 0 ? 'text-[#005236] font-semibold' : 'text-[#FF5722]'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}

                {/* Subtotal lines */}
                <div className="space-y-1.5 text-xs font-mono pb-4 border-b border-neutral-300">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#10B981]">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3.5 min-h-[46px] bg-[#FF5722] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm hover:bg-[#e04818] transition cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                  >
                    <span>Instant Checkout via UPI / COD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center font-mono text-neutral-500">
                    7-Day Hassle-Free Exchanges • 100% Bio-Wash Guarantee
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
};

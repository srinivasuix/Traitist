import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Check, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, CATALOG_PRODUCTS } from '../data/products';
import { TraitistReceiptPrinter, TraitistReceiptOrderData } from './ReceiptPrinter';
import { BorderBeam } from './magicui/border-beam';
import { QuickViewModal } from './QuickViewModal';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
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
  onClose,
  items,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
  onClearCart,
  onAddToCart,
  onOpenSizeGuide,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [completedOrder, setCompletedOrder] = useState<TraitistReceiptOrderData | null>(null);

  // Recommendations state & Draggable Carousel
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse Drag-to-scroll refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

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

  const freeShippingThreshold = 999;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.priceINR * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Recommendations: exclude items currently in cart
  const inCartIds = new Set(items.map((i) => i.product.id));
  const inCartTitles = new Set(items.map((i) => i.product.title.toLowerCase()));
  const filteredRecommendations = CATALOG_PRODUCTS.filter(
    (p) => !inCartIds.has(p.id) && !inCartTitles.has(p.title.toLowerCase())
  );
  const recommendations = filteredRecommendations.length > 0 ? filteredRecommendations : CATALOG_PRODUCTS;

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const cardWidth = 347; // Wide card width (335px) + gap (12px)
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(0, index), recommendations.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 347;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveSlide(index);
  };

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !carouselRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
      if (!isDraggingState) setIsDraggingState(true);
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 70);
    }
  };

  const handleProductCardClick = (prod: Product) => {
    if (hasDraggedRef.current) return;
    setPreviewProduct(prod);
  };

  const handleAddRecommended = (prod: Product) => {
    const chosenSize = selectedSizes[prod.id] || 'M';
    if (onAddToCart) {
      onAddToCart(prod, chosenSize, 1);
    } else {
      onUpdateQuantity(prod.id, chosenSize, 1);
    }
  };

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
      currency: 'INR',
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
    return `₹ ${val.toLocaleString()}`;
  };

  const getCleanColor = (colorway: string) => {
    return colorway.split('•')[0].trim();
  };

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
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
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
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-neutral-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 id="cart-drawer-heading" className="text-base sm:text-lg font-bold tracking-tight text-neutral-900">
              {orderComplete ? 'Order Receipt' : 'Your cart'}
            </h2>
            {!orderComplete && items.length > 0 && (
              <span className="text-[11px] font-mono bg-black text-white px-2 py-0.5 rounded-full font-semibold">
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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-neutral-800" aria-hidden="true" />
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
                  className="text-xs font-mono text-neutral-600 underline hover:text-black cursor-pointer min-h-[44px] inline-flex items-center"
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
                    className={`flex items-center justify-between p-3 rounded-sm border cursor-pointer transition ${
                      paymentMethod === 'upi'
                        ? 'border-black bg-white shadow-sm'
                        : 'border-neutral-300 bg-[#DFDDD7]/50 hover:bg-white/80'
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
                    <span className="text-[10px] bg-[#10B981]/20 text-[#005236] font-bold px-1.5 py-0.5 rounded-sm">
                      FASTEST
                    </span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-3 rounded-sm border cursor-pointer transition ${
                      paymentMethod === 'card'
                        ? 'border-black bg-white shadow-sm'
                        : 'border-neutral-300 bg-[#DFDDD7]/50 hover:bg-white/80'
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
                type="button"
                onClick={handleCompleteOrder}
                className="group w-full py-3.5 min-h-[48px] bg-[#FF5722] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm hover:bg-[#e04818] transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Authorize & Pay {formatPrice(grandTotal)}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
            <div className="px-5 sm:px-6 py-3.5 bg-[#DFDDD7] border-b border-neutral-300 text-[10px] sm:text-[11px] font-mono">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-neutral-800 tracking-wider uppercase font-semibold">
                  ADD <span className="font-bold text-neutral-950">{formatPrice(amountNeededForFreeShipping)}</span> MORE FOR FREE SHIPPING
                </p>
              ) : (
                <p className="text-[#005236] font-bold flex items-center gap-1 uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>YOU'VE UNLOCKED FREE SHIPPING!</span>
                </p>
              )}
              <div className="w-full h-1 bg-neutral-300 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-neutral-950 transition-all duration-300 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Scrollable Body: Cart Items + Recommended Section */}
            <div className="flex-grow overflow-y-auto px-5 sm:px-6 py-4 space-y-5">
              {/* Cart Items List */}
              {items.length === 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-10 h-10 text-neutral-400 stroke-[1.2] mb-2.5" aria-hidden="true" />
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-semibold">
                    YOUR CART IS EMPTY
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs font-sans">
                    Pick a heavyweight piece from the collection below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const unitPrice = item.product.priceINR;

                    return (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex items-center gap-3.5 p-3 bg-white rounded-md border border-neutral-200 shadow-2xs"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-18 object-contain bg-[#DFDDD7] p-1 rounded shrink-0"
                          style={{ mixBlendMode: item.product.blendMode || 'multiply' }}
                        />
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xs font-bold text-neutral-900 truncate">
                              {item.product.title}
                            </h3>
                            <span className="text-xs font-mono font-bold text-neutral-900 shrink-0">
                              {formatPrice(unitPrice)}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5 font-sans">
                            Colour: {getCleanColor(item.product.colorway)} {item.product.sku ? `· ${item.product.sku}` : ''}
                          </p>

                          {/* Size Selector & Stepper & Trash Controls */}
                          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                            {/* Size Selector */}
                            <div className="relative">
                              <select
                                value={item.size}
                                onChange={(e) => onUpdateSize?.(item.product.id, item.size, e.target.value)}
                                className="text-[11px] font-mono font-bold uppercase py-1 pl-2.5 pr-6 border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-black rounded text-neutral-900 appearance-none cursor-pointer focus:outline-none focus:border-black transition h-[32px]"
                                aria-label={`Change size for ${item.product.title}`}
                              >
                                {(item.product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((s) => (
                                  <option key={s} value={s}>
                                    Size {s}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-3 h-3 text-neutral-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="inline-flex items-center border border-neutral-300 bg-neutral-50 rounded h-[32px]">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                                className="p-1 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer active:scale-95"
                                aria-label={`Decrease quantity of ${item.product.title}`}
                              >
                                <Minus className="w-3 h-3 text-neutral-700" aria-hidden="true" />
                              </button>
                              <span className="w-7 text-center text-xs font-mono font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                                className="p-1 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer active:scale-95"
                                aria-label={`Increase quantity of ${item.product.title}`}
                              >
                                <Plus className="w-3 h-3 text-neutral-700" aria-hidden="true" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id, item.size)}
                              className="min-w-[32px] min-h-[32px] flex items-center justify-center text-neutral-400 hover:text-[#FF5722] transition cursor-pointer rounded hover:bg-neutral-100"
                              aria-label={`Remove ${item.product.title} size ${item.size} from bag`}
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* RECOMMENDED FOR YOU SECTION */}
              <section className="pt-3.5 mt-1 border-t border-neutral-300">
                <div className="flex items-center justify-between mb-3 px-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-700 font-bold">
                      RECOMMENDED FOR YOU
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline mr-1">
                      DRAG TO BROWSE
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                      disabled={activeSlide === 0}
                      aria-label="Previous recommended piece"
                      className="w-6 h-6 rounded-sm border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSlide(Math.min(recommendations.length - 1, activeSlide + 1))}
                      disabled={activeSlide >= recommendations.length - 1}
                      aria-label="Next recommended piece"
                      className="w-6 h-6 rounded-sm border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Swipe & Mouse Draggable Carousel */}
                <div
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  className={`flex gap-3.5 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar select-none touch-pan-x ${
                    isDraggingState ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
                  }`}
                  tabIndex={0}
                  aria-label="Recommended products carousel. Click and drag or swipe to explore."
                >
                  {recommendations.map((prod) => {
                    const cleanColor = getCleanColor(prod.colorway);
                    const currentSelectedSize = selectedSizes[prod.id] || 'M';

                    return (
                      <div
                        key={prod.id}
                        className="w-[335px] sm:w-[365px] shrink-0 snap-start bg-white border border-neutral-300 rounded-sm p-2.5 sm:p-3 flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all relative group"
                      >
                        {/* Compact Low-Height Garment Thumbnail (Click to view pop up) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleProductCardClick(prod)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') handleProductCardClick(prod);
                          }}
                          className="w-14 h-16 sm:w-16 sm:h-18 bg-[#DFDDD7] rounded-sm flex items-center justify-center p-1 shrink-0 cursor-pointer relative overflow-hidden group/thumb border border-neutral-200"
                          title={`Click to view ${prod.title} details`}
                        >
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-full h-full object-contain pointer-events-none transition-transform duration-200 group-hover/thumb:scale-110"
                            style={{ mixBlendMode: prod.blendMode || 'multiply' }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-white drop-shadow" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Wide Horizontal Content */}
                        <div className="flex flex-col justify-between flex-grow min-w-0">
                          {/* Row 1: Title & Price side-by-side with wide breathing room */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-grow pr-1">
                              <h4
                                role="button"
                                tabIndex={0}
                                onClick={() => handleProductCardClick(prod)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') handleProductCardClick(prod);
                                }}
                                className="text-xs font-bold text-neutral-900 truncate hover:text-[#FF5722] cursor-pointer transition-colors"
                                title={`Click to view ${prod.title} details`}
                              >
                                {prod.title}
                              </h4>
                              <span className="text-[10px] font-mono uppercase text-neutral-500 block truncate">
                                {cleanColor}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold text-neutral-950 shrink-0">
                              {formatPrice(prod.priceINR)}
                            </span>
                          </div>

                          {/* Row 2: Size Selector & Add to Cart button spread horizontally */}
                          <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-neutral-100">
                            {/* Dropdown Size Selector */}
                            <div className="relative flex-grow max-w-[130px] sm:max-w-[145px]">
                              <select
                                value={currentSelectedSize}
                                onChange={(e) =>
                                  setSelectedSizes((prev) => ({
                                    ...prev,
                                    [prod.id]: e.target.value,
                                  }))
                                }
                                className="w-full text-[11px] font-mono py-1 px-2 border border-neutral-300 bg-white rounded-sm text-neutral-800 appearance-none pr-6 cursor-pointer focus:outline-none focus:border-black"
                                aria-label={`Select size for ${prod.title}`}
                              >
                                <option value="S">Size S (Small)</option>
                                <option value="M">Size M (Medium)</option>
                                <option value="L">Size L (Large)</option>
                                <option value="XL">Size XL</option>
                                <option value="XXL">Size XXL</option>
                              </select>
                              <ChevronDown className="w-3 h-3 text-neutral-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Action Buttons: Inspect & Add */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleProductCardClick(prod)}
                                className="p-1.5 min-h-[30px] min-w-[30px] rounded-sm border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition cursor-pointer flex items-center justify-center"
                                title="View details pop up"
                                aria-label={`View ${prod.title} pop up`}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAddRecommended(prod)}
                                className="bg-neutral-950 hover:bg-[#FF5722] active:scale-[0.97] hover:scale-[1.02] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 min-h-[30px] rounded-sm transition-all duration-200 ease-out cursor-pointer shadow-xs flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" aria-hidden="true" />
                                <span>ADD</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Dots Indicator */}
                {recommendations.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    {recommendations.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => scrollToSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                          activeSlide === idx
                            ? 'w-4 bg-neutral-950'
                            : 'w-1.5 bg-neutral-400 hover:bg-neutral-600'
                        }`}
                        aria-label={`Scroll to recommendation slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Footer with Summary, Checkout & Continue Shopping */}
            <div className="px-5 sm:px-6 py-4 sm:py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-neutral-300 bg-[#ECEBE6]">
              {/* Optional Coupon Code Accordion / Input */}
              {items.length > 0 && (
                <div className="mb-3.5">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <label htmlFor="cart-coupon-input" className="visually-hidden">
                      Coupon code
                    </label>
                    <input
                      id="cart-coupon-input"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon (e.g. 'PHD10')"
                      className="flex-grow bg-[#DFDDD7] border border-neutral-300 text-xs px-3 py-1.5 uppercase font-mono placeholder:normal-case focus:outline-none focus:border-black rounded-sm min-h-[36px]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 min-h-[36px] bg-black text-white text-xs font-mono uppercase font-semibold hover:bg-neutral-800 transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer rounded-sm"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p
                      className={`text-[10px] font-mono mt-1 ${
                        discountPercent > 0 ? 'text-[#005236] font-semibold' : 'text-[#FF5722]'
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </div>
              )}

              {/* Estimated Total Line */}
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-base sm:text-lg font-bold text-neutral-950">
                  Estimated total
                </span>
                <span className="text-base sm:text-lg font-bold font-mono text-neutral-950">
                  {formatPrice(grandTotal)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-sans mb-3.5">
                Taxes, discounts and shipping calculated at checkout.
              </p>

              {/* Checkout & Continue Shopping */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  disabled={items.length === 0}
                  className={`group relative overflow-hidden w-full py-3.5 min-h-[48px] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.97] cursor-pointer ${
                    items.length === 0
                      ? 'bg-neutral-400 cursor-not-allowed opacity-60'
                      : 'bg-black hover:bg-neutral-800'
                  }`}
                >
                  {items.length > 0 && (
                    <BorderBeam size={100} duration={8} colorFrom="#FF5722" colorTo="#ffffff" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>CHECK OUT</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>

                <div className="text-center pt-0.5">
                  <button
                    onClick={onClose}
                    className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 underline hover:text-black transition cursor-pointer min-h-[32px] inline-flex items-center"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        </motion.aside>

        {/* Quick View Preview Pop Up Modal (Opened from Recommended Pieces) */}
        {previewProduct && (
          <QuickViewModal
            product={previewProduct}
            onClose={() => setPreviewProduct(null)}
            isWishlisted={wishlistIds?.includes(previewProduct.id) ?? false}
            onToggleWishlist={onToggleWishlist || (() => {})}
            onAddToCart={(prod, size, qty) => {
              if (onAddToCart) {
                onAddToCart(prod, size, qty);
              } else {
                onUpdateQuantity(prod.id, size, qty);
              }
            }}
            onOpenSizeGuide={onOpenSizeGuide || (() => {})}
          />
        )}
      </div>
    )}
  </AnimatePresence>
);
};

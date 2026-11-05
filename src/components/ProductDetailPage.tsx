import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Check,
  Truck,
  RefreshCw,
  Clock,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Zap,
  ArrowRight,
  X,
  AlertTriangle,
} from 'lucide-react';
import { Product, CATALOG_PRODUCTS, DEFAULT_SIZES, SIZE_TO_VARIANT } from '../data/products';
import { BorderBeam } from './magicui/border-beam';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onInstantBuy: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onInstantBuy,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    shipping: false,
    care: false,
  });

  // 3D perspective mouse tilt on primary stage
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    const normX = (relativeX - 0.5) * 2;
    const normY = (relativeY - 0.5) * 2;
    setStageTilt({ x: -normY * 8, y: normX * 10 });
  };

  const handleStageMouseLeave = () => {
    setStageTilt({ x: 0, y: 0 });
  };

  // Gallery items for this piece (Studio view & Graphic detail view)
  const galleryImages = [
    {
      id: 'studio-front',
      label: 'Studio Garment',
      src: product.image,
      zoom: false,
    },
    {
      id: 'print-detail',
      label: 'Graphic Detail',
      src: product.image,
      zoom: true,
    },
  ];

  // Scroll to top & reset on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedSize('S');
    setQuantity(1);
    setActiveImageIdx(0);
    setStageTilt({ x: 0, y: 0 });
  }, [product.id]);

  // Handle keyboard escape to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Direct manipulation gesture: only fire swipe if horizontal motion exceeds vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  const handleToggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, selectedSize, quantity);
  };

  const cleanColor = product.colorway.split('•')[0].trim();

  // Find related relatable pieces
  const relatedProducts = CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id && p.title !== product.title
  ).slice(0, 4);

  return (
    <article
      key={product.id}
      className="min-h-screen bg-[#ECEBE6] text-[#111111] pb-24"
      data-purpose="dedicated-product-page"
    >
      {/* 1. Top Return Bar & Actions */}
      <nav
        aria-label="Product navigation"
        className="border-b border-neutral-300/80 bg-[#ECEBE6]/85 backdrop-blur-md sticky top-[64px] sm:top-[72px] md:top-[80px] z-30 px-4 sm:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold hover:text-[#FF5722] transition-colors cursor-pointer min-h-[44px] min-w-[44px] pr-3"
            aria-label="Back to main collection"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO COLLECTION</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 rounded hover:bg-neutral-200 transition text-neutral-700 hover:text-[#FF5722] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              title="Save to wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#FF5722] text-[#FF5722]' : ''
                }`}
              />
              <span className="text-[10px] font-mono uppercase hidden sm:inline">
                {isWishlisted ? 'SAVED' : 'SAVE'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded hover:bg-neutral-200 transition text-neutral-700 hover:text-black cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Share product link"
              title="Copy product link"
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-[#10B981]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Main Product Showcase & Purchasing Section (Matching Reference Image) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Large Product Image Stage with Nav Arrows + Thumbnails */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Primary Image Stage */}
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full aspect-square sm:aspect-[4/5] bg-[#DFDDD7]/60 rounded-md border border-neutral-300/80 p-6 sm:p-12 flex items-center justify-center overflow-hidden shadow-2xs group select-none touch-pan-y"
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 font-bold shadow-xs">
                  {product.badge}
                </span>
              )}

              {/* Floating Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous view"
                className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition cursor-pointer z-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Garment Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.32 }}
                  className="w-full h-full flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={galleryImages[activeImageIdx].src}
                    alt={`${product.title} - ${galleryImages[activeImageIdx].label}`}
                    className={`max-w-[85%] max-h-[85%] object-contain filter drop-shadow-xl transition-transform duration-300 ${
                      galleryImages[activeImageIdx].zoom ? 'scale-125' : 'scale-100'
                    }`}
                    style={{
                      mixBlendMode: product.blendMode || 'normal',
                      transform: `perspective(1000px) rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next view"
                className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition cursor-pointer z-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 mt-4 self-start">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`Select ${img.label}`}
                  className={`w-14 h-16 rounded border bg-[#DFDDD7] p-1 flex items-center justify-center overflow-hidden transition cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-2 border-neutral-950 shadow-xs'
                      : 'border-neutral-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: product.blendMode || 'normal' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info, Options & Purchasing (Directly Mirroring Reference) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Breadcrumb with SKU */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
              <span className="text-neutral-500 font-semibold">SHOP / {product.category.toUpperCase()}</span>
              {product.sku && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-900 font-bold bg-neutral-200/90 px-1.5 py-0.5 rounded-xs">
                    SKU: {product.sku}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-display tracking-tight text-neutral-950 leading-[1.05] mt-1.5">
              {product.title}
            </h1>

            {/* Price */}
            <div className="text-lg sm:text-xl font-mono text-neutral-900 mt-2 font-bold">
              ₹ {product.priceINR.toLocaleString()}
            </div>

            {/* Product Description */}
            <p className="text-xs sm:text-[13px] text-neutral-600 font-sans leading-relaxed mt-2.5">
              {product.description}
            </p>

            {/* Divider */}
            <hr className="border-neutral-300/80 my-4" />

            {/* Colour Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold block">
                COLOUR: {product.colorway || cleanColor}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-neutral-900 ring-2 ring-offset-2 ring-neutral-950 transition cursor-default"
                  title={product.colorway || cleanColor}
                  aria-label={`Color ${product.colorway || cleanColor}`}
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-neutral-300/80 my-4" />

            {/* Size Section with Variants */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  VARIANT: <span className="text-neutral-900 font-bold">{SIZE_TO_VARIANT[selectedSize] || selectedSize}</span> ({selectedSize})
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  type="button"
                  className="text-[11px] font-mono text-neutral-600 underline hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Sizes">
                {(product.sizes || DEFAULT_SIZES).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`min-w-[42px] h-10 px-2.5 text-xs font-mono uppercase font-bold rounded flex items-center justify-center transition cursor-pointer ${
                      selectedSize === size
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'bg-white/60 border border-neutral-300 text-neutral-900 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-neutral-300/80">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                QUANTITY
              </span>
              <div className="inline-flex items-center border border-neutral-300 bg-white rounded shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer active:scale-95 text-neutral-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer active:scale-95 text-neutral-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Print Colour Notice */}
            <div className="mt-4 p-3 sm:p-3.5 rounded-md border border-amber-200/80 bg-amber-50/50 flex items-start gap-2.5 sm:gap-3 text-left">
              <div className="shrink-0 p-1 rounded-sm bg-amber-100/90 text-amber-800 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
                  Print Colour Notice
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-600 font-sans leading-relaxed mt-1">
                  Actual printed colours may vary slightly from the digital product images due to screen settings, fabric characteristics, and printing processes. The approved design and artwork will remain the same.
                </p>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Instant 1-Click Buy */}
            <div className="mt-5 space-y-2.5">
              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="group w-full bg-neutral-950 hover:bg-neutral-800 active:scale-[0.97] hover:scale-[1.01] text-white py-3.5 px-6 rounded-sm flex items-center justify-between font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ease-out shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
              >
                <span>
                  {isAddedFeedback ? '✓ ADDED TO BAG!' : `ADD TO BAG • ${selectedSize}${quantity > 1 ? ` (×${quantity})` : ''}`}
                </span>
                <span>₹ {(product.priceINR * quantity).toLocaleString()}</span>
              </button>

              {/* Instant 1-Click Buy Now with Magic UI BorderBeam */}
              <button
                type="button"
                onClick={handleInstantBuy}
                className="group relative overflow-hidden w-full bg-[#FF5722] hover:bg-[#e04818] active:scale-[0.97] hover:scale-[1.01] text-white py-3.5 px-6 rounded-sm flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ease-out shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
              >
                <BorderBeam size={100} duration={8} colorFrom="#ffffff" colorTo="#FFB300" />
                <Zap className="w-4 h-4 fill-white relative z-10" />
                <span className="relative z-10">BUY NOW • GUEST CHECKOUT</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* 3-Column Confidence Badges */}
            <div className="grid grid-cols-3 border border-neutral-300 rounded bg-white/40 text-center py-3.5 px-2 mt-5 divide-x divide-neutral-300">
              <div className="px-2 space-y-1">
                <Truck className="w-4 h-4 mx-auto text-neutral-700" />
                <p className="text-[11px] font-bold text-neutral-900 leading-tight">Free shipping</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase">OVER ₹999</p>
              </div>
              <div className="px-2 space-y-1">
                <RefreshCw className="w-4 h-4 mx-auto text-neutral-700" />
                <p className="text-[11px] font-bold text-neutral-900 leading-tight">Size exchange</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase">1 WEEK</p>
              </div>
              <div className="px-2 space-y-1">
                <Clock className="w-4 h-4 mx-auto text-neutral-700" />
                <p className="text-[11px] font-bold text-neutral-900 leading-tight">Small runs</p>
                <p className="text-[9px] font-mono text-neutral-500 uppercase">NO RESTOCKS</p>
              </div>
            </div>

            {/* Collapsible Accordions (Description, Shipping, Materials) */}
            <div className="mt-6 border-t border-neutral-300/80 divide-y divide-neutral-300/80">
              {/* Description Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => handleToggleAccordion('description')}
                  aria-expanded={openAccordions.description}
                  aria-controls="accordion-panel-description"
                  className="w-full py-3.5 flex items-center justify-between text-left text-[11px] font-mono uppercase tracking-wider text-neutral-900 font-bold hover:text-black cursor-pointer"
                >
                  <span>DESCRIPTION</span>
                  {openAccordions.description ? (
                    <X className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  )}
                </button>
                {openAccordions.description && (
                  <div id="accordion-panel-description" className="pb-4 text-xs text-neutral-700 font-sans leading-relaxed">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-200 font-mono text-[11px]">
                      <div>
                        <span className="text-neutral-500 text-[9px] block">SKU</span>
                        <span className="font-semibold text-neutral-900">{product.sku || 'TR-001'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[9px] block">FABRIC</span>
                        <span className="font-semibold text-neutral-900">{product.fabric}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[9px] block">WEIGHT</span>
                        <span className="font-semibold text-neutral-900">{product.gsm} Combed Jersey</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping and Exchanges Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => handleToggleAccordion('shipping')}
                  aria-expanded={openAccordions.shipping}
                  aria-controls="accordion-panel-shipping"
                  className="w-full py-3.5 flex items-center justify-between text-left text-[11px] font-mono uppercase tracking-wider text-neutral-900 font-bold hover:text-black cursor-pointer"
                >
                  <span>SHIPPING AND EXCHANGES</span>
                  {openAccordions.shipping ? (
                    <X className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  )}
                </button>
                {openAccordions.shipping && (
                  <div id="accordion-panel-shipping" className="pb-4 text-xs text-neutral-700 font-mono leading-relaxed space-y-1.5 text-[11px]">
                    <p>• Complimentary express shipping across India on orders above ₹999.</p>
                    <p>• Orders dispatch within 24 hours via express air logistics.</p>
                    <p>• 7-day (1 week) size exchanges with doorstep pickup. Only exchanges accepted (no returns).</p>
                  </div>
                )}
              </div>

              {/* Materials and Care Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => handleToggleAccordion('care')}
                  aria-expanded={openAccordions.care}
                  aria-controls="accordion-panel-care"
                  className="w-full py-3.5 flex items-center justify-between text-left text-[11px] font-mono uppercase tracking-wider text-neutral-900 font-bold hover:text-black cursor-pointer"
                >
                  <span>MATERIALS AND CARE</span>
                  {openAccordions.care ? (
                    <X className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                  )}
                </button>
                {openAccordions.care && (
                  <div id="accordion-panel-care" className="pb-4 text-xs text-neutral-700 font-mono leading-relaxed space-y-1.5 text-[11px]">
                    <p>• 100% Super-Combed Cotton, 200 GSM heavy jersey knit.</p>
                    <p>• Machine wash cold inside out with similar colors.</p>
                    <p>• Line dry in shade to preserve relaxed street drape.</p>
                    <p>• Warm iron inside out; do not iron directly over the graphic print.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 3. Related Products Section */}
        <section className="mt-20 pt-12 border-t border-neutral-300">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-semibold block">
                RELATABLE PIECES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 mt-1">
                More from the collection
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-mono uppercase tracking-widest text-neutral-800 underline underline-offset-4 hover:text-black cursor-pointer"
            >
              VIEW ALL PIECES
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectProduct(rel)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(rel);
                  }
                }}
                className="group flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded"
                aria-label={`View dedicated page for ${rel.title}`}
              >
                <div className="relative bg-[#DFDDD7] aspect-[3/4] overflow-hidden flex items-center justify-center p-3 rounded-xs border border-neutral-300/80 transition-all duration-300 group-hover:border-neutral-500">
                  {rel.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-mono uppercase bg-black text-white px-1.5 py-0.5 z-10">
                      {rel.badge}
                    </span>
                  )}
                  <img
                    src={rel.image}
                    alt={rel.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    style={{
                      mixBlendMode: rel.blendMode || 'normal',
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-mono uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW PIECE →
                  </div>
                </div>
                <div className="flex justify-between items-start mt-2.5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-900 group-hover:text-[#FF5722] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-600 uppercase mt-0.5">
                      {rel.gsm} • {rel.colorway}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-950 whitespace-nowrap">
                    {rel.priceDisplayINR}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

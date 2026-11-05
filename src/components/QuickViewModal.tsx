import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShieldCheck, Truck, RefreshCw, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product, DEFAULT_SIZES, SIZE_TO_VARIANT } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Handle keyboard Escape
  React.useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  const displayPrice = product ? product.priceDisplayINR : '';

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  const handleInstantBuy = () => {
    if (!product) return;
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickview-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-2.5 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative max-w-3xl w-full max-h-[92vh] bg-[#ECEBE6] rounded-sm flex flex-col md:flex-row shadow-2xl border border-neutral-300 overflow-y-auto md:overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/90 hover:bg-black hover:text-white transition cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Left: Garment Showcase */}
        <div className="w-full md:w-1/2 bg-[#DFDDD7] p-3 sm:p-4 flex items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-neutral-300 h-[260px] sm:h-[340px] md:h-auto md:min-h-[460px] shrink-0">
          {product.badge && (
            <span className="absolute top-3.5 left-3.5 text-[9px] font-mono uppercase bg-black text-white px-2 py-0.5 rounded-sm z-10">
              {product.badge}
            </span>
          )}

          <img
            src={product.image}
            alt={product.title}
            className="max-h-[240px] sm:max-h-[320px] md:max-h-[520px] w-full h-full object-contain garment-shadow filter drop-shadow-2xl"
            style={{
              mixBlendMode: product.blendMode || 'normal',
              transform: `scale(${product.scale ? product.scale * 1.15 : 1.35})`,
            }}
          />
        </div>

        {/* Right: Garment Details & Actions */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-600 uppercase font-semibold">
                <span>{product.edition || product.category}</span>
                {product.sku && (
                  <>
                    <span>•</span>
                    <span className="text-neutral-900 font-bold bg-neutral-200/90 px-1.5 py-0.5 rounded-xs">
                      SKU: {product.sku}
                    </span>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-600 hover:text-[#FF5722] transition cursor-pointer"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-[#FF5722] text-[#FF5722]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <h2 id="quickview-title" className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mt-1">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-xl font-mono font-bold text-neutral-950">
                {product.isSecretDrop ? '???' : `₹ ${product.priceINR.toLocaleString()}`}
              </span>
              {!product.isSecretDrop && (
                <span className="text-xs font-mono text-neutral-400 line-through">
                  ₹ 1,299
                </span>
              )}
              {!product.isSecretDrop && (
                <span className="text-[10px] font-mono bg-[#10B981]/15 text-[#005236] font-bold px-1.5 py-0.5 rounded">
                  54% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 mt-3.5 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2 mt-4 text-[10px] font-mono text-neutral-700">
              <span className="bg-[#DFDDD7] px-2 py-1 rounded border border-neutral-300">
                Colour: {product.colorway || 'Black'}
              </span>
              <span className="bg-[#DFDDD7] px-2 py-1 rounded border border-neutral-300">
                {product.gsm} Heavyweight
              </span>
              <span className="bg-[#DFDDD7] px-2 py-1 rounded border border-neutral-300">
                {product.fabric}
              </span>
              <span className="bg-[#DFDDD7] px-2 py-1 rounded border border-neutral-300">
                Boxy Streetwear Fit
              </span>
            </div>

            {/* Size Selector */}
            <div className="mt-5 pt-4 border-t border-neutral-300">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase text-neutral-900">
                  Variant: <span className="text-neutral-950 font-bold">{SIZE_TO_VARIANT[selectedSize] || selectedSize}</span> <span className="text-neutral-500 font-normal">({selectedSize})</span>
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-[11px] font-mono text-neutral-600 underline hover:text-black cursor-pointer"
                >
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2" role="group" aria-label="Available sizes">
                {(product.sizes || DEFAULT_SIZES).map((size) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={selectedSize === size}
                    aria-label={`Select size ${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 min-h-[42px] text-xs font-mono uppercase font-semibold rounded transition cursor-pointer border ${
                      selectedSize === size
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-[#DFDDD7]/60 text-neutral-800 border-neutral-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-neutral-900">
                Qty:
              </span>
              <div className="flex items-center border border-neutral-300 bg-white rounded">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-300 space-y-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-3.5 min-h-[46px] bg-black text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm hover:bg-neutral-800 transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer shadow-sm hover:shadow-md"
            >
              Add to Bag • {product.isSecretDrop ? 'Soon' : displayPrice}
            </button>

            {!product.isSecretDrop && (
              <button
                type="button"
                onClick={handleInstantBuy}
                className="group w-full py-3 min-h-[46px] bg-[#FF5722] text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm hover:bg-[#e04818] transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <span>Instant 1-Click Buy</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-2 text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#10B981] shrink-0" /> Free Shipping
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-neutral-600 shrink-0" /> 7-Day Exchange
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-neutral-600 shrink-0" /> 100% Bio-Wash
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
);
};

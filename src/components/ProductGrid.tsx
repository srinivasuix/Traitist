import React, { useState } from 'react';
import { Heart, Plus, ShoppingBag, Check } from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '../data/products';
import { BlurFade } from './magicui/blur-fade';

interface ProductGridProps {
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'cat-01': 'M',
    'cat-02': 'L',
    'cat-03': 'L',
    'cat-04': 'M',
    'cat-05': 'XL',
    'cat-06': 'L',
    'cat-07': 'M',
    'cat-08': 'XL',
  });
  const [recentlyAdded, setRecentlyAdded] = useState<Record<string, boolean>>({});

  const handleSizeClick = (e: React.MouseEvent, productId: string, size: string) => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.isSecretDrop) {
      onSelectProduct(product);
      return;
    }
    const size = selectedSizes[product.id] || 'M';
    onAddToCart(product, size);
    setRecentlyAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setRecentlyAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-16"
      data-purpose="product-catalog-grid"
      id="shop"
    >
      {/* Header of the Grid */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-300 pb-5 mb-8 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-600 font-semibold">
            IN STOCK NOW • ACADEMIC SURVIVAL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-950 mt-1">
            Latest pieces
          </h2>
        </div>

        {/* Catalog summary count */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 font-semibold">
            {CATALOG_PRODUCTS.length} PIECES AVAILABLE
          </span>
          <span className="text-neutral-400" aria-hidden="true">•</span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-semibold">
            LIMITED RUN
          </span>
        </div>
      </div>

      {/* Product Grid: 4 Columns on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-7 sm:gap-y-10">
        {CATALOG_PRODUCTS.map((product, idx) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const currentSize = selectedSizes[product.id] || 'M';
          const isAdded = !!recentlyAdded[product.id];

          return (
            <BlurFade key={product.id} delay={0.04 * idx} inView>
              <article
                tabIndex={0}
                role="button"
                aria-label={`View ${product.title} details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col relative cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded active:scale-[0.98] transition-transform duration-150"
              >
                <div className="relative bg-[#DFDDD7] aspect-[3/4] overflow-hidden flex items-center justify-center p-2 sm:p-3 rounded-xs border border-neutral-300/60 transition-all duration-300 group-hover:border-neutral-400">
                  {/* Badge */}
                  {product.badge && !isAdded && (
                    <span
                      className={`absolute top-2.5 left-2.5 text-[9px] font-mono uppercase px-1.5 py-0.5 z-10 ${
                        product.isSecretDrop
                          ? 'bg-[#FF5722] text-white font-bold'
                          : 'bg-black text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Floating "Added to Bag" Hint Badge */}
                  {isAdded && (
                    <div className="absolute top-2.5 left-2.5 z-20 bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded shadow-lg flex items-center gap-1.5 border border-neutral-700 pointer-events-none animate-fade-in">
                      <ShoppingBag className="w-3 h-3 text-[#10B981]" aria-hidden="true" />
                      <span>ADDED</span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
                    className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 hover:bg-white flex items-center justify-center transition z-10 cursor-pointer shadow-xs"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isWishlisted
                          ? 'fill-[#FF5722] text-[#FF5722]'
                          : 'text-neutral-700 hover:text-black'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Garment Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${
                      product.isSecretDrop ? 'blur-md opacity-60' : ''
                    }`}
                    style={{
                      mixBlendMode: product.blendMode || 'multiply',
                      transform: `scale(${product.scale || 1.15})`,
                    }}
                  />

                  {/* Overlay for Secret Drop */}
                  {product.isSecretDrop && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 shadow-lg">
                        DROPS SOON
                      </span>
                    </div>
                  )}

                  {/* Desktop & Tablet Size Selector Hover Pill Bar */}
                  <div
                    className="hidden md:flex absolute bottom-2.5 left-2.5 right-2.5 items-center justify-between backdrop-blur-md bg-[#e6e5df]/90 border border-white/60 text-[#121212] rounded-2xl px-3 sm:px-4 py-1.5 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5" role="group" aria-label={`Sizes for ${product.title}`}>
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={currentSize === size}
                          aria-label={`Select size ${size} for ${product.title}`}
                          onClick={(e) => handleSizeClick(e, product.id, size)}
                          className={`font-mono text-[11px] uppercase font-medium tracking-wider px-2 py-1 rounded-sm transition duration-150 cursor-pointer min-h-[30px] ${
                            currentSize === size
                              ? 'font-bold bg-black text-white'
                              : 'hover:text-black text-neutral-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Add to bag icon button */}
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      aria-label={isAdded ? `Added ${product.title} to bag` : `Add size ${currentSize} of ${product.title} to bag`}
                      className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#10B981] text-white scale-105'
                          : 'bg-black text-white hover:bg-[#FF5722]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* Mobile Quick Action Button (Direct Add to Bag without redirecting) */}
                  {!product.isSecretDrop && (
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      aria-label={isAdded ? `Added ${product.title} to bag` : `Add ${product.title} to bag`}
                      className={`md:hidden absolute bottom-2 right-2 z-20 min-w-[38px] min-h-[38px] rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer ${
                        isAdded
                          ? 'bg-[#10B981] text-white scale-105'
                          : 'bg-black/90 backdrop-blur-sm text-white hover:bg-black'
                      }`}
                    >
                      {isAdded ? (
                        <ShoppingBag className="w-4 h-4 text-white animate-scale-in" aria-hidden="true" />
                      ) : (
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex justify-between items-start mt-3">
                  <div className="pr-2">
                    <h3 className="text-xs font-semibold uppercase tracking-tight text-neutral-900 group-hover:text-neutral-700 transition">
                      {product.title}
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-600 uppercase mt-0.5">
                      {product.edition || product.category}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-neutral-900 whitespace-nowrap">
                    {product.isSecretDrop
                      ? '???'
                      : product.priceDisplayINR}
                  </span>
                </div>
              </article>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
};

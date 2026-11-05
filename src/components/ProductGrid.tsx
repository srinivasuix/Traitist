import React from 'react';
import { Heart } from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '../data/products';
import { BlurFade } from './magicui/blur-fade';

interface ProductGridProps {
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart?: (product: Product, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
}) => {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-8 sm:gap-y-12">
        {CATALOG_PRODUCTS.map((product, idx) => {
          const isWishlisted = wishlistIds.includes(product.id);

          return (
            <BlurFade key={product.id} delay={0.04 * idx} inView>
              <article
                tabIndex={0}
                role="button"
                aria-label={`View ${product.title} - ${product.priceDisplayINR}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col relative cursor-pointer focus-visible:outline-2 focus-visible:outline-black rounded active:scale-[0.99] transition-transform duration-150"
              >
                {/* Visual Stage */}
                <div className="relative bg-[#DFDDD7] aspect-[3/4] overflow-hidden flex items-center justify-center p-3 sm:p-4 rounded-xs border border-neutral-300/60 transition-all duration-300 group-hover:border-neutral-400 group-hover:shadow-sm">
                  {/* Badge */}
                  {product.badge && (
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

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
                    className="absolute top-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 backdrop-blur-sm border border-black/10 hover:bg-white flex items-center justify-center transition z-10 cursor-pointer shadow-xs active:scale-95"
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
                    className={`w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 ${
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
                </div>

                {/* Clean Product Info: Title & Price only */}
                <div className="flex justify-between items-baseline mt-2.5 sm:mt-3 gap-2">
                  <h3 className="text-xs sm:text-[13px] font-semibold uppercase tracking-tight text-neutral-900 group-hover:text-[#FF5722] transition-colors truncate">
                    {product.title}
                  </h3>
                  <span className="text-xs sm:text-[13px] font-mono font-bold text-neutral-900 shrink-0">
                    {product.isSecretDrop ? '???' : product.priceDisplayINR}
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

import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '../data/products';

interface ProductGridProps {
  currency: 'INR' | 'USD';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
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

  const categories = ['All', 'PhD Series', 'Heavyweight', 'Archive / Drops'];

  const filteredProducts = CATALOG_PRODUCTS.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

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
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-16"
      data-purpose="product-catalog-grid"
      id="shop"
    >
      {/* Header of the Grid */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-5 mb-8 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">
            IN STOCK NOW
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-950 mt-1">
            Latest pieces
          </h2>
        </div>

        {/* Filter categories & link */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 bg-[#DFDDD7]/70 p-1 rounded-md border border-neutral-300/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <a
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-800 underline underline-offset-4 hover:text-black ml-2"
            href="#shop"
          >
            SHOP ALL PIECES
          </a>
        </div>
      </div>

      {/* Product Grid: 4 Columns on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-10">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const currentSize = selectedSizes[product.id] || 'M';

          return (
            <article
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group flex flex-col relative cursor-pointer"
            >
              <div className="relative bg-[#DFDDD7] aspect-[3/4] overflow-hidden flex items-center justify-center p-2 sm:p-3 rounded-xs border border-neutral-300/60 transition-all duration-300 group-hover:border-neutral-400">
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
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/10 hover:bg-white transition z-10 cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isWishlisted
                        ? 'fill-[#FF5722] text-[#FF5722]'
                        : 'text-neutral-700 hover:text-black'
                    }`}
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

                {/* Size Selector Hover Pill Bar */}
                <div
                  className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between backdrop-blur-md bg-[#e6e5df]/90 border border-white/60 text-[#121212] rounded-2xl px-3 sm:px-4 py-1.5 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={(e) => handleSizeClick(e, product.id, size)}
                        className={`font-mono text-[11px] uppercase font-medium tracking-wider px-1.5 py-0.5 rounded transition duration-150 cursor-pointer ${
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
                    title="Add to Bag"
                    className="p-1 rounded-full bg-black text-white hover:bg-[#FF5722] transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start mt-3">
                <div className="pr-2">
                  <h3 className="text-xs font-semibold uppercase tracking-tight text-neutral-900 group-hover:text-neutral-700 transition">
                    {product.title}
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                    {product.edition || product.category}
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-900 whitespace-nowrap">
                  {product.isSecretDrop
                    ? '???'
                    : currency === 'INR'
                    ? product.priceDisplayINR
                    : product.priceDisplayUSD}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

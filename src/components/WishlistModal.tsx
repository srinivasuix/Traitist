import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: 'INR' | 'USD';
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-xl w-full max-h-[85vh] bg-[#ECEBE6] rounded-sm p-6 sm:p-8 shadow-2xl border border-neutral-300 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF5722] fill-[#FF5722]" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900">
              WISHLIST ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-grow overflow-y-auto py-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center">
              <span className="text-4xl mb-2 block">🖤</span>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                YOUR WISHLIST IS EMPTY
              </p>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto font-sans">
                Heart items in the catalog to save them for drop releases and restocks.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const price =
                currency === 'INR' ? product.priceDisplayINR : product.priceDisplayUSD;

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-[#DFDDD7]/70 rounded border border-neutral-300/80"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-grow min-w-0 pr-3"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-16 object-contain bg-[#DFDDD7] p-1 rounded"
                      style={{ mixBlendMode: product.blendMode || 'multiply' }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-900 truncate">
                        {product.title}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-500">
                        {product.edition || product.category} • {product.gsm}
                      </p>
                      <p className="text-xs font-mono font-semibold text-neutral-900 mt-1">
                        {product.isSecretDrop ? 'Soon' : price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!product.isSecretDrop && (
                      <button
                        onClick={() => onAddToCart(product, 'M')}
                        className="p-2 rounded bg-black text-white hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold"
                        title="Add size M to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-neutral-400 hover:text-[#FF5722] transition cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="pt-4 border-t border-neutral-300 flex justify-between items-center text-xs font-mono text-neutral-600">
            <span>Saved items sync to your session</span>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-black text-white rounded text-xs uppercase font-semibold hover:bg-neutral-800 transition cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

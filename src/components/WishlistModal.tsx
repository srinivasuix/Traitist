import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  // Handle keyboard Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />
      <div data-lenis-prevent className="relative max-w-xl w-full max-h-[88vh] bg-[#ECEBE6] rounded-sm p-4 sm:p-7 shadow-2xl border border-neutral-300 flex flex-col z-10">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-300">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF5722] fill-[#FF5722]" aria-hidden="true" />
            <h2 id="wishlist-modal-title" className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900">
              WISHLIST ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5 text-neutral-800" aria-hidden="true" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-grow overflow-y-auto py-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <Heart className="w-12 h-12 text-neutral-400 stroke-[1.2] mb-3" aria-hidden="true" />
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-semibold">
                YOUR WISHLIST IS EMPTY
              </p>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto font-sans">
                Heart items in the catalog to save them for drop releases and restocks.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const price = product.priceDisplayINR;

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-[#DFDDD7]/70 rounded border border-neutral-300/80"
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${product.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProduct(product);
                        onClose();
                      }
                    }}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-grow min-w-0 pr-3 focus-visible:outline-2 focus-visible:outline-black rounded"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-16 object-contain bg-[#DFDDD7] p-1 rounded"
                      style={{ mixBlendMode: product.blendMode || 'multiply' }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-900 truncate">
                        {product.title}
                      </h3>
                      <p className="text-[10px] font-mono text-neutral-600">
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
                        type="button"
                        onClick={() => onAddToCart(product, 'M')}
                        aria-label={`Add size M of ${product.title} to bag`}
                        className="p-2 min-h-[44px] rounded-sm bg-black text-white hover:bg-neutral-800 active:scale-[0.97] hover:scale-[1.01] transition-all duration-200 ease-out cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      aria-label={`Remove ${product.title} from wishlist`}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-[#FF5722] transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
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
              type="button"
              onClick={onClose}
              className="py-2 px-4 min-h-[38px] bg-black text-white rounded-sm text-xs font-mono uppercase font-semibold hover:bg-neutral-800 active:scale-[0.97] hover:scale-[1.01] transition-all duration-200 ease-out cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

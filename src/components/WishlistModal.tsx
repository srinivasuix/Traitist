import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, Check } from 'lucide-react';
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
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (product: Product) => {
    onAddToCart(product, 'M');
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

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
            <div className="py-8 px-4 text-center flex flex-col items-center select-none">
              <div className="w-48 sm:w-56 overflow-hidden rounded-2xl mb-4 border border-neutral-800 shadow-xl bg-black hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/empty-states/wishlist-empty.jpg?v=2"
                  alt="Your Wishlist is Empty"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold mb-1">
                YOUR WISHLIST IS EMPTY
              </p>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto font-sans leading-relaxed">
                Save pieces you love to get early access alerts when new sizes and drops release.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('shop');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 px-5 py-2.5 bg-neutral-950 hover:bg-[#FF5722] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false} mode="popLayout">
              {wishlistProducts.map((product) => {
                const price = product.priceDisplayINR;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.92,
                      x: -20,
                      transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                    }}
                    transition={{
                      layout: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
                    }}
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
                        <div className="flex items-center gap-1.5 mt-1 font-mono">
                          {product.regularPriceDisplayINR && !product.isSecretDrop && (
                            <span className="text-[11px] text-neutral-400 line-through">
                              {product.regularPriceDisplayINR}
                            </span>
                          )}
                          <span className="text-xs font-bold text-neutral-950">
                            {product.isSecretDrop ? 'Soon' : price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!product.isSecretDrop && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                          onClick={() => handleAdd(product)}
                          aria-label={addedIds[product.id] ? `Added ${product.title} to bag` : `Add size M of ${product.title} to bag`}
                          className={`px-3 py-2 min-h-[40px] rounded-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-xs ${
                            addedIds[product.id]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-950 text-white hover:bg-[#FF5722]'
                          }`}
                        >
                          <motion.div
                            key={addedIds[product.id] ? 'check' : 'bag'}
                            initial={{ scale: 0.6, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                            className="flex items-center"
                          >
                            {addedIds[product.id] ? (
                              <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                            )}
                          </motion.div>
                          <span>{addedIds[product.id] ? 'Added!' : 'Add'}</span>
                        </motion.button>
                      )}

                      <motion.button
                        type="button"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => onRemoveFromWishlist(product)}
                        aria-label={`Remove ${product.title} from wishlist`}
                        className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-neutral-500 hover:text-[#FF5722] hover:bg-neutral-200/60 rounded-full transition-colors cursor-pointer group"
                      >
                        <motion.div
                          variants={{
                            hover: {
                              rotate: [0, -10, 8, -4, 0],
                              scale: 1.15,
                              transition: { duration: 0.35, ease: 'easeInOut' },
                            },
                            tap: {
                              scale: 0.82,
                              rotate: 0,
                              transition: { duration: 0.1 },
                            },
                          }}
                          className="flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4 transition-colors" aria-hidden="true" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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

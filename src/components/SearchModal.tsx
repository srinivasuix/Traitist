import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { CATALOG_PRODUCTS, ROTATOR_PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle keyboard Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Combine and deduplicate products
  const allProductsMap = new Map<string, Product>();
  [...CATALOG_PRODUCTS, ...ROTATOR_PRODUCTS].forEach((p) => {
    allProductsMap.set(p.title, p);
  });
  const allProducts = Array.from(allProductsMap.values());

  const searchResults = allProducts.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.edition && p.edition.toLowerCase().includes(q))
    );
  });

  const popularSearches = [
    'PhD Progress',
    'Scholar Thoughts',
    'Under Review',
    'Coffee',
    'Milestone',
    'Pie Chart',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search catalog"
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-2.5 sm:px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.98, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative max-w-2xl w-full bg-[#ECEBE6] rounded-sm p-4 sm:p-6 shadow-2xl border border-neutral-300 z-10"
          >
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-300">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-grow pr-2 sm:pr-4">
            <Search className="w-5 h-5 text-neutral-600 shrink-0" aria-hidden="true" />
            <label htmlFor="catalog-search-input" className="visually-hidden">
              Search catalog by title, edition, or category
            </label>
            <input
              id="catalog-search-input"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search catalog by title, edition, or category..."
              className="w-full bg-transparent text-xs sm:text-base font-mono text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-black p-1.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-neutral-800" aria-hidden="true" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="py-3 flex flex-wrap items-center gap-1.5 border-b border-neutral-300/80" role="group" aria-label="Suggested search keywords">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 mr-1">
            POPULAR:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="text-[10px] font-mono px-2.5 py-1 min-h-[32px] bg-[#DFDDD7] hover:bg-black hover:text-white rounded transition cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Live announcer for search results */}
        <div className="visually-hidden" role="status" aria-live="polite">
          {query.trim() && `${searchResults.length} results found for "${query}"`}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto mt-4 space-y-2.5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs font-mono text-neutral-600">
              Type to search the Traitist streetwear catalog...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-10 text-center flex flex-col items-center select-none px-4">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold mb-1">
                NO RESULTS. BLAME THE ALGORITHM.
              </p>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto font-sans leading-relaxed">
                We searched the entire literature and found 0 citations matching "{query}". Check your spelling or reset the search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="mt-4 px-5 py-2.5 bg-neutral-950 hover:bg-[#FF5722] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                TRY AGAIN →
              </button>
            </div>
          ) : (
            searchResults.map((product) => {
              const price = product.priceDisplayINR;
              return (
                <div
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${product.title}`}
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
                  className="flex items-center justify-between p-3 bg-[#DFDDD7]/60 hover:bg-[#DFDDD7] rounded border border-neutral-300/80 cursor-pointer transition group focus-visible:outline-2 focus-visible:outline-black"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-14 object-contain bg-[#DFDDD7] p-1 rounded"
                      style={{ mixBlendMode: product.blendMode || 'multiply' }}
                    />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-tight text-neutral-900 group-hover:text-black">
                        {product.title}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-600">
                        {product.edition || product.category} • {product.gsm}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {product.isSecretDrop ? 'Soon' : price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-black group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
);
};

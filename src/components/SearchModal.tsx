import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { CATALOG_PRODUCTS, ROTATOR_PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
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

  if (!isOpen) return null;

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
    'Manuscript',
    'Coffee',
    'Milestone',
    'Heavyweight',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl w-full bg-[#ECEBE6] rounded-sm p-6 shadow-2xl border border-neutral-300">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
          <div className="flex items-center gap-3 flex-grow pr-4">
            <Search className="w-5 h-5 text-neutral-600 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, edition, or category..."
              className="w-full bg-transparent text-sm sm:text-base font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-black p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="py-3 flex flex-wrap items-center gap-1.5 border-b border-neutral-300/80">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mr-1">
            POPULAR:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-[10px] font-mono px-2 py-0.5 bg-[#DFDDD7] hover:bg-black hover:text-white rounded transition cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto mt-4 space-y-2.5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              Type to search the Traitist streetwear catalog...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              No pieces found matching "{query}". Try "PhD" or "Manuscript".
            </div>
          ) : (
            searchResults.map((product) => {
              const price =
                currency === 'INR' ? product.priceDisplayINR : product.priceDisplayUSD;
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-[#DFDDD7]/60 hover:bg-[#DFDDD7] rounded border border-neutral-300/80 cursor-pointer transition group"
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
                      <p className="text-[10px] font-mono text-neutral-500">
                        {product.edition || product.category} • {product.gsm}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {product.isSecretDrop ? 'Soon' : price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

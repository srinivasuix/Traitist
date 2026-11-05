import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenSizeGuide,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position for dynamic sticky elevation & backdrop blur
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Escape listener to dismiss mobile navigation
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ease-out ${
          isScrolled
            ? 'apple-glass shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-neutral-300/90'
            : 'bg-[#ECEBE6] border-b border-neutral-300/60'
        } py-2.5 sm:py-3 px-2.5 sm:px-6 md:px-8 pt-[max(0.625rem,env(safe-area-inset-top))]`}
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[48px] sm:min-h-[56px] md:min-h-[64px]">
          {/* Left Navigation Items */}
          <nav aria-label="Primary" className="flex items-center gap-4 md:gap-6 text-[12px] font-semibold tracking-wider uppercase z-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm hover:bg-neutral-200/60 transition cursor-pointer"
            >
              <Menu className="w-5 h-5 text-neutral-900" aria-hidden="true" />
            </button>
            <div className="hidden md:flex items-center space-x-6 text-neutral-800 font-mono-subtle">
              <a
                className="hover:text-black transition tracking-wider"
                href="#shop"
                onClick={() => onGoHome?.()}
              >
                SHOP
              </a>
              <a
                className="hover:text-black transition tracking-wider flex items-center gap-1.5"
                href="#hero-showcase"
                onClick={() => onGoHome?.()}
              >
                <span>COLLECTION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true"></span>
              </a>
            </div>
          </nav>

          {/* Responsive Brand Logo (Flex-centered on mobile, absolute-center on sm+) */}
          <div className="flex-1 flex items-center justify-center sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-20 pointer-events-auto min-w-0 px-1">
            <a
              className="flex items-center py-1 group max-w-full cursor-pointer"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoHome?.();
              }}
              title="TRAITIST Studios Home"
              aria-label="TRAITIST Studios Home"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="TRAITIST - Threads of Resilience"
                className="h-6 min-[360px]:h-7 min-[400px]:h-8 min-[480px]:h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[95px] min-[360px]:max-w-[120px] min-[400px]:max-w-[150px] min-[480px]:max-w-[200px] sm:max-w-[320px] md:max-w-[400px] object-contain inline-block transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-0.5 min-[380px]:gap-1 sm:gap-2 text-neutral-800 z-10 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label={`View Wishlist (${wishlistCount} items)`}
              className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <Heart className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-colors ${wishlistCount > 0 ? 'text-neutral-900' : 'text-neutral-700'}`} aria-hidden="true" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={`wishlist-badge-${wishlistCount}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.25, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    className="absolute top-1 right-1 bg-[#FF5722] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
              className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            data-lenis-prevent
            className="relative w-full max-w-[280px] min-[400px]:max-w-xs bg-[#ECEBE6] h-full shadow-2xl flex flex-col justify-between p-5 sm:p-6 z-10 border-r border-neutral-300 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
                <img
                  src={BRAND_LOGO_URL}
                  alt="TRAITIST - Threads of Resilience"
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-neutral-800" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1 font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">
                <a
                  href="#shop"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoHome?.();
                  }}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition flex items-center justify-between min-h-[44px]"
                >
                  <span>Shop Latest Pieces</span>
                  <span className="text-[10px] font-mono text-neutral-600">08 PIECES</span>
                </a>
                <a
                  href="#hero-showcase"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoHome?.();
                  }}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition flex items-center justify-between min-h-[44px]"
                >
                  <span>Collection Showcase</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-sans">
                    NEW
                  </span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSizeGuide();
                  }}
                  className="text-left py-3 px-3 rounded hover:bg-neutral-200/80 transition text-neutral-600 cursor-pointer min-h-[44px] flex items-center"
                >
                  Size & Fit Guide
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="py-3 px-3 rounded bg-black text-white hover:bg-neutral-800 transition flex items-center justify-between min-h-[44px] cursor-pointer mt-2 font-mono text-xs uppercase"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>View Shopping Bag</span>
                  </span>
                  <span className="text-[10px] bg-[#FF5722] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                    {cartCount}
                  </span>
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-300 text-[11px] font-mono text-neutral-600 space-y-2">
              <p className="font-semibold text-neutral-900">
                TRAITIST STUDIOS • TORONTO / BENGALURU
              </p>
              <p>200 GSM wearable resilience.</p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-neutral-900">
                <a href="#shop" className="hover:underline">
                  INSTAGRAM
                </a>
                <span>•</span>
                <a href="#shop" className="hover:underline">
                  TIKTOK
                </a>
                <span>•</span>
                <a href="#shop" className="hover:underline">
                  DISCORD
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

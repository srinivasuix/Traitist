import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, Globe } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onToggleCurrency,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-[#ECEBE6]/90 backdrop-blur-md border-b border-neutral-300/80 px-4 md:px-8 py-3.5 transition-all"
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Navigation Items */}
          <nav className="flex items-center gap-6 text-[12px] font-semibold tracking-wider uppercase">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
              className="p-1 hover:opacity-70 transition cursor-pointer"
            >
              <Menu className="w-5 h-5 text-neutral-900" />
            </button>
            <div className="hidden md:flex items-center space-x-6 text-neutral-800 font-mono-subtle">
              <a
                className="hover:text-black transition tracking-wider"
                href="#shop"
              >
                SHOP
              </a>
              <a
                className="hover:text-black transition tracking-wider flex items-center gap-1.5"
                href="#hero-showcase"
              >
                <span>DROP 04</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></span>
              </a>
              <a
                className="hover:text-black transition tracking-wider"
                href="#lookbook"
              >
                LOOKBOOK
              </a>
              <a
                className="hover:text-black transition tracking-wider text-neutral-500 hover:text-black"
                href="#archive"
              >
                ARCHIVE
              </a>
            </div>
          </nav>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <a
              className="flex items-center py-0.5 group"
              href="#"
              title="TRAITIST Studios"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="TRAITIST - Threads of Resilience"
                className="h-7 md:h-8 w-auto object-contain inline-block transition-transform duration-300 group-hover:scale-105"
                style={{ mixBlendMode: 'multiply' }}
              />
            </a>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-neutral-800">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-1 rounded border border-neutral-300/80 hover:border-black transition cursor-pointer"
              title="Toggle Currency"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-1.5 hover:text-black hover:scale-105 transition cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-1.5 hover:text-black hover:scale-105 transition cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF5722] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-1.5 hover:text-black hover:scale-105 transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#ECEBE6] h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-neutral-300">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-neutral-300">
                <img
                  src={BRAND_LOGO_URL}
                  alt="TRAITIST"
                  className="h-6 w-auto object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-200 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4 font-mono text-sm tracking-wider uppercase font-semibold">
                <a
                  href="#shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded hover:bg-neutral-200/80 transition"
                >
                  Shop Latest Pieces
                </a>
                <a
                  href="#hero-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded hover:bg-neutral-200/80 transition flex items-center justify-between"
                >
                  <span>Drop 04 Showcase</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-sans">
                    NEW
                  </span>
                </a>
                <a
                  href="#lookbook"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded hover:bg-neutral-200/80 transition"
                >
                  Lookbook SS26
                </a>
                <a
                  href="#archive"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded hover:bg-neutral-200/80 transition"
                >
                  Archive Vault
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSizeGuide();
                  }}
                  className="text-left py-2 px-3 rounded hover:bg-neutral-200/80 transition text-neutral-600 cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-300 text-[11px] font-mono text-neutral-600 space-y-2">
              <p className="font-semibold text-neutral-900">
                TRAITIST STUDIOS • TORONTO / BENGALURU
              </p>
              <p>Heavyweight 240–480 GSM wearable resilience.</p>
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

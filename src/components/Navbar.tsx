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
        className="sticky top-0 z-40 bg-[#ECEBE6]/95 backdrop-blur-md border-b border-neutral-300/80 px-2.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 md:py-4 transition-all"
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[48px] sm:min-h-[56px] md:min-h-[64px]">
          {/* Left Navigation Items */}
          <nav className="flex items-center gap-4 md:gap-6 text-[12px] font-semibold tracking-wider uppercase z-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-sm hover:bg-neutral-200/60 transition cursor-pointer"
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
                href="#campaign"
              >
                CAMPAIGN
              </a>
              <a
                className="hover:text-black transition tracking-wider text-neutral-500 hover:text-black"
                href="#archive"
              >
                ARCHIVE
              </a>
            </div>
          </nav>

          {/* Absolute Center Logo (Exact Mathematical Middle Alignment with Smooth Responsive Scaling) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-auto">
            <a
              className="flex items-center py-1 group"
              href="#"
              title="TRAITIST Studios"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="TRAITIST - Threads of Resilience"
                className="h-7 min-[380px]:h-8 min-[480px]:h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[120px] min-[380px]:max-w-[150px] min-[480px]:max-w-[200px] sm:max-w-[320px] md:max-w-[400px] object-contain inline-block transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-0.5 min-[380px]:gap-1 sm:gap-3 text-neutral-800 z-10 shrink-0">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-semibold px-1.5 sm:px-2.5 py-1.5 rounded border border-neutral-300/80 hover:border-black transition cursor-pointer min-h-[36px]"
              title="Toggle Currency"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <span className="hidden min-[420px]:inline">{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
              <span className="min-[420px]:hidden">{currency === 'INR' ? '₹' : '$'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-2 min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="View Wishlist"
              className="relative p-2 min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#FF5722] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center hover:text-black hover:bg-neutral-200/50 rounded-sm transition cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span className="absolute top-0.5 right-0 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
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
          <div className="relative w-full max-w-[280px] min-[400px]:max-w-xs bg-[#ECEBE6] h-full shadow-2xl flex flex-col justify-between p-5 sm:p-6 z-10 border-r border-neutral-300 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
                <img
                  src={BRAND_LOGO_URL}
                  alt="TRAITIST - Threads of Resilience"
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-neutral-200 transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-neutral-800" />
                </button>
              </div>

              {/* Mobile Drawer Currency Switcher */}
              <div className="mt-4 p-2 bg-[#DFDDD7] rounded border border-neutral-300 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Currency</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (currency !== 'INR') onToggleCurrency();
                    }}
                    className={`px-2 py-1 text-[10px] font-mono font-semibold rounded cursor-pointer transition ${
                      currency === 'INR' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    onClick={() => {
                      if (currency !== 'USD') onToggleCurrency();
                    }}
                    className={`px-2 py-1 text-[10px] font-mono font-semibold rounded cursor-pointer transition ${
                      currency === 'USD' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              <nav className="mt-6 flex flex-col space-y-1 font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold">
                <a
                  href="#shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition flex items-center justify-between min-h-[44px]"
                >
                  <span>Shop Latest Pieces</span>
                  <span className="text-[10px] font-mono text-neutral-500">08 PIECES</span>
                </a>
                <a
                  href="#hero-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition flex items-center justify-between min-h-[44px]"
                >
                  <span>Drop 04 Showcase</span>
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-sans">
                    NEW
                  </span>
                </a>
                <a
                  href="#campaign"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition min-h-[44px] flex items-center"
                >
                  Campaign SS26
                </a>
                <a
                  href="#archive"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 rounded hover:bg-neutral-200/80 transition min-h-[44px] flex items-center"
                >
                  Archive Vault
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

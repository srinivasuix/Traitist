import React, { useState } from 'react';
import { ArrowUp, Instagram, Youtube, Twitter, Check } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface FooterProps {
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  const [quickEmail, setQuickEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickEmail && quickEmail.includes('@')) {
      setSignedUp(true);
      setQuickEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t border-neutral-300 pt-16 pb-12 px-4 md:px-8 bg-[#ECEBE6]"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Studio Info & Quick Box */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-3">
              TRAITIST STUDIOS • TORONTO
            </p>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
              Heavyweight streetwear in limited drops.
              <br />
              All releases announced to the list first.
            </p>

            {signedUp ? (
              <p className="text-xs font-mono text-[#10B981] font-semibold flex items-center">
                <Check className="w-3.5 h-3.5 inline mr-1 text-[#10B981]" aria-hidden="true" />
                <span>Joined the early drop list.</span>
              </p>
            ) : (
              <form onSubmit={handleQuickSubmit} className="flex items-center w-full max-w-xs">
                <label htmlFor="footer-quick-email" className="visually-hidden">
                  Email for early drop list
                </label>
                <input
                  id="footer-quick-email"
                  className="bg-[#DFDDD7] border border-neutral-300 text-xs px-3 py-2 flex-grow min-w-0 placeholder-neutral-500 focus:outline-none focus:border-black font-mono min-h-[44px]"
                  placeholder="Email for the list"
                  type="email"
                  autoComplete="email"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white text-xs px-4 py-2 font-semibold hover:bg-neutral-800 transition cursor-pointer font-mono min-h-[44px] shrink-0"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

          {/* Shop Links */}
          <div>
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-3">
              SHOP
            </p>
            <ul className="space-y-2 text-xs text-neutral-600 font-sans">
              <li>
                <a className="hover:text-black transition" href="#shop">
                  All pieces
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#hero-showcase">
                  Showcase
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#archive">
                  Archive
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#campaign">
                  Campaign SS26
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-3">
              HELP
            </p>
            <ul className="space-y-2 text-xs text-neutral-600 font-sans">
              <li>
                <a className="hover:text-black transition" href="#campaign">
                  Shipping (Free over ₹999)
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#campaign">
                  7-Day Size Exchanges (No Returns)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-black transition text-left cursor-pointer inline-flex items-center min-h-[32px] sm:min-h-0"
                >
                  Size guide
                </button>
              </li>
              <li>
                <a className="hover:text-black transition" href="#archive">
                  FAQ & Care
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#archive">
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Social Links */}
          <div>
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-3">
              FOLLOW
            </p>
            <ul className="space-y-2 text-xs text-neutral-600 font-sans">
              <li>
                <a
                  className="hover:text-black flex items-center gap-1.5 transition"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-black flex items-center gap-1.5 transition"
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter / X</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-black flex items-center gap-1.5 transition"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Monumental Brand Display Logo */}
        <div className="w-full text-center overflow-hidden select-none border-b border-neutral-300 pb-8">
          <div className="w-full flex items-center justify-center py-4">
            <img
              src={BRAND_LOGO_URL}
              alt="TRAITIST - Threads of Resilience"
              className="max-h-16 sm:max-h-24 md:max-h-32 w-auto mx-auto object-contain block opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-neutral-600 uppercase gap-4 text-center sm:text-left">
          <p>© 2026 TRAITIST</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            <a className="hover:text-black transition" href="#archive">
              PRIVACY
            </a>
            <a className="hover:text-black transition" href="#archive">
              TERMS
            </a>
            <a className="hover:text-black transition" href="#archive">
              REFUNDS
            </a>
            <a className="hover:text-black transition" href="#archive">
              SHIPPING
            </a>
            <a className="hover:text-black transition" href="#archive">
              CONTACT INFO
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="hover:text-black transition p-2 hover:bg-neutral-300 rounded cursor-pointer min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

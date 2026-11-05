import React from 'react';
import { ArrowUp, Instagram, Youtube, Twitter } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenNotFound?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onOpenNotFound }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t border-neutral-300/80 pt-12 pb-10 px-4 md:px-8 bg-[#ECEBE6]"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Studio Info */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-2.5">
              TRAITIST STUDIOS
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-xs">
              Academic survival streetwear cut from 200 GSM heavyweight combed cotton. Limited drops engineered for researchers, scholars, and late-night writers.
            </p>
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mt-3">
              EST. 2026 // THREADS OF RESILIENCE
            </p>
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
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-xs font-mono font-semibold text-neutral-900 uppercase mb-3">
              HELP
            </p>
            <ul className="space-y-2 text-xs text-neutral-600 font-sans">
              <li>
                <a className="hover:text-black transition" href="#shop">
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
                <a className="hover:text-black transition" href="#faq">
                  FAQ & Care
                </a>
              </li>
              <li>
                <a className="hover:text-black transition" href="#newsletter">
                  Contact Studio
                </a>
              </li>
              <li>
                <a
                  href="#/404"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenNotFound) {
                      onOpenNotFound();
                    } else {
                      window.location.hash = '#/404';
                    }
                  }}
                  className="hover:text-black transition cursor-pointer"
                >
                  404 Page
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
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-black flex items-center gap-1.5 transition"
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
              alt="TRAITIST™ - Threads of Resilience"
              className="max-h-16 sm:max-h-24 md:max-h-32 w-auto mx-auto object-contain block opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-neutral-600 uppercase gap-4 text-center sm:text-left">
          <p>© 2026 TRAITIST™</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            <a className="hover:text-black transition" href="#terms">
              PRIVACY
            </a>
            <a className="hover:text-black transition" href="#terms">
              TERMS
            </a>
            <a className="hover:text-black transition" href="#terms">
              REFUNDS
            </a>
            <a className="hover:text-black transition" href="#terms">
              SHIPPING
            </a>
            <a className="hover:text-black transition" href="#newsletter">
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

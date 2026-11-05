import React from 'react';
import { ArrowDown } from 'lucide-react';
import { FIRST_DROP_LAUNCH_PRICE, FIRST_DROP_REGULAR_PRICE } from '../data/products';

interface FirstDropBannerProps {
  onExplore?: () => void;
}

export const FirstDropBanner: React.FC<FirstDropBannerProps> = ({ onExplore }) => {
  const handleScroll = () => {
    if (onExplore) {
      onExplore();
    } else {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4"
      aria-label="The First Drop Launch Offer"
    >
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden min-h-[340px] sm:min-h-[380px] md:min-h-[400px] flex items-center bg-neutral-950">
        {/* Editorial Background Image with Models */}
        <img
          src="/images/first_drop_editorial_banner.png"
          alt="TRAITIST PhD Research Streetwear Collection"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-right-top select-none pointer-events-none"
        />

        {/* Cinematic Linear & Radial Gradients to ensure pristine text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/75 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-black/30 md:bg-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 max-w-xl md:max-w-2xl flex flex-col justify-between h-full">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
                THE FIRST DROP.
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black font-display tracking-tight text-white leading-tight">
              Your Research. <br className="hidden sm:inline" />Your Identity.
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-lg">
              Celebrate the PhD journey with our first collection of academic-inspired streetwear.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                SPECIAL LAUNCH OFFER
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5">
                INTRODUCTORY PRICE <span className="text-[#FF5722] font-extrabold">₹{FIRST_DROP_LAUNCH_PRICE}</span>{' '}
                <span className="text-neutral-400 line-through font-normal text-xs">
                  (Regular ₹{FIRST_DROP_REGULAR_PRICE})
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleScroll}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg group"
            >
              <span>EXPLORE THE FIRST DROP</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-900 transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


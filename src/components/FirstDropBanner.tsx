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
      <div className="relative rounded-sm overflow-hidden border border-neutral-800 bg-[#0e0e0e] shadow-xl group min-h-[320px] sm:min-h-[360px] md:min-h-[380px] flex flex-col justify-end md:justify-center">
        {/* Background Editorial Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/first_drop_research_identity.jpg"
            alt="PhD Researchers wearing TRAITIST Threads of Resilience collection"
            className="w-full h-full object-cover object-right sm:object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Multi-layered cinematic gradient for text readability across devices */}
          {/* Desktop: Strong dark gradient from left to right */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/85 via-45% to-transparent pointer-events-none" />
          {/* Mobile/Tablet: Dark gradient from bottom to top */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/30 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12 max-w-xl flex flex-col justify-between h-full space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
                THE FIRST DROP • EDITION 01
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-[1.08]">
              Your Research.<br className="hidden sm:inline" /> Your Identity.
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-md pt-1">
              Celebrate the PhD journey with our debut collection of heavy 200 GSM academic streetwear. Built for the sprint, the lab, and late-night defense prep.
            </p>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-t border-neutral-800/80">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                SPECIAL LAUNCH OFFER
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5">
                INTRODUCTORY PRICE <span className="text-[#FF5722]">₹{FIRST_DROP_LAUNCH_PRICE}</span>{' '}
                <span className="text-neutral-500 line-through font-normal text-xs">
                  (Regular ₹{FIRST_DROP_REGULAR_PRICE})
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleScroll}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-white hover:bg-neutral-200 active:scale-95 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer shadow-md group/btn"
            >
              <span>EXPLORE THE DROP</span>
              <ArrowDown className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover/btn:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


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
      <div className="relative bg-[#DFDDD7]/70 border border-neutral-300 rounded-sm p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs overflow-hidden">
        {/* Subtle orange accent indicator in the corner */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#FF5722]/5 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
              THE FIRST DROP.
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-neutral-950">
            Your Research. Your Identity.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Celebrate the PhD journey with our first collection of academic-inspired streetwear.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4 sm:gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
              SPECIAL LAUNCH OFFER
            </span>
            <p className="text-xs sm:text-sm font-mono font-bold text-neutral-950 mt-0.5">
              INTRODUCTORY PRICE <span className="text-[#FF5722]">₹{FIRST_DROP_LAUNCH_PRICE}</span>{' '}
              <span className="text-neutral-400 line-through font-normal text-xs">
                (Regular ₹{FIRST_DROP_REGULAR_PRICE})
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleScroll}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-neutral-950 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-sm group"
          >
            <span>EXPLORE THE FIRST DROP</span>
            <ArrowDown className="w-3.5 h-3.5 text-white/70 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};


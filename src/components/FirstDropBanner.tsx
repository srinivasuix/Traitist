import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
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
      className="relative max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2"
      aria-label="Promotional Showcase - The First Drop"
    >
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden bg-neutral-950 flex flex-col md:flex-row md:items-center min-h-[300px] md:min-h-[340px] lg:min-h-[360px]">
        {/* Dedicated Photography Showcase Container */}
        {/* On Mobile: Unobstructed top visual showcase. On Desktop: Absolute background pinned to the right */}
        <div className="relative w-full h-52 min-[380px]:h-60 sm:h-72 md:absolute md:inset-0 md:h-full overflow-hidden shrink-0">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Campus Editorial Showcase"
            className="w-full h-full object-cover object-[76%_center] md:object-right select-none pointer-events-none"
          />

          {/* Desktop Left-to-Right Fade: Solid black behind left typography, tapering off completely before the models */}
          <div
            className="hidden md:block absolute inset-0 bg-gradient-to-r from-black from-28% via-black/80 via-44% to-transparent to-56% pointer-events-none"
            aria-hidden="true"
          />

          {/* Mobile Bottom Vignette: Soft gradient ensuring smooth transition to the dark editorial panel without covering faces or shirts */}
          <div
            className="md:hidden absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Content Layer (Clear Visual Hierarchy & Conversion Focus) */}
        <div className="relative z-10 p-5 sm:p-7 md:p-8 lg:p-10 max-w-lg md:max-w-xl flex flex-col justify-center space-y-3 sm:space-y-4">
          {/* 1. Headline */}
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[40px] font-black font-display tracking-tight uppercase leading-[0.96]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* 2. Short Supporting Description */}
          <p className="text-xs sm:text-[13px] font-mono text-neutral-300 leading-relaxed max-w-sm sm:max-w-md">
            Academic-inspired streetwear for thinkers, researchers and changemakers.
          </p>

          {/* 3 & 4. Exclusive Launch Price & ₹799 */}
          <div className="space-y-0.5 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
              EXCLUSIVE LAUNCH PRICE
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#FF5722] tracking-tight">
                ₹{FIRST_DROP_LAUNCH_PRICE}
              </span>
              {FIRST_DROP_REGULAR_PRICE && (
                <span className="text-sm sm:text-base font-mono text-neutral-400 line-through">
                  ₹{FIRST_DROP_REGULAR_PRICE}
                </span>
              )}
            </div>
          </div>

          {/* 5 & 6. Explore the Drop CTA & Secondary Launch Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 pt-2">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-md group shrink-0"
            >
              <span>EXPLORE THE DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <div className="flex items-center gap-2 sm:pl-4 sm:border-l sm:border-neutral-800 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                LAUNCHING 15 NOVEMBER ONWARDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

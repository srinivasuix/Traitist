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
      className="relative max-w-7xl mx-auto px-4 md:px-8 pt-5 sm:pt-6 pb-2"
      aria-label="Promotional Showcase - The First Drop"
    >
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden bg-neutral-950 flex flex-col md:flex-row md:items-center min-h-[300px] md:min-h-[340px] lg:min-h-[360px]">
        {/* ========================================================
            DESKTOP PHOTOGRAPHY SHOWCASE (Pinned right with edge fade)
            ======================================================== */}
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Campus Editorial"
            className="w-full h-full object-cover object-right"
          />
          {/* Left-to-right fade: 100% black behind text on left, tapering off by 56%, right side 100% natural daylight */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black from-28% via-black/80 via-44% to-transparent to-56%"
            aria-hidden="true"
          />
        </div>

        {/* ========================================================
            MOBILE & DESKTOP CONTENT BLOCK
            On Mobile: Ordered 1 -> 5 above the photo.
            On Desktop: Absolute left-anchored editorial column.
            ======================================================== */}
        <div className="relative z-10 p-4 min-[360px]:p-5 sm:p-7 md:p-8 lg:p-10 max-w-lg md:max-w-xl flex flex-col justify-center space-y-3 sm:space-y-4">
          {/* 1. Small launch label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
              THE FIRST DROP
            </span>
          </div>

          {/* 2. Main headline */}
          <h2 className="text-[23px] min-[360px]:text-[26px] min-[400px]:text-3xl md:text-4xl lg:text-[40px] font-black font-display tracking-tight uppercase leading-[0.98]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* 3. Short description */}
          <p className="text-[11.5px] min-[360px]:text-xs sm:text-[13px] font-mono text-neutral-300 leading-relaxed max-w-sm sm:max-w-md">
            Academic-inspired streetwear for thinkers, researchers and changemakers.
          </p>

          {/* 4. Price label and launch price */}
          <div className="space-y-0.5 pt-0.5">
            <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
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

          {/* 5. CTA Button & Supporting Information */}
          <div className="pt-1.5 flex flex-col md:flex-row md:items-center gap-2.5 md:gap-5">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md group shrink-0"
            >
              <span>EXPLORE THE DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Launch Date Supporting Information */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 md:pl-4 md:border-l md:border-neutral-800 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0 hidden md:inline-block" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400 text-center md:text-left">
                Launching 15 November onwards.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            6. MOBILE STUDENT LIFESTYLE PHOTOGRAPH
            Dedicated mobile showcase below CTA:
            - Zero text overlapping faces or products.
            - Zero dark overlay over models.
            - Natural daylight, authentic skin tones, clear T-shirt graphics.
            ======================================================== */}
        <div className="md:hidden relative w-full aspect-[16/9] min-[400px]:aspect-[16/8.5] overflow-hidden border-t border-neutral-900 bg-neutral-950">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Four students wearing graphic tees on campus steps"
            className="w-full h-full object-cover object-[78%_center] select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

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
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden bg-neutral-950 flex flex-col md:flex-row md:items-center min-h-[300px] md:min-h-[320px] lg:min-h-[340px] xl:min-h-[360px]">
        {/* ========================================================
            1. DESKTOP & TABLET PHOTOGRAPHY SHOWCASE (Pinned Right)
            - Tablet (768px-1023px): Positioned object-[82%_center] to ensure all 4 models remain visible without text overlapping.
            - Desktop (1024px+): Natural panoramic right-anchored composition.
            - Fade: Pure black behind text on left, tapering off by ~54%, leaving the models in 100% natural daylight.
            ======================================================== */}
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Campus Editorial"
            className="w-full h-full object-cover object-[82%_center] lg:object-right"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/85 via-42% to-transparent to-55%"
            aria-hidden="true"
          />
        </div>

        {/* ========================================================
            2. CONTENT BLOCK (Fluid Responsive Hierarchy)
            - Mobile (320px-767px): Vertical stack (Label -> Headline -> Desc -> Price -> CTA).
            - Tablet (768px-1023px): Compact left column (max-w-[340px]) to balance alongside models.
            - Desktop (1024px+): Expansive left editorial showcase.
            ======================================================== */}
        <div className="relative z-10 p-4 min-[360px]:p-5 sm:p-6 md:p-6 lg:p-8 xl:p-10 max-w-lg md:max-w-[340px] lg:max-w-[420px] xl:max-w-xl flex flex-col justify-center space-y-2.5 sm:space-y-3 md:space-y-3 lg:space-y-4">
          {/* Small launch label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[10.5px] md:text-[10px] lg:text-[11px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
              THE FIRST DROP
            </span>
          </div>

          {/* Main headline: Proportional fluid scaling across Mobile / Tablet / Desktop */}
          <h2 className="text-[22px] min-[360px]:text-[25px] min-[400px]:text-[28px] sm:text-3xl md:text-2xl lg:text-3xl xl:text-[40px] font-black font-display tracking-tight uppercase leading-[0.98]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* Short description */}
          <p className="text-[11.5px] min-[360px]:text-xs md:text-[11px] lg:text-xs xl:text-[13px] font-mono text-neutral-300 leading-relaxed max-w-sm md:max-w-[280px] lg:max-w-sm">
            Academic-inspired streetwear for thinkers, researchers and changemakers.
          </p>

          {/* Price label & ₹799 launch price */}
          <div className="space-y-0.5 pt-0.5">
            <span className="text-[9px] min-[360px]:text-[9.5px] md:text-[9.5px] lg:text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
              EXCLUSIVE LAUNCH PRICE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl min-[360px]:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black font-mono text-[#FF5722] tracking-tight">
                ₹{FIRST_DROP_LAUNCH_PRICE}
              </span>
              {FIRST_DROP_REGULAR_PRICE && (
                <span className="text-xs sm:text-sm md:text-xs lg:text-sm font-mono text-neutral-400 line-through">
                  ₹{FIRST_DROP_REGULAR_PRICE}
                </span>
              )}
            </div>
          </div>

          {/* CTA Button & Secondary Launch Date */}
          <div className="pt-1.5 flex flex-col md:flex-col lg:flex-row md:items-start lg:items-center gap-2 md:gap-2.5 lg:gap-4">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 lg:py-3 min-h-[44px] bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md group shrink-0"
            >
              <span>EXPLORE THE DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Launch Date Supporting Information */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 lg:pl-3 lg:border-l lg:border-neutral-800 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0 hidden lg:inline-block" aria-hidden="true" />
              <span className="text-[10px] lg:text-[11px] font-mono uppercase tracking-wider text-neutral-400 text-center md:text-left">
                Launching 15 November onwards.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. MOBILE PHOTOGRAPHY SHOWCASE (< 768px)
            Dedicated stage below the CTA on mobile devices:
            - Zero text overlapping faces or graphic tees.
            - Zero dark overlay or haze.
            - Natural daylight, authentic skin tones, clear T-shirt graphics.
            - Preserves four students across all mobile widths (320px - 767px).
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

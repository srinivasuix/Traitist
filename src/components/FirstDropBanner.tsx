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
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden bg-neutral-950 flex flex-col md:flex-row md:items-center min-h-[280px] md:min-h-[280px] lg:min-h-[300px] xl:min-h-[310px]">
        {/* ========================================================
            1. DESKTOP & TABLET PHOTOGRAPHY SHOWCASE (Pinned Right)
            - Tablet (768px-1023px): Positioned object-[82%_center] to ensure all 4 models remain visible without text overlapping.
            - Desktop (1024px+): Natural panoramic right-anchored composition matching approved editorial design.
            - Fade: Pure black behind text on left, tapering off by ~50%, leaving all four models in natural daylight.
            ======================================================== */}
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Campus Editorial"
            className="w-full h-full object-cover object-[82%_center] lg:object-right"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black from-32% via-black/85 via-42% to-transparent to-52%"
            aria-hidden="true"
          />
        </div>

        {/* ========================================================
            2. CONTENT BLOCK (Fluid Responsive Hierarchy)
            ======================================================== */}
        <div className="relative z-10 p-4 min-[360px]:p-5 sm:p-5 md:p-6 lg:p-7 xl:p-8 max-w-lg md:max-w-[340px] lg:max-w-[400px] xl:max-w-[430px] flex flex-col justify-center space-y-2 sm:space-y-2.5 md:space-y-2.5 lg:space-y-3">
          {/* Small launch label with square tag */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
            <span className="text-[9.5px] min-[360px]:text-[10px] md:text-[9.5px] lg:text-[10px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
              THE FIRST DROP • LIMITED EDITION
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-[20px] min-[360px]:text-[22px] min-[400px]:text-[24px] sm:text-2xl md:text-xl lg:text-2xl xl:text-[26px] font-black font-display tracking-tight uppercase leading-[1.02]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* Short description */}
          <p className="text-[11px] min-[360px]:text-[11.5px] md:text-[11px] lg:text-xs xl:text-[12px] font-mono text-neutral-300 leading-relaxed max-w-sm md:max-w-[280px] lg:max-w-[320px]">
            Academic-inspired streetwear for thinkers, researchers and changemakers.
          </p>

          {/* Compelling Exclusive Launch Offer */}
          <div className="space-y-0.5 pt-0.5">
            <span className="text-[8.5px] min-[360px]:text-[9px] md:text-[8.5px] lg:text-[9px] font-mono uppercase tracking-widest text-[#FF5722] block font-bold">
              EXCLUSIVE LAUNCH OFFER • SAVE ₹100 ON DROP 01
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl min-[360px]:text-[26px] sm:text-3xl md:text-2xl lg:text-[28px] font-black font-mono text-white tracking-tight">
                ₹{FIRST_DROP_LAUNCH_PRICE}
              </span>
              {FIRST_DROP_REGULAR_PRICE && (
                <span className="text-xs sm:text-sm md:text-xs lg:text-sm font-mono text-neutral-400 line-through">
                  ₹{FIRST_DROP_REGULAR_PRICE}
                </span>
              )}
              <span className="text-[9px] font-mono uppercase text-neutral-400 hidden min-[380px]:inline">
                • 150 PCS / DESIGN
              </span>
            </div>
          </div>

          {/* Conversion-Focused Shopping CTA & Launch Date */}
          <div className="pt-1 flex flex-col md:flex-col lg:flex-row md:items-start lg:items-center gap-2 md:gap-2 lg:gap-3">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 md:py-2 lg:py-2.5 min-h-[40px] md:min-h-[38px] lg:min-h-[42px] bg-white hover:bg-neutral-100 active:scale-[0.98] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer shadow-md group shrink-0"
            >
              <span>SHOP THE FIRST DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Launch Date Supporting Information */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 lg:pl-3 lg:border-l lg:border-neutral-800 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0 hidden lg:inline-block" aria-hidden="true" />
              <span className="text-[9.5px] lg:text-[10px] font-mono uppercase tracking-wider text-neutral-400 text-center md:text-left">
                Launching 15 November onwards.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. MOBILE PHOTOGRAPHY SHOWCASE (< 768px)
            High-prominence photography stage on mobile:
            - Generous aspect ratio (aspect-[4/3] / min-h-[250px]) giving the models and T-shirt designs dominant visual prominence.
            - Centered on the 4 student models wearing actual graphics.
            - Natural daylight, authentic skin tones, crisp graphic readability.
            ======================================================== */}
        <div className="md:hidden relative w-full aspect-[4/3] min-[400px]:aspect-[16/11] min-h-[250px] overflow-hidden border-t border-neutral-900 bg-neutral-950">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Four students wearing graphic tees on campus steps"
            className="w-full h-full object-cover object-[80%_center] select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

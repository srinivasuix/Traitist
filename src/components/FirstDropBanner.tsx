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
            - Balanced headline scale so it doesn't overpower the product.
            - Compelling, specific academic streetwear description.
            - Compelling exclusive launch offer messaging.
            - Direct shopping-focused CTA ("SHOP THE FIRST DROP").
            - Compact vertical footprint on mobile.
            ======================================================== */}
        <div className="relative z-10 p-3.5 min-[360px]:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-9 max-w-lg md:max-w-[340px] lg:max-w-[420px] xl:max-w-xl flex flex-col justify-center space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3.5">
          {/* Small launch label */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-[9.5px] min-[360px]:text-[10px] md:text-[10px] lg:text-[10.5px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
              THE FIRST DROP • LIMITED EDITION
            </span>
          </div>

          {/* Main headline: Refined restrained scale so the product remains hero */}
          <h2 className="text-[18px] min-[360px]:text-[20px] min-[400px]:text-[22px] sm:text-2xl md:text-xl lg:text-2xl xl:text-[28px] font-black font-display tracking-tight uppercase leading-[1.02]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* Short description */}
          <p className="text-[11px] min-[360px]:text-[11.5px] md:text-[11px] lg:text-xs xl:text-[12.5px] font-mono text-neutral-300 leading-relaxed max-w-sm md:max-w-[290px] lg:max-w-sm">
            Academic-inspired streetwear for thinkers, researchers and changemakers.
          </p>

          {/* Compelling Exclusive Launch Offer */}
          <div className="space-y-0.5 pt-0.5">
            <span className="text-[8.5px] min-[360px]:text-[9px] md:text-[9px] lg:text-[9.5px] font-mono uppercase tracking-widest text-[#FF5722] block font-bold">
              EXCLUSIVE LAUNCH OFFER • SAVE ₹100 ON DROP 01
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl min-[360px]:text-[26px] sm:text-3xl md:text-2xl lg:text-3xl font-black font-mono text-white tracking-tight">
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
          <div className="pt-1 flex flex-col md:flex-col lg:flex-row md:items-start lg:items-center gap-2 md:gap-2 lg:gap-3.5">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 md:py-2.5 lg:py-2.5 min-h-[44px] bg-white hover:bg-neutral-100 active:scale-[0.98] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer shadow-md group shrink-0"
            >
              <span>SHOP THE FIRST DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Launch Date Supporting Information */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 lg:pl-3 lg:border-l lg:border-neutral-800 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0 hidden lg:inline-block" aria-hidden="true" />
              <span className="text-[9.5px] lg:text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 text-center md:text-left">
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

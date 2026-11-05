import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

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
      aria-label="The First Drop Limited Launch Offer"
    >
      <div className="relative rounded-sm border border-neutral-800 shadow-2xl overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] flex items-center bg-black">
        {/* Editorial Background Image with Models */}
        <img
          src="/images/first_drop_editorial_banner.png"
          alt="TRAITIST PhD Research Streetwear - Campus Editorial"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-right-top select-none pointer-events-none"
        />

        {/* Cinematic Linear Gradients to match the high-contrast mockup */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-black/40 sm:bg-black/20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Foreground Content Block */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-16 max-w-xl md:max-w-2xl flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Tag: THE FIRST DROP • LIMITED LAUNCH OFFER */}
          <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
            <span className="text-white">THE FIRST DROP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-neutral-300">LIMITED LAUNCH OFFER</span>
          </div>

          {/* Monumental Headline: YOUR RESEARCH. YOUR IDENTITY. */}
          <h2 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black font-display tracking-tight uppercase leading-[0.95]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-mono text-neutral-300 leading-relaxed max-w-lg">
            Academic-inspired streetwear for<br className="hidden sm:inline" /> PhD thinkers and changemakers.
          </p>

          {/* Price & Offer Block */}
          <div className="space-y-2 pt-1 sm:pt-2">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 block font-bold">
              EXCLUSIVE LAUNCH PRICE
            </span>
            <div className="flex items-baseline sm:items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-4xl min-[400px]:text-5xl sm:text-6xl font-black font-mono text-[#FF5722] tracking-tight">
                ₹799
              </span>
              <span className="text-xl sm:text-2xl font-mono text-neutral-400 line-through">
                ₹899
              </span>
              <span className="bg-[#FF5722] text-white font-mono font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-sm tracking-wider uppercase shadow-md self-center">
                SAVE ₹100
              </span>
            </div>
          </div>

          {/* Bottom Action Row: Button & Launch Date Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={handleScroll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-100 text-black text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg group"
            >
              <span>EXPLORE THE FIRST DROP</span>
              <ArrowRight className="w-4 h-4 text-black transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-3 sm:pl-5 sm:border-l sm:border-neutral-700/80 text-neutral-300">
              <Calendar className="w-5 h-5 text-white shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-200 font-bold">
                LAUNCHING 15 NOVEMBER ONWARDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

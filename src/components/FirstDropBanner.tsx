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
      className="relative max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2"
      aria-label="The First Drop Limited Launch Offer"
    >
      <div className="relative rounded-sm border border-neutral-800 shadow-xl overflow-hidden min-h-[260px] sm:min-h-[290px] md:min-h-[320px] flex items-center bg-black">
        {/* Editorial Background Image with Models */}
        <img
          src="/images/first_drop_editorial_banner.png"
          alt="TRAITIST PhD Research Streetwear - Campus Editorial"
          className="absolute inset-0 w-full h-full object-cover object-right select-none pointer-events-none"
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

        {/* Foreground Content Block (Compact & Balanced) */}
        <div className="relative z-10 p-5 sm:p-7 md:p-8 lg:p-10 max-w-lg md:max-w-xl flex flex-col justify-center space-y-3.5 sm:space-y-4">
          {/* Tag: THE FIRST DROP • LIMITED LAUNCH OFFER */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
            <span className="text-white">THE FIRST DROP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" aria-hidden="true" />
            <span className="text-neutral-300">LIMITED LAUNCH OFFER</span>
          </div>

          {/* Headline: YOUR RESEARCH. YOUR IDENTITY. */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black font-display tracking-tight uppercase leading-[0.98]">
            <span className="block text-white">YOUR RESEARCH.</span>
            <span className="block text-[#FF5722]">YOUR IDENTITY.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-xs font-mono text-neutral-300 leading-relaxed max-w-sm">
            Academic-inspired streetwear for<br className="hidden sm:inline" /> PhD thinkers and changemakers.
          </p>

          {/* Price & Offer Block */}
          <div className="space-y-1 pt-0.5">
            <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
              EXCLUSIVE LAUNCH PRICE
            </span>
            <div className="flex items-baseline sm:items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#FF5722] tracking-tight">
                ₹799
              </span>
              <span className="text-base sm:text-lg font-mono text-neutral-400 line-through">
                ₹899
              </span>
              <span className="bg-[#FF5722] text-white font-mono font-bold text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded-xs tracking-wider uppercase shadow-xs self-center">
                SAVE ₹100
              </span>
            </div>
          </div>

          {/* Bottom Action Row: Button & Launch Date Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-1.5">
            <button
              type="button"
              onClick={handleScroll}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 bg-white hover:bg-neutral-100 text-black text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md group"
            >
              <span>EXPLORE THE FIRST DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <div className="flex items-center gap-2 sm:pl-4 sm:border-l sm:border-neutral-700/80 text-neutral-300">
              <Calendar className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-200 font-bold">
                LAUNCHING 15 NOVEMBER ONWARDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

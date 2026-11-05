import React from 'react';
import { ArrowRight, Feather, Sparkles, Shirt } from 'lucide-react';

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
      aria-label="Promotional Showcase - The First Drop PhD Collection"
    >
      {/* Clickable banner with smooth scroll to shop */}
      <div
        onClick={handleScroll}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScroll();
          }
        }}
        className="relative rounded-sm border border-neutral-800/80 overflow-hidden bg-[#16110E] group cursor-pointer shadow-xl transition-all duration-300 hover:border-neutral-700"
      >
        {/* Desktop & Tablet Display: Full Panoramic Editorial Banner */}
        <div className="hidden sm:block relative w-full overflow-hidden">
          <img
            src="/images/first_drop_phd_collection_banner.jpg"
            alt="The First Drop — PhD Collection: Graphic Tees for the Research Journey. Launch Offer: Flat ₹100 Off"
            className="w-full h-auto object-cover select-none group-hover:scale-[1.01] transition-transform duration-500 ease-out"
            loading="eager"
          />
          {/* Subtle interactive hover highlight */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Mobile Display: Vertical Stacked Editorial Card with Large Legible Typography */}
        <div className="sm:hidden flex flex-col bg-[#1A130F]">
          {/* Top: Product Photography */}
          <div className="relative w-full h-52 overflow-hidden">
            <img
              src="/images/phd_collection_editorial.jpg"
              alt="PhD Collection — Folded Graphic Tee on Academic Desk"
              className="w-full h-full object-cover object-center select-none"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A130F] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom: Crisp, High-Contrast Typography & Tap Target */}
          <div className="p-5 flex flex-col items-start space-y-3 -mt-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-5 h-px bg-amber-600/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">
                THE FIRST DROP
              </span>
              <span className="w-5 h-px bg-amber-600/60" />
            </div>

            <h2 className="text-3xl font-editorial font-medium text-[#F7F4EE] tracking-tight leading-none">
              PhD Collection
            </h2>

            <p className="text-xs text-neutral-300 font-sans">
              Graphic Tees for the Research Journey
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                <span>Premium Cotton</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                <Feather className="w-3 h-3 text-[#FF5722]" />
                <span>All-day Comfort</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                <Sparkles className="w-3 h-3 text-[#FF5722]" />
                <span>Durable Prints</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                <Shirt className="w-3 h-3 text-[#FF5722]" />
                <span>Unisex Fit</span>
              </div>
            </div>

            {/* Split Offer Pill Button */}
            <div className="pt-2 w-full">
              <div className="w-full inline-flex items-center justify-between rounded-full overflow-hidden border border-[#FF5722]/60 bg-black/80 shadow-md">
                <span className="bg-[#FF5722] text-white font-mono font-bold text-xs uppercase tracking-wider px-4 py-2.5 flex items-center gap-1">
                  LAUNCH OFFER
                </span>
                <span className="text-white font-mono font-bold text-xs uppercase tracking-wider px-4 py-2.5 flex items-center gap-1.5">
                  FLAT ₹100 OFF <ArrowRight className="w-3 h-3 text-[#FF5722]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

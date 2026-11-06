import React from 'react';
import { Feather, Sparkles, Shirt } from 'lucide-react';

interface FirstDropBannerProps {
  onExplore?: () => void;
}

// Custom Cotton Boll SVG matching technical editorial style
const CottonIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5 text-[#FF5722]' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2a5 5 0 0 0-4.9 4A4.5 4.5 0 0 0 3 10.5 4.5 4.5 0 0 0 7.5 15h9a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.1-4.5A5 5 0 0 0 12 2z" />
    <path d="M12 15v6" />
    <path d="M9 19c1.5 1 4.5 1 6 0" />
  </svg>
);

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
      id="launch-offer"
      data-purpose="website-launch-offer"
      aria-label="Traitist Website Launch Offer"
      className="max-w-7xl mx-auto px-4 md:px-8 py-5 sm:py-7"
    >
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
        className="relative rounded-sm bg-[#121110] border border-neutral-800/90 overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:border-neutral-700/90"
      >
        {/* Subtle Background Dotted Texture (aligned with Bespoke Atelier design system) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        />

        {/* Ambient Warm Orange Gradient Accent */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF5722]/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 md:p-12 items-center">
          {/* LEFT SIDE — Offer Information */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[#FF5722] font-bold">
                TRAITIST WEBSITE LAUNCH OFFER
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F7F4EE] leading-[1.08]">
              Website Launch Offer.
            </h2>

            {/* Supporting Text */}
            <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-base text-neutral-300 font-sans leading-relaxed max-w-xl">
              We&apos;re live! Get your favourite graphic tees for the research journey at a special launch price.
            </p>

            {/* Four Compact Feature Labels */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-xl">
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <CottonIcon className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium truncate">
                  Premium Cotton
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Feather className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium truncate">
                  All-day Comfort
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium truncate">
                  Vibrant &amp; Durable Prints
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Shirt className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium truncate">
                  Unisex Fit
                </span>
              </div>
            </div>

            {/* Offer Presentation & Pricing */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 w-full">
              {/* Split Offer Badge / Button */}
              <div className="inline-flex items-center rounded-sm overflow-hidden border border-[#FF5722] bg-black shadow-md group-hover:shadow-lg group-hover:shadow-[#FF5722]/10 transition-all duration-200">
                <span className="bg-[#FF5722] text-black font-mono font-extrabold text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-4 py-2.5 sm:py-3">
                  LAUNCH OFFER
                </span>
                <span className="bg-neutral-950 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-4 py-2.5 sm:py-3 border-l border-[#FF5722]/30">
                  FLAT ₹100 OFF
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block h-9 w-px bg-neutral-800" aria-hidden="true" />

              {/* Prominent Price presentation */}
              <div className="flex flex-col items-start">
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-neutral-400 font-semibold">
                  NOW AT
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FF5722] tracking-tight">
                    ₹799
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-500 line-through">
                    ₹899
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Product Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] rounded-sm bg-neutral-950/90 border border-neutral-800/90 p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden shadow-inner group/card mx-auto lg:ml-auto">
              {/* Top Editorial Header */}
              <div className="w-full flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono tracking-widest uppercase border-b border-neutral-800/80 pb-2">
                <span className="text-neutral-400 font-medium">TEE // RESEARCH SERIES</span>
                <span className="text-[#FF5722] font-bold">PH.D COLLECTION</span>
              </div>

              {/* Product Image Frame with Viewfinder Corner Brackets */}
              <div className="relative w-full aspect-[4/3.2] my-2.5 rounded-xs overflow-hidden bg-black/60 flex items-center justify-center">
                {/* 4 Viewfinder Corner Brackets in Restrained Brand Orange */}
                <div aria-hidden="true" className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FF5722] pointer-events-none z-10" />
                <div aria-hidden="true" className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FF5722] pointer-events-none z-10" />
                <div aria-hidden="true" className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF5722] pointer-events-none z-10" />
                <div aria-hidden="true" className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF5722] pointer-events-none z-10" />

                {/* Actual PhD Collection T-Shirt with original comic-style graphic */}
                <img
                  src="/images/phd_thesis_banner_tee.jpg"
                  srcSet="/images/phd_thesis_banner_tee.jpg 1x, /images/phd_thesis_banner_tee@2x.jpg 2x"
                  alt="PhD Collection — My Thesis Is Being Written In Blood, Tears, Sweat and Coffee original comic-style graphic T-shirt"
                  className="w-full h-full object-cover object-center select-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>

              {/* Footer Editorial Labels */}
              <div className="w-full flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-neutral-400 tracking-widest uppercase border-t border-neutral-800/80 pt-2">
                <span>200 GSM COTTON</span>
                <span>ORIGINAL GRAPHIC TEE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

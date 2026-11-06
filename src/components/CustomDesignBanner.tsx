import React from 'react';
import { ArrowRight, Sparkles, Shirt, Compass } from 'lucide-react';

interface CustomDesignBannerProps {
  onOpenCustomDesign: () => void;
}

export const CustomDesignBanner: React.FC<CustomDesignBannerProps> = ({
  onOpenCustomDesign,
}) => {
  return (
    <section
      id="custom-design"
      data-purpose="custom-design-showcase"
      aria-label="Custom Design Studio"
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-14"
    >
      <div className="relative rounded-sm bg-[#121110] border border-neutral-800/90 overflow-hidden shadow-2xl">
        {/* Subtle Background Dotted Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        />

        {/* Ambient Warm Gradient Accent */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF5722]/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 md:p-12 items-center">
          {/* Left Column: Editorial Copy, Specs & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Kicker */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-2.5 py-1 rounded-sm bg-neutral-900/90 border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[#FF5722] font-bold">
                TRAITIST BESPOKE ATELIER // 1-OF-1 EDITION
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F7F4EE] leading-[1.08]">
              Your Story. Your Tee.
            </h2>

            {/* Supporting Copy */}
            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-sans leading-relaxed max-w-xl">
              A story worth wearing deserves its own design. Tell us your story, and our design team will turn your idea into an original graphic for a black TRAITIST T-shirt.
            </p>

            {/* Specification Labels */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl">
              <div className="flex items-center gap-2 p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Shirt className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium">
                  200 GSM Heavyweight Tee
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Compass className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium">
                  Centre-Front Print
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium">
                  Original Custom Artwork
                </span>
              </div>
            </div>

            {/* Primary CTA Button — Signature Checkout Orange with Black Text */}
            <button
              type="button"
              onClick={onOpenCustomDesign}
              className="mt-7 sm:mt-8 group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 bg-[#FF5722] hover:bg-[#e64a19] text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] min-h-[48px]"
            >
              <span>CREATE YOUR CUSTOM DESIGN</span>
              <ArrowRight className="w-4 h-4 text-black transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          {/* Right Column: High-Resolution Mockup with Unobstructed Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] aspect-[4/4.7] rounded-sm bg-neutral-950/90 border border-neutral-800/90 p-5 flex flex-col items-center justify-between overflow-hidden shadow-inner group">
              {/* Corner Coordinate Badges */}
              <div className="w-full flex items-center justify-between text-[9.5px] font-mono text-neutral-400 uppercase tracking-widest border-b border-neutral-800/80 pb-2">
                <span>SPEC // BESPOKE CANVAS</span>
                <span className="text-[#FF5722] font-semibold">1-OF-1 EDITION</span>
              </div>

              {/* T-Shirt Canvas Silhouette Graphic — High-Resolution, Crisp Artwork */}
              <div className="relative my-auto flex flex-col items-center justify-center w-full py-1">
                <img
                  src="/images/bespoke_phd_journey_tee.jpg"
                  alt="TRAITIST Bespoke Atelier PhD Milestone Journey Custom Graphic Specimen"
                  className="w-full max-h-[350px] sm:max-h-[380px] object-contain rounded-xs select-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)]"
                  loading="lazy"
                />

                {/* Non-Obscuring Technical Placement Frame */}
                {/* 4 Corner Crosshair Brackets around Centre-Front Print Zone (Zero interior fill) */}
                <div
                  aria-hidden="true"
                  className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-60 h-64 sm:h-72 pointer-events-none transition-all duration-300 group-hover:scale-[1.02]"
                >
                  {/* Top-Left Bracket */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF5722]" />
                  {/* Top-Right Bracket */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF5722]" />
                  {/* Bottom-Left Bracket */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF5722]" />
                  {/* Bottom-Right Bracket */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF5722]" />

                  {/* Indicator Badge positioned neatly outside the artwork area */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/90 border border-[#FF5722]/80 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
                    <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#FF5722] font-bold">
                      CENTRE-FRONT PRINT ZONE
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Footnote — Verified Empirical Specs */}
              <div className="w-full flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
                <span>100% COMBED COTTON</span>
                <span>200 GSM NOIR BLACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Shirt, Compass } from 'lucide-react';

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
        {/* Subtle Background Ambience */}
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
          {/* Left Column: Editorial Copy & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Kicker */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-2.5 py-1 rounded bg-neutral-900/90 border border-neutral-800">
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

            {/* Specifications / Constraints Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-lg">
              <div className="flex items-center gap-2 p-2 rounded bg-neutral-900/70 border border-neutral-800/80">
                <Shirt className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 tracking-tight">
                  200 GSM Black Tee
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-neutral-900/70 border border-neutral-800/80">
                <Compass className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 tracking-tight">
                  Centre Front Placement
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2 rounded bg-neutral-900/70 border border-neutral-800/80">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 tracking-tight">
                  Original Graphic Art
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={onOpenCustomDesign}
              className="mt-7 sm:mt-8 group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#F7F4EE] hover:bg-[#FF5722] text-neutral-950 hover:text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] min-h-[48px]"
            >
              <span>CREATE YOUR CUSTOM DESIGN</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/4.6] rounded-sm bg-neutral-950/80 border border-neutral-800/90 p-5 flex flex-col items-center justify-between overflow-hidden group">
              {/* Corner Coordinate Badges */}
              <div className="w-full flex items-center justify-between text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800/70 pb-2">
                <span>SPEC // BESPOKE CANVAS</span>
                <span className="text-[#FF5722]">ORIGINAL 01</span>
              </div>

              {/* T-Shirt Canvas Silhouette Graphic */}
              <div className="relative my-auto flex flex-col items-center justify-center w-full">
                <img
                  src="/images/products/tee_under_review.png"
                  alt="TRAITIST Black Heavyweight T-shirt Studio Specimen"
                  className="w-56 sm:w-64 h-auto object-contain select-none filter contrast-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                  loading="lazy"
                />

                {/* Simulated Center Front Print Bounding Box Overlay */}
                <div className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-32 sm:h-36 border border-dashed border-[#FF5722]/80 bg-[#FF5722]/10 rounded-xs flex flex-col items-center justify-center p-2 text-center backdrop-blur-[1px] transition-all duration-300 group-hover:border-[#FF5722] group-hover:bg-[#FF5722]/15">
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#FF5722] font-bold">
                    CENTRE FRONT
                  </span>
                  <span className="font-mono text-[8px] text-neutral-300 uppercase tracking-tight mt-0.5">
                    YOUR STORY
                  </span>
                  <span className="font-mono text-[7px] text-neutral-400 mt-1">
                    ORIGINAL ART
                  </span>
                </div>
              </div>

              {/* Technical Footnote */}
              <div className="w-full flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-neutral-800/70 pt-2">
                <span>100% COMBED COTTON</span>
                <span>NOIR BLACK ONLY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

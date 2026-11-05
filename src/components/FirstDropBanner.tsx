import React from 'react';
import { ArrowRight } from 'lucide-react';
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

  const savingsAmount =
    FIRST_DROP_REGULAR_PRICE && FIRST_DROP_LAUNCH_PRICE
      ? FIRST_DROP_REGULAR_PRICE - FIRST_DROP_LAUNCH_PRICE
      : 100;

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 md:px-8 pt-5 sm:pt-6 pb-2"
      aria-label="Promotional Showcase - The First Drop"
    >
      <div className="relative rounded-sm border border-neutral-800 overflow-hidden bg-[#111111] flex flex-col md:flex-row items-stretch min-h-[280px] md:min-h-[300px] lg:min-h-[320px]">
        {/* ========================================================
            1. CONTENT BLOCK (Near-Black, Warm Off-White, Orange #F05A28)
            - Kicker: THE FIRST DROP · NOVEMBER 15
            - Headline: A NEW DROP. A SPECIAL PRICE.
            - Subline: Your first chance to wear your research identity.
            - Primary Price: ₹799
            - Reference Price: ₹899 (crossed-out)
            - Savings: SAVE ₹100
            - Action: SHOP THE FIRST DROP
            ======================================================== */}
        <div className="w-full md:w-[56%] lg:w-[54%] xl:w-[52%] p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col justify-center space-y-3 sm:space-y-3.5 md:space-y-4">
          {/* Monospace launch label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F05A28] shrink-0" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F05A28] font-bold">
              THE FIRST DROP · NOVEMBER 15
            </span>
          </div>

          {/* Bold geometric headline */}
          <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-black font-display tracking-tight uppercase leading-[1.02]">
            <span className="block text-[#ECEBE6]">A NEW DROP.</span>
            <span className="block text-[#F05A28]">A SPECIAL PRICE.</span>
          </h2>

          {/* Supporting line */}
          <p className="text-xs sm:text-sm font-mono text-[#ECEBE6]/85 leading-relaxed max-w-md">
            Your first chance to wear your research identity.
          </p>

          {/* Pricing hierarchy: ₹799 primary + ₹899 crossed-out + SAVE ₹100 */}
          <div className="flex items-baseline gap-2.5 sm:gap-3 pt-0.5">
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-black font-mono text-[#ECEBE6] tracking-tight">
              ₹{FIRST_DROP_LAUNCH_PRICE}
            </span>
            {FIRST_DROP_REGULAR_PRICE && (
              <span className="text-sm sm:text-base font-mono text-neutral-500 line-through">
                ₹{FIRST_DROP_REGULAR_PRICE}
              </span>
            )}
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#F05A28] font-bold">
              • SAVE ₹{savingsAmount}
            </span>
          </div>

          {/* Accessible Action Button */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 min-h-[42px] bg-[#ECEBE6] hover:bg-white active:scale-[0.98] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer shadow-md group shrink-0"
            >
              <span>SHOP THE FIRST DROP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            2. PHOTOGRAPHY SHOWCASE (Clean, Crisp, Zero Gradient Mud)
            - Partitioned column on desktop & tablet
            - Clear natural daylight, authentic skin tones, readable t-shirts
            - No fabric textures, no decorative badges, no gradients
            ======================================================== */}
        <div className="w-full md:w-[44%] lg:w-[46%] xl:w-[48%] relative min-h-[240px] sm:min-h-[280px] md:min-h-full overflow-hidden border-t md:border-t-0 md:border-l border-neutral-800 bg-[#0E0E0E]">
          <img
            src="/images/first_drop_editorial_banner.png"
            alt="TRAITIST PhD Research Streetwear - Campus Editorial"
            className="w-full h-full object-cover object-[80%_center] select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

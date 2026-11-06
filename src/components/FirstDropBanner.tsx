import React from 'react';
import { Feather, Sparkles, Shirt } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

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
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = () => {
    if (onExplore) {
      onExplore();
    } else {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featureChips = [
    { label: 'Premium Cotton', icon: <CottonIcon className="w-3.5 h-3.5 text-[#FF5722] shrink-0" /> },
    { label: 'All-day Comfort', icon: <Feather className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" /> },
    { label: 'Vibrant & Durable Prints', icon: <Sparkles className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" /> },
    { label: 'Unisex Fit', icon: <Shirt className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" /> },
  ];

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

        {/* Ambient Warm Orange Gradient Accent — Organic, Gentle Breathing Movement */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF5722]/10 blur-3xl pointer-events-none"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 14, -8, 0],
                  y: [0, -10, 6, 0],
                  opacity: [0.08, 0.14, 0.08],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 md:p-12 items-center">
          {/* LEFT SIDE — Offer Information */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow Label — Subtle Orange Glow & Restrained Presence */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.45,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 transition-colors duration-300 hover:border-[#FF5722]/40"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF5722] shadow-[0_0_6px_#FF5722]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[#FF5722] font-bold">
                TRAITIST WEBSITE LAUNCH OFFER
              </span>
            </motion.div>

            {/* Main Headline — 500–600ms Smooth Upward Viewport Fade */}
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.55,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F7F4EE] leading-[1.08]"
            >
              Website Launch Offer.
            </motion.h2>

            {/* Supporting Text — Slight Staggered Fade */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.08,
                duration: shouldReduceMotion ? 0.01 : 0.45,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-base text-neutral-300 font-sans leading-relaxed max-w-xl"
            >
              We&apos;re live! Get your favourite graphic tees for the research journey at a special launch price.
            </motion.p>

            {/* Four Compact Feature Labels — Elegant Staggered Fade-Up */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-xl">
              {featureChips.map((chip, idx) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.16 + idx * 0.06,
                    duration: shouldReduceMotion ? 0.01 : 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -1, transition: { duration: 0.18, ease: 'easeOut' } }}
                  className="flex items-center gap-2 p-2 sm:p-2.5 rounded-sm bg-neutral-900/80 border border-neutral-800 transition-colors duration-200 hover:border-neutral-700 hover:bg-neutral-900"
                >
                  {chip.icon}
                  <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-300 tracking-tight font-medium truncate">
                    {chip.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Offer Presentation & Pricing */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 w-full">
              {/* Split Offer Badge / Button CTA with 2px Smooth Hover Lift */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="inline-flex items-center rounded-sm overflow-hidden border border-[#FF5722] bg-black shadow-md hover:shadow-lg hover:shadow-[#FF5722]/20 transition-all duration-200"
              >
                <span className="bg-[#FF5722] text-black font-mono font-extrabold text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-4 py-2.5 sm:py-3 transition-colors duration-200 group-hover:brightness-105">
                  LAUNCH OFFER
                </span>
                <span className="bg-neutral-950 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-4 py-2.5 sm:py-3 border-l border-[#FF5722]/30 transition-colors duration-200 group-hover:bg-neutral-900">
                  FLAT ₹100 OFF
                </span>
              </motion.div>

              {/* Vertical Divider */}
              <div className="hidden sm:block h-9 w-px bg-neutral-800" aria-hidden="true" />

              {/* Prominent Price Presentation — Fade-in with Initial Emphasis (No Continuous Pulse) */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.32,
                  duration: shouldReduceMotion ? 0.01 : 0.45,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="flex flex-col items-start"
              >
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-neutral-400 font-semibold">
                  NOW AT
                </span>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.36,
                      duration: shouldReduceMotion ? 0.01 : 0.42,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FF5722] tracking-tight inline-block origin-left"
                  >
                    ₹799
                  </motion.span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-500 line-through">
                    ₹899
                  </span>
                </div>
              </motion.div>
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
              <div className="relative w-full aspect-square my-2.5 rounded-xs overflow-hidden bg-black/60 flex items-center justify-center">
                {/* 4 Viewfinder Corner Brackets with Entrance Highlight and Hover Glow */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: shouldReduceMotion ? 0.8 : 0.2, scale: shouldReduceMotion ? 1 : 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.28,
                    duration: shouldReduceMotion ? 0.01 : 0.45,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="absolute inset-0 pointer-events-none z-10"
                >
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FF5722] transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_8px_#FF5722]" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FF5722] transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_8px_#FF5722]" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF5722] transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_8px_#FF5722]" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF5722] transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_8px_#FF5722]" />
                </motion.div>

                {/* PhD Collection T-Shirt — Subtle, High-Precision Floating Motion (3.5px / 5s) */}
                <motion.div
                  className="w-full h-full"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -3.5, 0],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img
                    src="/images/under_review_banner_tee.jpg"
                    alt="PhD Collection — Under Review After Death graphic T-shirt featuring two skeletons discussing paper under review"
                    className="w-full h-full object-cover object-center select-none transition-transform duration-500 ease-out group-hover:scale-[1.02] [transform:translateZ(0)] [backface-visibility:hidden]"
                    loading="eager"
                  />
                </motion.div>
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

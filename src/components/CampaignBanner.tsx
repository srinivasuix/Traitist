import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CAMPAIGN_BACKDROP } from '../data/products';

interface CampaignBannerProps {
  onExploreCollection?: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onExploreCollection }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  // Keyboard Escape listener to dismiss active hotspot
  React.useEffect(() => {
    if (activeHotspot === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveHotspot(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeHotspot]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[580px] md:h-[82vh] bg-neutral-950 overflow-hidden flex flex-col justify-end p-6 md:p-14 border-y border-neutral-900"
      data-purpose="editorial-campaign"
      id="campaign"
    >
      {/* Campaign Photography Backdrop with Cinematic Scroll Parallax */}
      <motion.img
        style={{ y: parallaxY }}
        alt="PhD students wearing graphic tees on campus steps"
        className="absolute -top-[10%] inset-x-0 w-full h-[120%] object-cover object-center opacity-85 will-change-transform pointer-events-none"
        src={CAMPAIGN_BACKDROP}
      />
      {/* Contrast Scrim for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15 pointer-events-none"></div>

      {/* Hotspot 1: PhD Progress Tee (Guy seated on left) */}
      <div className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
            aria-label="View PhD Progress Tee details"
            aria-expanded={activeHotspot === 1}
            aria-controls="hotspot-popup-1"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#FFB300] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB300] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 1 && (
            <div id="hotspot-popup-1" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#FFB300] font-semibold block">
                EDITION 01 • FLAGSHIP
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Progress Tee</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • Expectation vs Reality
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 2: Under Review After Death (Woman top center) */}
      <div className="absolute top-[33%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
            aria-label="View Under Review Tee details"
            aria-expanded={activeHotspot === 2}
            aria-controls="hotspot-popup-2"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#38BDF8] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 2 && (
            <div id="hotspot-popup-2" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#38BDF8] font-semibold block">
                EDITION 06 • VIRAL
              </span>
              <p className="text-xs font-bold text-white mt-0.5">Under Review After Death</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • Skeleton Peer Review
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 3: PhD Student Pie Chart (Guy top right) */}
      <div className="absolute top-[34%] left-[83%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
            aria-label="View Pie Chart Tee details"
            aria-expanded={activeHotspot === 3}
            aria-controls="hotspot-popup-3"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#A855F7] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 3 && (
            <div id="hotspot-popup-3" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#A855F7] font-semibold block">
                EDITION 04 • CHART
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Reality Pie Chart</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • What We Actually Are
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 4: PhD Milestone Nightmare Tee (Guy bottom left) */}
      <div className="absolute top-[67%] left-[17%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 4 ? null : 4)}
            aria-label="View Milestone Tee details"
            aria-expanded={activeHotspot === 4}
            aria-controls="hotspot-popup-4"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-white shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 4 && (
            <div id="hotspot-popup-4" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                EDITION 03 • MOUNTAIN
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Journey Milestone</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • Every Milestone Nightmare
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 5: Blood Sweat Tears Coffee (Woman bottom center with laptop) */}
      <div className="absolute top-[67%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 5 ? null : 5)}
            aria-label="View Coffee Tee details"
            aria-expanded={activeHotspot === 5}
            aria-controls="hotspot-popup-5"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#FF5722] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 5 && (
            <div id="hotspot-popup-5" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#FF5722] font-semibold block">
                EDITION 05 • COMIC STRIP
              </span>
              <p className="text-xs font-bold text-white mt-0.5">Blood Sweat Tears Coffee</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • Thesis Survival Grind
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 6: PhD Scholar Thoughts Tee (Woman bottom right) */}
      <div className="absolute top-[69%] left-[73%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 6 ? null : 6)}
            aria-label="View Scholar Thoughts Tee details"
            aria-expanded={activeHotspot === 6}
            aria-controls="hotspot-popup-6"
            className="w-11 h-11 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#10B981] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 6 && (
            <div id="hotspot-popup-6" className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#10B981] font-semibold block">
                EDITION 02 • BESTSELLER
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Scholar Thoughts</p>
              <p className="text-[11px] font-mono text-neutral-300 mt-0.5">
                ₹ 599 • Mind-Map Heavy Jersey
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-4xl">
        <span className="text-[10px] md:text-xs font-mono tracking-widest text-neutral-300 uppercase block mb-2 font-semibold">
          CAMPAIGN SS26 • CAMPUS EDITION
        </span>
        <h2 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white tracking-tighter leading-none mb-4 sm:mb-6">
          MADE FOR THE
          <br />
          LONG NIGHT.
        </h2>

        {/* Mobile Look Preview Cards (Scrollable horizontal pills for mobile screens) */}
        <div className="md:hidden mb-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Featured In Campaign
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 pb-1 touch-pan-x">
            {[
              { id: 1, color: '#FFB300', title: 'PhD Progress', price: '₹ 599' },
              { id: 2, color: '#38BDF8', title: 'Under Review', price: '₹ 599' },
              { id: 3, color: '#A855F7', title: 'Reality Chart', price: '₹ 599' },
              { id: 4, color: '#FFFFFF', title: 'Milestones', price: '₹ 599' },
              { id: 5, color: '#FF5722', title: 'Coffee & Tears', price: '₹ 599' },
              { id: 6, color: '#10B981', title: 'Scholar Thoughts', price: '₹ 599' },
            ].map((look) => (
              <div
                key={look.id}
                className="shrink-0 bg-black/75 backdrop-blur-md border border-white/20 rounded px-2.5 py-1.5 flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: look.color }}
                />
                <span className="text-[11px] font-mono text-white whitespace-nowrap">
                  {look.title}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {look.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onExploreCollection}
            className="inline-flex items-center justify-center bg-white text-black text-xs md:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 min-h-[48px] rounded-sm hover:bg-neutral-100 transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer shadow-lg hover:shadow-xl"
          >
            EXPLORE THE COLLECTION
          </button>
          <span className="text-neutral-400 text-xs font-mono hidden md:inline-block">
            TAP HIGHLIGHT DOTS TO INSPECT EACH TEE
          </span>
        </div>
      </div>
    </section>
  );
};

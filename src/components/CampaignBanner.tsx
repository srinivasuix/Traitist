import React, { useState } from 'react';
import { CAMPAIGN_BACKDROP } from '../data/products';

interface CampaignBannerProps {
  onExploreCollection?: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onExploreCollection }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section
      className="relative w-full min-h-[580px] md:h-[82vh] bg-neutral-950 overflow-hidden flex flex-col justify-end p-6 md:p-14 border-y border-neutral-900"
      data-purpose="editorial-campaign"
      id="campaign"
    >
      {/* Campaign Photography Backdrop */}
      <img
        alt="PhD students wearing graphic tees on campus steps"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 transition-opacity duration-300"
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
            aria-label="View PhD Progress Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#FFB300] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB300] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 1 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
            aria-label="View Under Review Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#38BDF8] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 2 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
            aria-label="View Pie Chart Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#A855F7] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 3 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
            aria-label="View Milestone Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-white shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 4 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
            aria-label="View Coffee Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#FF5722] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 5 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
            aria-label="View Scholar Thoughts Tee"
            className="w-6 h-6 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-4 h-4 rounded-full bg-[#10B981] shadow-lg"></span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] group-hover:scale-125 transition-transform"></div>
          </button>

          {activeHotspot === 6 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md border border-white/20 p-3 rounded shadow-2xl text-left z-30">
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
        <h2 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white tracking-tighter leading-none mb-6">
          MADE FOR THE
          <br />
          LONG NIGHT.
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreCollection}
            className="inline-flex items-center justify-center bg-white text-black text-xs md:text-sm font-semibold tracking-wider uppercase px-7 py-3 min-h-[44px] rounded-full hover:bg-neutral-200 transition cursor-pointer shadow-lg hover:scale-105 duration-200"
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

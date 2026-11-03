import React, { useState } from 'react';
import { CAMPAIGN_BACKDROP } from '../data/products';

interface CampaignBannerProps {
  onExploreLookbook: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onExploreLookbook }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section
      className="relative w-full min-h-[560px] md:h-[80vh] bg-neutral-950 overflow-hidden flex flex-col justify-end p-6 md:p-14 border-y border-neutral-900"
      data-purpose="editorial-campaign"
      id="campaign"
    >
      {/* Night Skyline & Streetwear Models Backdrop */}
      <img
        alt="Night skyline urban campaign"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src={CAMPAIGN_BACKDROP}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>

      {/* Hotspot 1 (Model Left Jacket) */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 z-20">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
            aria-label="View tagged jacket"
            className="w-5 h-5 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-3.5 h-3.5 rounded-full bg-white shadow-lg"></span>
            <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
          </button>

          {/* Interactive Tag Popover */}
          {activeHotspot === 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-md border border-white/20 p-2.5 rounded shadow-xl text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">
                FEATURED PIECE
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Manuscript Tee</p>
              <p className="text-[11px] font-mono text-[#FFB300] font-semibold mt-0.5">
                ₹ 599 • 240 GSM
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot 2 (Model Right / Tee) */}
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/4 z-20">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
            aria-label="View tagged tee"
            className="w-5 h-5 flex items-center justify-center cursor-pointer group"
          >
            <span className="hotspot-pulse absolute w-3.5 h-3.5 rounded-full bg-[#FF5722] shadow-lg"></span>
            <div className="w-2 h-2 rounded-full bg-[#FF5722] group-hover:scale-125 transition-transform"></div>
          </button>

          {/* Interactive Tag Popover */}
          {activeHotspot === 2 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-md border border-white/20 p-2.5 rounded shadow-xl text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block">
                FEATURED PIECE
              </span>
              <p className="text-xs font-bold text-white mt-0.5">PhD Progress Graphic Tee</p>
              <p className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                ₹ 599 • 240 GSM
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-4xl">
        <span className="text-[10px] md:text-xs font-mono tracking-widest text-neutral-300 uppercase block mb-2 font-semibold">
          CAMPAIGN SS26
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white tracking-tighter leading-none mb-6">
          MADE FOR THE
          <br />
          LONG NIGHT.
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreLookbook}
            className="inline-block bg-white text-black text-xs md:text-sm font-semibold tracking-wider uppercase px-7 py-3 rounded-full hover:bg-neutral-200 transition cursor-pointer shadow-lg hover:scale-105 duration-200"
          >
            SEE THE LOOKBOOK
          </button>
          <span className="text-neutral-400 text-xs font-mono hidden sm:inline-block">
            TAP DOTS TO INSPECT OUTFITS
          </span>
        </div>
      </div>
    </section>
  );
};

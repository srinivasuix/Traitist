import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Marquee } from './magicui/marquee';

export const AnnouncementBar: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <aside
      className="w-full bg-black text-[#f3f3f3] text-[11px] font-mono tracking-wider py-1 overflow-hidden border-b border-neutral-800 uppercase select-none relative group"
      aria-label="Announcements"
    >
      <div className="flex items-center justify-between px-3">
        <div
          className="overflow-hidden whitespace-nowrap flex-grow"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <Marquee
            pauseOnHover={true}
            className="py-0 [--duration:28s]"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            <div className="flex items-center gap-8 px-4 font-mono">
              <span>NIGHT SHIFT • STREETWEAR SERIES</span>
              <span className="text-neutral-500" aria-hidden="true">•</span>
              <span>FREE EXPRESS SHIPPING ACROSS INDIA</span>
              <span className="text-neutral-500" aria-hidden="true">•</span>
              <span>NEW ARRIVALS — PHD STREETWEAR SERIES</span>
              <span className="text-neutral-500" aria-hidden="true">•</span>
              <span>JOIN THE LIST FOR 24H EARLY ACCESS</span>
              <span className="text-neutral-500" aria-hidden="true">•</span>
            </div>
          </Marquee>
        </div>

        {/* WCAG 2.2.2 Pause/Play Ticker Toggle */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume ticker movement' : 'Pause ticker movement'}
          className="ml-2 p-1 text-neutral-400 hover:text-white transition shrink-0 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center rounded"
        >
          {isPaused ? (
            <Play className="w-3 h-3 fill-current" aria-hidden="true" />
          ) : (
            <Pause className="w-3 h-3 fill-current" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
};

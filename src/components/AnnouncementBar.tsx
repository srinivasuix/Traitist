import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      className="w-full bg-black text-[#f3f3f3] text-[11px] font-mono tracking-wider py-2 overflow-hidden border-b border-neutral-800 uppercase select-none"
      aria-label="Announcements"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        <span>DROP 04 • NIGHT SHIFT • 07.11 12:00 ET</span>
        <span className="text-neutral-500">•</span>
        <span>FREE SHIPPING OVER $150 / ₹999</span>
        <span className="text-neutral-500">•</span>
        <span>NEW ARRIVALS — PHD STREETWEAR SERIES</span>
        <span className="text-neutral-500">•</span>
        <span>JOIN THE LIST FOR 24H EARLY ACCESS</span>
        <span className="text-neutral-500">•</span>
        <span>DROP 04 • NIGHT SHIFT • 07.11 12:00 ET</span>
        <span className="text-neutral-500">•</span>
        <span>FREE SHIPPING OVER $150 / ₹999</span>
        <span className="text-neutral-500">•</span>
        <span>NEW ARRIVALS — PHD STREETWEAR SERIES</span>
        <span className="text-neutral-500">•</span>
        <span>JOIN THE LIST FOR 24H EARLY ACCESS</span>
        <span className="text-neutral-500">•</span>
        <span>DROP 04 • NIGHT SHIFT • 07.11 12:00 ET</span>
        <span className="text-neutral-500">•</span>
        <span>FREE SHIPPING OVER $150 / ₹999</span>
        <span className="text-neutral-500">•</span>
        <span>NEW ARRIVALS — PHD STREETWEAR SERIES</span>
        <span className="text-neutral-500">•</span>
        <span>JOIN THE LIST FOR 24H EARLY ACCESS</span>
      </div>
    </aside>
  );
};

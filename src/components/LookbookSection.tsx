import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { LOOKBOOK_ITEMS, LookItem } from '../data/products';

export const LookbookSection: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<LookItem | null>(null);

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-neutral-300"
      data-purpose="editorial-lookbook"
      id="lookbook"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            LOOKBOOK
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-950 mt-1">
            The latest looks
          </h2>
        </div>
        <button
          onClick={() => setSelectedLook(LOOKBOOK_ITEMS[0])}
          className="text-[11px] font-mono uppercase tracking-widest text-neutral-800 underline underline-offset-4 hover:text-black cursor-pointer text-left"
        >
          FULL LOOKBOOK
        </button>
      </div>

      {/* 5 Column Editorial Lookbook Showcase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {LOOKBOOK_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedLook(item)}
            className="flex flex-col group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-neutral-300 overflow-hidden relative rounded-xs border border-neutral-300/60">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  item.grayscale ? 'grayscale contrast-125 group-hover:grayscale-0' : 'contrast-105'
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2 rounded-full bg-white/90 text-black shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
              {idx === 4 && (
                <span className="absolute font-display font-black text-2xl tracking-tighter text-neutral-800/80 uppercase pointer-events-none">
                  SPIN
                </span>
              )}
            </div>
            <div className="mt-2 text-[10px] font-mono">
              <p className="font-bold text-neutral-900 group-hover:text-black transition">
                {item.title}
              </p>
              <p className="text-neutral-500 uppercase">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lookbook Lightbox Modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#ECEBE6] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl border border-neutral-300">
            <button
              onClick={() => setSelectedLook(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black text-white hover:bg-neutral-800 transition cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-3/5 bg-neutral-950 flex items-center justify-center p-4">
              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#ECEBE6]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  EDITORIAL SS26
                </span>
                <h3 className="text-3xl font-bold font-display text-neutral-900 mb-2">
                  {selectedLook.title}
                </h3>
                <p className="text-xs font-mono font-semibold uppercase text-neutral-700 pb-4 border-b border-neutral-300">
                  {selectedLook.subtitle}
                </p>

                <div className="mt-6 space-y-4 text-xs text-neutral-600 leading-relaxed font-sans">
                  <p>
                    Styled on location in industrial Toronto & Mumbai studio sets. Cut with a boxy,
                    unforgiving silhouette using 480 GSM heavy loopback fleece and vintage enzyme
                    washed Japanese denim.
                  </p>
                  <div className="p-3 bg-[#DFDDD7] rounded text-[11px] font-mono text-neutral-800 space-y-1.5 border border-neutral-300">
                    <p className="font-bold uppercase text-black">Look Specifications:</p>
                    <p>• Model Height: 184cm / 6'0" wearing Size L</p>
                    <p>• Garment: 100% Bio-Washed Combed Cotton</p>
                    <p>• Drop Release: Drop 04 Night Shift</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-300 flex items-center justify-between">
                <a
                  href="#shop"
                  onClick={() => setSelectedLook(null)}
                  className="w-full text-center py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-widest font-semibold hover:bg-neutral-800 transition"
                >
                  Shop This Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

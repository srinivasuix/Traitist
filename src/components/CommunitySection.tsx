import React, { useState } from 'react';
import { Heart, Instagram } from 'lucide-react';
import { COMMUNITY_FITS } from '../data/products';

export const CommunitySection: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({
    '@mason.fits': 1420,
    '@j1_ward': 2145,
    '@marci.sk8': 942,
    '@leo.sf_cn': 3210,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (handle: string) => {
    setHasLiked((prev) => ({ ...prev, [handle]: !prev[handle] }));
    setLikes((prev) => ({
      ...prev,
      [handle]: prev[handle] + (hasLiked[handle] ? -1 : 1),
    }));
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 md:py-20 border-b border-neutral-300"
      data-purpose="social-community-feed"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">
            TAG US TO GET FEATURED
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-950 mt-1">
            Worn by you
          </h2>
        </div>
        <a
          className="text-[11px] font-mono uppercase tracking-widest text-neutral-800 underline underline-offset-4 hover:text-black min-h-[36px] flex items-center"
          href="#shop"
        >
          MORE FITS
        </a>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COMMUNITY_FITS.map((item) => (
          <div
            key={item.handle}
            className="relative group aspect-square bg-neutral-300 overflow-hidden rounded-xs border border-neutral-300/80 shadow-sm"
          >
            <img
              src={item.image}
              alt={`Streetwear outfit styling shared by ${item.handle}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Tag Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <div className="bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                <Instagram className="w-3 h-3 text-[#FFB300]" aria-hidden="true" />
                <p className="text-[10px] font-mono text-white font-medium">{item.handle}</p>
              </div>

              <button
                type="button"
                onClick={() => toggleLike(item.handle)}
                aria-pressed={!!hasLiked[item.handle]}
                aria-label={`Like look by ${item.handle}`}
                className="bg-black/80 backdrop-blur-sm px-2.5 py-1.5 min-h-[32px] rounded-sm flex items-center gap-1.5 text-[10px] font-mono text-white hover:bg-black transition cursor-pointer"
              >
                <Heart
                  className={`w-3 h-3 ${
                    hasLiked[item.handle]
                      ? 'fill-[#FF5722] text-[#FF5722]'
                      : 'text-white'
                  }`}
                  aria-hidden="true"
                />
                <span>{likes[item.handle]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

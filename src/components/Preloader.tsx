import React, { useState, useEffect } from 'react';
import { BRAND_LOGO_URL } from '../data/products';

interface PreloaderProps {
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  'INITIALIZING STOREFRONT',
  'CALIBRATING 200 GSM COMBED COTTON',
  'RENDERING 3D GARMENT VOLUMES',
  'SYNCHRONIZING COLLECTION',
  'THREADS OF RESILIENCE READY',
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Smooth progress counter ramp from 0 to 100 over ~1.8 seconds
    const startTime = Date.now();
    const duration = 1800; // 1.8s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      // Cycle status messages according to progress
      if (rawProgress < 25) {
        setStatusIndex(0);
      } else if (rawProgress < 50) {
        setStatusIndex(1);
      } else if (rawProgress < 75) {
        setStatusIndex(2);
      } else if (rawProgress < 95) {
        setStatusIndex(3);
      } else {
        setStatusIndex(4);
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        // Pause briefly at 100% then trigger curtain reveal
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 700); // Wait for curtain slide animation to complete
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#ECEBE6] text-[#111111] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] select-none ${
        isExiting
          ? '-translate-y-full opacity-95 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
      aria-label="Loading TRAITIST Studios"
    >
      {/* Top Meta Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
          <span className="text-[10px] sm:text-[11px]">TRAITIST // 2026</span>
        </div>
        <button
          onClick={handleSkip}
          aria-label="Skip intro animation"
          className="hover:text-black hover:underline transition-colors cursor-pointer text-[10px] tracking-wider py-1.5 px-3 border border-neutral-300 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center font-mono"
        >
          SKIP
        </button>
      </div>

      {/* Center Brand Identity Section */}
      <div className="flex flex-col items-center justify-center px-4 -mt-4 sm:-mt-6">
        {/* Animated Brand Logo Reveal */}
        <div className="relative flex flex-col items-center">
          <div className="relative inline-flex items-start">
            <img
              src={BRAND_LOGO_URL}
              alt="TRAITIST™ - Threads of Resilience"
              className="h-10 min-[380px]:h-12 sm:h-20 md:h-24 w-auto max-w-[200px] min-[380px]:max-w-[260px] sm:max-w-[380px] object-contain transition-transform duration-700 ease-out scale-100"
            />
            <span
              aria-label="Trademark"
              className="text-[9px] sm:text-xs md:text-sm font-mono font-bold text-neutral-900 tracking-tighter select-none leading-none -ml-0.5 sm:-ml-1 -mt-0.5 sm:-mt-1"
            >
              ™
            </span>
          </div>
          <p className="mt-3 sm:mt-4 text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-600 text-center">
            HEAVYWEIGHT EDITORIAL STREETWEAR • NIGHT SHIFT
          </p>
        </div>

        {/* Dynamic Status Message */}
        <div className="h-6 mt-4 sm:mt-6 flex items-center justify-center px-2 text-center">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-800 animate-pulse">
            {STATUS_MESSAGES[statusIndex]}
          </span>
        </div>
      </div>

      {/* Bottom Counter & Hairline Progress Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-12">
        <div className="flex items-end justify-between mb-3 text-neutral-800">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-600 uppercase">
            CALIBRATING ASSETS
          </span>
          <span className="text-3xl sm:text-5xl font-mono font-bold tracking-tighter tabular-nums">
            {String(progress).padStart(3, '0')}
            <span className="text-lg sm:text-2xl font-light text-neutral-600 ml-1">%</span>
          </span>
        </div>

        {/* Precision Progress Track */}
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-[3px] bg-neutral-300 relative overflow-hidden rounded-full"
        >
          <div
            className="h-full bg-black transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-neutral-600 tracking-wider">
          <span>TORONTO / NEW DELHI</span>
          <span>CURATED EDITION 01 — 08</span>
        </div>
      </div>
    </div>
  );
};

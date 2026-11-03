import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ROTATOR_PRODUCTS, Product } from '../data/products';

interface HeroRotatorProps {
  currency: 'INR' | 'USD';
  onSelectProduct: (product: Product) => void;
}

const DURATION_MS = 2500; // 2.5 seconds auto-advance duration

export const HeroRotator: React.FC<HeroRotatorProps> = ({
  currency,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [resetTimerKey, setResetTimerKey] = useState(0);
  const total = ROTATOR_PRODUCTS.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setProduct = useCallback((index: number) => {
    setIsChanging(true);
    let nextIndex = index % total;
    if (nextIndex < 0) nextIndex += total;
    setCurrentIndex(nextIndex);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 150);
  }, [total]);

  const nextProduct = useCallback(() => {
    setIsChanging(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 150);
  }, [total]);

  const prevProduct = useCallback(() => {
    setIsChanging(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 150);
  }, [total]);

  // Robust, continuous 2.5 second auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true);
      setCurrentIndex((prev) => (prev + 1) % total);
      setTimeout(() => {
        setIsChanging(false);
      }, 150);
    }, DURATION_MS);

    return () => clearInterval(timer);
  }, [resetTimerKey, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        prevProduct();
      } else if (e.key === 'ArrowRight') {
        nextProduct();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProduct, prevProduct]);

  // Touch and drag handling
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    const dragThreshold = 40;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      currentX = startX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const deltaX = currentX - startX;
      if (deltaX < -dragThreshold) {
        nextProduct();
      } else if (deltaX > dragThreshold) {
        prevProduct();
      }
    };

    stage.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    stage.addEventListener('touchstart', onPointerDown, { passive: true });
    stage.addEventListener('touchmove', onPointerMove, { passive: true });
    stage.addEventListener('touchend', onPointerUp);

    return () => {
      stage.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      stage.removeEventListener('touchstart', onPointerDown);
      stage.removeEventListener('touchmove', onPointerMove);
      stage.removeEventListener('touchend', onPointerUp);
    };
  }, [nextProduct, prevProduct]);

  const currentProduct = ROTATOR_PRODUCTS[currentIndex];

  // Compute 3D styling for cards in perspective
  const getCardStyle = (index: number): React.CSSProperties => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const xOffsetNear = isMobile ? 120 : 220;
    const xOffsetFar = isMobile ? 210 : 380;

    if (diff === 0) {
      return {
        transform: 'translateX(0px) translateZ(90px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 40,
        filter: 'none',
        cursor: 'pointer',
      };
    } else if (diff === 1) {
      return {
        transform: `translateX(${xOffsetNear}px) translateZ(-40px) rotateY(-18deg) rotateZ(3deg) scale(0.84)`,
        opacity: 0.78,
        zIndex: 25,
        filter: 'brightness(0.92) blur(0.2px)',
        cursor: 'pointer',
      };
    } else if (diff === -1) {
      return {
        transform: `translateX(-${xOffsetNear}px) translateZ(-40px) rotateY(18deg) rotateZ(-3deg) scale(0.84)`,
        opacity: 0.78,
        zIndex: 25,
        filter: 'brightness(0.92) blur(0.2px)',
        cursor: 'pointer',
      };
    } else if (diff === 2) {
      return {
        transform: `translateX(${xOffsetFar}px) translateZ(-140px) rotateY(-26deg) rotateZ(6deg) scale(0.68)`,
        opacity: 0.35,
        zIndex: 10,
        filter: 'brightness(0.85) blur(1px)',
        cursor: 'pointer',
      };
    } else if (diff === -2) {
      return {
        transform: `translateX(-${xOffsetFar}px) translateZ(-140px) rotateY(26deg) rotateZ(-6deg) scale(0.68)`,
        opacity: 0.35,
        zIndex: 10,
        filter: 'brightness(0.85) blur(1px)',
        cursor: 'pointer',
      };
    } else {
      const dir = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${dir * (xOffsetFar + 80)}px) translateZ(-260px) scale(0.5)`,
        opacity: 0,
        zIndex: 1,
        filter: 'blur(2px)',
        cursor: 'default',
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section
      className="relative min-h-[82vh] flex flex-col items-center justify-center pt-6 pb-12 px-4 overflow-hidden border-b border-neutral-300 select-none bg-[#ECEBE6]"
      id="hero-showcase"
      data-purpose="hero-garment-showcase"
    >
      {/* Background Monumental Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
        <span className="text-[34vw] font-black font-display tracking-tighter text-black">
          SPIN
        </span>
      </div>

      <div className="max-w-5xl w-full mx-auto flex flex-col items-center relative z-10">
        {/* Draggable 3D Perspective Stage */}
        <div
          ref={stageRef}
          className="perspective-stage relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          id="rotator-stage"
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
            {ROTATOR_PRODUCTS.map((prod, idx) => {
              const isCenter = idx === currentIndex;
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    if (isCenter) {
                      onSelectProduct(prod);
                    } else {
                      setProduct(idx);
                    }
                  }}
                  className="showcase-card absolute flex flex-col items-center justify-center origin-center transition-all duration-550 ease-out"
                  style={getCardStyle(idx)}
                  data-index={idx}
                >
                  <div
                    className={`relative group p-2 sm:p-4 transition-all duration-300 ${
                      isCenter ? 'animate-float' : ''
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.title}
                      draggable={false}
                      className="w-[300px] sm:w-[440px] md:w-[560px] max-h-[440px] sm:max-h-[520px] md:max-h-[580px] object-contain garment-shadow filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{
                        mixBlendMode: prod.blendMode || 'normal',
                      }}
                    />
                    {isCenter && (
                      <div className="card-action-overlay absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 shadow-lg flex items-center gap-1.5 rounded-sm hover:bg-[#FF5722] transition-colors">
                        <span>VIEW PIECE</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Garment Meta & Navigation Controls */}
        <div className="text-center mt-2 sm:mt-3 w-full flex flex-col items-center">
          <div
            onClick={() => onSelectProduct(currentProduct)}
            className={`product-info-fade flex flex-col items-center cursor-pointer group transition-all duration-200 ${
              isChanging ? 'changing opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
            id="product-meta-container"
          >
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-500 mb-0.5">
              {currentProduct.colorway}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-display text-neutral-900 group-hover:text-[#FF5722] transition-colors">
              {currentProduct.title}
            </h1>
            <p className="text-base sm:text-lg font-mono-subtle text-neutral-900 mt-0.5 font-semibold">
              {currency === 'INR'
                ? currentProduct.priceDisplayINR
                : currentProduct.priceDisplayUSD}
            </p>
          </div>

          {/* Slider Pagination, Duration Progress & Arrow Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevProduct();
              }}
              aria-label="Previous garment"
              className="p-2 sm:p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-700 transition duration-150 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dynamic Counter Format: 01 ── 07 with animated duration progress bar */}
            <div className="flex items-center gap-3 font-mono text-[11px] font-semibold text-neutral-800 select-none">
              <span className="w-5 text-right font-mono" id="counter-current">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>

              {/* Progress Track filling smoothly over 2.5s and looping continuously */}
              <div
                className="w-20 sm:w-28 h-[2px] bg-neutral-300 relative overflow-hidden rounded-full"
                title="Auto-changing every 2.5 seconds"
              >
                <div
                  key={`${currentIndex}-${resetTimerKey}`}
                  className="h-full bg-black animate-progress-fill rounded-full"
                />
              </div>

              <span className="w-5 text-left font-mono" id="counter-total">
                {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextProduct();
              }}
              aria-label="Next garment"
              className="p-2 sm:p-2.5 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-700 transition duration-150 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Button & Interaction Guide */}
          <div className="mt-3.5 flex flex-col items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(currentProduct)}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest font-semibold px-4 py-1.5 border border-black hover:bg-black hover:text-white transition duration-200 cursor-pointer"
            >
              <span>OPEN PIECE</span>
              <span className="text-xs">→</span>
            </button>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-0.5">
              DRAG TO SPIN • TAP A PIECE TO OPEN • ARROW KEYS TO BROWSE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ROTATOR_PRODUCTS, Product } from '../data/products';

interface HeroRotatorProps {
  currency: 'INR' | 'USD';
  onSelectProduct: (product: Product) => void;
}

const AUTO_DURATION_MS = 2800; // Auto-advance timing

export const HeroRotator: React.FC<HeroRotatorProps> = ({
  currency,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [resetTimerKey, setResetTimerKey] = useState(0);
  const total = ROTATOR_PRODUCTS.length;

  // Drag & interactive rotation state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tilt for center piece (rotateX, rotateY)
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; time: number }>({ x: 0, time: 0 });
  const hasMovedSignificantRef = useRef(false);

  // Responsive mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current product with subtle meta cross-fade
  const setProduct = useCallback((index: number) => {
    setIsChanging(true);
    let nextIndex = index % total;
    if (nextIndex < 0) nextIndex += total;
    setCurrentIndex(nextIndex);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 180);
  }, [total]);

  const nextProduct = useCallback(() => {
    setIsChanging(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 180);
  }, [total]);

  const prevProduct = useCallback(() => {
    setIsChanging(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setResetTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsChanging(false);
    }, 180);
  }, [total]);

  // Smooth Auto-advance (pauses naturally while user is actively hovering or dragging)
  useEffect(() => {
    if (isDragging || isHovered) return;

    const timer = setInterval(() => {
      setIsChanging(true);
      setCurrentIndex((prev) => (prev + 1) % total);
      setTimeout(() => {
        setIsChanging(false);
      }, 180);
    }, AUTO_DURATION_MS);

    return () => clearInterval(timer);
  }, [resetTimerKey, total, isDragging, isHovered]);

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

  // Mouse move over stage -> 3D perspective tilt on center garment
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || isMobile) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width; // 0 to 1
    const relativeY = (e.clientY - rect.top) / rect.height; // 0 to 1

    // Convert to -1 to +1 normalized coordinate
    const normX = (relativeX - 0.5) * 2;
    const normY = (relativeY - 0.5) * 2;

    // Subtle 3D tilt: max 6deg rotateX, max 7.5deg rotateY
    setMouseTilt({
      x: -normY * 6,
      y: normX * 7.5,
    });
  };

  const handleStageMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return tilt to resting center
    setMouseTilt({ x: 0, y: 0 });
  };

  // Pointer Dragging (Horizontal interactive 3D rotation)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    setIsDragging(true);
    hasMovedSignificantRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      time: Date.now(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    if (Math.abs(deltaX) > 6) {
      hasMovedSignificantRef.current = true;
    }
    setDragOffset(deltaX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already lost
    }

    const deltaX = dragOffset;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = Math.abs(deltaX) / Math.max(elapsed, 1); // px per ms

    setDragOffset(0);

    const threshold = isMobile ? 40 : 60;
    const fastSwipeThreshold = 0.35; // px/ms

    if (deltaX < -threshold || (deltaX < -20 && velocity > fastSwipeThreshold)) {
      nextProduct();
    } else if (deltaX > threshold || (deltaX > 20 && velocity > fastSwipeThreshold)) {
      prevProduct();
    }
  };

  const currentProduct = ROTATOR_PRODUCTS[currentIndex];

  // Compute 3D multi-layered cylindrical / orbital positioning with continuous drag interpolation
  const getCardStyle = (index: number): React.CSSProperties => {
    const spacing = isMobile ? 140 : 320;
    // Continuous fraction based on active drag
    const dragFraction = dragOffset / spacing;

    // Relative circular offset from center:
    let rel = index - currentIndex + dragFraction;
    let diff = rel % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const d = Math.abs(diff);
    const sign = Math.sign(diff);

    // Continuous X horizontal positioning along the orbit
    const xStepNear = isMobile ? 115 : 260;
    const xStepMid = isMobile ? 85 : 190;
    const xStepFar = isMobile ? 65 : 140;

    let posX = 0;
    if (d <= 1) {
      posX = sign * d * xStepNear;
    } else if (d <= 2) {
      posX = sign * (xStepNear + (d - 1) * xStepMid);
    } else {
      posX = sign * (xStepNear + xStepMid + (d - 2) * xStepFar);
    }

    // Depth in 3D perspective space (Z-axis)
    // Foreground center is elevated forward, flanking pieces curve naturally behind
    const posZ = 90 - Math.min(d, 1) * 140 - Math.max(0, Math.min(d - 1, 1)) * 110 - Math.max(0, d - 2) * 100;

    // Y-rotation: pieces face subtly inward toward the stage center
    const rotYBase = -sign * (Math.min(d, 1) * 20 + Math.max(0, Math.min(d - 1, 1)) * 9);
    // Apply subtle mouse tilt to the center piece, tapering off smoothly as items move to sides
    const tiltInfluence = Math.max(0, 1 - d);
    const finalRotY = rotYBase + mouseTilt.y * tiltInfluence;
    const finalRotX = mouseTilt.x * tiltInfluence;

    // Subtle Z-tilt (banking) for organic editorial float
    const rotZ = sign * (Math.min(d, 1) * 2.8 + Math.max(0, Math.min(d - 1, 1)) * 2);

    // Natural scale diminution as pieces recede into background
    const scale = Math.max(0.48, 1 - Math.min(d, 1) * 0.16 - Math.max(0, Math.min(d - 1, 1)) * 0.16 - Math.max(0, d - 2) * 0.14);

    // Opacity: Center is fully crisp, flanking is visible, far pieces fade cleanly
    let opacity = 1;
    if (d > 0.4) {
      opacity = Math.max(0, 1 - (d - 0.4) * 0.48);
    }

    // Z-index layer ordering
    const zIndex = Math.round(50 - d * 15);

    // Lighting and depth filter
    const brightness = Math.max(0.8, 1 - d * 0.09);
    const blurAmount = d > 1.6 ? (d - 1.6) * 1.8 : 0;

    return {
      transform: `translateX(${posX}px) translateZ(${posZ}px) rotateY(${finalRotY}deg) rotateX(${finalRotX}deg) rotateZ(${rotZ}deg) scale(${scale})`,
      opacity,
      zIndex,
      filter: `brightness(${brightness}) ${blurAmount > 0 ? `blur(${blurAmount}px)` : ''}`,
      cursor: d < 0.4 ? 'pointer' : 'pointer',
      pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      transition: isDragging
        ? 'none'
        : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease',
      transformStyle: 'preserve-3d',
    };
  };

  // Assign distinct organic floating rhythms to each garment
  const getFloatingAnimation = (idx: number) => {
    const floatVariations = ['float-gentle-1', 'float-gentle-2', 'float-gentle-3', 'float-subtle'];
    const animName = floatVariations[idx % floatVariations.length];
    const duration = 3.4 + (idx % 3) * 0.6; // 3.4s, 4.0s, 4.6s
    const delay = -(idx * 0.85); // out-of-phase offsets

    return {
      animation: `${animName} ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    };
  };

  return (
    <section
      className="relative min-h-[82vh] flex flex-col items-center justify-center pt-6 pb-12 px-4 overflow-hidden border-b border-neutral-300 select-none bg-[#ECEBE6]"
      id="hero-showcase"
      data-purpose="hero-garment-showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleStageMouseLeave}
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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseMove={handleStageMouseMove}
          className={`perspective-stage relative w-full h-[420px] min-[400px]:h-[470px] sm:h-[580px] md:h-[650px] flex items-center justify-center touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          id="rotator-stage"
          style={{
            perspective: '1400px',
            perspectiveOrigin: 'center center',
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
            {ROTATOR_PRODUCTS.map((prod, idx) => {
              const isCenter = idx === currentIndex;
              return (
                <div
                  key={prod.id}
                  onClick={(e) => {
                    // Prevent click when user was dragging
                    if (hasMovedSignificantRef.current) return;
                    e.stopPropagation();

                    if (isCenter) {
                      onSelectProduct(prod);
                    } else {
                      setProduct(idx);
                    }
                  }}
                  className="showcase-card absolute flex flex-col items-center justify-center origin-center will-change-transform"
                  style={getCardStyle(idx)}
                  data-index={idx}
                >
                  {/* Independent Organic Floating Wrapper */}
                  <div
                    className="relative group p-1.5 sm:p-4 will-change-transform"
                    style={getFloatingAnimation(idx)}
                  >
                    <img
                      src={prod.image}
                      alt={prod.title}
                      draggable={false}
                      className="w-[280px] min-[400px]:w-[340px] sm:w-[520px] md:w-[670px] max-h-[390px] min-[400px]:max-h-[450px] sm:max-h-[620px] md:max-h-[690px] object-contain garment-shadow filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.025]"
                      style={{
                        mixBlendMode: prod.blendMode || 'normal',
                      }}
                    />

                    {/* View Piece Overlay on Center Focus Piece */}
                    {isCenter && (
                      <div className="card-action-overlay absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] font-mono tracking-widest uppercase px-3.5 py-2 shadow-lg flex items-center gap-1.5 rounded-sm hover:bg-[#FF5722] transition-colors pointer-events-auto cursor-pointer">
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
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevProduct();
              }}
              aria-label="Previous garment"
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-700 transition duration-150 cursor-pointer flex items-center justify-center touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dynamic Counter Format: 01 ── 08 with animated duration progress bar */}
            <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[11px] font-semibold text-neutral-800 select-none">
              <span className="w-5 text-right font-mono" id="counter-current">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>

              {/* Progress Track filling smoothly over duration and looping continuously */}
              <div
                className="w-16 sm:w-28 h-[2px] bg-neutral-300 relative overflow-hidden rounded-full"
                title="Auto-changing every 2.8 seconds"
              >
                <div
                  key={`${currentIndex}-${resetTimerKey}`}
                  className={`h-full bg-black rounded-full ${
                    isHovered || isDragging ? '' : 'animate-progress-fill'
                  }`}
                  style={{
                    animationDuration: `${AUTO_DURATION_MS}ms`,
                    animationPlayState: isHovered || isDragging ? 'paused' : 'running',
                  }}
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
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-700 transition duration-150 cursor-pointer flex items-center justify-center touch-manipulation"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Button & Interaction Guide */}
          <div className="mt-3.5 flex flex-col items-center gap-2">
            <button
              onClick={() => onSelectProduct(currentProduct)}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest font-semibold px-5 py-2.5 min-h-[42px] border border-black hover:bg-black hover:text-white transition duration-200 cursor-pointer"
            >
              <span>OPEN PIECE</span>
              <span className="text-xs">→</span>
            </button>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-0.5 text-center px-4 leading-normal">
              <span className="hidden sm:inline">DRAG TO SPIN • MOUSE TILT TO INSPECT • TAP TO OPEN • ARROWS TO BROWSE</span>
              <span className="sm:hidden">SWIPE TO ROTATE • TAP TO VIEW PIECE</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

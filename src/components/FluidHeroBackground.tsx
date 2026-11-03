import React, { useEffect, useRef, useCallback, useState } from 'react';

interface FluidHeroBackgroundProps {
  activeTriggerKey?: number | string;
  isChanging?: boolean;
  mouseParallax?: { x: number; y: number };
}

export const FluidHeroBackground: React.FC<FluidHeroBackgroundProps> = ({
  activeTriggerKey = 0,
  isChanging = false,
  mouseParallax = { x: 0, y: 0 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Simulation grid dimensions (scaled down for high performance, rendered smoothly with bicubic/bilinear smoothing)
  const GRID_W = 160;
  const GRID_H = 100;
  const buffer1Ref = useRef<Float32Array>(new Float32Array(GRID_W * GRID_H));
  const buffer2Ref = useRef<Float32Array>(new Float32Array(GRID_W * GRID_H));
  const currentBufferRef = useRef<1 | 2>(1);

  // Fluid physics parameters
  const damping = 0.984; // silky dissipation
  const lastMouseRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [fluidMode, setFluidMode] = useState<'liquid' | 'silk' | 'mercury'>('silk');

  // Trigger ripple disturbance at normalized or canvas coordinates
  const addRipple = useCallback(
    (canvasX: number, canvasY: number, radius = 5, strength = 180) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const gridX = Math.floor((canvasX / rect.width) * GRID_W);
      const gridY = Math.floor((canvasY / rect.height) * GRID_H);

      const buf = currentBufferRef.current === 1 ? buffer1Ref.current : buffer2Ref.current;

      const rSq = radius * radius;
      for (let y = Math.max(1, gridY - radius); y < Math.min(GRID_H - 1, gridY + radius); y++) {
        for (let x = Math.max(1, gridX - radius); x < Math.min(GRID_W - 1, gridX + radius); x++) {
          const dSq = (x - gridX) * (x - gridX) + (y - gridY) * (y - gridY);
          if (dSq < rSq) {
            const factor = Math.cos((Math.sqrt(dSq) / radius) * (Math.PI / 2));
            const idx = y * GRID_W + x;
            buf[idx] = Math.min(255, buf[idx] + strength * factor);
          }
        }
      }
    },
    [GRID_W, GRID_H]
  );

  // Trigger drop ripple when active t-shirt changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height * 0.48; // center-bottom of t-shirt

    // Sequential multi-ring drop impulse
    addRipple(centerX, centerY, 8, 220);
    const t1 = setTimeout(() => {
      addRipple(centerX + (Math.random() - 0.5) * 30, centerY + 15, 6, 160);
    }, 90);
    const t2 = setTimeout(() => {
      addRipple(centerX - 20, centerY - 10, 5, 120);
    }, 180);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTriggerKey, addRipple]);

  // Pointer interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      if (lastMouseRef.current) {
        const dx = x - lastMouseRef.current.x;
        const dy = y - lastMouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        const dt = Math.max(1, now - lastMouseRef.current.time);
        const speed = dist / dt;

        // Add ripple along movement path
        if (dist > 4) {
          const strength = Math.min(180, Math.max(40, speed * 45));
          addRipple(x, y, 4, strength);
        }
      }
      lastMouseRef.current = { x, y, time: now };
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addRipple(x, y, 9, 240);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [addRipple]);

  // Main simulation and render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high DPI
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Offscreen imageData buffer for fast grid rendering
    const offscreen = document.createElement('canvas');
    offscreen.width = GRID_W;
    offscreen.height = GRID_H;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;
    const imgData = offCtx.createImageData(GRID_W, GRID_H);
    const pixels = imgData.data;

    let time = 0;

    const render = () => {
      time += 0.025;

      const buf1 = buffer1Ref.current;
      const buf2 = buffer2Ref.current;
      const isBuf1Current = currentBufferRef.current === 1;
      const currentBuf = isBuf1Current ? buf1 : buf2;
      const nextBuf = isBuf1Current ? buf2 : buf1;

      // Ambient undulating fluid currents (sine/cosine waves)
      const ambientPulse = Math.sin(time * 0.9) * 0.5 + 0.5;
      const ambientX = Math.floor(GRID_W * (0.5 + Math.sin(time * 0.4) * 0.15));
      const ambientY = Math.floor(GRID_H * (0.45 + Math.cos(time * 0.5) * 0.12));
      const ambIdx = ambientY * GRID_W + ambientX;
      if (ambIdx >= 0 && ambIdx < currentBuf.length) {
        currentBuf[ambIdx] += 1.8 * ambientPulse;
      }

      // Discrete 2D Wave Equation Solver
      for (let y = 1; y < GRID_H - 1; y++) {
        const row = y * GRID_W;
        for (let x = 1; x < GRID_W - 1; x++) {
          const idx = row + x;

          // Wave propagation from 4 neighbors
          const neighbors =
            currentBuf[idx - 1] +
            currentBuf[idx + 1] +
            currentBuf[idx - GRID_W] +
            currentBuf[idx + GRID_W];

          let val = neighbors * 0.5 - nextBuf[idx];
          val *= damping;
          nextBuf[idx] = val;
        }
      }

      // Swap buffers
      currentBufferRef.current = isBuf1Current ? 2 : 1;
      const resolvedBuf = nextBuf;

      // Render pixels with caustic lighting, depth shading, and t-shirt shadow footprint
      // T-shirt center in grid coordinates
      const tShirtGridX = GRID_W * 0.5 + mouseParallax.x * 0.08;
      const tShirtGridY = GRID_H * 0.46 + mouseParallax.y * 0.06;
      const tShirtRadiusX = GRID_W * 0.22; // t-shirt width radius in grid
      const tShirtRadiusY = GRID_H * 0.32; // t-shirt height radius in grid

      // Shadow displacement offset based on light angle (top-left light source)
      const shadowOffsetX = 3;
      const shadowOffsetY = 6;
      const shadowCenterGridX = tShirtGridX + shadowOffsetX;
      const shadowCenterGridY = tShirtGridY + shadowOffsetY;

      for (let y = 0; y < GRID_H; y++) {
        const row = y * GRID_W;
        for (let x = 0; x < GRID_W; x++) {
          const idx = row + x;
          const pixelIdx = idx * 4;

          // Calculate surface gradients (normals)
          const left = x > 0 ? resolvedBuf[idx - 1] : resolvedBuf[idx];
          const right = x < GRID_W - 1 ? resolvedBuf[idx + 1] : resolvedBuf[idx];
          const up = y > 0 ? resolvedBuf[idx - GRID_W] : resolvedBuf[idx];
          const down = y < GRID_H - 1 ? resolvedBuf[idx + GRID_W] : resolvedBuf[idx];

          const dx = right - left;
          const dy = down - up;

          // Light vector from top-left: (-0.6, -0.8)
          const shading = (dx * -0.7 + dy * -0.9) * 2.2;
          const height = resolvedBuf[idx];

          // Compute T-shirt fluid shadow footprint at (x, y)
          // The wave normal (dx, dy) refractorily distorts the shadow boundaries!
          const distortedX = x + dx * 0.15;
          const distortedY = y + dy * 0.15;

          const sNormX = (distortedX - shadowCenterGridX) / tShirtRadiusX;
          const sNormY = (distortedY - shadowCenterGridY) / tShirtRadiusY;
          const sDistSq = sNormX * sNormX + sNormY * sNormY;

          // Shadow factor: 0.0 (outside shadow) to 1.0 (deepest core of shadow on fluid)
          let shadowIntensity = 0;
          if (sDistSq < 1.4) {
            // Soft gaussian falloff for t-shirt silhouette shadow
            const coreFalloff = Math.exp(-sDistSq * 1.8);
            // Occlusion darkening right below the base
            const baseOcclusion = Math.max(0, 1 - Math.abs(distortedY - (shadowCenterGridY + 8)) / 12);
            shadowIntensity = coreFalloff * 0.65 + baseOcclusion * 0.25;
          }

          // Base background color: TRAITIST #ECEBE6 (R:236, G:235, B:230)
          let r = 236;
          let g = 235;
          let b = 230;

          // Apply liquid wave height and specular highlights
          if (shading > 0) {
            // Wave crests reflect light (white specular gleam)
            const highlight = Math.min(65, shading * 1.8);
            r = Math.min(255, r + highlight);
            g = Math.min(255, g + highlight);
            b = Math.min(255, b + highlight);
          } else {
            // Wave troughs cast soft dark shadow
            const trough = Math.min(50, -shading * 1.2);
            r = Math.max(160, r - trough);
            g = Math.max(160, g - trough);
            b = Math.max(155, b - trough);
          }

          // Apply T-shirt shadow onto the fluid plane
          if (shadowIntensity > 0) {
            // Darken fluid surface under t-shirt with organic liquid depth
            const darkenAmount = shadowIntensity * 95;
            r = Math.max(30, r - darkenAmount);
            g = Math.max(30, g - darkenAmount);
            b = Math.max(28, b - darkenAmount);

            // Caustic ripples inside the t-shirt shadow: peak highlights still gleam subtly through dark shadow
            if (shading > 5) {
              const shadowCaustic = Math.min(25, shading * 0.6);
              r += shadowCaustic;
              g += shadowCaustic;
              b += shadowCaustic;
            }
          }

          // Write RGBA
          pixels[pixelIdx] = Math.round(r);
          pixels[pixelIdx + 1] = Math.round(g);
          pixels[pixelIdx + 2] = Math.round(b);
          // Set alpha based on disturbance and shadow so it seamlessly blends with CSS background
          const activeDisturbance = Math.abs(height) + Math.abs(shading);
          const alphaFactor = Math.min(
            255,
            Math.max(0, Math.round(activeDisturbance * 4.5 + shadowIntensity * 190 + 35))
          );
          pixels[pixelIdx + 3] = alphaFactor;
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      // Draw smoothed fluid image data onto main canvas
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(offscreen, 0, 0, rect.width, rect.height);
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, [damping, mouseParallax]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden select-none"
      id="fluid-hero-canvas-container"
    >
      {/* Interactive Liquid Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair opacity-90 transition-opacity duration-300"
        style={{ touchAction: 'none' }}
      />

      {/* Ambient Liquid Vignette & Depth Mask */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#ECEBE6]/10 to-[#ECEBE6]/75" />

      {/* Interactive HUD Indicator at top-right or bottom-right */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto hidden sm:flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-700/50 text-[10px] font-mono tracking-wider text-neutral-300">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
        <span className="uppercase text-neutral-400">FLUID GROUND:</span>
        <span className="text-white font-semibold">ACTIVE</span>
        <span className="text-neutral-500">•</span>
        <span className="text-neutral-400 text-[9px]">MOVE CURSOR TO RIPPLE</span>
      </div>
    </div>
  );
};

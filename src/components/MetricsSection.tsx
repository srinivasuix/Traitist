import React from 'react';
import { NumberTicker } from './magicui/number-ticker';
import { DotPattern } from './magicui/dot-pattern';
import { BlurFade } from './magicui/blur-fade';

export const MetricsSection: React.FC = () => {
  return (
    <section
      className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 md:py-20 border-b border-neutral-300 overflow-hidden"
      data-purpose="metrics-and-specifications"
      aria-label="Fabric and Manufacturing Metrics"
    >
      {/* Magic UI Ambient Dot Pattern */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1}
        className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      />

      <dl className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* Metric 1: Weight */}
        <BlurFade delay={0.05} inView>
          <div>
            <dt className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-1">
              WEIGHT
            </dt>
            <dd className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter flex items-baseline">
              <NumberTicker value={480} />
              <span className="text-xl md:text-2xl font-mono text-neutral-500 ml-1">GSM</span>
            </dd>
            <dd className="text-xs text-neutral-600 leading-relaxed font-sans">
              Heavyweight loopback fleece on every garment. It holds its heavy drape and structural shape after fifty washes.
            </dd>
          </div>
        </BlurFade>

        {/* Metric 2: Run Size */}
        <BlurFade delay={0.1} inView>
          <div>
            <dt className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-1">
              RUN SIZE
            </dt>
            <dd className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter flex items-baseline">
              <NumberTicker value={150} />
              <span className="text-xl md:text-2xl font-mono text-neutral-500 ml-1">UNITS</span>
            </dd>
            <dd className="text-xs text-neutral-600 leading-relaxed font-sans">
              Units per colour per drop. When it is gone it goes directly to the archive vault. No restocks.
            </dd>
          </div>
        </BlurFade>

        {/* Metric 3: Combed Cotton */}
        <BlurFade delay={0.15} inView>
          <div>
            <dt className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-1">
              COTTON BIO-WASH
            </dt>
            <dd className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter flex items-baseline">
              <NumberTicker value={100} />
              <span className="text-xl md:text-2xl font-mono text-neutral-500 ml-0.5">%</span>
            </dd>
            <dd className="text-xs text-neutral-600 leading-relaxed font-sans">
              Pre-shrunk 100% bio-washed super-combed cotton built to withstand countless research sprints.
            </dd>
          </div>
        </BlurFade>

        {/* Metric 4: Returns */}
        <BlurFade delay={0.2} inView>
          <div>
            <dt className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-1">
              RETURNS & EXCHANGES
            </dt>
            <dd className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter flex items-baseline">
              <NumberTicker value={30} />
              <span className="text-xl md:text-2xl font-mono text-neutral-500 ml-1">DAYS</span>
            </dd>
            <dd className="text-xs text-neutral-600 leading-relaxed font-sans">
              Days to return or swap a size. Complimentary shipping across India on all orders over ₹999.
            </dd>
          </div>
        </BlurFade>
      </dl>
    </section>
  );
};

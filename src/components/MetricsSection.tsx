import React from 'react';

export const MetricsSection: React.FC = () => {
  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-neutral-300"
      data-purpose="metrics-and-specifications"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* Metric 1: Weight */}
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            WEIGHT
          </span>
          <p className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter">
            480
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            GSM loopback fleece on every hood. It holds its heavy drape and structural shape after fifty washes.
          </p>
        </div>

        {/* Metric 2: Run Size */}
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            RUN SIZE
          </span>
          <p className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter">
            150
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Units per colour per drop. When it is gone it goes directly to the archive vault. No restocks.
          </p>
        </div>

        {/* Metric 3: Made In */}
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            MADE IN
          </span>
          <p className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter">
            PT
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Cut and sewn in Porto by a family-owned craft factory we visit every single production cycle.
          </p>
        </div>

        {/* Metric 4: Returns */}
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            RETURNS
          </span>
          <p className="text-4xl md:text-6xl font-black font-display text-neutral-950 mb-2 tracking-tighter">
            30
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Days to return or swap a size. Complimentary shipping inside India, Canada, and the US.
          </p>
        </div>
      </div>
    </section>
  );
};

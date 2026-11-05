import React from 'react';

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  smallLabel?: string;
  mainTitle: string;
  mainSubtitle: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Reusable card for a single FAQ item matching Traitist's streetwear aesthetic.
 */
export const FaqCard: React.FC<{
  question: string;
  answer: string;
  category?: string;
  className?: string;
}> = ({ question, answer, category, className = '' }) => {
  return (
    <div
      className={`flex flex-col justify-start p-5 sm:p-6 bg-[#DFDDD7]/50 hover:bg-[#DFDDD7]/80 rounded-sm border border-neutral-300/80 hover:border-neutral-900 transition-all duration-200 w-[290px] sm:w-[350px] md:w-[390px] flex-shrink-0 text-left select-none ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
          {category || 'PHD COLLECTION // ARCHIVE'}
        </span>
      </div>
      <h3 className="font-display font-bold text-sm sm:text-base text-neutral-950 tracking-tight leading-snug">
        {question}
      </h3>
      <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-2">
        {answer}
      </p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller: React.FC<{
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
  className?: string;
}> = ({ children, speed = '40s', direction = 'left', className = '' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className={`w-full overflow-hidden group relative scroller-mask py-1 ${className}`}>
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-4 sm:gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-4 sm:gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
export const FaqSection: React.FC<{
  data: FaqData;
  className?: string;
}> = ({ data, className = '' }) => {
  return (
    <section
      className={`relative flex flex-col gap-6 sm:gap-7 py-8 sm:py-10 w-full max-w-7xl mx-auto px-4 md:px-8 overflow-hidden ${className}`}
    >
      {/* Sleek, Store-Consistent Section Header (Matches ProductGrid layout, removes oversized landing-page hero block) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-300 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-semibold">
              {data.smallLabel || 'THE IMPORTANT STUFF · NO PEER REVIEW REQUIRED'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-neutral-950 uppercase leading-tight">
            {data.mainTitle}
          </h2>
        </div>
        <p className="text-xs text-neutral-600 font-sans max-w-md sm:text-right leading-relaxed">
          {data.mainSubtitle}
        </p>
      </div>

      {/* 2 Continuous Horizontal Scroller Rows */}
      <div className="flex flex-col gap-3.5 sm:gap-4 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id || item.question}
                question={item.question}
                answer={item.answer}
                category={item.category}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;


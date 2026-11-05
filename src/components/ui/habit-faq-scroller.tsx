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
      className={`flex flex-col justify-start p-6 sm:p-7 bg-white/95 rounded-sm border border-neutral-300 hover:border-black shadow-xs hover:shadow-md transition-all duration-300 w-[300px] sm:w-[380px] md:w-[420px] flex-shrink-0 text-left select-none ${className}`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5722] font-bold">
          {category || 'DROP 01 // ARCHIVE'}
        </span>
      </div>
      <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 tracking-tight leading-snug">
        {question}
      </h3>
      <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2.5">
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
    <section className={`relative flex flex-col items-center gap-8 sm:gap-10 py-12 sm:py-16 w-full max-w-7xl mx-auto px-4 overflow-hidden ${className}`}>
      <div className="flex flex-col items-center text-center z-10 max-w-2xl px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#FF5722] font-bold">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-neutral-950 uppercase tracking-tight leading-tight">
          {data.mainTitle}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-2.5 leading-relaxed max-w-xl">
          {data.mainSubtitle}
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6 z-10 w-full">
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


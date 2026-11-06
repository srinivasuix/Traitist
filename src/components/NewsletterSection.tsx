import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { WordRotate } from './magicui/word-rotate';
import { DotPattern } from './magicui/dot-pattern';
import { BlurFade } from './magicui/blur-fade';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section
      className="relative max-w-3xl mx-auto px-4 pt-10 sm:pt-14 pb-12 sm:pb-16 text-center overflow-hidden"
      data-purpose="newsletter-subscription"
      id="newsletter"
    >
      {/* Magic UI Ambient Background with subtle edge fade */}
      <DotPattern
        width={22}
        height={22}
        cx={1}
        cy={1}
        cr={1}
        className="opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)]"
      />

      <div className="relative z-10">
        <BlurFade delay={0.05} inView>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-semibold">
              P.S. THIS EMAIL IS ACTUALLY IMPORTANT.
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-neutral-950 mb-2.5 leading-tight max-w-2xl mx-auto">
            Your Inbox Deserves Better Than Supervisor Emails.
          </h2>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed font-sans">
            Get 24-hour early access, exclusive drop codes and first dibs on limited releases. Finally, an email worth opening.
          </p>
        </BlurFade>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="max-w-md mx-auto p-4 bg-[#DFDDD7] rounded-sm border border-neutral-300 flex items-center justify-center gap-2 text-xs font-mono text-neutral-900 animate-fade-in"
          >
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
              <Check className="w-3 h-3 text-[#10B981]" aria-hidden="true" />
            </div>
            <span>ACCEPTED! YOUR INBOX DESERVES BETTER THAN SUPERVISOR EMAILS.</span>
          </div>
        ) : (
          <BlurFade delay={0.2} inView>
            <form
              className="max-w-md mx-auto flex items-center bg-[#DFDDD7] rounded-sm p-1 border border-neutral-300 focus-within:border-black transition-colors min-h-[46px]"
              onSubmit={handleSubmit}
            >
              <label htmlFor="newsletter-email" className="visually-hidden">
                Your email address goes here
              </label>
              <input
                id="newsletter-email"
                className="bg-transparent border-0 flex-grow min-w-0 px-3.5 sm:px-5 py-2.5 text-xs text-neutral-900 placeholder-neutral-500 focus:ring-0 focus:outline-none font-mono"
                placeholder="Your email address goes here"
                type="email"
                autoComplete="email"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                className="bg-black text-white text-xs font-mono font-semibold uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-sm hover:bg-[#FF5722] transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.97] cursor-pointer min-h-[44px] shrink-0"
                type="submit"
              >
                COUNT ME IN →
              </button>
            </form>
          </BlurFade>
        )}

        {error && (
          <p id="newsletter-error" role="alert" className="text-[11px] font-mono text-[#FF5722] mt-2">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

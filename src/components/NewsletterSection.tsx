import React, { useState } from 'react';
import { Check } from 'lucide-react';

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
      className="max-w-4xl mx-auto px-4 py-24 text-center"
      data-purpose="newsletter-subscription"
      id="archive"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2 font-semibold">
        THE LIST
      </span>
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-neutral-950 uppercase mb-4 leading-none">
        JOIN THE LIST
      </h2>
      <p className="text-xs md:text-sm text-neutral-600 max-w-md mx-auto mb-8 leading-relaxed font-sans">
        Early access 24 hours before every drop, the drop date first, and nothing else. No discount spam.
      </p>

      {submitted ? (
        <div className="max-w-md mx-auto p-4 bg-[#DFDDD7] rounded-full border border-neutral-300 flex items-center justify-center gap-2 text-xs font-mono text-neutral-900 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
            <Check className="w-3 h-3 text-[#10B981]" />
          </div>
          <span>YOU'RE ON THE LIST FOR DROP 04. 24H ACCESS INCOMING.</span>
        </div>
      ) : (
        <form
          className="max-w-md mx-auto flex items-center bg-[#DFDDD7] rounded-full p-1 border border-neutral-300 focus-within:border-black transition-colors"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-transparent border-0 flex-grow px-5 py-2.5 text-xs text-neutral-900 placeholder-neutral-500 focus:ring-0 focus:outline-none"
            placeholder="Email address for 24h early access"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
          />
          <button
            className="bg-black text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-neutral-800 transition cursor-pointer"
            type="submit"
          >
            JOIN
          </button>
        </form>
      )}

      {error && <p className="text-[11px] font-mono text-[#FF5722] mt-2">{error}</p>}
    </section>
  );
};

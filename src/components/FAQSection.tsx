import React from 'react';
import { Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionStreamingContent,
} from '@/components/ui/accordion-generative-utils/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'sizing',
    question: 'How do TRAITIST T-shirts fit?',
    answer:
      'Our T-shirts feature an intentional, boxy drop-shoulder fit. Order your standard size for a relaxed streetwear silhouette, or size down if you prefer a closer, traditional fit.',
  },
  {
    id: 'fabric',
    question: 'What fabric and weight do you use?',
    answer:
      'Every tee is cut from heavyweight 200 GSM 100% combed cotton jersey. It is pre-shrunk and bio-washed to maintain its structural drape and softness after repeated wear.',
  },
  {
    id: 'care',
    question: 'How should I wash and care for my T-shirt?',
    answer:
      'Machine wash cold inside out with similar colours, and line dry in the shade. Never iron directly over the graphic print.',
  },
  {
    id: 'shipping',
    question: 'When will my order ship and arrive?',
    answer:
      'Orders ship within [1–2 business days] of confirmation, with standard delivery taking [3–5 business days] across India. You will receive tracking details via email and SMS once your package is dispatched.',
  },
  {
    id: 'returns',
    question: 'What is your return or exchange policy?',
    answer:
      'We offer hassle-free size exchanges within [7 days] of delivery for unwashed, unworn tees with tags intact. If you need a different size, reach out to [support@traitist.com] to initiate an exchange.',
  },
  {
    id: 'launch-offer',
    question: 'How long is the ₹799 introductory price valid?',
    answer:
      'The ₹799 price (regularly ₹899) is an exclusive launch offer reserved for Drop 01 orders until initial quantities sell out. Once the first drop closes, standard pricing will apply.',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      aria-label="Frequently Asked Questions"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-12 border-b border-neutral-300 pb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 bg-[#F05A28] shrink-0" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F05A28] font-bold">
            COMMON INQUIRIES
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-neutral-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-mono text-neutral-600">
          Quick answers about our fit, fabric, orders, and the First Drop.
        </p>
      </div>

      {/* Generative Streaming Accordion List */}
      <Accordion
        type="single"
        collapsible
        defaultValue="sizing"
        className="w-full divide-y divide-neutral-200 border-y border-neutral-200"
      >
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border-b border-neutral-200 last:border-b-0"
          >
            <AccordionTrigger className="py-5 hover:no-underline group">
              <span className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-neutral-900 group-hover:text-[#F05A28] transition-colors pr-4">
                <Sparkles
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#F05A28] opacity-75 group-hover:opacity-100 transition-opacity"
                  strokeWidth={2}
                />
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionStreamingContent
              text={faq.answer}
              speed={12}
              className="pb-5 pr-8 text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed"
            />
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

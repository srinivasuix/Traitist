import React from 'react';
import FaqSection, { FaqData } from './ui/habit-faq-scroller';

const TRAITIST_FAQ_DATA: FaqData = {
  smallLabel: 'THE IMPORTANT STUFF · NO PEER REVIEW REQUIRED',
  mainTitle: "QUESTIONS? WE'VE DONE THE HOMEWORK.",
  mainSubtitle:
    'Everything you need to know about our tees, fits, fabric, prints, shipping and returns. No supervisor approval required.',
  rows: [
    {
      id: 'row-craftsmanship',
      speed: '46s',
      direction: 'left',
      faqItems: [
        {
          id: 'q1-fit',
          category: '01 · FIT // THE COMFORT ZONE',
          question: 'How do your T-shirts fit?',
          answer:
            'Made for a relaxed, oversized streetwear look with an intentional boxy drop-shoulder cut. Stick to your usual size for relaxed thesis-writing comfort, or size down for a closer fit.',
        },
        {
          id: 'q2-fabric',
          category: '02 · FABRIC // THE GOOD STUFF',
          question: 'What are your T-shirts made of?',
          answer:
            'We use heavyweight 200 GSM, 100% combed cotton jersey. Each tee is pre-shrunk and bio-washed for empirical durability that comfortably outlasts long overnight lab marathons.',
        },
        {
          id: 'q3-print',
          category: '03 · PRINT // MADE TO LAST',
          question: 'Will the prints fade or crack?',
          answer:
            'Our designs are crafted using premium high-density printing techniques for vibrant, detailed graphics. Follow the cold-wash protocol and your graphics will outlive your dissertation revisions.',
        },
        {
          id: 'q8-care',
          category: '08 · CARE // RESEARCH UNIFORM',
          question: 'How should I wash my graphic tee?',
          answer:
            'Turn inside out before washing in cold water with similar colours. Avoid bleach or harsh detergents, line dry away from harsh sun, and never iron directly over the graphic print.',
        },
      ],
    },
    {
      id: 'row-service-delivery',
      speed: '48s',
      direction: 'right',
      faqItems: [
        {
          id: 'q4-size',
          category: '04 · SIZE // THE RIGHT FIT',
          question: 'What if I order the wrong size?',
          answer:
            'No need for a thesis-level investigation. We offer hassle-free size exchanges within 7 days of delivery on eligible unworn products with tags intact. Contact our support team to get started.',
        },
        {
          id: 'q5-price',
          category: '05 · PRICE // THE FIRST DROP',
          question: 'Why is the launch price ₹799?',
          answer:
            'Because your first PhD streetwear obsession deserves an accessible introduction. The PhD Collection is available at ₹799 (regularly ₹899) for a limited launch period or until launch stock runs out.',
        },
        {
          id: 'q6-shipping',
          category: '06 · SHIPPING // THE WAITING GAME',
          question: 'When will my order be shipped?',
          answer:
            'We aim to dispatch orders within 1–2 business days after confirmation. Delivery typically takes 3–5 business days across India with complimentary express shipping on all orders.',
        },
        {
          id: 'q7-tracking',
          category: "07 · ORDER TRACKING // WHERE'S MY TEE?",
          question: 'How can I track my order?',
          answer:
            "Your tee is on its way, not caught in an academic backlog. Once dispatched, we'll send a live tracking link via email and SMS so you can monitor its progress in real time.",
        },
      ],
    },
  ],
};

export const FAQSection: React.FC = () => {
  return (
    <div id="faq" className="w-full">
      <FaqSection data={TRAITIST_FAQ_DATA} />
    </div>
  );
};


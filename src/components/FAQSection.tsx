import React from 'react';
import FaqSection, { FaqData } from './ui/habit-faq-scroller';

const TRAITIST_FAQ_DATA: FaqData = {
  mainTitle: 'FREQUENTLY ASKED QUESTIONS',
  mainSubtitle:
    'Drop 01 fit details, heavyweight 200 GSM cotton jersey specifications, order tracking timelines, and hassle-free size exchanges.',
  rows: [
    {
      id: 'row-fit-fabric',
      speed: '42s',
      direction: 'left',
      faqItems: [
        {
          id: 'sizing',
          category: 'FIT // BOXY DROP-SHOULDER',
          question: 'How do TRAITIST T-shirts fit?',
          answer:
            'Our T-shirts feature an intentional, boxy drop-shoulder cut. Order your standard size for a relaxed streetwear drape, or size down if you prefer a closer, traditional fit.',
        },
        {
          id: 'fabric',
          category: 'FABRIC // 200 GSM COTTON',
          question: 'What fabric and weight do you use?',
          answer:
            'Every tee is cut from heavyweight 200 GSM 100% combed cotton jersey. It is pre-shrunk and bio-washed to maintain its structural drape and softness after repeated wear.',
        },
        {
          id: 'print-durability',
          category: 'PRINT // HIGH-DENSITY',
          question: 'How durable are the graphic prints?',
          answer:
            'We use premium discharge and high-density screen printing engineered to flex with 200 GSM cotton jersey without cracking, peeling, or fading over time.',
        },
      ],
    },
    {
      id: 'row-shipping-returns',
      speed: '48s',
      direction: 'right',
      faqItems: [
        {
          id: 'shipping',
          category: 'DISPATCH // 1-2 BUSINESS DAYS',
          question: 'When will my order ship and arrive?',
          answer:
            'Orders ship within 1–2 business days of confirmation, with standard delivery taking 3–5 business days across India. Real-time tracking links are sent via email and SMS.',
        },
        {
          id: 'returns',
          category: 'EXCHANGE // 7-DAY WINDOW',
          question: 'What is your return or exchange policy?',
          answer:
            'We offer hassle-free size exchanges within 7 days of delivery for unwashed, unworn tees with tags intact. Reach out to support@traitist.com to initiate.',
        },
        {
          id: 'launch-offer',
          category: 'PRICE // SPECIAL DROP OFFER',
          question: 'How long is the ₹799 introductory price valid?',
          answer:
            'The ₹799 price (regularly ₹899) is an exclusive launch offer reserved for Drop 01 orders until initial quantities sell out. Once the first drop closes, standard pricing will apply.',
        },
      ],
    },
    {
      id: 'row-care-community',
      speed: '44s',
      direction: 'left',
      faqItems: [
        {
          id: 'care',
          category: 'CARE // COLD WASH ONLY',
          question: 'How should I wash and care for my T-shirt?',
          answer:
            'Machine wash cold inside out with similar colours, and line dry in the shade. Never iron directly over the graphic print to maintain the high-density ink texture.',
        },
        {
          id: 'packaging',
          category: 'ARCHIVAL // KRAFT UNBOXING',
          question: 'How are orders packaged and shipped?',
          answer:
            'Every tee arrives in a custom matte protective sleeve and sealed kraft box, complete with collectible PhD stickers and an authenticity packing slip.',
        },
        {
          id: 'early-access',
          category: 'DROP // PASSCODES',
          question: 'How do I get early access to future drops?',
          answer:
            'Subscribe to our newsletter below or save items to your wishlist to receive private drop passcodes 2 hours before public releases.',
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

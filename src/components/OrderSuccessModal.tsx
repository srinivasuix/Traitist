import React from 'react';
import { Check, X, ArrowRight, Package, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BorderBeam } from './magicui/border-beam';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  customerEmail?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId = 'TR-' + Math.floor(100000 + Math.random() * 900000),
  customerEmail,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-success-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-md bg-[#ECEBE6] rounded-sm p-6 sm:p-7 shadow-2xl border border-neutral-300 text-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-200/60 transition cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Panda Order Successful Illustration */}
            <div className="w-48 sm:w-56 mx-auto overflow-hidden rounded-2xl mb-4 border border-neutral-300/80 shadow-md bg-white">
              <img
                src="/images/empty-states/order-success.jpg"
                alt="Order Successful!"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                PAYMENT CONFIRMED
              </span>
            </div>

            <h2
              id="order-success-title"
              className="text-2xl font-display font-black uppercase tracking-tight text-neutral-900"
            >
              Order Confirmed!
            </h2>

            <div className="mt-2 inline-flex items-center gap-2 bg-neutral-200/70 border border-neutral-300 px-3 py-1 rounded font-mono text-xs text-neutral-800">
              <span className="text-neutral-500">REF:</span>
              <span className="font-bold text-black">{orderId}</span>
            </div>

            <p className="mt-3 text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed max-w-xs mx-auto">
              Your heavyweight 200 GSM streetwear is officially queued for crafting and express delivery across India.
              {customerEmail && (
                <span className="block mt-1 text-[11px] font-mono text-neutral-500">
                  Confirmation sent to <span className="text-neutral-800 font-bold">{customerEmail}</span>
                </span>
              )}
            </p>

            {/* Confidence Strip */}
            <div className="mt-5 p-3 rounded-sm bg-white/70 border border-neutral-200 text-left flex items-center gap-3">
              <Package className="w-5 h-5 text-[#FF5722] shrink-0" aria-hidden="true" />
              <div className="text-[11px] font-mono text-neutral-700 leading-snug">
                <span className="font-bold text-neutral-900 block uppercase">DISPATCH WITHIN 24–48 HRS</span>
                <span>Tracking details will be shared via WhatsApp & SMS.</span>
              </div>
            </div>

            {/* Action Button with Magic UI BorderBeam */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="relative overflow-hidden w-full bg-neutral-950 hover:bg-[#FF5722] text-white py-3.5 px-6 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ease-out shadow-md cursor-pointer flex items-center justify-center gap-2 group min-h-[48px]"
              >
                <BorderBeam size={80} duration={8} colorFrom="#FF5722" colorTo="#ffffff" />
                <span className="relative z-10">CONTINUE EXPLORING</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  hasBagButton?: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, hasBagButton = true }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`fixed ${
            hasBagButton ? 'bottom-[74px] sm:bottom-[82px]' : 'bottom-5 sm:bottom-6'
          } right-4 sm:right-6 mb-[env(safe-area-inset-bottom,0px)] z-50 flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded shadow-2xl border border-neutral-700 font-mono text-xs max-w-[calc(100vw-2rem)] select-none`}
        >
          <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-black stroke-[3]" aria-hidden="true" />
          </div>
          <span className="font-medium tracking-wide truncate max-w-[240px] sm:max-w-xs md:max-w-sm">
            {message}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-neutral-400 hover:text-white transition cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center -mr-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



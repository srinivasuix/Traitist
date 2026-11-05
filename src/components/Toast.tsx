import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed bottom-6 inset-x-0 mb-[env(safe-area-inset-bottom,0px)] z-50 flex justify-center px-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="pointer-events-auto flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded shadow-2xl border border-neutral-700 font-mono text-xs max-w-full"
          >
            <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-black stroke-[3]" aria-hidden="true" />
            </div>
            <span className="font-medium tracking-wide truncate max-w-[280px] sm:max-w-md">{message}</span>
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
    </div>
  );
};


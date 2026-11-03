import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

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

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded shadow-2xl border border-neutral-700 font-mono text-xs animate-slide-up">
      <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
        <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
      </div>
      <span className="font-medium tracking-wide">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-neutral-400 hover:text-white transition cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center select-none"
    >
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Panda 404 Illustration */}
        <div className="w-56 sm:w-64 mb-6 hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center">
          <img
            src="/images/empty-states/404-not-found.png"
            alt="Page Not Found - 404"
            className="w-full h-auto drop-shadow-md select-none pointer-events-none"
          />
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 bg-[#FF5722] shrink-0" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FF5722] font-bold">
            ERROR 404 // NOT FOUND
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-neutral-900">
          Lost in the Archives?
        </h1>

        <p className="mt-2 text-xs sm:text-sm font-sans text-neutral-600 max-w-sm leading-relaxed">
          The piece or page you are looking for does not exist, has been archived, or moved during collection updates.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
          <button
            type="button"
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-950 hover:bg-[#FF5722] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>RETURN TO STOREFRONT</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onGoHome();
              setTimeout(() => {
                const el = document.getElementById('shop');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full sm:w-auto px-6 py-3 border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-700" aria-hidden="true" />
            <span>BROWSE DROP 01</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};


import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface WishlistHeartButtonProps {
  isWishlisted: boolean;
  onToggle: (e: React.MouseEvent) => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WishlistHeartButton: React.FC<WishlistHeartButtonProps> = ({
  isWishlisted,
  onToggle,
  title = 'product',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.82 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(e);
      }}
      aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
      aria-pressed={isWishlisted}
      className={`relative rounded-full bg-white/90 backdrop-blur-sm border border-black/10 hover:bg-white flex items-center justify-center transition-colors z-10 cursor-pointer shadow-xs active:shadow-none select-none ${sizeClasses[size]} ${className}`}
    >
      {/* Subtle expanding ping pulse when favorited */}
      <AnimatePresence>
        {isWishlisted && (
          <motion.span
            key="wishlist-ping"
            initial={{ scale: 0.7, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-[#FF5722] pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Animated Heart Icon */}
      <motion.div
        key={isWishlisted ? 'liked' : 'unliked'}
        initial={{
          scale: isWishlisted ? 0.7 : 1.15,
        }}
        animate={{
          scale: isWishlisted ? [0.7, 1.38, 0.92, 1.05, 1] : [1.15, 0.78, 1],
          rotate: isWishlisted ? [0, -12, 8, -4, 0] : [0, 8, -6, 0],
        }}
        transition={{
          duration: isWishlisted ? 0.42 : 0.28,
          ease: 'easeOut',
        }}
        className="flex items-center justify-center"
      >
        <Heart
          className={`${iconSizes[size]} transition-colors duration-200 ${
            isWishlisted
              ? 'fill-[#FF5722] text-[#FF5722] drop-shadow-[0_2px_8px_rgba(255,87,34,0.35)]'
              : 'text-neutral-700 hover:text-black'
          }`}
          aria-hidden="true"
        />
      </motion.div>
    </motion.button>
  );
};


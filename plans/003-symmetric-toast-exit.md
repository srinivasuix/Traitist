# 003 — Symmetric Toast Exit Transition

- **Status**: TODO
- **Commit**: 520a677
- **Severity**: MEDIUM
- **Category**: Spatial consistency & Physicality
- **Estimated scope**: 1 file (`src/components/Toast.tsx`), ~25 lines changed

## Problem

The toast notification (`src/components/Toast.tsx`) currently enters using a CSS slide-up animation (`animate-slide-up`). However, when the user dismisses it or when the 3.2-second timeout triggers, `Toast` abruptly vanishes from the screen because of an immediate `if (!message) return null;` unmount check. This creates an asymmetric spatial path (smooth entrance from the bottom, but a teleporting disappear).

```tsx
/* src/components/Toast.tsx:18-26 — current */
if (!message) return null;

return (
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded shadow-2xl border border-neutral-700 font-mono text-xs animate-slide-up"
  >
```

## Target

Retain `<AnimatePresence>` inside `Toast.tsx` so the notification exits symmetrically along the same spatial edge it entered:
- **Entrance**: `opacity: 0 → 1`, `translateY: 16px → 0px`, `scale: 0.96 → 1` over `220ms cubic-bezier(0.23, 1, 0.32, 1)`
- **Exit**: `opacity: 1 → 0`, `translateY: 0px → 14px`, `scale: 1 → 0.96` over `180ms cubic-bezier(0.23, 1, 0.32, 1)`
- **Symmetric motion**: Never scale to 0. Animate along the bottom-right anchor origin.
- **Accessibility**: Use `useReducedMotion()`. When active, eliminate translation offsets and use pure opacity crossfades.

Target code pattern:
```tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const shouldReduceMotion = useReducedMotion();

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
          key="toast-banner"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 16,
            scale: shouldReduceMotion ? 1 : 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 14,
            scale: shouldReduceMotion ? 1 : 0.96,
            transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
          }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-black text-white px-4 py-3 rounded shadow-2xl border border-neutral-700 font-mono text-xs origin-bottom-right"
        >
          <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-black stroke-[3]" aria-hidden="true" />
          </div>
          <span className="font-medium tracking-wide">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-neutral-400 hover:text-white transition cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

## Repo conventions to follow

- Motion library: `motion/react` provides `<AnimatePresence>` and `motion.div`.
- Easing: Uses the Emil Kowalski standard `[0.23, 1, 0.32, 1]` curve and subtle `scale(0.96)` rather than `scale(0)`.
- Replaces legacy CSS class `animate-slide-up` with accelerated motion transitions.

## Steps

1. **Import motion dependencies**:
   In `src/components/Toast.tsx`, add `import { motion, AnimatePresence, useReducedMotion } from 'motion/react';`.
2. **Remove early return guard**:
   Remove `if (!message) return null;` so that `<AnimatePresence>` can intercept the unmounting of `{message && <motion.div ...>}`.
3. **Wrap toast layout in `AnimatePresence`**:
   Replace outer `div` with `<motion.div>` carrying `initial`, `animate`, `exit`, and `origin-bottom-right`.
4. **Remove `animate-slide-up`**:
   Remove the CSS class `animate-slide-up` from the toast wrapper to avoid conflicting with Framer Motion transforms.

## Boundaries

- Do NOT change toast positioning (`fixed bottom-6 right-6 z-50`), background colors, typography, or icons.
- Do NOT alter props or caller logic in `src/App.tsx`.
- Do NOT change the auto-dismiss timeout from 3200ms.

## Verification

- **Mechanical**:
  - Run `npm run build` and ensure TypeScript and Vite build succeed with zero errors.
- **Feel check**:
  - Add an item to the cart or wishlist to trigger a toast.
  - Observe entrance: slides up smoothly from bottom-right (220ms).
  - Click the '×' button to dismiss early:
    - Toast smoothly slides back down and fades out (180ms) instead of vanishing immediately.
  - Wait for the 3200ms auto-dismiss:
    - Confirm the toast executes the same symmetric exit animation.
  - In DevTools (set Animations to 10% speed): verify exit does not snap or flash.
  - Emulate `prefers-reduced-motion: reduce`: confirm toast fades in and out with opacity only (no vertical translation).
- **Done when**: The toast enters and exits smoothly with symmetric spatial paths.


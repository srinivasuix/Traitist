# 002 — Smooth Cart Item Removal Exit and Layout Transition

- **Status**: TODO
- **Commit**: 520a677
- **Severity**: HIGH
- **Category**: Missed opportunities & Spatial consistency
- **Estimated scope**: 1 file (`src/components/CartDrawer.tsx`), ~20 lines changed

## Problem

When a user removes an item from the cart (either by clicking the trash icon or decrementing the quantity to zero), the item's card unmounts instantly from the DOM. All subsequent items teleport upward instantaneously with a jarring vertical snap.

```tsx
/* src/components/CartDrawer.tsx:418-426 — current */
<div className="space-y-3">
  {items.map((item) => {
    const unitPrice = item.product.priceINR;

    return (
      <div
        key={`${item.product.id}-${item.size}`}
        className="flex items-center gap-3.5 p-3 bg-white rounded-md border border-neutral-200 shadow-2xs"
      >
```

## Target

Wrap the cart item list in `AnimatePresence` and make each cart item a `motion.div` with `layout` and an exit animation. When an item is removed, it collapses gracefully:
- **Exit transform & scale**: `opacity: 0`, `scale: 0.96`, `height: 0`, `marginBottom: 0`, `paddingTop: 0`, `paddingBottom: 0`, `overflow: "hidden"`
- **Exit duration & easing**: `duration: 0.22`, `ease: [0.23, 1, 0.32, 1]` (matches `--ease-out` token)
- **Sibling reflow**: Sibling items smoothly slide up into position via `layout transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}`
- **Accessibility**: Use `useReducedMotion()` from `motion/react` to drop positional movement and rely strictly on opacity fade when reduced motion is preferred.

Target code pattern:
```tsx
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// Inside CartDrawer component:
const shouldReduceMotion = useReducedMotion();

// In the items list render:
<div className="space-y-3">
  <AnimatePresence initial={false}>
    {items.map((item) => {
      const unitPrice = item.product.priceINR;

      return (
        <motion.div
          key={`${item.product.id}-${item.size}`}
          layout={!shouldReduceMotion}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 0.96,
            height: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
          }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-3.5 p-3 bg-white rounded-md border border-neutral-200 shadow-2xs overflow-hidden"
        >
          {/* Card contents remain identical */}
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>
```

## Repo conventions to follow

- Motion library: `motion/react` is already used in `src/App.tsx`, `src/components/ProductDetailPage.tsx`, and `src/components/ReceiptPrinter.tsx`.
- Timing & Easing: `duration: 0.22` (220ms) and `ease: [0.23, 1, 0.32, 1]` match the standard Emil Kowalski curve in `src/index.css`.
- Accessibility: Respect `useReducedMotion()` imported from `motion/react` as demonstrated in `src/components/ReceiptPrinter.tsx:1`.

## Steps

1. **Import `motion`, `AnimatePresence`, and `useReducedMotion`**:
   In `src/components/CartDrawer.tsx`, add `import { motion, AnimatePresence, useReducedMotion } from 'motion/react';`.
2. **Read reduced motion preference**:
   Inside `CartDrawer`, initialize `const shouldReduceMotion = useReducedMotion();`.
3. **Wrap cart items in `AnimatePresence` and replace outer `div` with `motion.div`**:
   Surround `items.map(...)` with `<AnimatePresence initial={false}>`. Replace the item wrapper `<div key=...>` with `<motion.div key=... layout={!shouldReduceMotion} ...>`. Ensure `overflow-hidden` is present on the `motion.div` so height collapse is clipped cleanly.

## Boundaries

- Do NOT change the cart summary, promo code, or recommended products carousel sections in `CartDrawer.tsx`.
- Do NOT alter cart state logic in `src/App.tsx`.
- Do NOT introduce any external physics or gesture dependencies.

## Verification

- **Mechanical**:
  - Run `npm run build` to verify TypeScript types and Vite bundle compilation.
- **Feel check**:
  - Open the cart drawer with 2 or more items.
  - Click the trash icon on the first item:
    - The item smoothly fades and collapses downwards/inwards (`scale: 0.96`, `opacity: 0`, `height: 0`) over 220ms.
    - Sibling items below smoothly glide upward into their new positions rather than jumping instantly.
  - In DevTools Animations tab (set to 10% speed): verify there are no sub-pixel layout glitches or scroll jumps during the collapse.
  - Emulate `prefers-reduced-motion: reduce`: verify items fade out instantly/cleanly without height/scale motion.
- **Done when**: Cart items exit with a 220ms ease-out collapse and subsequent items reflow smoothly without visual snapping.


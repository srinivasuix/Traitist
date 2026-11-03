# Animation Implementation Plans

This directory contains prioritized, self-contained animation improvement plans created following Emil Kowalski's motion and design engineering principles ([emilkowal.ski](https://emilkowal.ski/)).

Every plan is stamped with the commit at authoring time (`520a677`), references verbatim code excerpts with exact `file:line` locations, specifies exact cubic-bezier curves and millisecond durations, and includes both mechanical and slow-motion feel-check criteria.

## Plans Index

| # | Plan | Severity | Category | Status | Dependencies |
|---|------|----------|----------|--------|--------------|
| 001 | [001 — Smooth Product Detail Accordion Disclosures](./001-smooth-product-accordions.md) | **HIGH** | Missed opportunities & Interruptibility | `TODO` | None |
| 002 | [002 — Smooth Cart Item Removal Exit and Layout Transition](./002-smooth-cart-item-exit.md) | **HIGH** | Missed opportunities & Spatial consistency | `TODO` | None |
| 003 | [003 — Symmetric Toast Exit Transition](./003-symmetric-toast-exit.md) | **MEDIUM** | Spatial consistency & Physicality | `TODO` | None |
| 004 | [004 — Tactile Community Like Reaction Pop](./004-tactile-community-like-pop.md) | **LOW** | Feedback & Delight | `TODO` | None |

## Recommended Execution Order

1. **Plan 001 — Smooth Product Detail Accordion Disclosures**
   - **Target:** [`src/components/ProductDetailPage.tsx`](../src/components/ProductDetailPage.tsx)
   - Eliminates the most severe layout snap on the storefront by replacing boolean conditional rendering with hardware-accelerated CSS Grid `grid-template-rows: 0fr -> 1fr` and smooth `rotate-45` on `<Plus />`.
2. **Plan 002 — Smooth Cart Item Removal Exit and Layout Transition**
   - **Target:** [`src/components/CartDrawer.tsx`](../src/components/CartDrawer.tsx)
   - Removes the jarring vertical jump when items are removed from the bag using `AnimatePresence` and `layout` reflow.
3. **Plan 003 — Symmetric Toast Exit Transition**
   - **Target:** [`src/components/Toast.tsx`](../src/components/Toast.tsx)
   - Completes the spatial story for notifications by giving toasts an exit path that mirrors their entrance.
4. **Plan 004 — Tactile Community Like Reaction Pop**
   - **Target:** [`src/index.css`](../src/index.css) & [`src/components/CommunitySection.tsx`](../src/components/CommunitySection.tsx)
   - Micro-interaction delight: adds a spring-like 220ms scale pop to the heart button.

## How to Execute

To execute any plan with an automated agent or assistant, run:
```bash
# Execute a single plan
improve-animations execute plans/001-smooth-product-accordions.md
improve-animations execute plans/002-smooth-cart-item-exit.md
improve-animations execute plans/003-symmetric-toast-exit.md
improve-animations execute plans/004-tactile-community-like-pop.md
```
Or simply tell the assistant: *"Execute plan 001"* (or *"Execute all plans"*).

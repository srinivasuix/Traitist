# 004 — Tactile Community Like Reaction Pop

- **Status**: TODO
- **Commit**: 520a677
- **Severity**: LOW
- **Category**: Feedback & Delight
- **Estimated scope**: 2 files (`src/index.css`, `src/components/CommunitySection.tsx`), ~15 lines changed

## Problem

In the "Tagged on Street" community section (`src/components/CommunitySection.tsx`), clicking the heart button toggles the like count and switches the fill color of `<Heart />` between white and orange (`#FF5722`). However, there is no physical feedback or micro-interaction when liking an outfit; the color change is completely flat and static.

```tsx
/* src/components/CommunitySection.tsx:71-78 — current */
<Heart
  className={`w-3 h-3 ${
    hasLiked[item.handle]
      ? 'fill-[#FF5722] text-[#FF5722]'
      : 'text-white'
  }`}
  aria-hidden="true"
/>
```

## Target

Introduce a crisp, spring-like scale pop animation on the heart icon when the user likes a look:
- **Scale curve**: `scale(1) → scale(1.28) → scale(1)`
- **Duration**: `220ms`
- **Easing curve**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (provides a subtle haptic pop without layout shift)
- **Transform origin**: `center`
- **Reduced motion**: Honor `prefers-reduced-motion` by disabling the scale transform and retaining the instant color change.

Target CSS definition (to be placed in `src/index.css`):
```css
@keyframes heart-pop {
  0% { transform: scale(1); }
  45% { transform: scale(1.28); }
  100% { transform: scale(1); }
}

.animate-heart-pop {
  animation: heart-pop 220ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (prefers-reduced-motion: reduce) {
  .animate-heart-pop {
    animation: none;
  }
}
```

Target JSX in `src/components/CommunitySection.tsx`:
```tsx
<Heart
  className={`w-3 h-3 transition-colors duration-150 ${
    hasLiked[item.handle]
      ? 'fill-[#FF5722] text-[#FF5722] animate-heart-pop'
      : 'text-white'
  }`}
  aria-hidden="true"
/>
```

## Repo conventions to follow

- Keyframe declarations live in `src/index.css` (e.g. `marquee`, `border-beam`, `shimmer-slide` at lines 60-95).
- Button feedback: The button itself already has `:active { transform: scale(0.975); }` from `src/index.css:32-35`. The heart icon pop triggers on active like state.
- Colors: Traitist orange accent `#FF5722` and white text.

## Steps

1. **Add keyframes to `src/index.css`**:
   Add `@keyframes heart-pop` and `.animate-heart-pop` class to `src/index.css` under the existing keyframes block.
2. **Apply `.animate-heart-pop` to the active heart**:
   In `src/components/CommunitySection.tsx:71`, attach `animate-heart-pop` when `hasLiked[item.handle]` is true.
3. **Verify color transition smoothness**:
   Add `transition-colors duration-150` so that un-liking smoothly reverts color without jarring color clipping.

## Boundaries

- Do NOT change the layout or grid sizing of `CommunitySection.tsx`.
- Do NOT modify the follower handles, photos, or like counts.
- Keep the animation confined strictly to the icon (`transform` and `fill`), ensuring zero parent reflow.

## Verification

- **Mechanical**:
  - Run `npm run build` to confirm zero CSS syntax or JSX compilation issues.
- **Feel check**:
  - Scroll down to the **"Tagged on Street"** community section.
  - Click the heart button on any outfit:
    - The heart icon performs a snappy, tactile pop (`1.0 → 1.28 → 1.0`) in 220ms.
    - The button container does not jump in height or width.
    - Clicking again cleanly un-likes the item without delayed bounce.
  - In DevTools (set Animations to 10% speed): confirm transform scales outward from the center of the icon and eases back to 1.
  - Emulate `prefers-reduced-motion: reduce`: confirm the heart fills with color instantly without scaling.
- **Done when**: Clicking like triggers a crisp 220ms tactile pop on the heart icon.


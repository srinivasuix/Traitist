# 001 — Smooth Product Detail Accordion Disclosures

- **Status**: TODO
- **Commit**: 520a677
- **Severity**: HIGH
- **Category**: Missed opportunities & Interruptibility
- **Estimated scope**: 1 file (`src/components/ProductDetailPage.tsx`), ~80 lines

## Problem

On the product detail view (`src/components/ProductDetailPage.tsx`), the accordions for **Description**, **Shipping and Returns**, and **Materials and Care** currently use boolean conditional mounting (`{openAccordions.description && (...)}`). When toggled, the content pops instantly into and out of existence without transition, producing abrupt layout shifts and visual jarring. Furthermore, the indicator icon switches instantly between `<Plus />` and `<X />` rather than transitioning gracefully.

```tsx
/* src/components/ProductDetailPage.tsx:438-468 — current */
<div>
  <button
    type="button"
    onClick={() => handleToggleAccordion('description')}
    aria-expanded={openAccordions.description}
    aria-controls="accordion-panel-description"
    className="w-full py-3.5 flex items-center justify-between text-left text-[11px] font-mono uppercase tracking-wider text-neutral-900 font-bold hover:text-black cursor-pointer"
  >
    <span>DESCRIPTION</span>
    {openAccordions.description ? (
      <X className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
    ) : (
      <Plus className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
    )}
  </button>
  {openAccordions.description && (
    <div id="accordion-panel-description" className="pb-4 text-xs text-neutral-700 font-sans leading-relaxed">
      <p>{product.description}</p>
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-200 font-mono text-[11px]">
        <div>
          <span className="text-neutral-500 text-[9px] block">FABRIC</span>
          <span className="font-semibold text-neutral-900">{product.fabric}</span>
        </div>
        <div>
          <span className="text-neutral-500 text-[9px] block">WEIGHT</span>
          <span className="font-semibold text-neutral-900">{product.gsm} Combed Jersey</span>
        </div>
      </div>
    </div>
  )}
</div>
```

## Target

Keep the accordion panel elements mounted in the DOM to preserve accessibility (`aria-hidden` and `aria-controls`), and animate the height using a hardware-accelerated CSS Grid transition pattern (`grid-template-rows: 0fr -> 1fr`) with `overflow: hidden`. Fade the inner content opacity and smoothly rotate the icon.

Target motion specification:
- **Height transition**: `grid-template-rows 220ms cubic-bezier(0.23, 1, 0.32, 1)`
- **Content fade**: `opacity 180ms ease-out`
- **Icon rotation**: Single `<Plus />` glyph with `transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1) rotate-45` when open.
- **Accessibility / Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)` by bypassing the duration or using instant transitions while retaining opacity feedback.

Target markup pattern:
```tsx
<div>
  <button
    type="button"
    onClick={() => handleToggleAccordion('description')}
    aria-expanded={openAccordions.description}
    aria-controls="accordion-panel-description"
    className="w-full py-3.5 flex items-center justify-between text-left text-[11px] font-mono uppercase tracking-wider text-neutral-900 font-bold hover:text-black cursor-pointer group"
  >
    <span>DESCRIPTION</span>
    <Plus
      className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
        openAccordions.description ? 'rotate-45 text-neutral-900' : 'rotate-0'
      }`}
      aria-hidden="true"
    />
  </button>
  <div
    id="accordion-panel-description"
    aria-hidden={!openAccordions.description}
    className={`grid transition-[grid-template-rows] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
      openAccordions.description ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    }`}
  >
    <div className={`overflow-hidden transition-opacity duration-[180ms] ease-out motion-reduce:transition-none ${
      openAccordions.description ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="pb-4 text-xs text-neutral-700 font-sans leading-relaxed">
        <p>{product.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-200 font-mono text-[11px]">
          <div>
            <span className="text-neutral-500 text-[9px] block">FABRIC</span>
            <span className="font-semibold text-neutral-900">{product.fabric}</span>
          </div>
          <div>
            <span className="text-neutral-500 text-[9px] block">WEIGHT</span>
            <span className="font-semibold text-neutral-900">{product.gsm} Combed Jersey</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Repo conventions to follow

- Cubic-bezier curves: The project uses standard Emil Kowalski curve `cubic-bezier(0.23, 1, 0.32, 1)` for responsive mechanical UI components (e.g. in `src/index.css:23` for tactile button micro-interactions).
- Tailwind utility integration: Tailwind CSS 4 is configured with arbitrary cubic-bezier utilities such as `ease-[cubic-bezier(0.23,1,0.32,1)]` and `duration-[180ms]`.
- Lucide React icon imports: Use `<Plus />` with rotation rather than unmounting `<Plus />` and mounting `<X />`.

## Steps

1. **Update Description Accordion in `src/components/ProductDetailPage.tsx`**:
   Replace conditional `{openAccordions.description && (...)}` with the CSS Grid wrapper `grid transition-[grid-template-rows] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${openAccordions.description ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`. Replace the icon ternary with a single `<Plus />` rotated 45 degrees when open.
2. **Update Shipping and Returns Accordion in `src/components/ProductDetailPage.tsx`**:
   Apply the identical CSS Grid wrapper and icon rotation transition to the `shipping` accordion panel (`id="accordion-panel-shipping"`).
3. **Update Materials and Care Accordion in `src/components/ProductDetailPage.tsx`**:
   Apply the identical CSS Grid wrapper and icon rotation transition to the `care` accordion panel (`id="accordion-panel-care"`).
4. **Clean up unused import if applicable**:
   Check if `<X>` from `'lucide-react'` is still used elsewhere in `ProductDetailPage.tsx`. If it is only used in these accordions, remove it from the imports; otherwise keep it.

## Boundaries

- Do NOT touch other components (`CartDrawer.tsx`, `Navbar.tsx`, `ProductCard.tsx`).
- Do NOT change the product data schema or text copy inside the accordions.
- Do NOT add external dependencies like Framer Motion or Radix Collapsible; use standard CSS Grid zero-layout-overhead approach.
- If the accordion lines in `src/components/ProductDetailPage.tsx` do not match the cited commit (`520a677`), STOP and report drift.

## Verification

- **Mechanical**:
  - Run `npm run build` to verify clean compilation with TypeScript and Vite.
  - Confirm no unused import or JSX syntax errors.
- **Feel check**:
  - Open `http://localhost:3000/` and click any product to navigate to `ProductDetailPage`.
  - Click **DESCRIPTION**, **SHIPPING AND RETURNS**, and **MATERIALS AND CARE**:
    - The section smoothly expands downward without snapping or jumping.
    - The `+` icon rotates smoothly into an `×` with 180ms cubic-bezier transition.
    - Rapidly spam the toggle button: the animation interrupts and cleanly reverses mid-flight without snapping or resetting to zero height.
  - In DevTools Animations panel (set playback to 10%): verify the grid rows expand fluidly without scrollbar flashing.
  - Emulate `prefers-reduced-motion: reduce` in Chrome DevTools: confirm the disclosure toggles immediately without motion while maintaining clean opacity transition.
- **Done when**: All three accordions expand and collapse with 220ms ease-out grid motion and icon rotation, passing `npm run build` with zero errors.


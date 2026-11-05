import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionVariant = "default" | "card";

const AccordionVariantContext = React.createContext<AccordionVariant>("default");

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
};

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = "default", ...props }, ref) => (
  <AccordionVariantContext.Provider value={variant}>
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(variant === "card" ? "space-y-3" : "", className)}
      {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
    />
  </AccordionVariantContext.Provider>
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variant === "card"
          ? "rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-xs px-4 sm:px-5 transition-all duration-200 data-[state=open]:border-neutral-400 dark:data-[state=open]:border-neutral-700 data-[state=open]:shadow-sm"
          : "border-b border-neutral-200 dark:border-neutral-800",
        className
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm sm:text-base font-medium transition-all hover:no-underline text-neutral-900 dark:text-neutral-100 group [&[data-state=open]>svg]:rotate-180",
          variant === "card" ? "py-4 sm:py-4.5" : "py-4",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 group-hover:text-neutral-700 dark:group-hover:text-neutral-300" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionStreamingContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  text: string;
  speed?: number; // ms per char (default: 12)
  startDelay?: number; // ms delay before first char (default: 120)
  caretClassName?: string;
}

const AccordionStreamingContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionStreamingContentProps
>(
  (
    {
      className,
      text,
      speed = 12,
      startDelay = 120,
      caretClassName,
      ...props
    },
    ref
  ) => {
    const [displayedLength, setDisplayedLength] = React.useState(0);
    const [isStreaming, setIsStreaming] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      // Check reduced motion preference
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setDisplayedLength(text.length);
        setIsStreaming(false);
        return;
      }

      setDisplayedLength(0);
      setIsStreaming(true);

      let timeoutId: ReturnType<typeof setTimeout>;
      let currentLength = 0;

      const typeNextChar = () => {
        if (currentLength >= text.length) {
          setIsStreaming(false);
          return;
        }

        currentLength += 1;
        setDisplayedLength(currentLength);

        const currentChar = text[currentLength - 1];
        let delay = speed;

        // Punctuation adds natural conversational cadence
        if (currentChar === "." || currentChar === "!" || currentChar === "?") {
          delay += 100;
        } else if (currentChar === "," || currentChar === ";" || currentChar === ":") {
          delay += 50;
        }

        timeoutId = setTimeout(typeNextChar, delay);
      };

      const startTimeout = setTimeout(typeNextChar, startDelay);

      return () => {
        clearTimeout(startTimeout);
        clearTimeout(timeoutId);
      };
    }, [text, speed, startDelay]);

    return (
      <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
      >
        <div className={cn("pb-4 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed", className)}>
          {/* Layout space reservation: full copy renders invisibly so container height stays rock solid */}
          <div className="relative" ref={containerRef}>
            <div className="invisible select-none pointer-events-none" aria-hidden="true">
              {text}
            </div>

            {/* Live stream layer displaying characters with trailing caret */}
            <div className="absolute inset-0" aria-live="polite">
              {text.slice(0, displayedLength)}
              {isStreaming && (
                <span
                  className={cn(
                    "inline-block w-1.5 h-3.5 bg-violet-500 dark:bg-violet-400 ml-0.5 animate-pulse align-middle rounded-[1px]",
                    caretClassName
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </AccordionPrimitive.Content>
    );
  }
);
AccordionStreamingContent.displayName = "AccordionStreamingContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionStreamingContent,
};

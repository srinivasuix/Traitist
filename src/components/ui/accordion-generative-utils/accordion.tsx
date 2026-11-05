"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  variant?: "default" | "card";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "default",
});

type AccordionProps = (
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps
) & {
  variant?: "default" | "card";
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <AccordionContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(variant === "card" ? "space-y-3" : "", className)}
        {...(props as any)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  )
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variant === "card"
          ? "rounded-lg border border-neutral-200 bg-white/70 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-900/60 px-4"
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
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 text-neutral-600 dark:text-neutral-400", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

interface AccordionStreamingContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionContent> {
  text: string;
  speed?: number;
  startDelay?: number;
}

const AccordionStreamingContent = React.forwardRef<
  React.ElementRef<typeof AccordionContent>,
  AccordionStreamingContentProps
>(({ text, speed = 12, startDelay = 150, className, ...props }, ref) => {
  const [displayedLength, setDisplayedLength] = React.useState(0);
  const [isStreaming, setIsStreaming] = React.useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(text.length);
      setIsStreaming(false);
      return;
    }

    setDisplayedLength(0);
    setIsStreaming(true);

    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextChar = (delay: number) => {
      timeoutId = setTimeout(() => {
        currentIndex++;
        setDisplayedLength(currentIndex);

        if (currentIndex < text.length) {
          const char = text[currentIndex - 1];
          // Punctuation adds an extra natural pause beat
          let nextDelay = speed;
          if (char === "." || char === "?" || char === "!") {
            nextDelay = speed * 8;
          } else if (char === "," || char === ";" || char === ":") {
            nextDelay = speed * 4;
          }
          scheduleNextChar(nextDelay);
        } else {
          setIsStreaming(false);
        }
      }, delay);
    };

    const initialTimeout = setTimeout(() => {
      scheduleNextChar(speed);
    }, startDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay, prefersReducedMotion]);

  const displayedText = prefersReducedMotion
    ? text
    : text.slice(0, displayedLength);
  const isDone = displayedLength >= text.length || prefersReducedMotion;

  return (
    <AccordionContent ref={ref} className={className} {...props}>
      <div className="grid grid-cols-1">
        {/* Full invisible copy underneath reserves exact container height to prevent layout jumps */}
        <div
          className="col-start-1 row-start-1 invisible select-none pointer-events-none"
          aria-hidden="true"
        >
          {text}
        </div>

        {/* Visible streaming output with trailing caret */}
        <div className="col-start-1 row-start-1" aria-hidden="true">
          <span>{displayedText}</span>
          {!isDone && (
            <span
              className="inline-block w-[2px] h-[1em] bg-violet-500 dark:bg-violet-400 animate-pulse ml-0.5 align-middle"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Accessible full text for assistive technology / screen readers */}
        <span className="sr-only">{text}</span>
      </div>
    </AccordionContent>
  );
});
AccordionStreamingContent.displayName = "AccordionStreamingContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionStreamingContent,
};

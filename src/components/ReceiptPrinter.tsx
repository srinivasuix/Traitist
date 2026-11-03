import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import {
  Check,
  CheckCircle2,
  Download,
  Copy,
  Home,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '../helpers/classname-helper';
import { CartItem } from './CartDrawer';
import { BRAND_LOGO_URL, BRAND_LOGO_SVG } from '../data/products';

export type ReceiptPrinterStage = 'processing' | 'printing' | 'complete';
export type ReceiptFeedMotion = 'smooth' | 'stepped';

export interface ReceiptPrinterRootProps
  extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  animate?: boolean;
  children: ReactNode;
  feedMotion?: ReceiptFeedMotion;
  stage: ReceiptPrinterStage;
}

export type ReceiptPrinterMachineProps = ComponentPropsWithoutRef<'div'>;
export type ReceiptPrinterHeaderProps = ComponentPropsWithoutRef<'div'>;
export type ReceiptPrinterScreenProps = ComponentPropsWithoutRef<'div'>;
export type ReceiptPrinterOutputProps = ComponentPropsWithoutRef<'div'>;
export type ReceiptPrinterPaperProps = Omit<HTMLMotionProps<'article'>, 'children'> & {
  children?: ReactNode;
};

export interface ReceiptPrinterStatusProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: ReactNode;
}

interface ReceiptPrinterContextValue {
  animate: boolean;
  feedMotion: ReceiptFeedMotion;
  shouldMove: boolean;
  stage: ReceiptPrinterStage;
}

const ReceiptPrinterContext = createContext<ReceiptPrinterContextValue | null>(null);

function useReceiptPrinterContext() {
  const context = useContext(ReceiptPrinterContext);
  if (!context) {
    throw new Error('ReceiptPrinter subcomponents must be used within a ReceiptPrinter.Root');
  }
  return context;
}

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

// Authentic thermal receipt serrated tear edge clip-path
const receiptToothCount = 38;
const receiptToothDepth = 4;
const receiptToothPoints = Array.from(
  { length: receiptToothCount * 2 },
  (_, index) => {
    const x = 100 - ((index + 1) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? '100%' : `calc(100% - ${receiptToothDepth}px)`;
    return `${x}% ${y}`;
  },
).join(', ');

export const receiptClipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${receiptToothDepth}px), ${receiptToothPoints})`;

// Mechanical stepped extrusion feed keyframes
const printingTransformKeyframes = [
  'translateY(calc(-100% + 4px))',
  'translateY(calc(-85% + 4px))',
  'translateY(calc(-70% + 4px))',
  'translateY(calc(-55% + 4px))',
  'translateY(calc(-40% + 4px))',
  'translateY(calc(-25% + 4px))',
  'translateY(calc(-10% + 4px))',
  'translateY(0%)',
];

// Minimalist 4-pointed star / sparkle icon matching the hardware emblem & receipt logo
export const SparkleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Component: Root                                                            */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterRoot: React.FC<ReceiptPrinterRootProps> = ({
  animate = true,
  children,
  className,
  feedMotion = 'smooth',
  stage,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldMove = animate && !prefersReducedMotion;

  return (
    <ReceiptPrinterContext.Provider
      value={{
        animate,
        feedMotion,
        shouldMove,
        stage,
      }}
    >
      <section
        className={cn('relative flex flex-col items-center justify-start w-full', className)}
        {...props}
      >
        {children}
      </section>
    </ReceiptPrinterContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Machine                                                         */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterMachine: React.FC<ReceiptPrinterMachineProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative z-20 w-full max-w-[360px] sm:max-w-[380px] rounded-[28px] bg-[#1c1c1e] p-4 sm:p-5 shadow-2xl border border-neutral-800 text-white select-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Header                                                          */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterHeader: React.FC<ReceiptPrinterHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Screen (Inner Recessed Console)                                 */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterScreen: React.FC<ReceiptPrinterScreenProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mt-3 bg-[#242426] rounded-2xl p-4 sm:p-5 border border-white/5 flex items-center justify-between',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Status                                                          */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterStatus: React.FC<ReceiptPrinterStatusProps> = ({
  children,
  className,
  ...props
}) => {
  const { stage } = useReceiptPrinterContext();

  if (children) {
    return (
      <div className={cn('flex items-center gap-2', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 mt-3 text-emerald-400', className)} {...props}>
      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[#1c1c1e] shrink-0">
        <Check className="w-2.5 h-2.5 stroke-[3]" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-white/90">
        {stage === 'processing'
          ? 'Processing order...'
          : stage === 'printing'
          ? 'Printing receipt...'
          : 'Order complete'}
      </span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Output Slot                                                     */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterOutput: React.FC<ReceiptPrinterOutputProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative z-10 w-[90%] max-w-[340px] -mt-1 overflow-hidden pt-1 pb-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Component: Paper                                                           */
/* -------------------------------------------------------------------------- */
export const ReceiptPrinterPaper: React.FC<ReceiptPrinterPaperProps> = ({
  children,
  className,
  ...props
}) => {
  const { stage, feedMotion, shouldMove } = useReceiptPrinterContext();

  const variants = {
    processing: {
      y: 'calc(-100% + 4px)',
      opacity: 0.5,
    },
    printing: {
      y: shouldMove && feedMotion === 'stepped' ? printingTransformKeyframes : '0%',
      opacity: 1,
      transition: {
        duration: shouldMove ? 2.2 : 0,
        ease: (feedMotion === 'stepped' ? 'linear' : easeInOut) as any,
      },
    },
    complete: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldMove ? 0.35 : 0,
        ease: easeOut as any,
      },
    },
  };

  return (
    <motion.article
      initial="processing"
      animate={stage}
      variants={variants}
      style={{
        clipPath: receiptClipPath,
      }}
      className={cn(
        'receipt-printable relative w-full bg-white text-neutral-900 px-5 sm:px-6 pt-6 pb-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.22)] border-t border-neutral-200 select-text font-mono text-xs',
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
};

/* Compound Export */
export const ReceiptPrinter = {
  Root: ReceiptPrinterRoot,
  Machine: ReceiptPrinterMachine,
  Header: ReceiptPrinterHeader,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
};

/* -------------------------------------------------------------------------- */
/* Traitist Custom High-Level Receipt Component                               */
/* -------------------------------------------------------------------------- */
export interface TraitistReceiptOrderData {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  promoCode?: string;
  shipping: number;
  grandTotal: number;
  currency: 'INR' | 'USD';
  paymentMethod: 'upi' | 'cod' | 'card';
  deliveryAddress?: string;
}

interface TraitistReceiptPrinterProps {
  orderData: TraitistReceiptOrderData;
  onContinueShopping: () => void;
  className?: string;
}

export const TraitistReceiptPrinter: React.FC<TraitistReceiptPrinterProps> = ({
  orderData,
  onContinueShopping,
  className,
}) => {
  const [stage, setStage] = useState<ReceiptPrinterStage>('processing');
  const [copied, setCopied] = useState(false);

  // Automatic sequence: processing (1.0s) -> printing (2.2s) -> complete
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    if (stage === 'processing') {
      t1 = setTimeout(() => {
        setStage('printing');
      }, 1000);
    } else if (stage === 'printing') {
      t2 = setTimeout(() => {
        setStage('complete');
      }, 2200);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  const handleReplay = () => {
    setStage('processing');
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const formatPrice = (val: number) => {
    return orderData.currency === 'INR' ? `₹${val.toLocaleString()}` : `$${val.toFixed(2)}`;
  };

  // Formatted date string matching Image 1: "11 AUG 2026 · 14:32"
  const formatDateString = (timestamp: string) => {
    const d = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} · ${hours}:${mins}`;
  };

  // Derive order title and subtitle
  const firstItem = orderData.items[0];
  const primaryTitle = firstItem ? firstItem.product.title : 'Traitist Heavyweight Tee';
  const primarySubtitle =
    orderData.items.length > 1
      ? `${orderData.items.length} items · Heavyweight 240 GSM`
      : firstItem
      ? `Size: ${firstItem.size} · Heavyweight 240 GSM`
      : 'Heavyweight Wearable Resilience';

  // Short order code for barcode label e.g. "ORD-2048" or "TRT-5975"
  const numericSuffix = orderData.orderId.replace(/[^0-9]/g, '').slice(-4) || '2048';
  const orderDisplayCode = `ORD-${numericSuffix}`;

  return (
    <div className={cn('w-full flex flex-col items-center py-2 sm:py-3', className)}>
      {/* Printer Apparatus matching Image 1 */}
      <ReceiptPrinter.Root stage={stage} feedMotion="smooth" className="w-full max-w-[360px] sm:max-w-[380px]">
        {/* Sleek Hardware Console */}
        <ReceiptPrinter.Machine>
          {/* Header Bar: Traitist Brand Logo on Left, Home button on Right */}
          <ReceiptPrinter.Header>
            <div className="h-8 px-2.5 rounded-lg bg-[#2c2c2e] border border-white/10 flex items-center justify-center shadow-sm">
              <img
                src={BRAND_LOGO_SVG}
                alt="Traitist"
                className="h-3.5 w-auto object-contain filter invert"
              />
            </div>

            <button
              type="button"
              onClick={onContinueShopping}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#38383a] active:scale-95 text-neutral-200 text-xs font-medium cursor-pointer transition shadow-sm border border-white/5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </ReceiptPrinter.Header>

          {/* Inner Recessed Card */}
          <ReceiptPrinter.Screen>
            <div className="pr-3 text-left">
              <h3 className="text-white font-semibold text-base sm:text-lg leading-snug line-clamp-1">
                {primaryTitle}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                {primarySubtitle}
              </p>

              {/* Order complete badge */}
              <ReceiptPrinter.Status />
            </div>

            {/* Total Section */}
            <div className="text-right shrink-0">
              <span className="text-xs text-neutral-400 font-normal block mb-0.5">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                {formatPrice(orderData.grandTotal)}
              </span>
            </div>
          </ReceiptPrinter.Screen>

          {/* Dispenser Slot Slit */}
          <div className="relative mt-4">
            <div className="h-2.5 bg-[#0b0b0d] rounded-full mx-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)] border-t border-black border-b border-white/10" />
          </div>
        </ReceiptPrinter.Machine>

        {/* Paper Dispenser Output emerging from slot */}
        <ReceiptPrinter.Output>
          <ReceiptPrinter.Paper>
            {/* Top Brand Logo: Clean Transparent SVG Vector Logo */}
            <div className="flex justify-center pt-1 pb-1">
              <img
                src={BRAND_LOGO_SVG}
                alt="TRAITIST - Threads of Resilience"
                className="h-9 sm:h-10 w-auto max-w-[200px] object-contain"
              />
            </div>

            {/* Dashed Separator */}
            <div className="border-t border-dashed border-neutral-300 my-4" />

            {/* Item Breakdown matching Image 1 */}
            <div className="space-y-3 font-mono">
              {orderData.items.map((item, idx) => {
                const itemPrice =
                  orderData.currency === 'INR'
                    ? item.product.priceINR
                    : item.product.priceUSD;
                return (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-neutral-900 uppercase">
                      <span className="truncate max-w-[200px]">{item.product.title}</span>
                      <span>{formatPrice(itemPrice * item.quantity)}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Size {item.size} {item.quantity > 1 ? `· Qty: ${item.quantity}` : ''} · Heavyweight
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dashed Separator */}
            <div className="border-t border-dashed border-neutral-300 my-4" />

            {/* Subtotal & Tax Breakdown */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(orderData.subtotal)}</span>
              </div>

              {orderData.discountAmount > 0 && (
                <div className="flex justify-between text-neutral-800">
                  <span>Discount ({orderData.promoCode || 'PROMO'})</span>
                  <span>-{formatPrice(orderData.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Tax</span>
                <span>
                  {orderData.shipping === 0 ? formatPrice(0) : formatPrice(orderData.shipping)}
                </span>
              </div>

              {/* TOTAL PAID bold line */}
              <div className="flex justify-between font-bold text-neutral-950 pt-3 text-xs sm:text-sm">
                <span>TOTAL PAID</span>
                <span>{formatPrice(orderData.grandTotal)}</span>
              </div>
            </div>

            {/* Dashed Separator */}
            <div className="border-t border-dashed border-neutral-300 my-4" />

            {/* Order Details Metadata */}
            <div className="space-y-1.5 font-mono text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order</span>
                <span className="font-semibold text-neutral-900">{orderDisplayCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Paid with</span>
                <span className="text-neutral-800">
                  {orderData.paymentMethod === 'upi'
                    ? 'UPI •••• 8821'
                    : orderData.paymentMethod === 'card'
                    ? 'Visa •••• 4242'
                    : 'Cash on Delivery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date</span>
                <span className="text-neutral-800">{formatDateString(orderData.timestamp)}</span>
              </div>
            </div>

            {/* Barcode Section matching Image 1 */}
            <div className="mt-6 flex flex-col items-center">
              <div className="w-full flex justify-center py-1">
                <svg
                  className="h-10 w-52 max-w-full"
                  viewBox="0 0 200 40"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0" y="0" width="3" height="36" />
                  <rect x="5" y="0" width="1.5" height="36" />
                  <rect x="8" y="0" width="4" height="36" />
                  <rect x="14" y="0" width="2" height="36" />
                  <rect x="18" y="0" width="1" height="36" />
                  <rect x="22" y="0" width="4.5" height="36" />
                  <rect x="29" y="0" width="2" height="36" />
                  <rect x="33" y="0" width="1" height="36" />
                  <rect x="37" y="0" width="4" height="36" />
                  <rect x="43" y="0" width="2" height="36" />
                  <rect x="47" y="0" width="3" height="36" />
                  <rect x="52" y="0" width="1" height="36" />
                  <rect x="55" y="0" width="5" height="36" />
                  <rect x="62" y="0" width="2" height="36" />
                  <rect x="67" y="0" width="1" height="36" />
                  <rect x="70" y="0" width="4" height="36" />
                  <rect x="76" y="0" width="3" height="36" />
                  <rect x="81" y="0" width="1" height="36" />
                  <rect x="84" y="0" width="5" height="36" />
                  <rect x="91" y="0" width="2" height="36" />
                  <rect x="95" y="0" width="4" height="36" />
                  <rect x="101" y="0" width="1" height="36" />
                  <rect x="104" y="0" width="3" height="36" />
                  <rect x="109" y="0" width="2" height="36" />
                  <rect x="113" y="0" width="5" height="36" />
                  <rect x="120" y="0" width="1" height="36" />
                  <rect x="123" y="0" width="4" height="36" />
                  <rect x="129" y="0" width="2" height="36" />
                  <rect x="133" y="0" width="3" height="36" />
                  <rect x="138" y="0" width="1" height="36" />
                  <rect x="141" y="0" width="5" height="36" />
                  <rect x="148" y="0" width="2" height="36" />
                  <rect x="152" y="0" width="4" height="36" />
                  <rect x="158" y="0" width="1" height="36" />
                  <rect x="161" y="0" width="3" height="36" />
                  <rect x="166" y="0" width="2" height="36" />
                  <rect x="170" y="0" width="5" height="36" />
                  <rect x="177" y="0" width="2" height="36" />
                  <rect x="181" y="0" width="1" height="36" />
                  <rect x="184" y="0" width="4" height="36" />
                  <rect x="190" y="0" width="2" height="36" />
                  <rect x="194" y="0" width="3" height="36" />
                </svg>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 mt-1 uppercase">
                ORD {numericSuffix}
              </span>
            </div>
          </ReceiptPrinter.Paper>
        </ReceiptPrinter.Output>
      </ReceiptPrinter.Root>

      {/* Action Utilities below the printer */}
      <div className="w-full max-w-[340px] mt-4 space-y-2 px-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="py-2.5 px-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer border border-neutral-300"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrintSlip}
            className="py-2.5 px-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer border border-neutral-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Slip</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-widest font-bold rounded-lg hover:bg-neutral-800 transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="flex items-center justify-center pt-1 text-[11px] font-mono text-neutral-500">
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-1 hover:text-black transition cursor-pointer underline underline-offset-2"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Replay Print Animation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

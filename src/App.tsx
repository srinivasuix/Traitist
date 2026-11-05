import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroRotator } from './components/HeroRotator';
import { ProductGrid } from './components/ProductGrid';
import { CampaignBanner } from './components/CampaignBanner';
import { CommunitySection } from './components/CommunitySection';
import { MetricsSection } from './components/MetricsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';
import { Preloader } from './components/Preloader';
import { Product, CATALOG_PRODUCTS, ROTATOR_PRODUCTS } from './data/products';
import { BorderBeam } from './components/magicui/border-beam';
import Lenis from 'lenis';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial sample cart item for preview experience
    return [
      {
        product: CATALOG_PRODUCTS[0],
        size: 'L',
        quantity: 1,
      },
    ];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(['cat-01', 'cat-02']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutDirectly, setIsCheckoutDirectly] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Darkroom Engineering Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Sync hash routing for dedicated product page (#/product/:id) and #cart
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash === '#cart') {
        setIsCartOpen(true);
        return;
      }
      if (hash.startsWith('#/product/')) {
        const id = hash.replace('#/product/', '');
        const allProds = [...CATALOG_PRODUCTS, ...ROTATOR_PRODUCTS];
        const found = allProds.find(
          (p) =>
            p.id === id ||
            p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id.toLowerCase()
        );
        if (found) {
          setSelectedProduct(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (!hash || hash === '#shop' || hash === '#campaign' || hash === '#archive') {
        setSelectedProduct(null);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSelectProduct = (product: Product) => {
    if (selectedProduct?.id === product.id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedProduct(product);
    window.history.pushState(null, '', `#/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleGoHome = useCallback(() => {
    setSelectedProduct(null);
    if (window.location.hash.startsWith('#/product/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number = 1,
    openDrawer: boolean = false
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, size, quantity }];
      }
    });
    showToast(`Added ${product.title} (Size ${size}) to Bag`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleUpdateSize = (productId: string, oldSize: string, newSize: string) => {
    if (oldSize === newSize) return;
    setCartItems((prev) => {
      const targetItem = prev.find(
        (item) => item.product.id === productId && item.size === oldSize
      );
      if (!targetItem) return prev;

      const existingWithNewSizeIndex = prev.findIndex(
        (item) => item.product.id === productId && item.size === newSize
      );

      if (existingWithNewSizeIndex > -1) {
        // Merge quantities into existing item with newSize
        return prev
          .map((item, idx) => {
            if (idx === existingWithNewSizeIndex) {
              return { ...item, quantity: item.quantity + targetItem.quantity };
            }
            if (item.product.id === productId && item.size === oldSize) {
              return null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];
      } else {
        // Update size of the target item
        return prev.map((item) =>
          item.product.id === productId && item.size === oldSize
            ? { ...item, size: newSize }
            : item
        );
      }
    });
    showToast(`Updated size to ${newSize}`);
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
    showToast('Removed item from bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.title} from Wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.title} to Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Resolve all wishlisted products
  const allProducts = [...CATALOG_PRODUCTS, ...ROTATOR_PRODUCTS];
  const wishlistedProducts = wishlistIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen bg-[#ECEBE6] text-[#111111] flex flex-col antialiased selection:bg-black selection:text-white">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-xs focus:font-mono focus:outline-none"
      >
        Skip to main content
      </a>

      {/* 0. Editorial Preloader Screen */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* 1. Announcement Ticker Bar */}
      <AnnouncementBar />

      {/* 2. Top Header Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area: Dedicated Product Page OR Homepage with Simple Clean Transition */}
      <AnimatePresence mode="wait">
        {selectedProduct ? (
          <motion.main
            key={`product-page-${selectedProduct.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="main-content"
            tabIndex={-1}
            className="flex-grow focus:outline-none"
          >
            <ProductDetailPage
              product={selectedProduct}
              onBack={handleGoHome}
              onAddToCart={handleAddToCart}
              onInstantBuy={(prod, size, qty) => {
                handleAddToCart(prod, size, qty);
                setIsCheckoutDirectly(true);
                setIsCartOpen(true);
              }}
              isWishlisted={wishlistIds.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
          </motion.main>
        ) : (
          <motion.main
            key="homepage-feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="main-content"
            tabIndex={-1}
            className="flex-grow focus:outline-none"
          >
            <h1 className="visually-hidden">TRAITIST — Streetwear Studios SS26</h1>
            {/* 3. Hero 3D Rotator Showcase */}
            <HeroRotator
              onSelectProduct={handleSelectProduct}
            />

            {/* 4. Product Catalog Grid ("Latest pieces") */}
            <ProductGrid
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
              onSelectProduct={handleSelectProduct}
            />

            {/* 5. Campaign Banner ("MADE FOR THE LONG NIGHT.") */}
            <CampaignBanner
              onExploreCollection={() => {
                const el = document.getElementById('shop');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 6. Community Feed ("Worn by you") */}
            <CommunitySection />

            {/* 8. Specifications & Metrics (480 GSM, 150 Run size, etc.) */}
            <MetricsSection />

            {/* 9. Join The List Newsletter Section */}
            <NewsletterSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* 10. Main Footer */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Floating Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        initialCheckout={isCheckoutDirectly}
        onClose={() => {
          setIsCartOpen(false);
          setIsCheckoutDirectly(false);
        }}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateSize={handleUpdateSize}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Floating Sticky Cart Trigger (Accessible anytime from any section) with Magic UI BorderBeam */}
      {!isCartOpen && cartItems.length > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`View Shopping Bag with ${cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} items`}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 mb-[env(safe-area-inset-bottom,0px)] z-40 w-auto max-w-fit inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 min-h-[44px] bg-[#111111] hover:bg-[#FF5722] text-white rounded-sm shadow-2xl border border-neutral-700/60 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95 group overflow-hidden"
        >
          <BorderBeam size={60} duration={6} colorFrom="#FF5722" colorTo="#ffffff" />
          <div className="relative z-10 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" aria-hidden="true" />
            <span className="absolute -top-1.5 -right-2 bg-[#FF5722] group-hover:bg-white group-hover:text-black text-white text-[9px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-bold font-mono">
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </div>
          <span className="relative z-10 tracking-wider">
            BAG • ₹{cartItems.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0).toLocaleString()}
          </span>
        </button>
      )}

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

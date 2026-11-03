import { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroRotator } from './components/HeroRotator';
import { ProductGrid } from './components/ProductGrid';
import { CampaignBanner } from './components/CampaignBanner';
import { LookbookSection } from './components/LookbookSection';
import { CommunitySection } from './components/CommunitySection';
import { MetricsSection } from './components/MetricsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';
import { Product, CATALOG_PRODUCTS, ROTATOR_PRODUCTS } from './data/products';

export default function App() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-scroll smooth behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleToggleCurrency = () => {
    const next = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(next);
    showToast(`Switched currency to ${next === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`);
  };

  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
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
      {/* 1. Announcement Ticker Bar */}
      <AnnouncementBar />

      {/* 2. Top Header Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* 3. Hero 3D Rotator Showcase */}
      <main className="flex-grow">
        <HeroRotator
          currency={currency}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 4. Product Catalog Grid ("Latest pieces") */}
        <ProductGrid
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 5. Campaign Banner ("MADE FOR THE LONG NIGHT.") */}
        <CampaignBanner
          onExploreLookbook={() => {
            const el = document.getElementById('lookbook');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Editorial Lookbook Section */}
        <LookbookSection />

        {/* 7. Community Feed ("Worn by you") */}
        <CommunitySection />

        {/* 8. Specifications & Metrics (480 GSM, 150 Run size, etc.) */}
        <MetricsSection />

        {/* 9. Join The List Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 10. Main Footer */}
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Floating Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

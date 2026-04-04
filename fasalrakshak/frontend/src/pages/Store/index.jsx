import React, { useEffect, useMemo, useState } from 'react';
import StoreHeader from './StoreHeader';
import SearchFilterBar from './SearchFilterBar';
import RecommendedBanner from './RecommendedBanner';
import ExpertHelpBanner from './ExpertHelpBanner';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import StoreCart from './StoreCart';
import useStoreProducts from '../../hooks/useStoreProducts';
import { useLanguage } from '../../context/LanguageContext';

const CART_STORAGE_KEY = 'fasalrakshak_store_cart';
const WHATSAPP_NUMBER = '919979265140';
const quickCategories = ['All', 'Pesticide', 'Fertilizer'];

const defaultFilters = {
  search: '',
  category: 'All',
  maxPrice: 5000,
  minRating: 0,
  location: 'All'
};

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
    <div className="h-48 w-full bg-gray-200" />
    <div className="space-y-3 p-3">
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-100" />
      <div className="h-3 w-5/6 rounded bg-gray-100" />
      <div className="h-8 w-full rounded bg-gray-100" />
    </div>
  </div>
);

const AgriStore = () => {
  const { products, isLive, isLoading } = useStoreProducts();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showStatusBanner, setShowStatusBanner] = useState(true);
  const [toast, setToast] = useState(null);
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setVisibleCount(12);
  }, [filters]);

  const categories = useMemo(() => {
    return quickCategories.filter(category => category === 'All' || products.some(product => product.category === category));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'All' && product.category !== filters.category) return false;
      if (product.price > filters.maxPrice) return false;
      if (product.rating < filters.minRating) return false;
      if (filters.location !== 'All' && product.sellerLocation !== filters.location) return false;
      return true;
    });
  }, [filters, products]);

  const displayedProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);
  const recommendedProducts = useMemo(() => products.filter(product => product.isRecommended).slice(0, 4), [products]);
  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product.inStock) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: Math.min(quantity, 99) }];
    });

    // Show toast feedback
    setToast({ name: product.name, qty: quantity });
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => setToast(null), 2500);
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, 99) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const handleCartCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name}\n  ${lang === 'HI' ? 'मात्रा' : lang === 'GUJ' ? 'જથ્થો' : 'Qty'}: ${item.quantity} | ${lang === 'HI' ? 'कीमत' : lang === 'GUJ' ? 'કિંમત' : 'Price'}: ₹${item.price * item.quantity}`
      )
      .join('\n\n');

    const messages = {
      EN: `NAMASTE FasalRakshak! 🙏\n\nI want to place an order for the following items:\n\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\nTOTAL AMOUNT: ₹${cartTotal}\n━━━━━━━━━━━━━━━━━━━━\n\nPlease confirm my order and let me know the delivery details.`,
      HI: `नमस्ते FasalRakshak! 🙏\n\nमैं निम्नलिखित वस्तुओं का ऑर्डर देना चाहता/चाहती हूँ:\n\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\nकुल राशि: ₹${cartTotal}\n━━━━━━━━━━━━━━━━━━━━\n\nकृपया मेरा ऑर्डर कन्फर्म करें और डिलीवरी की जानकारी दें।`,
      GUJ: `નમસ્તે FasalRakshak! 🙏\n\nહું નીચેની વસ્તુઓ ઓર્ડર કરવા ઇચ્છું છું:\n\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\nકુલ રકમ: ₹${cartTotal}\n━━━━━━━━━━━━━━━━━━━━\n\nકૃપા કરીને મારા ઓર્ડરની પુષ્ટિ કરો અને ડિલિવરીની માહિતી આપો.`,
    };

    const message = encodeURIComponent(messages[lang] || messages.EN);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-green-50/30 pb-12">
      {/* ── Cart Added Toast ── */}
      <div
        className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-4 shadow-2xl transition-all duration-500 ${
          toast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">{t('store.addedToCart')}</p>
          <p className="text-sm font-bold text-white truncate max-w-[200px]">{toast?.name}</p>
        </div>
      </div>

      <StoreHeader />

      {showStatusBanner && isLive && (
        <div className="container mx-auto mt-4 px-4">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 text-sm font-semibold border border-green-200">
            <span className="flex items-center gap-2">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              {t('store.livePrice')}
            </span>
            <button onClick={() => setShowStatusBanner(false)} className="text-xs font-bold uppercase text-green-600 hover:text-green-800">
              {t('store.dismiss')}
            </button>
          </div>
        </div>
      )}

      <SearchFilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories.filter(category => category !== 'All')}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <div className="container mx-auto px-4">
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {quickCategories.map(category => (
            <button
              key={category}
              onClick={() => setFilters(prev => ({ ...prev, category }))}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                filters.category === category
                  ? 'border-primary-green bg-primary-green text-white'
                  : 'border-green-200 bg-white text-primary-green hover:bg-green-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <ExpertHelpBanner />

      <div className="flex-grow">
        {filters.search === '' && filters.category === 'All' && (
          <RecommendedBanner
            recommendedProducts={recommendedProducts}
            onProductSelect={setSelectedProduct}
          />
        )}

        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {filters.search || filters.category !== 'All' ? t('store.searchResults') : t('store.allProducts')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('store.showing')} {filteredProducts.length} {t('store.of')} {products.length} {t('store.products')}
              </p>
            </div>
          </div>

          {isLoading && products.length === 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {displayedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProduct}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>

                {visibleCount < filteredProducts.length && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setVisibleCount(count => count + 12)}
                      className="rounded-xl bg-primary-green px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
                    >
                    {t('store.loadMore')}
                    </button>
                  </div>
                )}
              </div>

              <div className="hidden xl:block self-start sticky top-32">
                <StoreCart
                  cartItems={cartItems}
                  cartCount={cartCount}
                  cartTotal={cartTotal}
                  isDesktop
                  isOpen
                  onCheckout={handleCartCheckout}
                  onQuantityChange={updateCartItemQuantity}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white py-16 text-center">
              <div className="mb-3 text-5xl text-gray-400">Search</div>
              <h3 className="mb-2 text-lg font-bold text-gray-700">{t('store.noProducts')}</h3>
              <p className="text-gray-500">{t('store.noProductsDesc')}</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 font-medium text-primary-green hover:underline"
              >
                {t('store.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <StoreCart
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        onOpen={() => setIsCartOpen(true)}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCartCheckout}
        onQuantityChange={updateCartItemQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  );
};

export default AgriStore;

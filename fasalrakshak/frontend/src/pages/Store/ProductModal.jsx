import React, { useEffect, useState } from 'react';
import {
  Info,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
  CheckCircle,
  Bug,
  Leaf as LeafIcon,
  Droplets
} from 'lucide-react';
import AIProductInsight from './AIProductInsight';
import { useLanguage } from '../../context/LanguageContext';

const categoryIcons = {
  Pesticide: Bug,
  Fertilizer: LeafIcon,
  Seed: Droplets
};

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setQuantity(1);
    setImageError(false);
    setAdded(false);
    setSelectedVariant(null);
  }, [product]);

  if (!product) return null;

  // Auto-generate pack size variants from base weight & price
  const generateVariants = (weight, basePrice) => {
    if (!weight) return null;
    const w = weight.toString().toLowerCase();
    if (w.includes('ml')) {
      const base = parseFloat(w);
      if (!base) return null;
      return [
        { label: `${Math.round(base / 2)} ml`, price: Math.round(basePrice * 0.55) },
        { label: `${base} ml`, price: basePrice },
        { label: `${base * 2} ml`, price: Math.round(basePrice * 1.75) },
      ];
    }
    if (w.includes('l') && !w.includes('ml')) {
      const base = parseFloat(w);
      if (!base) return null;
      return [
        { label: `${base * 500} ml`, price: Math.round(basePrice * 0.55) },
        { label: `${base} L`, price: basePrice },
        { label: `${base * 2} L`, price: Math.round(basePrice * 1.75) },
      ];
    }
    if (w.includes('g') || w.includes('kg')) {
      const isKg = w.includes('kg');
      const base = parseFloat(w);
      if (!base) return null;
      const unit = isKg ? 'kg' : 'g';
      return [
        { label: `${Math.round(base / 2)} ${unit}`, price: Math.round(basePrice * 0.55) },
        { label: `${base} ${unit}`, price: basePrice },
        { label: `${base * 2} ${unit}`, price: Math.round(basePrice * 1.75) },
      ];
    }
    return null;
  };

  const variants = generateVariants(product.specs?.weight, product.price);
  const activeVariant = selectedVariant || (variants ? variants[1] : null);
  const activePrice = activeVariant ? activeVariant.price : product.price;
  const total = activePrice * quantity;
  const CategoryIcon = categoryIcons[product.category] || Bug;
  const displayImage = imageError ? '/products/auth/naa.jpg' : (product.imageUrl || product.image);

  const handleBuyWhatsApp = () => {
    if (!product.inStock) return;
    const waMessages = {
      EN: `Hi, I would like to order ${quantity}x ${product.name}. Total: Rs.${total}.`,
      HI: `नमस्ते, मैं ${quantity}x ${product.name} ऑर्डर करना चाहता/चाहती हूँ। कुल: ₹${total}.`,
      GUJ: `નમસ્તે, હું ${quantity}x ${product.name} ઓર્ડર કરવા ઇચ્છું છું. કુલ: ₹${total}.`,
    };
    const message = encodeURIComponent(waMessages[lang] || waMessages.EN);
    window.open(`https://wa.me/${product.sellerPhone}?text=${message}`, '_blank');
  };

  const handleContactSeller = () => {
    const waMessages = {
      EN: `Hi, I have a question about ${product.name}. Can you help me?`,
      HI: `नमस्ते, मुझे ${product.name} के बारे में एक सवाल है। क्या आप मेरी मदद कर सकते हैं?`,
      GUJ: `નમસ્તે, મને ${product.name} વિશે એક સવાલ છે. શું તમે મને મદદ કરી શકો?`,
    };
    const message = encodeURIComponent(waMessages[lang] || waMessages.EN);
    window.open(`https://wa.me/${product.sellerPhone}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    if (!product.inStock || added) return;
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20 sm:p-6 sm:pb-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur transition-all hover:bg-gray-100 hover:scale-110"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex flex-col lg:flex-row lg:h-[90vh]">
          {/* ── LEFT: Sticky image panel — never scrolls ── */}
          <div className="relative flex-shrink-0 w-full lg:w-[42%] lg:h-full overflow-hidden" style={{ minHeight: '340px' }}>

            {/* BG: Immersive farm background */}
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            {/* Dark gradient overlay — deep green at bottom for glass card */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0d3320]/85" />

            {/* Product image in a beautiful rounded card */}
            <div className="absolute inset-0 bottom-36 flex items-center justify-center p-6">
              <div className="relative h-full w-full max-h-[340px] max-w-[280px] rounded-3xl bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/80 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>

            {/* Category & Badge chips — top left */}
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-lg backdrop-blur-md">
                <CategoryIcon className="h-3.5 w-3.5 text-primary-green" />
                {product.category}
              </div>
              {product.badge && (
                <div className="w-fit rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-900 shadow-lg">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Glass info card — bottom overlay (restored!) */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Product Overview</p>
                <h3 className="mt-1 text-lg font-bold text-white leading-tight">{product.tag || product.category}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/80 line-clamp-2">{product.whyUse}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.specs?.weight && (
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white">{product.specs.weight}</span>
                  )}
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white">{product.season}</span>
                  {product.specs?.applicationMethod && (
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white">{product.specs.applicationMethod}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Scrollable content pane with custom thin scrollbar ── */}
          <div
            className="flex w-full flex-col overflow-y-auto p-5 lg:p-7"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4ade80 transparent',
            }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-xs text-amber-500">/ 5</span>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                {product.reviewCount} reviews
              </span>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {product.inStock ? t('store.inStock') : t('store.outOfStock')}
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">{product.name}</h2>
            {product.tag && (
              <div className="mb-3 inline-flex w-fit rounded-full bg-primary-lightGreen px-3 py-1 text-xs font-semibold text-primary-green">
                {product.tag}
              </div>
            )}
            <p className="mb-5 text-base leading-relaxed text-gray-600">
              {t('store.bestFor')} {product.season} {t('store.season')}</p>

            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="text-3xl font-bold text-gray-900">₹{total}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(current => Math.max(current - 1, 1))}
                  disabled={!product.inStock}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-all hover:bg-gray-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-xl font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(current => Math.min(current + 1, 99))}
                  disabled={!product.inStock}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-green text-white transition-all hover:bg-green-700 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Pack Size Selector */}
            {variants && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">{t('store.packSize')}</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariant(v)}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all duration-200 ${
                        (activeVariant?.label === v.label)
                          ? 'border-primary-green bg-primary-green text-white shadow-md scale-[1.04]'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-primary-green hover:text-primary-green'
                      }`}
                    >
                      {v.label}
                      <span className="ml-1.5 text-[10px] font-semibold opacity-70">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quantity > 1 && (
              <p className="mb-3 text-sm text-gray-400">
                ₹{product.price} × {quantity} = ₹{total}
              </p>
            )}

            <p className="mb-5 text-base leading-relaxed text-gray-600">
              {product.longDescription || product.description}
            </p>

            {product.whyUse && product.whyUse.replace('undefined', '').trim() && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-green-800">
                  <Leaf className="h-5 w-5 text-primary-green" />
                  {t('store.whyUse')}
                </h3>
                <p className="text-sm leading-relaxed text-green-900">{product.whyUse.replace(/\s*undefined\s*/g, ' ').trim()}</p>
              </div>
            )}

            <AIProductInsight product={product} />

            {product.features?.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">{t('store.keyFeatures')}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                <Info className="h-4 w-4 text-primary-green" /> {t('store.specifications')}
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                {[
                  ['Composition', product.specs?.composition || 'Standard'],
                  [t('store.composition'), product.specs?.composition || 'Standard'],
                  [t('store.weight'), product.specs?.weight || 'Standard'],
                  [t('store.dosage'), product.specs?.dosage || 'As per recommendation'],
                  [t('store.application'), product.specs?.applicationMethod || 'Foliar spray']
                ].map(([key, value], index) => (
                  <div key={key} className={`flex ${index !== 0 ? 'border-t border-gray-100' : ''}`}>
                    <div className="w-2/5 bg-gray-100/50 px-4 py-2.5 text-xs font-semibold text-gray-600">
                      {key}
                    </div>
                    <div className="w-3/5 px-4 py-2.5 text-xs text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {product.recommendedCrops && product.recommendedCrops.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">{t('store.recommended_crops')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.recommendedCrops.map(crop => (
                    <span
                      key={crop}
                      className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.usage && Object.keys(product.usage).length > 0 && (
              <div className="mb-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">{t('store.usageGuide')}</h3>
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                  {Object.entries(product.usage).slice(0, 4).map(([crop, value], index) => (
                    <div
                      key={crop}
                      className={`grid grid-cols-[100px_minmax(0,1fr)] gap-3 px-4 py-3 text-xs sm:text-sm ${
                        index !== 0 ? 'border-t border-gray-100' : ''
                      }`}
                    >
                      <div className="font-semibold capitalize text-gray-700">{crop.replace(/_/g, ' ')}</div>
                      <div className="text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 pt-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{product.sellerName}</h4>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    {product.sellerLocation}
                  </div>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex w-full items-center justify-center gap-3 rounded-2xl border-2 px-6 py-4 text-base font-bold transition-all duration-300 ${
                    added
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-primary-green text-primary-green hover:bg-primary-lightGreen hover:scale-[1.02] disabled:border-gray-200 disabled:text-gray-400 disabled:hover:scale-100'
                  }`}
                >
                  {added ? (
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {t('store.addedToCartFull')}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      {t('store.addToCart')}
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyWhatsApp}
                  disabled={!product.inStock}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-[#1fb355] hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('store.buyOnWhatsapp')}
                </button>
              </div>

              <button
                onClick={handleContactSeller}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#25D366] px-6 py-3 text-sm font-bold text-[#1a9e4f] transition-all hover:bg-green-50"
              >
                <MessageCircle className="h-5 w-5" />
                {t('store.contactSeller')}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                {t('store.paymentNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
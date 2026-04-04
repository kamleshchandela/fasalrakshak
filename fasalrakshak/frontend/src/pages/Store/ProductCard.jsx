import React, { useState } from 'react';
import { MapPin, Minus, Plus, ShoppingCart, Star, Leaf, Droplets, Bug, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WhatsappIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const categoryIcons = {
  Pesticide: Bug,
  Fertilizer: Leaf,
  Seed: Droplets,
  'Soil Amendment': Shield,
  'Farm Tools': Shield
};

const badgeClassNames = {
  Bestseller: 'bg-amber-100 text-amber-800',
  New: 'bg-sky-100 text-sky-800',
  Organic: 'bg-emerald-100 text-emerald-800',
  'Budget Pick': 'bg-orange-100 text-orange-800',
  'Premium': 'bg-purple-100 text-purple-800',
  'Popular': 'bg-pink-100 text-pink-800',
  'Combo Deal': 'bg-indigo-100 text-indigo-800',
  'High Potency': 'bg-red-100 text-red-800'
};

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { t, lang } = useLanguage();

  const generateVariants = (weight, basePrice) => {
    if (!weight) return null;
    const w = weight.toString().toLowerCase();
    if (w.includes('ml')) {
      const base = parseFloat(w);
      if (!base) return null;
      return [
        { label: `${Math.round(base / 2)}ml`, price: Math.round(basePrice * 0.55) },
        { label: `${base}ml`, price: basePrice },
        { label: `${base * 2}ml`, price: Math.round(basePrice * 1.75) },
      ];
    }
    if (w.includes('l') && !w.includes('ml')) {
      const base = parseFloat(w);
      if (!base) return null;
      return [
        { label: `${base * 500}ml`, price: Math.round(basePrice * 0.55) },
        { label: `${base}L`, price: basePrice },
        { label: `${base * 2}L`, price: Math.round(basePrice * 1.75) },
      ];
    }
    if (w.includes('g') || w.includes('kg')) {
      const isKg = w.includes('kg');
      const base = parseFloat(w);
      if (!base) return null;
      const unit = isKg ? 'kg' : 'g';
      return [
        { label: `${Math.round(base / 2)}${unit}`, price: Math.round(basePrice * 0.55) },
        { label: `${base}${unit}`, price: basePrice },
        { label: `${base * 2}${unit}`, price: Math.round(basePrice * 1.75) },
      ];
    }
    return null;
  };

  const variants = generateVariants(product?.specs?.weight, product?.price);
  const activeVariant = selectedVariant || (variants ? variants[1] : null);
  const activePrice = activeVariant ? activeVariant.price : (product?.price || 0);

  const incrementQty = (event) => {
    event.stopPropagation();
    setQuantity(current => Math.min(current + 1, 99));
  };

  const decrementQty = (event) => {
    event.stopPropagation();
    setQuantity(current => Math.max(current - 1, 1));
  };

  const handleBuyWhatsApp = (event) => {
    event.stopPropagation();
    if (!product.inStock) return;

    const waMessages = {
      EN: `Hi, I would like to order ${quantity}x ${product.name}. Total: Rs.${product.price * quantity}.`,
      HI: `नमस्ते, मैं ${quantity}x ${product.name} ऑर्डर करना चाहता/चाहती हूँ। कुल: ₹${product.price * quantity}.`,
      GUJ: `નમસ્તે, હું ${quantity}x ${product.name} ઓર્ડર કરવા ઇચ્છું છું. કુલ: ₹${product.price * quantity}.`,
    };
    const message = encodeURIComponent(waMessages[lang] || waMessages.EN);
    window.open(`https://wa.me/${product.sellerPhone}?text=${message}`, '_blank');
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    if (!product.inStock || added) return;
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayImage = imageError ? (product.image || '/products/auth/naa.jpg') : (product.imageUrl || product.image);
  const CategoryIcon = categoryIcons[product.category] || Bug;

  return (
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative w-full flex-shrink-0 bg-gradient-to-br from-slate-50 to-green-50/40 p-5">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Rounded image card */}
        <div className="relative h-52 w-full rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.10)] ring-1 ring-gray-100 overflow-hidden flex items-center justify-center p-4">
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
          <CategoryIcon className="h-3 w-3 text-primary-green" />
          {product.category}
        </div>
        {product.badge && (
          <div className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-bold ${badgeClassNames[product.badge] || 'bg-gray-100 text-gray-700'}`}>
            {product.badge}
          </div>
        )}
        <div
          className={`absolute bottom-6 right-6 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            product.inStock ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {product.inStock ? t('store.inStock') : t('store.outOfStock')}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex-1">
            {product.tag && (
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-green">
                {product.tag}
              </p>
            )}
            <h3 className="line-clamp-2 text-[17px] font-bold leading-tight text-gray-900">{product.name}</h3>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-600 shadow-sm">
            <Star className="h-3 w-3 fill-current" />
            <span className="font-bold">{product.rating}</span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-gray-500">{product.description}</p>

        {product.specs?.composition && (
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {product.specs.composition}
            </span>
            {product.specs.weight && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                {product.specs.weight}
              </span>
            )}
          </div>
        )}

        {product.recommendedCrops && product.recommendedCrops.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.recommendedCrops.slice(0, 3).map(crop => (
              <span key={crop} className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                {crop}
              </span>
            ))}
            {product.recommendedCrops.length > 3 && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                +{product.recommendedCrops.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Compact Pack Size selector */}
        {variants && (
          <div className="mt-3" onClick={e => e.stopPropagation()}>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400">{t('store.packSize')}</p>
            <div className="flex flex-wrap gap-1.5">
              {variants.map(v => (
                <button
                  key={v.label}
                  onClick={e => { e.stopPropagation(); setSelectedVariant(v); }}
                  className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all duration-150 ${
                    activeVariant?.label === v.label
                      ? 'border-primary-green bg-primary-green text-white'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-primary-green hover:text-primary-green'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-green-50/50 px-4 py-3 border border-gray-100">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">{t('store.price')}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[32px] font-bold leading-none text-gray-900">₹{activePrice * quantity}</span>
              {quantity > 1 && <span className="text-sm text-gray-500">/ {quantity} {t('store.units')}</span>}
            </div>
          </div>

          {quantity > 1 && (
            <div className="mt-2 text-center text-xs font-medium text-gray-400">
              ₹{product.price} × {quantity} = ₹{product.price * quantity}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{product.sellerLocation}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">{product.reviewCount} {t('store.reviews')}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-gray-50 px-2 py-2" onClick={event => event.stopPropagation()}>
            <button
              onClick={decrementQty}
              disabled={!product.inStock}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex-1 text-center text-base font-bold text-gray-800">{quantity}</span>
            <button
              onClick={incrementQty}
              disabled={!product.inStock}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-green font-bold text-white shadow-sm transition-all hover:bg-green-700 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all duration-300 ${
                added
                  ? 'border-green-500 bg-green-500 text-white scale-[0.98]'
                  : 'border-primary-green text-primary-green hover:bg-primary-lightGreen hover:scale-[1.02] disabled:border-gray-200 disabled:text-gray-400 disabled:hover:scale-100'
              }`}
            >
              {added ? (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {t('store.added')}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  {t('store.addToCart')}
                </>
              )}
            </button>
            <button
              onClick={handleBuyWhatsApp}
              disabled={!product.inStock}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#1fb355] hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100"
            >
              <WhatsappIcon className="h-4 w-4" />
              {t('store.buyNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
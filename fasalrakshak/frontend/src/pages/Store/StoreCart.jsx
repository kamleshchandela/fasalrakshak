import React from 'react';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const formatPrice = (value) => `Rs.${value}`;

const StoreCart = ({
  cartItems,
  cartCount,
  cartTotal,
  isOpen,
  isDesktop = false,
  onOpen,
  onClose,
  onCheckout,
  onQuantityChange,
  onRemove,
  onClear
}) => {
  const hasItems = cartItems.length > 0;
  const { t } = useLanguage();

  const cartContent = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t('store.yourCart')}</h3>
          <p className="text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? t('store.itemSelected') : t('store.itemsSelected')}
          </p>
        </div>
        {!isDesktop && (
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {hasItems ? (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-3 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white hover:text-red-500"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-green text-white transition-colors hover:bg-green-700"
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 bg-white px-4 py-4">
            <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
              <span>{t('store.subtotal')}</span>
              <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between text-base font-bold text-gray-900">
              <span>{t('store.total')}</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClear}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('store.clearCart')}
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1fb355]"
              >
                {t('store.buyAllWhatsapp')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 rounded-full bg-green-50 p-4 text-primary-green">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{t('store.emptyCart')}</h4>
          <p className="mt-2 max-w-xs text-sm text-gray-500">
            {t('store.emptyCartDesc')}
          </p>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
        {cartContent}
      </div>
    );
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-5 right-4 z-40 flex items-center gap-3 rounded-full bg-primary-green px-4 py-3 text-white shadow-lg transition-transform hover:scale-[1.02] xl:hidden"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-bold">
            Cart ({cartCount}) {hasItems ? `- ${formatPrice(cartTotal)}` : ''}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-hidden rounded-t-[28px] shadow-2xl">
            {cartContent}
          </div>
        </div>
      )}
    </>
  );
};

export default StoreCart;

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FALLBACK_IMAGE = '/products/dap.jpg';

const RecommendedBanner = ({ recommendedProducts, onProductSelect }) => {
  const { t } = useLanguage();
  if (!recommendedProducts || recommendedProducts.length === 0) return null;

  return (
    <div className="container mx-auto mb-8 px-4">
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm md:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-800">
          {t('store.recommended')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedProducts.map(product => (
            <div
              key={product.id}
              className="flex cursor-pointer gap-4 rounded-lg border border-green-100 bg-white p-3 transition-shadow hover:shadow-md"
              onClick={() => onProductSelect(product)}
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
              </div>
              <div>
                <h3 className="line-clamp-1 text-base font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-base font-bold text-primary-green">Rs.{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedBanner;

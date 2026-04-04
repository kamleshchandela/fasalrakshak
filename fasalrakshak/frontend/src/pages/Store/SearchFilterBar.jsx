import React from 'react';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SearchFilterBar = ({ filters, setFilters, categories, cartCount, onCartOpen }) => {
  const { t } = useLanguage();
  const handleCategoryChange = (event) => {
    setFilters(prev => ({ ...prev, category: event.target.value }));
  };

  const handleSearchChange = (event) => {
    setFilters(prev => ({ ...prev, search: event.target.value }));
  };

  const handleMaxPriceChange = (event) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(event.target.value, 10) || 5000 }));
  };

  const handleRatingChange = (event) => {
    setFilters(prev => ({ ...prev, minRating: event.target.checked ? 4 : 0 }));
  };

  const handleLocationChange = (event) => {
    setFilters(prev => ({ ...prev, location: event.target.value }));
  };

  return (
    <div className="sticky top-0 z-20 mb-3 border-b border-[#edf0e8] bg-[#fbfcf8]/95 py-2.5 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="mb-2.5 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-green">{t('store.catalog')}</p>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">{t('store.catalogDesc')}</h2>
          </div>
          <button
            onClick={onCartOpen}
            className="hidden items-center gap-2 rounded-xl bg-primary-green px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 xl:flex"
          >
            <ShoppingCart className="h-4 w-4" />
            {t('store.cart')} ({cartCount})
          </button>
        </div>

        <div className="rounded-2xl border border-[#e5eadc] bg-white p-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
            <div className="relative w-full md:flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('store.searchPlaceholder')}
                className="w-full rounded-xl border border-gray-200 bg-[#fafcf8] py-2 pl-10 pr-4 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-primary-green"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex w-full items-center gap-2 overflow-x-auto md:w-auto">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-[#fafcf8] px-3 py-2">
                <Filter className="h-5 w-5 flex-shrink-0 text-primary-green" />
                <select
                  className="min-w-[120px] bg-transparent text-sm outline-none"
                  value={filters.category}
                  onChange={handleCategoryChange}
                >
                  <option value="All">{t('store.allCategories')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2.5 text-sm text-gray-700">
            <div className="flex items-center gap-2 rounded-full bg-[#f4f8ee] px-3 py-1.5">
              <label className="whitespace-nowrap text-xs font-semibold">{t('store.maxPrice')} Rs.{filters.maxPrice}</label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
                className="w-28 accent-primary-green"
              />
            </div>

            <label className="flex items-center gap-2 rounded-full bg-[#f4f8ee] px-3 py-1.5">
              <input
                type="checkbox"
                id="highRated"
                checked={filters.minRating === 4}
                onChange={handleRatingChange}
                className="h-4 w-4 rounded text-primary-green accent-primary-green focus:ring-primary-green"
              />
              <span className="text-xs">{t('store.starAbove')}</span>
            </label>

            <div className="flex items-center gap-2 rounded-full bg-[#f4f8ee] px-3 py-1.5">
              <label className="text-xs font-semibold">{t('store.location')}</label>
              <select
                className="bg-transparent text-xs outline-none"
                value={filters.location}
                onChange={handleLocationChange}
              >
                <option value="All">{t('store.allLocations')}</option>
                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                <option value="Nagpur, Maharashtra">Nagpur, Maharashtra</option>
                <option value="Nashik, Maharashtra">Nashik, Maharashtra</option>
                <option value="Aurangabad, Maharashtra">Aurangabad, Maharashtra</option>
                <option value="Kolhapur, Maharashtra">Kolhapur, Maharashtra</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;

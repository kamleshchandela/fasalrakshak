import React, { useState, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CROPS = [
  { label: '🌾 Wheat', value: 'Wheat' },
  { label: '🫘 Cotton', value: 'Cotton' },
  { label: '🥜 Groundnut', value: 'Groundnut' },
  { label: '🍚 Rice', value: 'Rice' },
  { label: '🍅 Tomato', value: 'Tomato' },
  { label: '🧅 Onion', value: 'Onion' },
  { label: '🥔 Potato', value: 'Potato' },
  { label: '🌽 Corn', value: 'Corn' },
  { label: '🌿 Mustard', value: 'Mustard' },
  { label: '🌱 All Crops', value: 'All Crops' },
];

const TYPES = [
  { label: '🍄 Fungal', value: 'fungal' },
  { label: '🦠 Bacterial', value: 'bacterial' },
  { label: '🧬 Viral', value: 'viral' },
  { label: '🐛 Pest', value: 'pest' },
  { label: '🌱 Nutrient', value: 'nutrient' },
];

const SEVERITIES = [
  { label: '🔴 Severe', value: 'severe' },
  { label: '🟡 Moderate', value: 'moderate' },
  { label: '🟢 Mild', value: 'mild' },
];

const FilterChip = ({ label, active, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex-shrink-0 h-10 px-4 rounded-full font-nunito font-extrabold text-[13px] border-2 transition-all duration-300 shadow-sm ${
      active
        ? 'bg-primary-green text-white border-primary-green shadow-organic'
        : 'bg-white text-gray-600 border-primary-sage hover:border-primary-green/50 hover:text-primary-green'
    }`}
  >
    {label}
  </motion.button>
);

const Divider = () => <div className="flex-shrink-0 w-px h-6 bg-[#E0EDD5] self-center mx-1" />;

const SearchFilterBar = ({ filters, onChange, totalCount }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const debounceRef = useRef(null);

  const handleSearch = useCallback((val) => {
    setLocalSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...filters, search: val });
    }, 300);
  }, [filters, onChange]);

  const setFilter = (key, value) => {
    onChange({ ...filters, [key]: filters[key] === value ? '' : value });
  };

  const activeFilterCount = [filters.crop, filters.type, filters.severity, filters.gujarat ? 'g' : '', filters.fast ? 'f' : ''].filter(Boolean).length;

  const clearAll = () => {
    setLocalSearch('');
    onChange({ search: '', crop: '', type: '', severity: '', gujarat: false, fast: false });
  };

  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-[#E0EDD5] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="px-4 md:px-6 pt-5 pb-4">
        <div className="relative max-w-3xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary-green transition-colors" />
          <input
            type="text"
            value={localSearch}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search crop diseases, symptoms, or local names..."
            className="w-full h-[60px] pl-14 pr-12 bg-white border-[2px] border-primary-sage rounded-2xl font-nunito font-semibold text-[17px] text-text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-primary-green focus:shadow-[0_0_0_4px_rgba(26,107,47,0.1)] transition-all duration-300"
          />
          {localSearch && (
            <button onClick={() => handleSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-green transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Filter chips */}
      <div className="px-4 md:px-6 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <FilterChip label={`All (${totalCount})`} active={!filters.crop && !filters.type && !filters.severity && !filters.gujarat && !filters.fast} onClick={clearAll} />
        <Divider />
        {CROPS.map(c => <FilterChip key={c.value} label={c.label} active={filters.crop === c.value} onClick={() => setFilter('crop', c.value)} />)}
        <Divider />
        {TYPES.map(t => <FilterChip key={t.value} label={t.label} active={filters.type === t.value} onClick={() => setFilter('type', t.value)} />)}
        <Divider />
        {SEVERITIES.map(s => <FilterChip key={s.value} label={s.label} active={filters.severity === s.value} onClick={() => setFilter('severity', s.value)} />)}
        <Divider />
        <FilterChip label="⭐ Gujarat" active={filters.gujarat} onClick={() => onChange({ ...filters, gujarat: !filters.gujarat })} />
        <FilterChip label="⚡ Spreads Fast" active={filters.fast} onClick={() => onChange({ ...filters, fast: !filters.fast })} />

        {activeFilterCount > 0 && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={clearAll}
            className="flex-shrink-0 flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 rounded-full px-3 h-9 font-nunito font-bold text-[12px] ml-2"
          >
            <X className="w-3.5 h-3.5" /> {activeFilterCount} Active
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import allDiseases from '../data/diseases.json';
import heroLandscape from '../images/hero_landscape.png';
import DiseaseCard from '../components/diseases/DiseaseCard';
import SearchFilterBar from '../components/diseases/SearchFilterBar';
import CropCategorySection from '../components/diseases/CropCategorySection';
import LibraryCTABanner from '../components/diseases/LibraryCTABanner';
import { useLanguage } from '../context/LanguageContext';

const SEVERITY_RANK = { severe: 0, moderate: 1, mild: 2 };

const filterAndSort = (diseases, filters, sort, lang) => {
  let result = diseases.filter(d => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const nameL = (d[`name_${lang.toLowerCase()}`] || '').toLowerCase();
      const symptomsL = (d[`symptoms_${lang.toLowerCase()}`] || []).join(' ').toLowerCase();
      
      const haystack = [
        d.name, 
        nameL,
        d.localName, 
        d.cropName, 
        ...(d.symptoms || []), 
        ...(d.tags || [])
      ].join(' ').toLowerCase() + ' ' + symptomsL;
      
      if (!haystack.includes(q)) return false;
    }
    if (filters.crop && d.cropName !== filters.crop) return false;
    if (filters.type && d.diseaseType !== filters.type) return false;
    if (filters.severity && d.severity !== filters.severity) return false;
    if (filters.gujarat && !d.commonInGujarat) return false;
    if (filters.fast && d.spreadRate !== 'fast') return false;
    return true;
  });

  if (sort === 'az') result.sort((a, b) => (a[`name_${lang.toLowerCase()}`] || a.name).localeCompare(b[`name_${lang.toLowerCase()}`] || b.name));
  else if (sort === 'za') result.sort((a, b) => (b[`name_${lang.toLowerCase()}`] || b.name).localeCompare(a[`name_${lang.toLowerCase()}`] || a.name));
  else if (sort === 'severe_first') result.sort((a, b) => (SEVERITY_RANK[a.severity] ?? 2) - (SEVERITY_RANK[b.severity] ?? 2));
  else if (sort === 'mild_first') result.sort((a, b) => (SEVERITY_RANK[b.severity] ?? 2) - (SEVERITY_RANK[a.severity] ?? 2));
  else if (sort === 'common_first') result.sort((a, b) => (b.commonInGujarat ? 1 : 0) - (a.commonInGujarat ? 1 : 0));

  return result;
};

const INIT_FILTERS = { search: '', crop: '', type: '', severity: '', gujarat: false, fast: false };

export default function DiseaseLibrary() {
  const { t, lang } = useLanguage();
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [sort, setSort] = useState('az');
  const gridRef = useRef(null);

  const SORT_OPTIONS = [
    { value: 'az', label: lang === 'HI' ? 'नाम: अ-ज्ञ' : lang === 'GUJ' ? 'નામ: અ-જ્ઞ' : 'Name: A–Z' },
    { value: 'za', label: lang === 'HI' ? 'नाम: ज्ञ-अ' : lang === 'GUJ' ? 'નામ: જ્ઞ-અ' : 'Name: Z–A' },
    { value: 'severe_first', label: lang === 'HI' ? 'सबसे गंभीर पहले' : lang === 'GUJ' ? 'સૌથી વધુ ગંભીર પહેલા' : 'Most Severe First' },
    { value: 'mild_first', label: lang === 'HI' ? 'कम गंभीर पहले' : lang === 'GUJ' ? 'ઓછા ગંભીર પહેલા' : 'Least Severe First' },
    { value: 'common_first', label: lang === 'HI' ? 'गुजरात में सामान्य' : lang === 'GUJ' ? 'ગુજરાતમાં સામાન્ય' : 'Gujarat Common First' },
  ];

  const diseases = useMemo(() => filterAndSort(allDiseases, filters, sort, lang), [filters, sort, lang]);

  const handleSelectCrop = (cropName) => {
    setFilters(f => ({ ...f, crop: f.crop === cropName ? '' : cropName }));
  };

  return (
    <div className="min-h-screen bg-white font-nunito">
      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-28 pb-20 overflow-hidden bg-primary-darkGreen"
      >
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-[2px] opacity-60 mix-blend-overlay"
          style={{ backgroundImage: `url(${heroLandscape})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darkGreen via-primary-darkGreen/50 to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 bg-white/20 text-white font-nunito font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest mb-6 border border-white/20 shadow-sm backdrop-blur-md"
          >
            {lang === 'HI' ? '📚 पूर्ण रोग संदर्भ' : lang === 'GUJ' ? '📚 પૂર્ણ રોગ સંદર્ભ' : '📚 Complete Disease Reference'}
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
             className="font-playfair font-black text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-md"
          >
            {lang === 'HI' ? 'फसल रोग लाइब्रेरी' : lang === 'GUJ' ? 'પાક રોગ લાઇબ્રેરી' : 'Crop Disease Library'}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
             className="font-nunito text-white/90 text-xl mb-10 font-medium max-w-2xl mx-auto"
          >
            {lang === 'HI' ? '40+ सामान्य फसल रोगों को पहचानें, समझें और विशेषज्ञ सलाह से उपचार करें।' : lang === 'GUJ' ? '40+ સામાન્ય પાક રોગોને ઓળખો, સમજો અને નિષ્ણાતોની સલાહથી ઉપચાર કરો.' : 'Identify, understand, and treat over 40+ common crop diseases affecting Indian farmers with expert advice.'}
          </motion.p>
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
             className="flex flex-wrap justify-center gap-4"
          >
            {[
              `🌿 ${lang === 'HI' ? '40+ रोग' : lang === 'GUJ' ? '40+ રોગ' : '40+ Diseases'}`, 
              `🌾 ${lang === 'HI' ? '10 प्रमुख फसलें' : lang === 'GUJ' ? '10 મુખ્ય પાક' : '10 Major Crops'}`, 
              `💊 ${lang === 'HI' ? 'सत्यापित उपचार' : lang === 'GUJ' ? 'ચકાસાયેલ સારવાર' : 'Verified Treatments'}`
            ].map(s => (
              <span key={s} className="bg-white/10 backdrop-blur-sm text-white font-nunito font-bold text-sm px-5 py-2.5 rounded-xl border border-white/20 shadow-sm">{s}</span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SEARCH + FILTER BAR */}
      <SearchFilterBar filters={filters} onChange={setFilters} totalCount={allDiseases.length} />

      {/* RESULTS COUNT + SORT */}
      <div className="px-4 md:px-6 py-3 border-b border-[#F0F0F0] flex items-center justify-between" ref={gridRef}>
        <span className="font-nunito text-[14px] text-gray-500 text-left">
          {t('store.showing')} <strong className="text-[#1C1C1C]">{diseases.length}</strong> {lang === 'HI' ? 'रोग' : lang === 'GUJ' ? 'રોગ' : `disease${diseases.length !== 1 ? 's' : ''}`}
        </span>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="font-nunito text-[13px] border border-[#E0EDD5] rounded-lg h-9 px-3 bg-white text-[#1C1C1C] focus:outline-none focus:border-[#1A6B2F]"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* DISEASE CARDS GRID */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {diseases.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <Search className="w-20 h-20 text-[#E0EDD5]" />
              <h3 className="font-playfair font-bold text-[24px] text-[#1C1C1C]">{t('disease.no_diseases')}</h3>
              <p className="font-nunito text-[16px] text-gray-400 text-center">{t('disease.try_different')}</p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setFilters(INIT_FILTERS)}
                  className="bg-[#1A6B2F] text-white font-nunito font-bold px-6 py-3 rounded-xl hover:bg-[#155824] transition-colors"
                >
                  {t('disease.clear_filters')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {diseases.map((disease, i) => (
                <DiseaseCard key={disease.id} disease={disease} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CROP CATEGORY SECTION */}
      <CropCategorySection onSelectCrop={handleSelectCrop} gridRef={gridRef} />

      {/* CTA BANNER */}
      <LibraryCTABanner />
    </div>
  );
}

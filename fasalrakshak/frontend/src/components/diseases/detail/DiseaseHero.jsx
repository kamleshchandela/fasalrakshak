import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const SEVERITY_COLORS = {
  severe: 'rgba(229,62,62,0.88)',
  moderate: 'rgba(245,166,35,0.88)',
  mild: 'rgba(26,107,47,0.88)',
};

const DiseaseHero = ({ disease }) => {
  const { t, lang } = useLanguage();

  const TYPE_LABELS = { 
    fungal: `🍄 ${t('disease.fungal')}`, 
    bacterial: `🦠 ${t('disease.bacterial')}`, 
    viral: `🧬 ${t('disease.viral')}`, 
    pest: `🐛 ${t('disease.pest')}`, 
    nutrient: `🌱 ${t('disease.nutrient')}` 
  };

  const displayName = disease[`name_${lang.toLowerCase()}`] || disease.name;
  const displayCropName = lang === 'HI' ? (disease.cropName === 'Wheat' ? 'गेहूं' : disease.cropName === 'Cotton' ? 'कपास' : disease.cropName) : 
                        lang === 'GUJ' ? (disease.cropName === 'Wheat' ? 'ઘઉં' : disease.cropName === 'Cotton' ? 'કપાસ' : disease.cropName) : 
                        disease.cropName;

  return (
    <section className="relative h-[350px] md:h-[450px] overflow-hidden text-left">
      <img
        src={disease.image}
        alt={displayName}
        loading="eager"
        onError={e => { e.target.style.display = 'none'; }}
        className="absolute inset-0 w-full h-full object-cover scale-[1.03] animate-[slowZoom_1s_ease-out_forwards]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-primary-darkGreen/20 mix-blend-overlay" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-white/80 font-nunito font-bold text-[13px] mb-5 flex-wrap uppercase tracking-wider">
          <Link to="/" className="hover:text-white transition-colors">
            {lang === 'HI' ? 'होम' : lang === 'GUJ' ? 'હોમ' : 'Home'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/diseases" className="hover:text-white transition-colors">
            {lang === 'HI' ? 'रोग लाइब्रेरी' : lang === 'GUJ' ? 'રોગ લાઇબ્રેરી' : 'Disease Library'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{displayName}</span>
        </nav>

        <div className="flex gap-3 items-center mb-4 flex-wrap">
          {/* Crop badge */}
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white font-nunito font-bold text-[14px] px-4 py-1.5 rounded-full shadow-sm shadow-black/20">
            {disease.cropEmoji} {displayCropName}
          </span>
          <span className="bg-white/10 backdrop-blur-sm text-white font-nunito font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
            {TYPE_LABELS[disease.diseaseType]}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}
          className="font-playfair font-black text-4xl md:text-6xl text-white mb-2 leading-tight drop-shadow-lg"
        >
          {displayName}
        </motion.h1>

        {disease.localName && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-nunito font-semibold text-white/90 text-lg mb-6 drop-shadow-md">
            {t('disease.aka')} {disease.localName}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-3 flex-wrap">
          <span style={{ background: SEVERITY_COLORS[disease.severity] }} className="text-white font-nunito font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            {disease.severity === 'severe' ? '🔴' : disease.severity === 'moderate' ? '🟡' : '🟢'} {t(`disease.${disease.severity}`)}
          </span>
          {disease.spreadRate === 'fast' && (
            <span className="bg-[rgba(245,166,35,0.95)] text-white font-nunito font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">⚡ {t('disease.spreads_fast')}</span>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DiseaseHero;

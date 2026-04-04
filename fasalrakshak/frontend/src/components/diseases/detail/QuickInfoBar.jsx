import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

const QuickInfoBar = ({ disease }) => {
  const { t, lang } = useLanguage();

  const ITEMS = [
    { 
      icon: '📉', 
      key: 'estimatedYieldLoss', 
      label: t('disease.yield_loss'),
      format: v => v 
    },
    { 
      icon: '🌍', 
      key: 'spreadRate', 
      label: t('disease.spreads'), 
      format: v => t(`disease.${v}`) || (v.charAt(0).toUpperCase() + v.slice(1)) 
    },
    { 
      icon: '📅', 
      key: 'season', 
      label: t('disease.season'), 
      format: v => {
        if (!Array.isArray(v)) return v;
        return v.map(s => {
          const key = `season.${s.toLowerCase()}`;
          return t(key) !== key ? t(key) : (s.charAt(0).toUpperCase() + s.slice(1));
        }).join(', ');
      } 
    },
    { 
      icon: '⚠️', 
      key: 'contagious', 
      label: t('disease.contagious'), 
      format: v => v ? (lang === 'EN' ? 'Yes' : lang === 'HI' ? 'हाँ' : 'હા') : (lang === 'EN' ? 'No' : lang === 'HI' ? 'नहीं' : 'ના') 
    },
    { 
      icon: '🍄', 
      key: 'diseaseType', 
      label: t('disease.type'), 
      format: v => t(`disease.${v}`) || (v.charAt(0).toUpperCase() + v.slice(1)) 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      className="bg-white border-b-2 border-primary-sage overflow-x-auto shadow-sm"
    >
      <div className="flex divide-x-2 divide-primary-sage min-w-max">
        {ITEMS.map(item => {
          const raw = disease[item.key];
          const display = item.format ? item.format(raw) : raw;
          return (
            <div key={item.key} className="flex flex-col items-center px-8 py-5 gap-1 min-w-[140px] hover:bg-gray-50/50 transition-colors">
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="font-nunito font-bold text-[16px] text-primary-darkGreen text-center">{display}</span>
              <span className="font-nunito text-[13px] text-gray-500 font-semibold uppercase tracking-wider">{item.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickInfoBar;

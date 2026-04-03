import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  { icon: '📉', key: 'estimatedYieldLoss', label: 'Yield Loss' },
  { icon: '🌍', key: 'spreadRate', label: 'Spread', format: v => v.charAt(0).toUpperCase() + v.slice(1) },
  { icon: '📅', key: 'season', label: 'Season', format: v => Array.isArray(v) ? v.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : v },
  { icon: '⚠️', key: 'contagious', label: 'Contagious', format: v => v ? 'Yes' : 'No' },
  { icon: '🍄', key: 'diseaseType', label: 'Type', format: v => v.charAt(0).toUpperCase() + v.slice(1) },
];

const QuickInfoBar = ({ disease }) => (
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

export default QuickInfoBar;

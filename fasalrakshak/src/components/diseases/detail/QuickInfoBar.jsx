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
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
    className="bg-white border-b border-[#E0EDD5] overflow-x-auto"
  >
    <div className="flex divide-x divide-[#E0EDD5] min-w-max">
      {ITEMS.map(item => {
        const raw = disease[item.key];
        const display = item.format ? item.format(raw) : raw;
        return (
          <div key={item.key} className="flex flex-col items-center px-6 py-4 gap-0.5 min-w-[130px]">
            <span className="text-xl">{item.icon}</span>
            <span className="font-nunito font-bold text-[15px] text-[#1C1C1C] text-center">{display}</span>
            <span className="font-nunito text-[12px] text-gray-400">{item.label}</span>
          </div>
        );
      })}
    </div>
  </motion.div>
);

export default QuickInfoBar;

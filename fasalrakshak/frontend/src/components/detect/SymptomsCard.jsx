import React from 'react';
import { motion } from 'framer-motion';

const PART_MAP = [
  { id: 'leaf', label: '🍃 Leaf' },
  { id: 'stem', label: '🌿 Stem' },
  { id: 'root', label: '🌱 Root' },
  { id: 'fruit', label: '🍎 Fruit' },
  { id: 'flower', label: '🌸 Flower' }
];

const SymptomsCard = ({ result }) => {
  if (!result || !result.symptoms || result.symptoms.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="bg-white border-l-[4px] border-[#E53E3E] rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-y border-r border-[#E0EDD5]"
    >
      <h3 className="font-playfair font-bold text-xl md:text-2xl text-[#1C1C1C] flex items-center gap-2 mb-6">
        🔍 Symptoms & Causes
      </h3>

      <div className="mb-6">
        <label className="font-nunito text-[14px] font-bold text-gray-500 mb-2 block">Visible Symptoms:</label>
        <ul className="flex flex-col">
          {result.symptoms.map((symptom, idx) => (
            <li key={idx} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
              <span className="w-2 h-2 rounded-full bg-[#E53E3E] mt-2 flex-shrink-0" />
              <span className="font-nunito font-semibold text-[15px] text-[#1C1C1C] leading-relaxed">{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.affectedParts && result.affectedParts.length > 0 && (
        <div className="mb-6">
          <label className="font-nunito text-[14px] font-bold text-gray-500 mb-2 block">Parts Affected:</label>
          <div className="flex flex-wrap gap-2">
            {PART_MAP.map(part => {
              const isAffected = result.affectedParts.includes(part.id);
              return (
                <span key={part.id} className={`px-3 py-1.5 rounded-full font-nunito font-bold text-[13px] border transition-colors
                  ${isAffected ? 'bg-[#E53E3E] text-white border-[#E53E3E] shadow-sm' : 'bg-gray-100 text-gray-400 border-gray-200'}
                `}>
                  {part.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {result.causes && result.causes.length > 0 && (
        <div>
          <label className="font-nunito text-[14px] font-bold text-gray-500 mb-2 block">Root Causes:</label>
          <ul className="flex flex-col">
            {result.causes.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] mt-2 flex-shrink-0" />
                <span className="font-nunito font-semibold text-[15px] text-[#1C1C1C] leading-relaxed">{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </motion.div>
  );
};

export default SymptomsCard;

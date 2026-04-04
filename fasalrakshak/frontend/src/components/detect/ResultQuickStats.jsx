import React from 'react';
import { motion } from 'framer-motion';

const ResultQuickStats = ({ result }) => {
  if (!result) return null;

  const conf = result.confidencePercent || 0;
  const confColor = conf > 80 ? '#1A6B2F' : conf >= 60 ? '#F5A623' : '#E53E3E';

  const typeMap = {
    'fungal': { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🍄' },
    'bacterial': { bg: 'bg-green-100', text: 'text-green-700', icon: '🦠' },
    'viral': { bg: 'bg-red-100', text: 'text-red-700', icon: '🧬' },
    'pest': { bg: 'bg-orange-100', text: 'text-orange-700', icon: '🐛' },
    'nutrient_deficiency': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🍂' },
    'none': { bg: 'bg-gray-100', text: 'text-gray-500', icon: '✓' }
  };
  const dType = result.diseaseType?.toLowerCase() || 'none';
  const typeObj = typeMap[dType] || typeMap['none'];

  const urgencyMap = {
    'immediate': { text: 'Act Today!', class: 'text-red-600', icon: '🚨' },
    'within_week': { text: 'Act This Week', class: 'text-orange-500', icon: '🗓️' },
    'monitor': { text: 'Keep Monitoring', class: 'text-amber-500', icon: '👀' },
    'none': { text: 'No Action Needed', class: 'text-primary-green', icon: '👍' }
  };
  const uLevel = result.urgencyLevel?.toLowerCase() || 'none';
  const urgObj = urgencyMap[uLevel] || urgencyMap['none'];

  const yLoss = result.estimatedYieldLoss || 'None';
  const yClass = yLoss !== 'None' ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      
      {/* Stat 1: Confidence */}
      <div className="bg-[#F9F6EE] rounded-2xl p-4 flex flex-col items-center justify-center text-center border-[1.5px] border-[#E0EDD5]/50 shadow-sm relative overflow-hidden">
        <span className="text-[12px] font-nunito font-bold text-gray-500 uppercase tracking-widest mb-2 z-10 block">AI Confidence</span>
        <div className="relative w-[60px] h-[60px] z-10 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="transparent" stroke="#E5E7EB" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="44" fill="transparent" stroke={confColor} strokeWidth="8" strokeLinecap="round"
              strokeDasharray="276" initial={{ strokeDashoffset: 276 }} animate={{ strokeDashoffset: 276 - (276 * (conf / 100)) }} transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <span className="font-nunito font-extrabold text-[16px] text-gray-800">{conf}%</span>
        </div>
      </div>

      {/* Stat 2: Type */}
      <div className="bg-[#F9F6EE] rounded-2xl p-4 flex flex-col items-center justify-center text-center border-[1.5px] border-[#E0EDD5]/50 shadow-sm">
        <span className="text-[12px] font-nunito font-bold text-gray-500 uppercase tracking-widest mb-1">Type</span>
        <div className="flex gap-1.5 items-center mt-1">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${typeObj.bg} ${typeObj.text} text-[16px]`}>
            {typeObj.icon}
          </div>
          <span className={`font-nunito font-extrabold text-[15px] ${typeObj.text} capitalize leading-tight`}>
            {dType.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Stat 3: Urgency */}
      <div className="bg-[#F9F6EE] rounded-2xl p-4 flex flex-col items-center justify-center text-center border-[1.5px] border-[#E0EDD5]/50 shadow-sm">
        <span className="text-[12px] font-nunito font-bold text-gray-500 uppercase tracking-widest mb-1.5">Urgency</span>
        <span className="text-[20px] mb-1">{urgObj.icon}</span>
        <span className={`font-nunito font-extrabold text-[15px] ${urgObj.class} leading-tight`}>
          {urgObj.text}
        </span>
      </div>

      {/* Stat 4: Yield Risk */}
      <div className="bg-[#F9F6EE] rounded-2xl p-4 flex flex-col items-center justify-center text-center border-[1.5px] border-[#E0EDD5]/50 shadow-sm">
        <span className="text-[12px] font-nunito font-bold text-gray-500 uppercase tracking-widest mb-1.5">Yield Risk</span>
        <span className="text-[20px] mb-1">📉</span>
        <span className={`font-nunito font-extrabold text-[15px] ${yClass} leading-tight`}>
          {yLoss}
        </span>
      </div>

    </div>
  );
};

export default ResultQuickStats;

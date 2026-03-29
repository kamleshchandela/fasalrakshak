import React from 'react';
import { motion } from 'framer-motion';

const PreventionCard = ({ result }) => {
  if (!result || !result.preventionTips || result.preventionTips.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border-l-[4px] border-[#1A6B2F] rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-y border-r border-[#E0EDD5]"
    >
      <h3 className="font-playfair font-bold text-xl md:text-2xl text-[#1C1C1C] flex items-center gap-2 mb-4">
        🛡️ Prevention Tips
      </h3>
      
      <ul className="flex flex-col mb-4">
        {result.preventionTips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-[16px] mt-0.5 drop-shadow-sm leading-none">✅</span>
            <span className="font-nunito font-semibold text-[15px] text-[#1C1C1C] leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>

      {result.weatherConditions && (
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[10px] p-3 flex items-start gap-3">
          <span className="text-[20px]">☁️</span>
          <div>
            <span className="font-nunito font-bold text-[13px] text-[#1E40AF] block mb-0.5">Weather Alert</span>
            <p className="font-nunito text-[14px] font-semibold text-[#1E40AF]/80 leading-tight">
              {result.weatherConditions}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PreventionCard;

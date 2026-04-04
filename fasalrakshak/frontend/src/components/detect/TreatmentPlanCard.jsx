import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreatmentPlanCard = ({ result }) => {
  if (!result || !result.treatments || result.treatments.length === 0) return null;

  const [activeTab, setActiveTab] = useState('All Steps');
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (stepIdx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx]
    }));
  };

  const filteredTreatments = result.treatments.filter(t => {
    if (activeTab === 'All Steps') return true;
    return t.type?.toLowerCase() === activeTab.toLowerCase();
  });

  const isUrgent = result.urgencyLevel === 'immediate';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#FFFDF9] border-l-[4px] border-[#F5A623] rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-y border-r border-[#E0EDD5]"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="font-playfair font-bold text-xl md:text-2xl text-[#1C1C1C] flex items-center gap-2">
          💊 Treatment Plan
        </h3>
        
        <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-lg overflow-x-auto no-scrollbar">
          {['All Steps', 'Chemical', 'Organic'].map(tab => (
            <button 
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md font-nunito font-bold text-[13px] whitespace-nowrap transition-colors
                ${activeTab === tab ? 'bg-primary-green text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isUrgent && (
        <div className="bg-[#FFF5F5] border border-[#E53E3E] rounded-[10px] p-3 mb-6 flex items-start gap-3">
          <span className="text-[18px]">⚠️</span>
          <p className="font-nunito font-bold text-[14px] text-[#C62828] leading-tight">
            URGENT: Apply treatment within 24 hours to prevent further crop damage
          </p>
        </div>
      )}

      <div className="flex flex-col relative">
        <AnimatePresence mode="popLayout">
          {filteredTreatments.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-500 font-nunito text-center py-4">
              No treatments match this filter.
            </motion.p>
          ) : (
            filteredTreatments.map((step, idx) => {
              const sType = step.type?.toLowerCase();
              const isChecked = completedSteps[idx];
              
              let styleObj = { bg: 'bg-[#EFF6FF]', text: 'text-[#1E40AF]', tagBg: 'bg-blue-100', icon: '🏡' };
              if (sType === 'chemical') styleObj = { bg: 'bg-[#FFF3CD]', text: 'text-[#856404]', tagBg: 'bg-amber-100', icon: '⚗️' };
              else if (sType === 'organic') styleObj = { bg: 'bg-[#F0FFF4]', text: 'text-[#1A6B2F]', tagBg: 'bg-green-100', icon: '🌿' };

              return (
                <motion.div 
                  key={idx} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start gap-4 mb-3 p-4 bg-white border-[1.5px] rounded-[14px] cursor-pointer transition-all hover:shadow-md
                    ${isChecked ? 'border-primary-green bg-[#F0F7EC]/30' : 'border-[#E0EDD5]'}
                  `}
                >
                  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0 font-nunito font-bold text-[18px] transition-colors
                    ${isChecked ? 'bg-primary-green text-white' : `${styleObj.bg} ${styleObj.text}`}
                  `}>
                    {isChecked ? '✓' : step.step || (idx + 1)}
                  </div>
                  
                  <div className={`flex-1 ${isChecked ? 'opacity-60' : 'opacity-100'} transition-opacity`}>
                    <h4 className={`font-nunito font-bold text-[16px] text-[#1C1C1C] ${isChecked ? 'line-through' : ''}`}>
                      {step.action}
                    </h4>
                    <p className={`font-nunito text-[14px] text-[#444] mt-1 mb-2 ${isChecked ? 'line-through' : ''}`}>
                      {step.detail}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#F0F7EC] text-primary-green px-2.5 py-0.5 rounded-full font-nunito font-bold text-[12px]">
                        ⏰ {step.timing}
                      </span>
                      <span className={`${styleObj.tagBg} ${styleObj.text} px-2.5 py-0.5 rounded-full font-nunito font-bold text-[12px] capitalize`}>
                        {styleObj.icon} {sType}
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-2 transition-colors
                    ${isChecked ? 'bg-primary-green border-primary-green' : 'border-gray-300'}
                  `}>
                    {isChecked && <span className="text-white text-[12px] font-bold block leading-none">✓</span>}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {result.organicAlternative && (
        <div className="bg-[#F0FFF4] border border-primary-green rounded-[12px] p-4 mt-4 flex gap-3 shadow-sm">
          <span className="text-[24px]">🌿</span>
          <div>
            <h4 className="font-nunito font-bold text-[14px] text-primary-green mb-0.5">Organic Alternative</h4>
            <p className="font-nunito font-semibold text-[14px] text-primary-green/80 leading-relaxed">
              {result.organicAlternative}
            </p>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default TreatmentPlanCard;

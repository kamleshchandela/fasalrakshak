import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import allDiseases from '../../data/diseases.json';

const ResultStatusBanner = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.healthStatus === 'healthy';
  const isUncertain = result.healthStatus === 'uncertain';
  
  // Base colors
  let bg = 'bg-[#F9FAFB]';
  let text = 'text-[#374151]';
  let border = 'border-[#E5E7EB]';
  let icon = '🔍';
  let title = 'Status Unclear';
  let sub = 'Please try with a clearer photo';

  if (isHealthy) {
    return (
      <div className="w-full bg-[#F2FBF5] text-[#1B5E20] p-8 md:p-12 mb-6 flex flex-col md:flex-row items-center justify-center gap-6 border-b border-[#C8E6C9] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="text-[54px] z-10 opacity-90 drop-shadow-sm">🌿</div>
        <div className="text-center md:text-left z-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-black mb-2 tracking-tight text-[#14532D]">Your crop is healthy</h2>
          <p className="font-nunito font-medium text-[#2F6F41] text-[15px] md:text-[17px]">No signs of disease or stress detected. Excellent farming!</p>
        </div>
      </div>
    );
  }

  // Diseased states
  if (!isHealthy && !isUncertain) {
    const sev = result.severity?.toLowerCase() || 'none';
    
    if (sev === 'mild') {
      bg = 'bg-[#FFFBEB]'; text = 'text-[#78350F]'; border = 'border-[#FDE68A]';
    } else if (sev === 'moderate') {
      bg = 'bg-[#FFF7ED]'; text = 'text-[#7C2D12]'; border = 'border-[#FED7AA]';
    } else if (sev === 'severe') {
      bg = 'bg-[#FEF2F2]'; text = 'text-[#7F1D1D]'; border = 'border-[#FECACA]';
    } else {
      bg = 'bg-[#FFFBEB]'; text = 'text-[#78350F]'; border = 'border-[#FDE68A]'; // default
    }

    icon = sev === 'severe' ? '⚠️' : '🍂';
    title = result.diseaseName || 'Disease Detected';
    sub = `Crop: ${result.cropName || 'Unknown'}`;

    return (
      <div className={`w-full ${bg} ${text} p-8 md:p-12 mb-6 flex flex-col items-center gap-4 border-b ${border} relative overflow-hidden`}>
        <div className="text-[48px] z-10 opacity-80 mb-2 drop-shadow-sm">{icon}</div>
        <div className="z-10 text-center font-playfair font-black tracking-tight text-3xl md:text-4xl drop-shadow-sm">{title}</div>
        <div className="z-10 flex flex-wrap justify-center items-center gap-3 mt-1">
          <span className={`px-4 py-1.5 rounded-full text-[13px] font-nunito font-bold shadow-sm tracking-wider uppercase border ${
            sev === 'severe' ? 'bg-red-50 text-red-700 border-red-200' : sev === 'moderate' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}>
            Risk: {sev}
          </span>
          <span className="font-nunito font-semibold text-[14px] bg-white/60 px-4 py-1.5 rounded-full border border-black/5 shadow-sm text-black/70">
            📊 AI Confidence: {result.confidencePercent || 90}%
          </span>
        </div>
        {(() => {
          const matched = allDiseases.find(d => d.name.toLowerCase().includes((result.diseaseName || '').toLowerCase()) || (result.diseaseName || '').toLowerCase().includes(d.name.toLowerCase()));
          const href = matched ? `/diseases/${matched.slug}` : '/diseases';
          return (
            <Link to={href} className="z-10 font-nunito font-semibold text-[15px] underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black/90 transition-colors mt-3">
              Learn more about this condition
            </Link>
          );
        })()}
      </div>
    );
  }

  // Uncertain fallback
  return (
    <div className={`w-full ${bg} ${text} p-8 md:p-10 mb-6 flex flex-col md:flex-row items-center gap-5 border-b border-[#E5E7EB]`}>
      <div className="text-[46px] opacity-70">{icon}</div>
      <div className="text-center md:text-left">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-1 tracking-tight text-gray-800">{title}</h2>
        <p className="font-nunito font-medium text-gray-600 text-[15px]">{sub}</p>
      </div>
    </div>
  );
};

export default ResultStatusBanner;

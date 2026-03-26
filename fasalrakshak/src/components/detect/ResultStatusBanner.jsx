import React from 'react';
import { motion } from 'framer-motion';

const ResultStatusBanner = ({ result }) => {
  if (!result) return null;

  const isHealthy = result.healthStatus === 'healthy';
  const isUncertain = result.healthStatus === 'uncertain';
  
  // Base colors
  let bg = 'bg-gray-100';
  let text = 'text-gray-700';
  let border = 'border-gray-300';
  let icon = '🔍';
  let title = 'Could Not Determine Status';
  let sub = 'Please try with a clearer, closer photo';

  if (isHealthy) {
    return (
      <div className="w-full bg-gradient-to-r from-[#1A6B2F] to-[#2E8B57] text-white p-6 rounded-t-3xl -mx-5 -mt-5 md:-mx-10 md:-mt-10 mb-6 flex flex-col md:flex-row items-center justify-center gap-4 shadow-sm border-b-4 border-[#155A26]">
        <div className="text-[48px] leading-none drop-shadow-md">✅</div>
        <div className="text-center md:text-left">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-1">Your Crop Looks Healthy! 🎉</h2>
          <p className="font-nunito font-semibold text-white/90 text-sm md:text-[15px]">No disease detected. Keep up the good work!</p>
        </div>
      </div>
    );
  }

  // Diseased states
  if (!isHealthy && !isUncertain) {
    const sev = result.severity?.toLowerCase() || 'none';
    
    if (sev === 'mild') {
      bg = 'bg-[#FFF3CD]'; text = 'text-[#856404]'; border = 'border-[#F5A623]';
    } else if (sev === 'moderate') {
      bg = 'bg-[#FFE0B2]'; text = 'text-[#E65100]'; border = 'border-[#FF9800]';
    } else if (sev === 'severe') {
      bg = 'bg-[#FFEBEE]'; text = 'text-[#C62828]'; border = 'border-[#E53E3E]';
    } else {
      bg = 'bg-[#FFF3CD]'; text = 'text-[#856404]'; border = 'border-[#F5A623]'; // default
    }

    icon = '⚠️';
    title = result.diseaseName || 'Disease Detected';
    sub = `Crop: ${result.cropName || 'Unknown'}`;

    return (
      <div className={`w-full ${bg} ${text} p-6 rounded-t-3xl -mx-5 -mt-5 md:-mx-10 md:-mt-10 mb-6 flex flex-col items-center gap-3 shadow-sm border-b-[4px] ${border}`}>
        <div className="text-[48px] leading-none drop-shadow-sm animate-pulse">{icon}</div>
        <div className="text-center font-playfair font-bold text-2xl md:text-[28px]">{title}</div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1 rounded-full text-[12px] font-nunito font-bold text-white shadow-sm tracking-wider uppercase ${
            sev === 'severe' ? 'bg-[#E53E3E]' : sev === 'moderate' ? 'bg-[#FF9800]' : 'bg-[#F5A623]'
          }`}>
            {sev}
          </span>
          <span className="font-nunito font-bold text-[14px] bg-white/40 px-3 py-1 rounded-full border border-black/10">
            📊 AI Confidence: {result.confidencePercent || 90}%
          </span>
        </div>
      </div>
    );
  }

  // Uncertain fallback
  return (
    <div className={`w-full ${bg} ${text} p-5 rounded-t-3xl -mx-5 -mt-5 md:-mx-10 md:-mt-10 mb-6 flex items-center gap-4 shadow-sm border-b-[3px] ${border}`}>
      <div className="text-[40px] leading-none">{icon}</div>
      <div>
        <h2 className="font-playfair text-xl md:text-2xl font-bold mb-1">{title}</h2>
        <p className="font-nunito font-semibold text-sm">{sub}</p>
      </div>
    </div>
  );
};

export default ResultStatusBanner;

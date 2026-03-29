import React from 'react';
import { motion } from 'framer-motion';

const NearbyAlertCard = ({ result, user }) => {
  // Only show if severity is moderate or severe, AND nearbyFarmerAlert is true
  if (!result || !result.nearbyFarmerAlert) return null;
  const isSevere = ['moderate', 'severe'].includes(result.severity?.toLowerCase());
  if (!isSevere) return null;

  const loc = user?.village || user?.district || 'your area';
  const alertText = `🚨 Fasal Rakshak Crop Alert:
${result.diseaseName} detected in ${loc}. 
This disease spreads fast. Check your crops and protect them!
https://fasalrakshak.app`;

  const handleAlertShare = () => {
    const text = encodeURIComponent(alertText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#FFFBF0] border-l-[4px] border-[#F5A623] rounded-r-2xl md:rounded-r-3xl p-5 md:p-8 shadow-sm border-y border-r border-[#E0EDD5]"
    >
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl animate-pulse">⚠️</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-playfair font-bold text-[18px] md:text-xl text-[#856404] mb-1">
            Alert for Nearby Farmers
          </h3>
          <p className="font-nunito font-semibold text-[14px] text-[#856404]/80 leading-relaxed mb-4 md:mb-0">
            This disease can spread to neighboring farms. <strong>{result.diseaseName}</strong> detected in <strong>{loc}</strong> can affect nearby crops if not treated promptly.
          </p>
        </div>

        <button 
          onClick={handleAlertShare}
          className="h-[44px] px-5 bg-transparent border-2 border-[#F5A623] text-[#F5A623] rounded-xl font-nunito font-bold text-[14px] hover:bg-amber-50 hover:border-[#E0941B] hover:text-[#E0941B] transition-colors whitespace-nowrap w-full md:w-auto shadow-sm"
        >
          📢 Alert My Village
        </button>
      </div>
    </motion.div>
  );
};

export default NearbyAlertCard;

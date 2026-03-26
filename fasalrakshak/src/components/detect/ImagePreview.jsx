import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMON_CROPS = [
  { id: 'Wheat', label: '🌾 Wheat' },
  { id: 'Cotton', label: '🫘 Cotton' },
  { id: 'Groundnut', label: '🥜 Groundnut' },
  { id: 'Corn', label: '🌽 Corn' },
  { id: 'Rice', label: '🍚 Rice' },
  { id: 'Tomato', label: '🍅 Tomato' },
  { id: 'Other', label: '🌿 Other' },
  { id: 'Not Sure', label: '🤷 Not Sure' },
];

const ImagePreview = ({ fileUrl, selectedCrop, setSelectedCrop, onChangePhoto, onRemove, onAnalyze, errorStatus, onClearError }) => {
  const [dbCrops, setDbCrops] = useState([]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('fasalrakshak_user') || '{}');
      if (user && user.cropTypes) {
        setDbCrops(user.cropTypes);
        // Auto select first crop from user profile to save them a tap
        if (user.cropTypes.length > 0 && !selectedCrop) {
          setSelectedCrop(user.cropTypes[0]);
        }
      }
    } catch(e) {}
  }, [setSelectedCrop]);

  // Combine customized user crops to front of list
  const displayCrops = [...new Set([...dbCrops, ...COMMON_CROPS.map(c => c.id)])].slice(0, 10);

  const getCropIcon = (cId) => {
    const found = COMMON_CROPS.find(c => c.id === cId);
    return found ? found.label : `🌱 ${cId}`;
  };

  return (
    <div className="flex flex-col gap-6">

      <AnimatePresence>
          {errorStatus && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex flex-col items-center text-center relative mb-2"
            >
              <button onClick={onClearError} className="absolute right-3 top-3 text-red-400 hover:text-red-700">✕</button>
              <span className="text-[24px] mb-2">{errorStatus.type === 'api_error' ? '⚙️' : '⚠️'}</span>
              <p className="font-nunito font-bold text-[#C62828] text-[15px]">{errorStatus.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full flex justify-center bg-gray-50 rounded-[16px] border-2 border-[#E0EDD5] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <img 
          src={fileUrl} 
          alt="Preview" 
          className="max-h-[360px] max-w-full w-auto object-contain"
        />
      </motion.div>

      <div className="flex gap-3 justify-center">
        <button 
          onClick={onChangePhoto}
          className="h-[40px] px-5 border border-primary-green text-primary-green rounded-lg font-nunito font-bold text-[14px] hover:bg-primary-lightGreen transition-colors flex items-center gap-2"
        >
          🔄 Change Photo
        </button>
        <button 
          onClick={onRemove}
          className="h-[40px] px-5 border border-gray-300 text-gray-500 rounded-lg font-nunito font-bold text-[14px] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors flex items-center gap-2"
        >
          ✕ Remove
        </button>
      </div>

      <div className="mt-2 space-y-2">
        <label className="text-[14px] font-nunito font-bold text-gray-500 ml-1">What crop is this? (Optional)</label>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
          {displayCrops.map(crop => {
            const isSelected = selectedCrop === crop;
            const isUserCrop = dbCrops.includes(crop);
            return (
              <motion.button
                key={crop}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCrop(isSelected ? '' : crop)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-nunito font-bold text-[14px] border-[1.5px] transition-all
                  ${isSelected 
                    ? 'bg-primary-green border-primary-green text-white shadow-sm' 
                    : isUserCrop 
                      ? 'bg-primary-lightGreen border-primary-green text-primary-green' 
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                {getCropIcon(crop)}
              </motion.button>
            )
          })}
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        animate={{ scale: [1, 1.02, 1], transition: { duration: 1.5, repeat: 3, repeatType: "reverse" } }}
        onClick={onAnalyze}
        className="w-full h-[64px] bg-primary-green text-white rounded-[14px] font-nunito font-bold text-[20px] shadow-[0_4px_20px_rgba(26,107,47,0.3)] hover:bg-[#155A26] transition-colors mt-2 flex justify-center items-center gap-2 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]" />
        🔬 Analyze This Crop
      </motion.button>

    </div>
  );
};

export default ImagePreview;

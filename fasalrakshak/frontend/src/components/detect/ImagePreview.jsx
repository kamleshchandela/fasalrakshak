import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Sparkles, X } from 'lucide-react';

const COMMON_CROPS = [
  { id: 'Wheat', label: 'Wheat', icon: '🌾' },
  { id: 'Rice', label: 'Rice', icon: '🍚' },
  { id: 'Cotton', label: 'Cotton', icon: '🫘' },
  { id: 'Corn', label: 'Corn', icon: '🌽' },
  { id: 'Sugarcane', label: 'Sugarcane', icon: '🍢' },
  { id: 'Potato', label: 'Potato', icon: '🥔' },
  { id: 'Tomato', label: 'Tomato', icon: '🍅' },
  { id: 'Onion', label: 'Onion', icon: '🧅' },
  { id: 'Chillies', label: 'Chillies', icon: '🌶️' },
  { id: 'Mango', label: 'Mango', icon: '🥭' },
  { id: 'Grapes', label: 'Grapes', icon: '🍇' },
  { id: 'Banana', label: 'Banana', icon: '🍌' },
  { id: 'Pomegranate', label: 'Pomegranate', icon: '🍎' },
  { id: 'Apple', label: 'Apple', icon: '🍏' },
  { id: 'Soybean', label: 'Soybean', icon: '豆' },
  { id: 'Groundnut', label: 'Groundnut', icon: '🥜' },
  { id: 'Mustard', label: 'Mustard', icon: '🟡' },
  { id: 'Teak', label: 'Teak', icon: '🌳' },
  { id: 'Coffee', label: 'Coffee', icon: '☕' },
  { id: 'Tea', label: 'Tea', icon: '🍵' },
  { id: 'Citrus', label: 'Citrus', icon: '🍋' },
  { id: 'Brinjal', label: 'Brinjal', icon: '🍆' },
  { id: 'Okra', label: 'Okra', icon: '🌿' },
  { id: 'Cabbage', label: 'Cabbage', icon: '🥬' },
  { id: 'Auto-Detect', label: 'Auto-Detect', icon: '✨', special: true },
];

const ImagePreview = ({ fileUrl, selectedCrop, setSelectedCrop, onChangePhoto, onRemove, onAnalyze, errorStatus, onClearError }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCrops = COMMON_CROPS.filter(c => 
    c.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCropSelect = (cropId) => {
    setSelectedCrop(cropId === 'Auto-Detect' ? '' : cropId);
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence>
        {errorStatus && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="bg-red-50 border-2 border-red-500 rounded-2xl p-5 flex flex-col items-center text-center relative shadow-lg"
          >
            <button onClick={onClearError} className="absolute right-4 top-4 text-red-300 hover:text-red-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">{errorStatus.type === 'api_error' ? '⚙️' : '⚠️'}</span>
            </div>
            <h4 className="font-nunito font-black text-red-900 text-lg mb-1 leading-tight">Analysis Blocked</h4>
            <p className="font-nunito font-bold text-red-700/80 text-[14px] leading-relaxed">{errorStatus.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="w-full flex justify-center bg-white rounded-[32px] border-4 border-white shadow-2xl shadow-gray-200/50 overflow-hidden relative"
        >
          <img 
            src={fileUrl} 
            alt="Preview" 
            className="max-h-[360px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 flex gap-3">
            <button 
              onClick={onChangePhoto}
              className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-primary-darkGreen font-nunito font-black text-[13px] hover:bg-white transition-all shadow-lg flex items-center gap-2"
            >
              🔄 Retake
            </button>
            <button 
              onClick={onRemove}
              className="px-4 py-2 bg-red-500/90 backdrop-blur-md rounded-xl text-white font-nunito font-black text-[13px] hover:bg-red-600 transition-all shadow-lg flex items-center gap-2"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </motion.div>
      </div>

      {/* Expanded Crop Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-gray-900 font-nunito font-black text-xl tracking-tight flex items-center gap-2">
            Identify Crop <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">(Optional)</span>
          </label>
          <div className="relative w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-full pl-9 pr-4 py-1.5 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-primary-green/20 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar pb-2">
          {filteredCrops.map((crop) => (
            <motion.button
              key={crop.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCropSelect(crop.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                (selectedCrop === crop.id || (crop.id === 'Auto-Detect' && !selectedCrop))
                ? 'bg-primary-green border-transparent shadow-lg shadow-green-900/20 text-white' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-primary-green/30 hover:bg-green-50/30'
              }`}
            >
              <span className="text-2xl mb-1">{crop.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center">
                {crop.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onAnalyze}
        className="w-full py-6 bg-[#166534] text-white rounded-[24px] font-nunito font-black text-[22px] shadow-2xl shadow-green-900/10 hover:bg-[#114b27] transition-all flex justify-center items-center gap-4 relative overflow-hidden group border border-white/10"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_2s_infinite]" />
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
           <Sparkles className="w-6 h-6 text-emerald-300" />
        </div>
        Analyze Disease Analysis
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </motion.button>

    </div>
  );
};

export default ImagePreview;

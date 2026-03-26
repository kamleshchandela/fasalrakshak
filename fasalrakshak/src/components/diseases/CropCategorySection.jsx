import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CROP_CATEGORIES = [
  { emoji: '🌾', name: 'Wheat', count: 4 },
  { emoji: '🫘', name: 'Cotton', count: 5 },
  { emoji: '🥜', name: 'Groundnut', count: 4 },
  { emoji: '🍚', name: 'Rice', count: 4 },
  { emoji: '🍅', name: 'Tomato', count: 5 },
  { emoji: '🧅', name: 'Onion', count: 3 },
  { emoji: '🥔', name: 'Potato', count: 3 },
  { emoji: '🌽', name: 'Corn', count: 3 },
  { emoji: '🌿', name: 'Mustard', count: 2 },
  { emoji: '🌱', name: 'All Crops', count: 7 },
  { emoji: '🐛', name: 'Pests', count: 3 },
];

const CropCategorySection = ({ onSelectCrop, gridRef }) => {
  const handleClick = (cropName) => {
    onSelectCrop(cropName);
    if (gridRef?.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-[#F0F7EC] py-14 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-playfair font-bold text-[28px] text-[#1C1C1C] mb-2">Browse by Crop</h2>
          <p className="font-nunito text-[16px] text-gray-500">Select a crop to see all its diseases</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {CROP_CATEGORIES.map((crop, i) => (
            <motion.button
              key={crop.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleClick(crop.name)}
              className="bg-white border-[1.5px] border-[#E0EDD5] rounded-[16px] p-5 flex flex-col items-center gap-2 hover:border-[#1A6B2F] hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span className="text-[44px]">{crop.emoji}</span>
              <span className="font-nunito font-bold text-[15px] text-[#1C1C1C] text-center leading-tight">{crop.name}</span>
              <span className="font-nunito text-[12px] text-gray-400">{crop.count} {crop.count === 1 ? 'disease' : 'diseases'}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CropCategorySection;

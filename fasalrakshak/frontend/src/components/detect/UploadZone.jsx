import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Camera, Upload, Sun, ZoomIn, Hand, Camera as CameraAlt } from 'lucide-react';
import CameraModal from './CameraModal';
import { useLanguage } from '../../context/LanguageContext';

const UploadZone = ({ onFileSelect, errorStatus, onClearError }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { t } = useLanguage();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence>
        {errorStatus && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex flex-col items-center text-center relative mb-2"
          >
            <button onClick={onClearError} className="absolute right-3 top-3 text-red-400 hover:text-red-700">✕</button>
            <span className="text-[24px] mb-2">{errorStatus.type === 'not_plant' ? '🌿' : '⚠️'}</span>
            <p className="font-nunito font-bold text-[#C62828] text-sm md:text-[15px]">{errorStatus.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
        animate={{ scale: isDragging ? 1.01 : 1, borderColor: isDragging ? '#22C55E' : '#BBE8CC' }}
        whileHover={{ scale: 1.01 }}
        className="border-2 border-dashed rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-primary-lightGreen/80 to-white p-8 md:p-14 min-h-[200px] md:min-h-[280px] flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group shadow-inner"
      >
        <div className="absolute inset-0 bg-white/40 transition-opacity group-hover:opacity-0" />
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 p-4 bg-white/60 rounded-[20px] shadow-organic backdrop-blur-sm group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110 border border-white/50">
               <Leaf className="w-12 h-12 text-primary-green" strokeWidth={1.5} />
            </div>
            
            <h3 className="font-playfair font-black tracking-tight text-2xl md:text-3xl text-primary-darkGreen text-center mb-2">
               {t('upload.drop')}
            </h3>
            <p className="font-nunito font-medium text-[15px] text-gray-500 text-center">
               {t('upload.or_select')}
            </p>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-primary-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full mt-2">
        {/* Camera - Opens WebRTC Modal */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowCamera(true)}
          className="w-full md:w-1/2 h-[64px] bg-primary-green hover:bg-primary-darkGreen text-white rounded-[20px] flex items-center justify-center gap-3 shadow-organic hover:shadow-organic-hover transition-all duration-300 font-nunito border border-primary-green/20"
        >
          <Camera className="w-[24px] h-[24px]" strokeWidth={2} />
          <span className="text-[18px] font-bold tracking-wide">{t('upload.take_photo')}</span>
        </motion.button>

        {/* Gallery */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
          onClick={() => fileInputRef.current?.click()}
          className="w-full md:w-1/2 h-[64px] bg-white border-2 border-primary-sage text-primary-darkGreen rounded-[20px] flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:bg-primary-lightGreen transition-all font-nunito"
        >
          <Upload className="w-[24px] h-[24px] text-primary-green" strokeWidth={2} />
          <span className="text-[18px] font-bold tracking-wide">{t('upload.upload_gallery')}</span>
        </motion.button>
        <input id="gallery-upload-input" type="file" accept="image/jpeg,image/png,image/webp" ref={fileInputRef} onChange={handleChange} className="hidden" />
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraModal
          onCapture={(file) => onFileSelect(file)}
          onClose={() => setShowCamera(false)}
        />
      )}

      <p className="text-center font-nunito font-semibold text-[13px] text-gray-400">{t('upload.supports')}</p>

      {/* Tips Section */}
      <div className="mt-6 pt-6 border-t-[1px] border-gray-100">
        <h4 className="font-nunito text-[15px] font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest text-center justify-center">
          <span className="h-[1px] w-8 bg-gray-200" /> {t('upload.tips_title')} <span className="h-[1px] w-8 bg-gray-200" />
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 border border-gray-100 rounded-[16px] p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-amber-50 rounded-full"><Sun className="w-5 h-5 text-amber-500" /></div>
            <span className="font-nunito text-[13px] font-bold text-gray-700">{t('upload.tip1')}</span>
          </div>
          <div className="bg-white/60 border border-gray-100 rounded-[16px] p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-blue-50 rounded-full"><ZoomIn className="w-5 h-5 text-blue-500" /></div>
            <span className="font-nunito text-[13px] font-bold text-gray-700 text-center leading-tight">{t('upload.tip2')}</span>
          </div>
          <div className="bg-white/60 border border-gray-100 rounded-[16px] p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-green-50 rounded-full"><Hand className="w-5 h-5 text-[#2E7D32]" /></div>
            <span className="font-nunito text-[13px] font-bold text-gray-700 text-center leading-tight">{t('upload.tip3')}</span>
          </div>
          <div className="bg-white/60 border border-gray-100 rounded-[16px] p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-gray-50 rounded-full"><CameraAlt className="w-5 h-5 text-gray-500" /></div>
            <span className="font-nunito text-[13px] font-bold text-gray-700 text-center leading-tight">{t('upload.tip4')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;

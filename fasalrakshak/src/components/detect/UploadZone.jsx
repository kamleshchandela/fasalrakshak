import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Camera, Upload, Sun, ZoomIn, Hand, Camera as CameraAlt } from 'lucide-react';
import CameraModal from './CameraModal';

const UploadZone = ({ onFileSelect, errorStatus, onClearError }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

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
        animate={{ scale: isDragging ? 1.02 : 1, borderColor: isDragging ? '#1A6B2F' : '#1A6B2F' }}
        className="border-2 border-dashed border-primary-green rounded-2xl md:rounded-[20px] bg-primary-lightGreen p-8 md:p-12 min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center transition-colors cursor-pointer relative overflow-hidden group"
      >
        <Leaf className="w-16 h-16 text-primary-green opacity-70 mb-4 transition-transform group-hover:scale-110" />
        <h3 className="font-nunito font-bold text-lg md:text-xl text-primary-green text-center">Drop your crop photo here</h3>
        <p className="font-nunito text-sm text-gray-500 mt-1 text-center">or use the buttons below</p>
        <p className="font-nunito text-[13px] text-primary-green/60 mt-4 hidden md:block">Drag and drop a photo directly here</p>
        
        {/* Animated Dashed Border Effect (CSS handled in tailwind or native style) */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
        {/* Camera - Opens WebRTC Modal */}
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowCamera(true)}
          className="w-full md:w-1/2 h-[60px] bg-primary-green text-white rounded-[14px] flex items-center justify-center gap-3 shadow-sm hover:bg-[#155A26] transition-colors"
        >
          <Camera className="w-[22px] h-[22px]" />
          <span className="font-nunito text-[18px] font-bold">Take a Photo</span>
        </motion.button>

        {/* Gallery */}
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => fileInputRef.current?.click()}
          className="w-full md:w-1/2 h-[60px] bg-white border-2 border-primary-green text-primary-green rounded-[14px] flex items-center justify-center gap-3 hover:bg-primary-lightGreen transition-colors"
        >
          <Upload className="w-[22px] h-[22px]" />
          <span className="font-nunito text-[18px] font-bold">Upload from Gallery</span>
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

      <p className="text-center font-nunito text-[13px] text-gray-400 -mt-2">Supports JPG, PNG, WEBP · Max 10MB</p>

      {/* Tips Section */}
      <div className="mt-4 pt-6 border-t border-[#E0EDD5]">
        <h4 className="font-nunito text-[14px] font-bold text-primary-green mb-3 flex items-center gap-2">
          📸 Tips for best results:
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-lightGreen rounded-[10px] p-3 flex items-center gap-3">
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="font-nunito text-[13px] font-bold text-gray-700">Good lighting</span>
          </div>
          <div className="bg-primary-lightGreen rounded-[10px] p-3 flex items-center gap-3">
            <ZoomIn className="w-5 h-5 text-blue-500" />
            <span className="font-nunito text-[13px] font-bold text-gray-700 leading-tight">Close-up of area</span>
          </div>
          <div className="bg-primary-lightGreen rounded-[10px] p-3 flex items-center gap-3">
            <Hand className="w-5 h-5 text-primary-green" />
            <span className="font-nunito text-[13px] font-bold text-gray-700 leading-tight">Keep camera steady</span>
          </div>
          <div className="bg-primary-lightGreen rounded-[10px] p-3 flex items-center gap-3">
            <CameraAlt className="w-5 h-5 text-gray-500" />
            <span className="font-nunito text-[13px] font-bold text-gray-700 leading-tight">Include leaves clearly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;

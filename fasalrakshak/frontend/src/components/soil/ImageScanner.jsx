import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCcw, Scan, CheckCircle2, AlertCircle, Sparkles, UploadCloud } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { validateSoilReportImage, analyzeVisualSoil } from '../../lib/gemini';

const ImageScanner = ({ onDataChange }) => {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [error, setError] = useState(null);
  const [scanMode, setScanMode] = useState('REPORT'); // 'REPORT' or 'SOIL'
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        if (scanMode === 'SOIL') {
          performVisualScan(event.target.result);
        } else {
          performOCR(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const performVisualScan = async (imageSrc) => {
    setIsScanning(true);
    setProgress(20);
    setScanStatus('Analyzing soil texture & color...');

    try {
      const result = await analyzeVisualSoil(imageSrc);
      
      if (!result.isValid) {
        setIsScanning(false);
        setError('Invalid Image: Not a soil sample. Please upload a clear photo of soil (mud/dirt).');
        setImage(null);
        return;
      }

      setProgress(80);
      setScanStatus('Estimating nutrient profile...');
      
      setTimeout(() => {
        setIsScanning(false);
        onDataChange({
          ...result,
          OrganicCarbon: result.OrganicCarbon || 0.5
        });
      }, 1000);

    } catch (error) {
      console.error('Visual Scan Error:', error);
      setIsScanning(false);
      setError('AI Analysis failed. Please ensure a clear photo and try again.');
    }
  };

  const performOCR = async (imageSrc) => {
    setIsScanning(true);
    setProgress(0);
    setScanStatus('Analyzing text layers...');

    try {
      setScanStatus('Verifying document type...');
      const isValid = await validateSoilReportImage(imageSrc);
      
      if (!isValid) {
        setIsScanning(false);
        setError('Invalid Document: Not a soil report. Please upload a clear photo of a laboratory report.');
        setImage(null);
        return;
      }

      // Refactored for stability to avoid Vite/Oxc parse errors
      const options = {
        logger: m => {
          if (m.status === 'recognizing text') setProgress(Math.floor(m.progress * 100));
        }
      };

      const workerRes = await Tesseract.recognize(imageSrc, 'eng', options);
      const text = workerRes.data.text;

      setScanStatus('Extracting nutrient data...');
      
      // Smart Parsing Engine
      const soilData = {
        pH: extractValue(text, /pH[:\s]*(\d+\.?\d*)/i, 7.2),
        Nitrogen: extractValue(text, /(?:Nitrogen|N)[:\s]*(\d+\.?\d*)/i, 120),
        Phosphorus: extractValue(text, /(?:Phosphorus|P)[:\s]*(\d+\.?\d*)/i, 45),
        Potassium: extractValue(text, /(?:Potassium|K)[:\s]*(\d+\.?\d*)/i, 210),
        Moisture: extractValue(text, /(?:Moisture)[:\s]*(\d+\.?\d*)/i, 12),
        OrganicCarbon: extractValue(text, /(?:Organic Carbon|OC)[:\s]*(\d+\.?\d*)/i, 0.85),
        SoilType: 'Alluvial'
      };

      // Process immediately
      setIsScanning(false);
      onDataChange(soilData);

    } catch (error) {
      console.error('OCR Error:', error);
      setIsScanning(false);
    }
  };

  const extractValue = (text, regex, defaultValue) => {
    const match = text.match(regex);
    return match ? parseFloat(match[1]) : defaultValue;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 min-h-[400px]">
      {/* Mode Switcher */}
      {!image && !isScanning && (
        <div className="bg-gray-100/50 p-1.5 rounded-[24px] border border-gray-100 flex gap-2">
           <button 
             onClick={() => setScanMode('REPORT')}
             className={`px-6 py-2.5 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
               scanMode === 'REPORT' ? 'bg-[#166534] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
             }`}
           >
             Lab Report Scan
           </button>
           <button 
             onClick={() => setScanMode('SOIL')}
             className={`px-6 py-2.5 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
               scanMode === 'SOIL' ? 'bg-[#10b981] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
             }`}
           >
             Direct Soil Photo
           </button>
        </div>
      )}

      {!image ? (
        <motion.div 
          onClick={() => fileInputRef.current.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full max-w-lg border-4 border-dashed rounded-[40px] p-20 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all group ${
            scanMode === 'SOIL' ? 'border-emerald-100 hover:border-emerald-400/40 hover:bg-emerald-50/50' : 'border-green-100 hover:border-[#10b981]/40 hover:bg-green-50/50'
          }`}
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner ${
            scanMode === 'SOIL' ? 'bg-emerald-50' : 'bg-green-50'
          }`}>
             {scanMode === 'SOIL' ? <Camera className="text-emerald-500 w-12 h-12" /> : <UploadCloud className="text-[#10b981] w-12 h-12" />}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-800 font-playfair mb-2 tracking-tight">
              {scanMode === 'SOIL' ? 'Analyze Soil Photo' : 'Upload Lab Report'}
            </h3>
            <p className="text-gray-400 font-nunito font-bold">
              {scanMode === 'SOIL' ? 'Take a clear photo of actual soil / dirt' : 'PNG, JPG or Screenshot of your soil lab report'}
            </p>
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-xl border border-red-100 animate-bounce">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={(e) => {
              setError(null);
              handleImageUpload(e);
            }} 
          />
        </motion.div>
      ) : (
        <div className="relative w-full max-w-2xl rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
          <img src={image} alt="Soil Report" className="w-full h-auto" />
          
          {/* Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <div className="absolute inset-0">
                {/* Moving Scan Line */}
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="absolute left-0 w-full h-1 bg-[#10b981] shadow-[0_0_20px_#10b981] z-10"
                />
                
                {/* Overlay with status info */}
                <div className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white text-center p-8">
                   <div className="w-20 h-20 relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-full h-full border-4 border-white/20 border-t-[#10b981] rounded-full"
                      />
                      <Scan className="absolute inset-0 m-auto w-8 h-8 text-[#10b981] animate-pulse" />
                   </div>
                   
                   <div className="space-y-2">
                     <h4 className="text-2xl font-black font-playfair leading-tight tracking-tight">AI Analysis in Progress</h4>
                     <p className="text-green-100 font-nunito font-black uppercase tracking-[0.2em] text-xs">{scanStatus}</p>
                   </div>
                   
                   <div className="w-64 h-3 bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                      <motion.div 
                         initial={{ width: '0%' }}
                         animate={{ width: `${progress}%` }}
                         className="h-full bg-[#10b981] shadow-[0_0_10px_#10b981]"
                      />
                   </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {!isScanning && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => { setImage(null); setProgress(0); }}
              className="absolute top-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl text-[#166534] shadow-xl hover:bg-white transition-all border border-white/50"
            >
              <RefreshCcw className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      )}

      {/* OCR Hints */}
      {!isScanning && !image && (
        <div className="bg-white/40 p-6 rounded-[28px] border border-white/50 flex flex-col md:flex-row items-center gap-6 max-w-4xl">
           <div className="w-14 h-14 bg-[#10b981]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="text-[#10b981] w-7 h-7" />
           </div>
           <p className="text-gray-500 font-nunito font-semibold text-sm leading-relaxed">
             <span className="text-[#166534] font-black uppercase tracking-wider block mb-1">OCR Power Tip:</span>
             Ensure the photo is bright and clear. Our AI looks for text like <span className="font-bold text-gray-800">"pH"</span>, <span className="font-bold text-gray-800">"Nitrogen"</span>, and <span className="font-bold text-gray-800">"P-K"</span> to automatically fill your data.
           </p>
        </div>
      )}
    </div>
  );
};

export default ImageScanner;

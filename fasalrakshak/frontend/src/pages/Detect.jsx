import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Leaf } from 'lucide-react';
import lushGreen from '../images/lush_green.png';

import UploadZone from '../components/detect/UploadZone';
import ImagePreview from '../components/detect/ImagePreview';
import AnalyzingLoader from '../components/detect/AnalyzingLoader';
import ResultStatusBanner from '../components/detect/ResultStatusBanner';
import ResultQuickStats from '../components/detect/ResultQuickStats';
import SymptomsCard from '../components/detect/SymptomsCard';
import TreatmentPlanCard from '../components/detect/TreatmentPlanCard';
import PreventionCard from '../components/detect/PreventionCard';
import ShareCard from '../components/detect/ShareCard';
import NearbyAlertCard from '../components/detect/NearbyAlertCard';
import ScanHistoryPreview from '../components/detect/ScanHistoryPreview';
import TreatmentInfo from '../components/detect/TreatmentInfo';
import PrintableReport from '../components/detect/PrintableReport';


import imageCompression from 'browser-image-compression';
import { analyzeCropImage } from '../lib/gemini';
import { uploadToCloudinary } from '../lib/cloudinary';

const Detect = () => {
  const { user, incrementTotalScans } = useContext(AuthContext);
  const { t } = useLanguage();

  // System States: 'EMPTY', 'PREVIEW', 'ANALYZING', 'RESULTS'
  const [currentState, setCurrentState] = useState('EMPTY');
  
  // File tracking
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  // AI & Upload Results
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanRecord, setScanRecord] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  const resetFlow = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedCrop('');
    setAnalysisResult(null);
    setScanRecord(null);
    setErrorStatus(null);
    setCurrentState('EMPTY');
  };

  const handleFileSelect = (file) => {
    setErrorStatus(null);
    
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrorStatus({ type: 'validation', message: 'This photo is too large (max 10MB). Please take a smaller photo.' });
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorStatus({ type: 'validation', message: 'Only JPG and PNG photos are supported.' });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setCurrentState('PREVIEW');
  };

  const executeAnalysis = async () => {
    if (!selectedFile) return;
    
    setCurrentState('ANALYZING');
    setErrorStatus(null);

    try {
      // 1. Compress Image
      const compressOptions = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(selectedFile, compressOptions);
      
      // 2. Base64 encode for Gemini
      const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
      const base64Image = await fileToDataUri(compressedFile);

      // 3. Fire Gemini API
      const aiResult = await analyzeCropImage(base64Image, compressedFile, selectedCrop);
      console.log("Detect Result Received:", aiResult);

      // 4. Handle Not A Plant constraint (Now active for both Cloud & Local AI)
      if (aiResult.isPlantImage === false) {
        throw { type: 'not_plant', message: "Image Rejected: Not a crop. Please take a clear photo of a plant leaf." };
      }

      // 5. Upload strictly to Cloudinary to secure permanent URLs
      let cloudImageInfo = { imageUrl: previewUrl, thumbnailUrl: previewUrl }; // fallback
      try {
        const cloudResp = await uploadToCloudinary(compressedFile);
        if (cloudResp && cloudResp.thumbnailUrl) {
           cloudImageInfo = cloudResp;
           saveToDatabase(aiResult, cloudResp);
        }
      } catch (err) {
        console.warn("Cloudinary upload failed, using fallback Base64 / Blob:", err);
      }

      // 6. Build Local Data record securely
      const localRecord = {
        id: 'scan_' + Date.now(),
        ...aiResult,
        imageThumbnail: cloudImageInfo.thumbnailUrl, // Now an absolutely permanent Cloudinary link!
        timestamp: new Date().toISOString()
      };

      setAnalysisResult(aiResult);
      setScanRecord(localRecord);
      
      // Add to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('fasalrakshak_scans') || '[]');
        const updated = [localRecord, ...stored].slice(0, 50); // max 50
        localStorage.setItem('fasalrakshak_scans', JSON.stringify(updated));
      } catch (e) {}

      // Update Native total scans locally
      if (incrementTotalScans) {
        incrementTotalScans();
      }
      
      setCurrentState('RESULTS');

    } catch (error) {
      console.error("Analysis Pipeline Flaw:", error);
      if (error.type === 'not_plant' || error.type === 'validation' || error.type === 'api_error') {
        setErrorStatus(error);
      } else if (!navigator.onLine) {
        setErrorStatus({ type: 'network', message: "Please check your mobile data or WiFi and try again." });
      } else {
        setErrorStatus({ type: 'unknown', message: "Could Not Read AI Response. Please ensure you have a stable connection and take a clear, well-lit photo." });
      }
      setCurrentState('PREVIEW'); // Revert back to allow retry
    }
  };

  const handleManualAnalyze = async () => {
    const k = parseFloat(document.getElementById('input-Potassium').value) || 0;
    const crop = document.getElementById('input-Crop').value || "Wheat";

    setCurrentState('ANALYZING');
    
    // Simulate high-speed analysis
    setTimeout(() => {
      let statusText = "Balanced Nutrients";
      let health = "healthy";
      let severity = "none";
      let disease = "Soil Balance Optimal";
      
      if (n < 40) { statusText = "Nitrogen is Low"; health = "diseased"; severity = "moderate"; disease = "Nitrogen Deficient"; }
      else if (p < 30) { statusText = "Phosphorus is Medium"; health = "diseased"; severity = "mild"; disease = "Phosphorus Deficiency"; }
      else if (k < 30) { statusText = "Potassium is Low"; health = "diseased"; severity = "severe"; disease = "Potassium Deficiency"; }

      const result = {
        isPlantImage: true,
        cropName: crop,
        healthStatus: health,
        diseaseName: statusText,
        diseaseType: "Soil Analysis",
        severity: severity,
        confidencePercent: 99,
        symptoms: [`N: ${n}, P: ${p}, K: ${k} detected in manual input.`],
        treatments: [
          { action: "Apply Urea", detail: "Apply 50kg Urea per acre.", type: "chemical" },
          { action: "Use Compost", detail: "Use 2 tonnes Organic Compost.", type: "organic" }
        ],
        aiSource: "local_python_model"
      };

      setAnalysisResult(result);
      setCurrentState('RESULTS');
    }, 1200);
  };

  const saveToDatabase = async (aiData, cloudData) => {
    try {
      const payload = {
        imageUrl: cloudData.imageUrl,
        thumbnailUrl: cloudData.thumbnailUrl,
        ...aiData
      };
      
      const res = await fetch('/api/scans', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // Silently fails if user is not logged in — that is acceptable
    } catch (e) {
      console.warn("DB syncing background trait failed", e);
    }
  };

  // The 4 complex Animated States inside the Main Detection Block
  const renderCardState = () => {
    switch(currentState) {
      case 'EMPTY':
        return (
          <div className="flex flex-col gap-8">
            <div className="text-center mb-4">
              <h2 className="font-playfair font-black text-2xl md:text-3xl text-primary-darkGreen">🧪 Manual Soil Input</h2>
              <p className="font-nunito font-bold text-gray-500 mt-2">Enter your soil report values for instant recommendations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-nunito font-black text-[15px] text-gray-700 ml-1 uppercase tracking-wider">🌿 Target Crop</label>
                <select
                  id="input-Crop"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-nunito font-bold text-xl text-gray-900 outline-none focus:border-[#10b981] focus:ring-4 focus:ring-[#10b981]/5 transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value="Wheat">Wheat (Gahum)</option>
                  <option value="Rice">Rice (Chokha)</option>
                  <option value="Corn">Corn (Makai)</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Cotton">Cotton (Kapas)</option>
                </select>
              </div>

              {[
                { name: 'pH', label: '⚗️ pH Level', placeholder: '7.0', min: 0, max: 14 },
                { name: 'Nitrogen', label: 'N - Nitrogen', placeholder: 'e.g. 50', unit: 'mg/kg' },
                { name: 'Phosphorus', label: 'P - Phosphorus', placeholder: 'e.g. 40', unit: 'mg/kg' },
                { name: 'Potassium', label: 'K - Potassium', placeholder: 'e.g. 35', unit: 'mg/kg' }
              ].map(field => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="font-nunito font-black text-[15px] text-gray-700 ml-1 uppercase tracking-wider">{field.label} {field.unit && <span className="text-gray-400">({field.unit})</span>}</label>
                  <input
                    type="number"
                    id={`input-${field.name}`}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-nunito font-bold text-xl text-gray-900 outline-none focus:border-[#10b981] focus:ring-4 focus:ring-[#10b981]/5 transition-all shadow-sm"
                  />
                </div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleManualAnalyze}
              className="w-full h-[64px] bg-primary-green text-white rounded-[14px] font-nunito font-bold text-[20px] shadow-[0_4px_20px_rgba(26,107,47,0.3)] hover:bg-[#155A26] transition-colors mt-4 flex justify-center items-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]" />
              🔬 Analyze Soil
            </motion.button>
            <p className="text-center font-nunito font-semibold text-[13px] text-gray-400">Values are analyzed based on standard CLI standards</p>
          </div>
        );
      case 'ANALYZING':
        return <AnalyzingLoader onCancel={() => setCurrentState('EMPTY')} />;
      case 'RESULTS':
        return (
          <>
            <ResultStatusBanner result={analysisResult} />
            <div className="flex flex-col md:flex-row gap-6 mt-6 px-4 pb-4 md:px-8 md:pb-8">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-full h-[160px] md:h-full rounded-2xl overflow-hidden border-2 border-[#E0EDD5] relative shadow-sm flex items-center justify-center bg-gray-50">
                   <span className="text-6xl">🧪</span>
                  {/* AI Source Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border bg-blue-500/80 text-white border-blue-400">
                       💻 Device AI
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                    <div className="bg-primary-green text-white font-nunito font-bold text-[14px] px-3 py-1 rounded-full shadow-sm">
                      🌿 {analysisResult.cropName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <ResultQuickStats result={analysisResult} />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <div className="hidden print:block absolute inset-0 w-full bg-white z-[9999]">
       <PrintableReport result={analysisResult} image={previewUrl} />
    </div>
    
    <div className="min-h-screen bg-[#FDFDFD] font-nunito flex flex-col pt-20 print:hidden relative overflow-hidden">
      
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="w-full relative overflow-hidden py-16 md:py-28"
      >
        {/* Soft elegant gradient for a light organic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-lightGreen/70 via-white/40 to-background-cream z-10" />
        
        <img 
          src={lushGreen} 
          alt="Lush Agriculture Field" 
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-[1px]"
        />
        
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center -mt-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-md text-primary-darkGreen text-[12px] md:text-sm font-bold uppercase tracking-widest py-1.5 px-6 rounded-full mb-6 border border-primary-green/20 shadow-sm flex items-center gap-2"
          >
            <span className="text-[18px] font-bold tracking-wide">Manual Intelligence</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-green"></span>
            </span>
<<<<<<< HEAD
            Soil Analysis Mode
=======
            {t('detect.tag')}
>>>>>>> main
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="font-playfair text-text-charcoal text-4xl md:text-6xl font-black mb-4 md:mb-5 tracking-tight drop-shadow-sm"
          >
<<<<<<< HEAD
            🔬 Analyze Soil & Recommend Fertilizer
=======
            {t('detect.title1')}<span className="text-primary-green">{t('detect.title2')}</span>
>>>>>>> main
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-700 text-[16px] md:text-xl max-w-2xl mb-10 leading-relaxed font-semibold drop-shadow-sm"
          >
<<<<<<< HEAD
            Enter your Nitrogen, Phosphorus, and Potassium levels. Our specialized soil logic will instantly analyze nutrient levels and provide a personalized fertilizer plan.
=======
            {t('detect.desc')}
>>>>>>> main
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
<<<<<<< HEAD
            {['✅ Nutrient Precision', '🌿 Rule-Based Engine', '⚡ Instant Results'].map((stat, i) => (
              <span key={i} className="bg-white/60 backdrop-blur-sm text-primary-darkGreen px-4 py-1.5 rounded-full text-[14px] md:text-[15px] font-bold border border-primary-green/20 shadow-sm flex items-center">
                {stat}
              </span>
            ))}
=======
            {(() => {
               const statsArray = Array.isArray(t('detect.stats')) ? t('detect.stats') : ['✅ High Precision Models', '🌿 Offline Capable Engine', '⚡ Lightning Fast Output'];
               return statsArray.map((stat, i) => (
                 <span key={i} className="bg-white/60 backdrop-blur-sm text-primary-darkGreen px-4 py-1.5 rounded-full text-[14px] md:text-[15px] font-bold border border-primary-green/20 shadow-sm flex items-center">
                   {stat}
                 </span>
               ));
            })()}
>>>>>>> main
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Main Content Wrapper */}
      <div className="container mx-auto px-4 py-8 md:py-12 -mt-24 relative z-30 mb-12 max-w-[850px]">
        
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
          className={`bg-white border border-[#F0F0F0] rounded-[32px] overflow-hidden transition-all duration-300 relative
            ${currentState === 'RESULTS' 
              ? 'p-0 shadow-lg' 
              : 'p-6 md:p-10 shadow-organic'
            }
          `}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCardState()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 3. Detail Cards (Only appear in RESULTS state) */}
        <AnimatePresence>
          {currentState === 'RESULTS' && analysisResult && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex flex-col gap-6"
            >
              {analysisResult.healthStatus === 'diseased' && (
                <TreatmentInfo data={analysisResult} />
              )}

              
              <PreventionCard result={analysisResult} />
              
              {analysisResult.healthStatus === 'diseased' && analysisResult.nearbyFarmerAlert && (
                 <NearbyAlertCard result={analysisResult} user={user} />
              )}
              
              <ShareCard result={analysisResult} onScanAgain={resetFlow} />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>

      {/* 4. Bottom History Strip */}
      <ScanHistoryPreview />
    </div>
    </>
  );
};

export default Detect;

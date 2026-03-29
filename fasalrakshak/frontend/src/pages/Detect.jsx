import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf } from 'lucide-react';

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
      let aiResult;
      try {
        aiResult = await analyzeCropImage(base64Image, selectedCrop);
      } catch (geminiError) {
        throw { type: 'api_error', message: "Our AI is busy. Please wait a moment and try again.", original: geminiError };
      }

      // 4. Handle Not A Plant constraint - (Strict with Gemini, lenient with Local)
      if (aiResult.aiSource === 'cloud' && aiResult.isPlantImage === false) {
        throw { type: 'not_plant', message: "This does not look like a crop photo. Please take a closer photo of your plant." };
      }

      // 5. Fire Cloudinary in background (don't wait heavily)
      let cloudImageInfo = { imageUrl: previewUrl, thumbnailUrl: previewUrl }; // fallback
      uploadToCloudinary(compressedFile).then(cloudResp => {
        cloudImageInfo = cloudResp;
        // Background update DB logic via an internal hook tracking the completed item
        saveToDatabase(aiResult, cloudResp);
      }).catch(err => {
        console.warn("Cloudinary silent fail:", err);
        saveToDatabase(aiResult, cloudImageInfo);
      });

      // 6. Build Local Data record immediately for blazing fast UX
      const localRecord = {
        id: 'scan_' + Date.now(),
        ...aiResult,
        imageThumbnail: cloudImageInfo.thumbnailUrl, // initially blob, overriden later
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
      incrementTotalScans();
      
      setCurrentState('RESULTS');

    } catch (error) {
      console.error("Analysis Pipeline Flaw:", error);
      if (error.type === 'not_plant' || error.type === 'validation' || error.type === 'api_error') {
        setErrorStatus(error);
      } else if (!navigator.onLine) {
        setErrorStatus({ type: 'network', message: "Please check your mobile data or WiFi and try again." });
      } else {
        setErrorStatus({ type: 'unknown', message: "Could Not Read AI Response. Please take a clearer, brighter photo and try again." });
      }
      setCurrentState('PREVIEW'); // Revert back to allow retry
    }
  };

  const saveToDatabase = async (aiData, cloudData) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) return;

      const payload = {
        imageUrl: cloudData.imageUrl,
        thumbnailUrl: cloudData.thumbnailUrl,
        ...aiData
      };
      
      const res = await fetch('/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Cookies handled via browser native mostly if domain matching, or explicit token
        body: JSON.stringify(payload)
      });
      // If fails silently, it's fine. Frontend already updated completely.
    } catch (e) {
      console.warn("DB syncing background trait failed", e);
    }
  };

  // The 4 complex Animated States inside the Main Detection Block
  const renderCardState = () => {
    switch(currentState) {
      case 'EMPTY':
        return <UploadZone onFileSelect={handleFileSelect} errorStatus={errorStatus} onClearError={() => setErrorStatus(null)} />;
      case 'PREVIEW':
        return (
          <ImagePreview 
            fileUrl={previewUrl} 
            selectedCrop={selectedCrop}
            setSelectedCrop={setSelectedCrop}
            onChangePhoto={() => document.getElementById('gallery-upload-input')?.click()}
            onRemove={resetFlow}
            onAnalyze={executeAnalysis}
            errorStatus={errorStatus}
            onClearError={() => setErrorStatus(null)}
          />
        );
      case 'ANALYZING':
        return <AnalyzingLoader onCancel={() => setCurrentState('PREVIEW')} />;
      case 'RESULTS':
        return (
          <>
            <ResultStatusBanner result={analysisResult} />
            <div className="flex flex-col md:flex-row gap-6 mt-6 px-4 pb-4 md:px-8 md:pb-8">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-full h-[160px] md:h-full rounded-2xl overflow-hidden border-2 border-[#E0EDD5] relative shadow-sm">
                  <img src={previewUrl} alt="Crop" className="w-full h-full object-cover" />
                  
                  {/* AI Source Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      analysisResult.aiSource === 'local' 
                        ? 'bg-blue-500/80 text-white border-blue-400' 
                        : 'bg-primary-green/80 text-white border-white/20'
                    }`}>
                      {analysisResult.aiSource === 'local' ? '💻 Device AI' : '☁️ Cloud AI'}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                    <div className="bg-primary-green text-white font-nunito font-bold text-[14px] px-3 py-1 rounded-full shadow-sm">
                      🌿 {analysisResult.cropName}
                    </div>
                    {analysisResult.isLocal && !selectedCrop && (
                      <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full self-start shadow-sm flex items-center gap-1">
                        ✨ Auto-Detected
                      </div>
                    )}
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
    
    <div className="min-h-screen bg-white font-nunito flex flex-col pt-20 print:hidden">
      {/* 1. Header Banner */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="w-full bg-primary-lightGreen relative overflow-hidden py-10 md:py-16"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200" 
          alt="Agriculture Field" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="bg-primary-green/90 backdrop-blur-sm text-white text-[12px] md:text-sm font-bold uppercase tracking-wider py-1.5 px-4 rounded-full mb-4 border border-white/20">
            🔬 AI-Powered Disease Detection
          </div>
          <h1 className="font-playfair text-white text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Detect Crop Disease
          </h1>
          <p className="text-white/90 text-[15px] md:text-lg max-w-lg mb-6 leading-relaxed">
            Upload or capture a photo of your crop to get instant AI-powered disease diagnosis and treatment.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['✅ 50,000+ Scans Done', '🌿 40+ Diseases Detected', '⚡ Results in 5 Seconds'].map((stat, i) => (
              <span key={i} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[13px] md:text-[14px] font-bold">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Main Content Wrapper */}
      <div className="container mx-auto px-4 py-8 md:py-12 -mt-8 relative z-30 mb-8 max-w-[800px]">
        
        <motion.div 
          initial={{ y: 60, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className={`bg-white border-2 border-[#E0EDD5] rounded-3xl shadow-[0_8px_40px_rgba(26,107,47,0.10)] overflow-hidden transition-all
            ${currentState === 'RESULTS' ? '' : 'p-5 md:p-10'}
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

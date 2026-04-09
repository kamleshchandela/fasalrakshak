import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, FileText, Camera, Edit3, ChevronRight, Info, Save, AlertCircle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import ManualForm from '../components/soil/ManualForm';
import PdfUploader from '../components/soil/PdfUploader';
import ImageScanner from '../components/soil/ImageScanner';
import SoilInsights from '../components/soil/SoilInsights';
import SoilVisualization from '../components/soil/SoilVisualization';
import OrganicSwitchButton from '../components/organic/OrganicSwitchButton';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '@clerk/clerk-react';

const SoilReport = () => {
  const [activeMode, setActiveMode] = useState('manual'); // 'manual', 'pdf', 'scan'
  const [reportData, setReportData] = useState(null);
  const [stagedData, setStagedData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { t } = useLanguage();
  const { user } = useUser();

  const handleDataChange = (data) => {
    setStagedData(data);
  };

  const handlePredict = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setReportData(stagedData);
      setShowReport(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate Firebase saving
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const modes = [
    { id: 'manual', icon: <Edit3 className="w-5 h-5" />, label: t('soil.manual') },
    { id: 'pdf', icon: <FileText className="w-5 h-5" />, label: t('soil.upload') },
    { id: 'scan', icon: <Camera className="w-5 h-5" />, label: t('soil.scan') }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 pt-12 px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100 opacity-50 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50 opacity-60 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/3"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <section className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-[#166534] rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-green-900/20 mb-6"
          >
            <Leaf className="text-white w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight"
          >
            Smart <span className="text-[#10b981]">Soil Health</span> Hub
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-nunito font-semibold text-lg max-w-2xl mx-auto"
          >
            Upload your laboratory report or enter data manually to get AI-powered fertilizer suggestions and crop health insights.
          </motion.p>
        </section>

        {/* Manual Input Container */}
        <div className="flex flex-col items-center gap-6 pt-4 mb-2">
            <div className="bg-[#166534]/10 text-[#166534] px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase border border-[#166534]/10 shadow-sm">
               Clinical Data Entry
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-[24px] border border-white/50 shadow-inner">
               {modes.map(mode => (
                 <button
                   key={mode.id}
                   onClick={() => {
                     setActiveMode(mode.id);
                     setStagedData(null);
                     setShowReport(false);
                   }}
                   className={`flex items-center gap-3 px-6 py-3 rounded-[20px] font-black text-sm transition-all ${
                     activeMode === mode.id 
                     ? 'bg-[#166534] text-white shadow-lg shadow-green-900/20' 
                     : 'text-gray-400 hover:text-gray-600'
                   }`}
                 >
                   {mode.icon}
                   {mode.label}
                 </button>
               ))}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Panel */}
          <div className="lg:col-span-12 max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-4 md:p-8 shadow-2xl shadow-gray-200/50"
              >
                {activeMode === 'manual' && (
                  <ManualForm onDataChange={handleDataChange} initialData={stagedData} />
                )}
                {activeMode === 'pdf' && (
                  <PdfUploader onDataChange={handleDataChange} />
                )}
                {activeMode === 'scan' && (
                  <ImageScanner onDataChange={handleDataChange} />
                )}
                
                <div className="mt-10 pt-8 border-t border-gray-100 flex justify-center">
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handlePredict}
                     disabled={isAnalyzing || !stagedData}
                     className="px-10 py-5 bg-[#166534] text-white rounded-3xl font-black text-xl shadow-xl shadow-green-900/10 flex items-center gap-3 disabled:opacity-50"
                   >
                      {isAnalyzing ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                          Analyzing soil...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-6 h-6" /> Analyze Soil & Recommend Fertilizer
                        </>
                      )}
                   </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Unified Intelligence Dashboard */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              {showReport && reportData && (
                <motion.div 
                  key="report"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-8 mt-12"
                >
                  {/* Result Header & Global Health Score */}
                  <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[40px] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#10b981]"></div>
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Soil Analysis <span className="text-[#10b981]">Result 🌿</span></h2>
                        <p className="text-gray-500 font-nunito font-bold max-w-md">Comprehensive analysis based on your laboratory parameters and regional soil signatures.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-6 relative z-10">
                        <OrganicSwitchButton soilData={reportData} userId={user?.id} />
                        
                        <div className="flex items-center gap-6 bg-[#f0f9f1] px-8 py-5 rounded-[32px] border border-green-100 shadow-inner">
                          <div className="text-center">
                              <p className="text-[10px] font-black text-green-700/60 uppercase tracking-widest mb-1">Health index</p>
                              <p className="text-4xl font-black text-[#166534]">84<span className="text-lg opacity-50">/100</span></p>
                          </div>
                           <div className="h-10 w-px bg-green-200"></div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="bg-[#10b981] text-white px-5 py-2 rounded-full font-black text-xs tracking-widest uppercase shadow-lg shadow-green-900/10">EXCELLENT</div>
                            {reportData?.isVisualEstimate && (
                              <div className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Visual Estimate
                              </div>
                            )}
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* Performance Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Column: Deep Visuals */}
                    <div className="xl:col-span-7">
                      <SoilVisualization data={reportData} />
                    </div>
                    
                    {/* Right Column: AI Action Lane */}
                    <div className="xl:col-span-5">
                      <SoilInsights data={reportData} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Footer */}
          {reportData && (
            <div className="lg:col-span-12 flex justify-center pt-8">
               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-3 px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl ${
                  saveSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#166534] text-white hover:bg-[#114b27]'
                } disabled:opacity-70`}
               >
                 {isSaving ? (
                   <span className="flex items-center gap-2">
                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                     {t('soil.saving') || 'Saving...'}
                   </span>
                 ) : saveSuccess ? (
                   <span className="flex items-center gap-2">
                     <CheckCircle2 className="w-6 h-6" />
                     {t('soil.saved') || 'Saved Successfully!'}
                   </span>
                 ) : (
                   <span className="flex items-center gap-3">
                     <Save className="w-6 h-6" />
                     Save Report to Profile
                   </span>
                 )}
               </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilReport;

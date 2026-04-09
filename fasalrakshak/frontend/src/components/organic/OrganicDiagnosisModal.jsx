import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, FileText, Sparkles, Sprout, AlertTriangle, 
  ChevronRight, ShoppingBag, ShieldCheck, Bug, Droplets, Info, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeCropImage } from '../../lib/gemini';
import imageCompression from 'browser-image-compression';
import { useLanguage } from '../../context/LanguageContext';

const OrganicDiagnosisModal = ({ onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState('CHOOSING'); // CHOOSING, MANUAL, AI_SCAN, RESULT
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagResult, setDiagResult] = useState(null);

  // Manual Form State
  const [manualData, setManualData] = useState({
    crop: '',
    signs: '',
    leafColor: 'Green'
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setStep('AI_SCAN');
    }
  };

  const runAIScan = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    
    try {
      const compressOptions = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(image, compressOptions);
      
      const fileToDataUri = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      const base64Image = await fileToDataUri(compressedFile);
      
      const aiResult = await analyzeCropImage(base64Image, compressedFile, '');
      
      setDiagResult({
        status: aiResult.healthStatus === 'healthy' ? 'ORGANIC_READY' : 'TREATMENT_NEEDED',
        disease: aiResult.diseaseName,
        confidence: aiResult.confidence,
        symptoms: aiResult.symptoms,
        bioPesticide: aiResult.healthStatus === 'healthy' ? null : "Neem Oil & Garlic Extract"
      });
      setStep('RESULT');
    } catch (err) {
      console.error(err);
      setStep('CHOOSING');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const isUnhealthy = manualData.signs.length > 5 || manualData.leafColor !== 'Green';
    setDiagResult({
      status: isUnhealthy ? 'TREATMENT_NEEDED' : 'ORGANIC_READY',
      disease: isUnhealthy ? 'Possible Nutrient Deficiency' : 'Healthy Appearance',
      bioPesticide: isUnhealthy ? "Liquid Seaweed Extract & Compost Tea" : null
    });
    setStep('RESULT');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 md:rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col h-full md:h-auto md:max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
           <div className="flex items-center gap-4">
              {step !== 'CHOOSING' && (
                <button onClick={() => setStep('CHOOSING')} className="p-2 md:hidden text-slate-400">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                 <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                 <h2 className="text-lg md:text-2xl font-black text-white tracking-tight">{t('organic.modal.title')}</h2>
                 <p className="text-slate-500 text-[8px] md:text-xs font-bold uppercase tracking-[2px]">{t('organic.modal.subtitle')}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-slate-900">
           
           {step === 'CHOOSING' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <motion.div 
                   whileHover={{ y: -5 }}
                   onClick={() => setStep('MANUAL')}
                   className="bg-slate-800/50 p-8 md:p-12 rounded-3xl border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer group text-center space-y-6"
                >
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 mx-auto group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all">
                      <FileText className="w-8 h-8 md:w-12 md:h-12" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-black text-white">{t('organic.modal.manualTitle')}</h3>
                      <p className="text-slate-400 text-sm font-bold">{t('organic.modal.manualDesc')}</p>
                   </div>
                </motion.div>

                <motion.div 
                   whileHover={{ y: -5 }}
                   onClick={() => document.getElementById('ai-photo-input').click()}
                   className="bg-slate-800/50 p-8 md:p-12 rounded-3xl border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer group text-center space-y-6"
                >
                   <input type="file" id="ai-photo-input" className="hidden" accept="image/*" onChange={handleImageSelect} />
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-all">
                      <Camera className="w-8 h-8 md:w-12 md:h-12" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-black text-white">{t('organic.modal.aiTitle')}</h3>
                      <p className="text-slate-400 text-sm font-bold">{t('organic.modal.aiDesc')}</p>
                   </div>
                </motion.div>
             </div>
           )}

           {step === 'MANUAL' && (
             <form onSubmit={handleManualSubmit} className="space-y-8 max-w-2xl mx-auto">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">{t('organic.modal.formCrop')}</label>
                   <input 
                      type="text" required
                      className="w-full p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors font-bold placeholder:text-slate-600"
                      placeholder={t('organic.modal.formPlaceholder')}
                      value={manualData.crop}
                      onChange={(e) => setManualData({...manualData, crop: e.target.value})}
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">{t('organic.modal.formSigns')}</label>
                   <textarea 
                      className="w-full p-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors font-bold min-h-[120px] placeholder:text-slate-600"
                      placeholder={t('organic.modal.formSignsPlaceholder')}
                      value={manualData.signs}
                      onChange={(e) => setManualData({...manualData, signs: e.target.value})}
                   />
                </div>
                <button type="submit" className="w-full p-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20">
                   {t('organic.modal.formSubmit')}
                </button>
             </form>
           )}

           {step === 'AI_SCAN' && (
             <div className="flex flex-col items-center justify-center space-y-10 py-6">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                   <img src={preview} alt="Scan preview" className="w-full h-full object-cover rounded-3xl border border-slate-700" />
                   {isAnalyzing && (
                     <div className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <span className="text-white text-[10px] font-black uppercase tracking-[3px]">{t('organic.modal.scanning')}</span>
                     </div>
                   )}
                </div>
                {!isAnalyzing && (
                  <button onClick={runAIScan} className="w-full max-w-xs p-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[2px] transition-all">
                     {t('organic.modal.scanBtn')}
                  </button>
                )}
             </div>
           )}

           {step === 'RESULT' && diagResult && (
             <div className="space-y-8 max-w-2xl mx-auto py-4">
                <div className={`p-10 rounded-[32px] border bg-slate-800/30 text-center space-y-6 ${diagResult.status === 'ORGANIC_READY' ? 'border-emerald-500/30' : 'border-orange-500/30'}`}>
                   <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${diagResult.status === 'ORGANIC_READY' ? 'bg-emerald-500 text-emerald-950' : 'bg-orange-500 text-orange-950'}`}>
                      {diagResult.status === 'ORGANIC_READY' ? <ShieldCheck className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-2xl md:text-3xl font-black text-white leading-tight">
                         {diagResult.status === 'ORGANIC_READY' ? t('organic.modal.resVerified') : t('organic.modal.resRisk')}
                      </h4>
                      <p className="text-slate-400 font-bold">{diagResult.disease}</p>
                   </div>
                </div>

                <div className="space-y-4">
                  {diagResult.status === 'ORGANIC_READY' ? (
                     <button 
                        onClick={() => navigate('/organic#advisor')} 
                        className="w-full p-6 bg-slate-800 border border-slate-700 text-white rounded-2xl font-black uppercase tracking-[2px] flex items-center justify-center gap-4 hover:bg-slate-700 transition-all"
                     >
                        {t('organic.modal.resRoadmap')} <ChevronRight className="w-5 h-5 text-emerald-500" />
                     </button>
                  ) : (
                     <div className="space-y-4">
                        <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-start gap-4">
                           <Bug className="w-6 h-6 text-orange-500 shrink-0" />
                           <p className="text-sm font-bold text-slate-300 leading-relaxed">
                              {t('organic.modal.resBioIntervention', { pesticide: diagResult.bioPesticide })}
                           </p>
                        </div>
                        <button 
                           onClick={() => navigate('/store')} 
                           className="w-full p-6 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[2px] flex items-center justify-center gap-4 hover:bg-emerald-500 transition-all"
                        >
                           {t('organic.modal.resOrder')} <ShoppingBag className="w-5 h-5" />
                        </button>
                     </div>
                  )}
                </div>
             </div>
           )}

        </div>

        {/* Footer info */}
        <div className="p-6 text-center border-t border-slate-800 bg-slate-950/50 text-[8px] font-black text-slate-600 uppercase tracking-[4px]">
           Agricultural Security Layer 04 • Non-destructive Analysis
        </div>
      </motion.div>
    </div>
  );
};

export default OrganicDiagnosisModal;

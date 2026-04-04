import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FlaskConical, ShieldCheck, Shovel, Bug, Leaf, Loader2, CheckCircle2, Target } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const organicFertilizers = [
    { name: 'Compost', use: 'General soil structure & slow-release NPK.', icon: <Shovel className="w-5 h-5" /> },
    { name: 'Vermicompost', use: 'Enriching soil with beneficial earthworm microbes.', icon: <Bug className="w-5 h-5 text-orange-500" /> },
    { name: 'Neem Cake', use: 'Pest repellent and nitrification inhibitor.', icon: <Leaf className="w-5 h-5 text-emerald-600" /> }
  ];

  const organicPestControls = [
    { name: 'Neem Oil Spray', target: 'Aphids, Whiteflies, Mites', recipe: '5ml Neem oil + 1L water + soap' },
    { name: 'Garlic-Chili Spray', target: 'Caterpillars, Beetles', recipe: 'Crush garlic/chili, soak 24h, filter' },
    { name: 'Wood Ash', target: 'Snails, Slugs, Ants', recipe: 'Dust directly around plant base' }
  ];

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  return (
    <section className="py-24 px-6 bg-[#f8fbfa] relative overflow-hidden text-slate-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-emerald-100 rounded-full font-bold text-xs uppercase tracking-wider text-emerald-800 shadow-sm"
           >
              <Sparkles className="w-4 h-4 text-emerald-500" /> {t('organic.features.tag')}
           </motion.div>
           <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {t('organic.features.title')}
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* natural fertilizer */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] border border-emerald-50 p-8 md:p-12 space-y-8 shadow-xl shadow-slate-200/30 group relative overflow-hidden"
            >
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <FlaskConical className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mb-1">Engine v4.2</p>
                     <p className="text-2xl font-bold text-slate-900">{t('organic.features.fert_title')}</p>
                  </div>
               </div>

               <p className="text-slate-500 font-medium leading-relaxed">
                  {t('organic.features.fert_desc')}
               </p>

               <div className="space-y-3">
                  {organicFertilizers.map((fert, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                          {fert.icon}
                       </div>
                       <div className="flex-1">
                          <h4 className="text-base font-bold text-slate-900">{fert.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fert.use}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-4">
                  <button 
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className={`w-full py-5 rounded-[24px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${isAnalyzing ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-200'}`}
                  >
                     {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> {t('organic.features.analyzing')}
                        </>
                      ) : analysisComplete ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" /> {t('organic.features.complete')}
                        </>
                      ) : (
                        <>
                          {t('organic.features.analyze_btn')} <Sparkles className="w-4 h-4" />
                        </>
                      )}
                  </button>
                  
                  {analysisComplete && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-5 bg-emerald-50 border border-emerald-100 rounded-[24px] flex items-start gap-4"
                    >
                       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                       <p className="text-sm font-semibold text-emerald-900 leading-relaxed">
                          Biological Audit Complete: Soil requires nitrogen fixation boost.
                       </p>
                    </motion.div>
                  )}
               </div>
            </motion.div>

            {/* Organic Pest Control */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[40px] border border-blue-50 p-8 md:p-12 space-y-8 shadow-xl shadow-slate-200/30 group"
            >
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1">Defense Array</p>
                     <p className="text-2xl font-bold text-slate-900">{t('organic.features.pest_title')}</p>
                  </div>
               </div>

               <p className="text-slate-500 font-medium leading-relaxed">
                  {t('organic.features.pest_desc')}
               </p>

               <div className="space-y-3">
                  {organicPestControls.map((pest, idx) => (
                    <div key={idx} className="flex flex-col gap-2 p-5 rounded-[24px] bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                       <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-slate-900">{pest.name}</h4>
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-blue-100 text-blue-600 rounded-lg uppercase">Bio-Safe</span>
                       </div>
                       <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Target className="w-3 h-3" /> Targets: {pest.target}
                       </p>
                    </div>
                  ))}
               </div>

               <div className="p-6 bg-slate-900 rounded-[32px] shadow-lg flex items-center gap-5">
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                      <Bug className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{t('organic.features.rating')}</p>
                      <p className="text-xl font-bold text-white">{t('organic.features.safe')}</p>
                   </div>
               </div>
            </motion.div>
        </div>
        
        {/* Floating AI Insights */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-white p-10 md:p-12 rounded-[40px] border border-emerald-100 text-center space-y-4 shadow-xl shadow-emerald-950/5"
        >
           <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Ecosystem Intelligence</h3>
           <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              "Transitioning to biological inputs reduces irrigation demand by 28% and eliminates subsurface run-off toxicity in the first cycle."
           </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

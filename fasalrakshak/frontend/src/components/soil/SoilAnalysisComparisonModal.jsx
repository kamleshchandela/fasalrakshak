import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, AlertTriangle, Thermometer, 
  Droplets, Zap, ShieldCheck, Info, Search, 
  ArrowRight, Activity, Microscope, Beaker
} from 'lucide-react';

const SoilAnalysisComparisonModal = ({ isOpen, onClose, userInputs, aiAnalysis }) => {
  const [step, setStep] = useState('judging'); // 'judging', 'comparing', 'final'
  const [userObservations, setUserObservations] = useState({
    color: 'Dark Brown',
    texture: 'Loamy',
    smell: 'Earthy',
    compaction: 'Loose'
  });

  const soilTextures = ['Sandy', 'Clayey', 'Loamy', 'Silty', 'Peaty'];
  const soilColors = ['Dark Brown', 'Reddish', 'Greyish', 'Yellowish', 'Black'];

  const judgeSoilLocally = () => {
    let score = 80;
    if (userInputs.pH < 6 || userInputs.pH > 8) score -= 15;
    if (userInputs.Nitrogen < 50) score -= 20;
    if (userObservations.texture === 'Clayey') score -= 5;
    if (userObservations.color === 'Yellowish') score -= 10;
    return Math.max(score, 10);
  };

  const localScore = judgeSoilLocally();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-white border border-slate-200 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Elegant Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-600">
                     <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-slate-900 tracking-tight">Soil Veracity Check</h2>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Field Observations vs. Sensor Data</p>
                  </div>
               </div>
               <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
               
               {step === 'judging' && (
                 <div className="space-y-10">
                    <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100/50">
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-white rounded-2xl shadow-sm border border-emerald-50 shrink-0">
                             <Beaker className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                             <h3 className="text-lg font-black text-emerald-900 mb-1">Human Intelligence Phase</h3>
                             <p className="text-emerald-800/60 font-bold text-sm leading-relaxed">AI analysis is more accurate when cross-referenced with your physical field observations. Please describe what you see and feel in the soil today.</p>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Soil Visual Color</label>
                          <div className="flex flex-wrap gap-2">
                             {soilColors.map(c => (
                               <button 
                                 key={c} 
                                 onClick={() => setUserObservations({...userObservations, color: c})}
                                 className={`px-4 py-3 rounded-2xl font-bold text-xs transition-all border ${userObservations.color === c ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'}`}
                               >
                                 {c}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Soil Physical Texture</label>
                          <div className="flex flex-wrap gap-2">
                             {soilTextures.map(t => (
                               <button 
                                 key={t}
                                 onClick={() => setUserObservations({...userObservations, texture: t})}
                                 className={`px-4 py-3 rounded-2xl font-bold text-xs transition-all border ${userObservations.texture === t ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'}`}
                               >
                                 {t}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Biological Smell</label>
                          <select 
                             value={userObservations.smell}
                             onChange={(e) => setUserObservations({...userObservations, smell: e.target.value})}
                             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
                          >
                             <option>Earthy (Healthy)</option>
                             <option>Sour (Low Oxygen)</option>
                             <option>No Smell (Poor Biology)</option>
                          </select>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Compaction Level</label>
                          <select 
                             value={userObservations.compaction}
                             onChange={(e) => setUserObservations({...userObservations, compaction: e.target.value})}
                             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-all"
                          >
                             <option>Loose (Aerated)</option>
                             <option>Moderate</option>
                             <option>Hard (Compacted)</option>
                          </select>
                       </div>
                    </div>

                    <button 
                       onClick={() => setStep('comparing')}
                       className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-slate-950/20 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
                    >
                       Analyze Synergy <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
               )}

               {step === 'comparing' && (
                 <div className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                           <div className="flex items-center gap-4">
                              <Activity className="w-8 h-8 text-emerald-500" />
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Synergy Mapping</h3>
                           </div>
                           
                           <div className="space-y-6">
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Field Intelligence (You)</span>
                                 <span className="text-3xl font-black text-slate-900">{localScore}%</span>
                              </div>
                              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${localScore}%` }} className="h-full bg-slate-900 rounded-full" />
                              </div>

                              <div className="flex justify-between items-end pt-4">
                                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[2px]">Sensor Intelligence (AI)</span>
                                 <span className="text-3xl font-black text-emerald-600">84%</span>
                              </div>
                              <div className="h-4 w-full bg-emerald-50 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                              </div>
                           </div>
                        </div>

                        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 space-y-6">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-amber-500">
                              <AlertTriangle className="w-6 h-6" />
                           </div>
                           <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Veracity Gap Found</h4>
                           <p className="text-slate-500 font-bold leading-relaxed">
                              You observed <span className="text-slate-900">"{userObservations.color}"</span> soil, but sensors detected <span className="text-emerald-600">Low Organic Carbon</span>. This mismatch suggests significant deep-layer nutrient leaching.
                           </p>
                           <ul className="space-y-3">
                              <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Focus on deep tillage
                              </li>
                              <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Increase humic acid inputs
                              </li>
                           </ul>
                        </div>
                     </div>

                     <button 
                       onClick={onClose}
                       className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-emerald-950/20 flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all"
                    >
                       Finalize Comprehensive Strategy
                    </button>
                 </div>
               )}

            </div>

            {/* Fixed Footer info */}
            <div className="p-6 text-center border-t border-slate-50 bg-slate-50/50 text-[8px] font-black text-slate-400 uppercase tracking-[4px]">
               Human-AI Hybrid Diagnostic Framework • V4.2 Unified
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SoilAnalysisComparisonModal;

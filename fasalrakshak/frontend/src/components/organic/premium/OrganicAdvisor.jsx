import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Info, Sprout, Leaf, Zap, Droplets, Target, Sparkles, Sliders } from 'lucide-react';

const organicTimeline = [
  { 
    week: 1, 
    title: "Phase 1: Chemical Cessation", 
    task: "Complete stop of synthetic NPK and pesticides.", 
    detail: "Allowing the soil microbiome to begin its first reset cycle. Flush field with deep irrigation.",
    icon: <Zap className="w-5 h-5 text-amber-500" />
  },
  { 
    week: 2, 
    title: "Phase 2: Organic Matter Infusion", 
    task: "Incorporate 5-10 tons of well-decomposed FYM.", 
    detail: "Adding carbon sources to feed dormant bacteria and fungi. Essential for restoring soil structure.",
    icon: <Sprout className="w-5 h-5 text-emerald-500" />
  },
  { 
    week: 4, 
    title: "Phase 3: Microbial Seeding", 
    task: "Apply Jivamrut or Bio-fertilizer consortium.", 
    detail: "Active inoculation of beneficial microbes like Azotobacter and PSB to fix natural nitrogen.",
    icon: <Droplets className="w-5 h-5 text-blue-500" />
  },
  { 
    week: 6, 
    title: "Phase 4: Green Manuring", 
    task: "Plant fast-growing legumes (Dhaincha/Sunn hemp).", 
    detail: "These will be ploughed back into the soil to provide a massive surge of natural nitrogen.",
    icon: <Leaf className="w-5 h-5 text-green-500" />
  },
  { 
    week: 12, 
    title: "Phase 5: First Organic Harvest", 
    task: "Monitor for minor pest outbreaks via traps.", 
    detail: "Natural predators will begin to colonize your field, creating a permanent eco-shield.",
    icon: <Target className="w-5 h-5 text-red-500" />
  }
];

import { useLanguage } from '../../../context/LanguageContext';

const OrganicAdvisor = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Interactive Timeline */}
        <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                     <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{t('organic.roadmap.tag')}</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  {t('organic.roadmap.title')}
               </h2>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                {organicTimeline.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative p-6 rounded-[28px] border transition-all cursor-pointer group 
                      ${activeStep === idx ? 'bg-white shadow-xl border-emerald-500' : 'bg-transparent border-transparent hover:bg-slate-50 opacity-60'}
                    `}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className="absolute left-[-26px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all bg-white z-10
                           ${activeStep === idx ? 'border-emerald-600' : 'border-slate-200'}
                        `}>
                           {activeStep > idx ? (
                             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           ) : (
                             <div className={`w-1.5 h-1.5 rounded-full ${activeStep === idx ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                           )}
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md 
                           ${activeStep === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}
                        `}>
                            {step.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                           <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">
                              {t('organic.roadmap.week')} {step.week}
                           </p>
                           <h4 className={`text-xl font-bold tracking-tight ${activeStep === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                             {step.title}
                           </h4>
                           {activeStep === idx && (
                             <motion.div 
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               className="pt-3 space-y-3"
                             >
                                <p className="text-slate-500 font-medium leading-relaxed">{step.task}</p>
                                <div className="p-4 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-xl font-semibold text-emerald-800 text-sm">
                                   "{step.detail}"
                                </div>
                             </motion.div>
                           )}
                        </div>
                    </div>
                  </motion.div>
                ))}
            </div>
        </div>

        {/* Right: Advice Cards */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-emerald-50 rounded-[40px] p-8 md:p-10 border border-emerald-100 relative overflow-hidden shadow-sm">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-700 shadow-md mb-8">
                    <Sparkles className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                   {t('organic.roadmap.bio_title')}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                   {t('organic.roadmap.bio_desc')}
                </p>
                
                <div className="space-y-3 mb-8">
                   {['Fixes 50kg Atmospheric N / Acre', 'Builds fungal mycelium networks', 'Dissolves insoluble phosphorus pools'].map((fact, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                         <div className="h-0.5 w-3 bg-emerald-500 rounded-full" /> {fact}
                      </div>
                   ))}
                </div>

                <div className="bg-emerald-900 p-8 rounded-[32px] text-white space-y-4 shadow-xl border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                         <Sliders className="w-5 h-5" />
                      </div>
                      <p className="text-base font-bold tracking-tight">Active Inoculation</p>
                   </div>
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '84%' }}
                        className="h-full bg-emerald-400"
                        transition={{ duration: 1.5 }}
                      />
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-emerald-200/80">
                      <span>STABILITY INDEX</span>
                      <span>84%</span>
                   </div>
                </div>
            </div>

            <div className="p-6 rounded-[32px] border border-slate-100 shadow-sm bg-white flex items-center gap-4">
               <Info className="w-5 h-5 text-slate-400" />
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('organic.roadmap.prec_tag')}</p>
                  <p className="text-slate-500 font-semibold text-sm">{t('organic.roadmap.prec_desc')}</p>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicAdvisor;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sprout, Leaf, Target, Info, Sparkles, Droplets } from 'lucide-react';

const cropPlans = {
  wheat: {
    current: "Wheat",
    steps: [
      { id: 1, crop: "Legumes (Dal)", benefits: "Nitrogen Fixation & Nutrient Recovery", season: "Summer / Monsoon", icon: <Sprout className="w-6 h-6" /> },
      { id: 2, crop: "Vegetables", benefits: "Soil Microbiology Restoration", season: "Pre-Winter", icon: <Target className="w-6 h-6" /> },
      { id: 3, crop: "Wheat (Organic)", benefits: "Full Cycle Health Restored", season: "Rabi", icon: <Leaf className="w-6 h-6" /> }
    ]
  },
  rice: {
    current: "Rice",
    steps: [
      { id: 1, crop: "Fodder Crops", benefits: "Organic Matter Recycling", season: "Early Winter", icon: <Leaf className="w-6 h-6" /> },
      { id: 2, crop: "Mung Bean", benefits: "Soil Conditioning & Protein", season: "Summer", icon: <Sprout className="w-6 h-6" /> },
      { id: 3, crop: "Rice (SRI Organic)", benefits: "Maximized Hybrid Vigor", season: "Kharif", icon: <Target className="w-6 h-6" /> }
    ]
  }
};

import { useLanguage } from '../../../context/LanguageContext';

const CropRotation = ({ currentCropInput = "wheat" }) => {
  const { t } = useLanguage();
  const plan = cropPlans[currentCropInput.toLowerCase()] || cropPlans.wheat;
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section className="py-24 px-6 bg-[#f8fbfa] overflow-hidden text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-slate-100 pb-12 text-center md:text-left">
            <div className="space-y-4 max-w-xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs uppercase tracking-wider border border-emerald-100">
                  <Sparkles className="w-4 h-4" /> {t('organic.rotation.tag')}
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  {t('organic.rotation.title')}
               </h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                  {t('organic.rotation.desc')}
               </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 relative group mx-auto md:mx-0">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Sprout className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('organic.rotation.state')}</p>
                   <p className="text-xl font-bold text-slate-900">{plan.current}</p>
                </div>
            </div>
        </div>

        <div className="relative py-12">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-100 -translate-y-1/2 -z-10"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative">
                {plan.steps.map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative z-10"
                  >
                    <motion.div 
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      whileHover={{ y: -5 }}
                      className={`w-[260px] p-8 rounded-[32px] border transition-all relative overflow-hidden flex flex-col items-center text-center
                        ${hoveredNode === node.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl' : 'bg-white text-slate-900 border-slate-100 shadow-sm'}
                      `}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm 
                           ${hoveredNode === node.id ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}
                        `}>
                            {node.icon}
                        </div>

                        <div className="space-y-4">
                           <div>
                              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${hoveredNode === node.id ? 'text-emerald-100/60' : 'text-slate-400'}`}>{t('organic.rotation.next')}</p>
                              <h4 className="text-xl font-bold">{node.crop}</h4>
                           </div>
                           
                           <p className={`text-sm font-medium leading-relaxed ${hoveredNode === node.id ? 'text-emerald-50/80' : 'text-slate-500'}`}>
                             {node.benefits}
                           </p>

                           <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border 
                              ${hoveredNode === node.id ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}
                           `}>
                              <Droplets className="w-3 h-3" /> {node.season}
                           </div>
                        </div>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
        </div>

        <AnimatePresence mode="wait">
          {hoveredNode && (
            <motion.div
              key={hoveredNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-slate-900 rounded-[32px] p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl text-white relative overflow-hidden"
            >
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
                   <Target className="w-8 h-8" />
               </div>
               
               <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                     {t('organic.rotation.why')} {plan.steps.find(s => s.id === hoveredNode).crop}?
                  </h3>
                  <p className="text-slate-400 font-medium text-base leading-relaxed">
                     Planting {plan.steps.find(s => s.id === hoveredNode).crop} ensures that the soil nutrients depleted by {plan.current} are naturally replenished. This system improves long-term crop immunity.
                  </p>
               </div>
               
               <div className="shrink-0 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center min-w-[120px]">
                   <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">{t('organic.rotation.roi')}</p>
                   <p className="text-3xl font-bold text-white">+28%</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CropRotation;

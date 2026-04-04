import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Droplets, CheckCircle2, Sliders, TrendingUp, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const GreenhouseSection = () => {
  const { t } = useLanguage();
  const [temp, setTemp] = useState(24);
  const [humidity, setHumidity] = useState(65);
  const [activeCrop, setActiveCrop] = useState('tomato');

  const greenhouseCrops = [
    { id: 'tomato', name: "Hydroponic Tomato", icon: "🍅", yield: "12kg/m²", tempRange: [20, 28], humidityRange: [60, 75] },
    { id: 'capsicum', name: "Bell Pepper", icon: "🌶️", yield: "8kg/m²", tempRange: [18, 26], humidityRange: [65, 80] },
    { id: 'lettuce', name: "Butterhead Lettuce", icon: "🥬", yield: "4kg/m²", tempRange: [15, 22], humidityRange: [50, 70] },
    { id: 'strawberry', name: "Vertical Strawberry", icon: "🍓", yield: "6kg/m²", tempRange: [16, 24], humidityRange: [60, 75] },
    { id: 'kale', name: "Superfood Kale", icon: "🌿", yield: "7kg/m²", tempRange: [12, 21], humidityRange: [55, 70] },
    { id: 'basil', name: "Genoese Basil", icon: "🍃", yield: "3kg/m²", tempRange: [22, 30], humidityRange: [60, 80] },
    { id: 'saffron', name: "Exotic Saffron", icon: "🌸", yield: "0.5kg/m²", tempRange: [15, 25], humidityRange: [40, 60] },
    { id: 'turmeric', name: "Golden Turmeric", icon: "🫚", yield: "15kg/m²", tempRange: [25, 32], humidityRange: [70, 90] },
    { id: 'ginger', name: "Premium Ginger", icon: "🫚", yield: "14kg/m²", tempRange: [22, 30], humidityRange: [70, 85] }
  ];

  const currentCropInfo = greenhouseCrops.find(c => c.id === activeCrop);
  
  const isTempOptimal = temp >= currentCropInfo.tempRange[0] && temp <= currentCropInfo.tempRange[1];
  const isHumidOptimal = humidity >= currentCropInfo.humidityRange[0] && humidity <= currentCropInfo.humidityRange[1];

  return (
    <section className="py-32 px-6 bg-[#f8fbfa] relative overflow-hidden text-slate-800">
      <div className="absolute inset-0 pointer-events-none -z-10">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
         <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#166534_1px,transparent_1px),linear-gradient(to_bottom,#166534_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
            <div className="space-y-6 max-w-2xl text-center md:text-left">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-900/40 text-emerald-400 rounded-2xl border border-emerald-500/30 backdrop-blur-3xl font-black text-sm tracking-widest uppercase"
               >
                  <Sun className="w-4 h-4 animate-spin-slow" /> {t('organic.greenhouse.tag')}
               </motion.div>
               <motion.h2 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
               >
                  {t('organic.greenhouse.title')}
               </motion.h2>
               <p className="text-gray-400 font-bold font-nunito text-xl leading-relaxed">
                  {t('organic.greenhouse.desc')}
               </p>
            </div>
            
            <div className="hidden lg:block">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                 className="w-48 h-48 border-[2px] border-emerald-500/20 rounded-[40px] relative flex items-center justify-center"
               >
                   <div className="absolute inset-4 border-[2px] border-emerald-400/40 rounded-[30px] rotate-45"></div>
                   <Wind className="w-16 h-16 text-emerald-400/60" />
               </motion.div>
            </div>
        </div>

        <div className="bg-white border border-emerald-50 shadow-2xl rounded-[40px] md:rounded-[80px] p-8 md:p-16 lg:p-20 overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-10 opacity-5 hidden lg:block">
               <Sliders className="w-24 h-24 text-emerald-900 rotate-45" />
           </div>

           <div className="flex flex-col lg:flex-row gap-16 md:gap-24 relative z-10">
              <div className="flex-1 space-y-12">
                 <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-4 text-emerald-900">
                    <Wind className="w-6 h-6 text-emerald-500" /> {t('organic.greenhouse.console')}
                 </h3>
                 
                 <div className="space-y-12 md:space-y-16">
                    <div className="space-y-6">
                       <div className="flex justify-between items-end">
                          <p className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest pl-1">{t('organic.greenhouse.intensity')}</p>
                          <span className={`text-4xl md:text-6xl font-black transition-all ${isTempOptimal ? 'text-emerald-500' : 'text-orange-500'}`}>{temp}°</span>
                       </div>
                       <input 
                         type="range" min="10" max="40" step="1" value={temp} 
                         onChange={(e) => setTemp(parseInt(e.target.value))}
                         className="w-full h-3 md:h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500 transition-all hover:scale-[1.02]"
                       />
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-end">
                          <p className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest pl-1">{t('organic.greenhouse.saturation')}</p>
                          <span className={`text-4xl md:text-6xl font-black transition-all ${isHumidOptimal ? 'text-blue-500' : 'text-slate-300'}`}>{humidity}%</span>
                       </div>
                       <input 
                         type="range" min="30" max="95" step="1" value={humidity} 
                         onChange={(e) => setHumidity(parseInt(e.target.value))}
                         className="w-full h-3 md:h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500 transition-all hover:scale-[1.02]"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className={`p-8 rounded-[40px] border transition-all ${isTempOptimal && isHumidOptimal ? 'bg-emerald-50/50 border-emerald-500/30' : 'bg-orange-50/50 border-orange-500/20'}`}>
                       <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className={`w-6 h-6 ${isTempOptimal && isHumidOptimal ? 'text-emerald-500' : 'text-orange-500'}`} />
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t('organic.greenhouse.efficiency')}</span>
                       </div>
                       <p className="text-lg md:text-xl font-black">{(isTempOptimal && isHumidOptimal) ? t('organic.greenhouse.efficiency') : t('organic.greenhouse.correction')}</p>
                    </div>
                    <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100">
                       <div className="flex items-center gap-3 mb-3">
                          <Droplets className="w-6 h-6 text-blue-600" />
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t('organic.greenhouse.automation')}</span>
                       </div>
                       <p className="text-lg md:text-xl font-black">{t('organic.greenhouse.drip')}</p>
                    </div>
                 </div>
              </div>

              <div className="w-full lg:w-[450px] bg-slate-50 border border-slate-100 rounded-[50px] md:rounded-[70px] p-10 md:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden group/viz">
                 <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-200/30 -z-10"></div>
                 
                 <motion.div 
                   animate={{ 
                      scale: (isTempOptimal && isHumidOptimal) ? [1, 1.1, 1] : 1,
                      y: (isTempOptimal && isHumidOptimal) ? [0, -10, 0] : 0,
                   }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className="text-9xl md:text-[160px] mb-12 filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.15)] group-hover/viz:scale-110 transition-transform duration-700"
                 >
                    {currentCropInfo.icon}
                 </motion.div>
                 
                 <div className="space-y-6 w-full">
                    <h4 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                      {currentCropInfo.name}
                    </h4>
                    
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300/30">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: (isTempOptimal && isHumidOptimal) ? '100%' : '35%' }}
                          className={`h-full transition-all duration-1000 rounded-full ${ (isTempOptimal && isHumidOptimal) ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]' : 'bg-orange-400' }`}
                       />
                    </div>
                    
                    <div className="flex items-center justify-between px-2">
                       <span className="text-xs font-black text-slate-400 uppercase tracking-[2px]">{t('organic.greenhouse.metabolic')}</span>
                       <span className={`text-xs font-black tracking-widest ${ (isTempOptimal && isHumidOptimal) ? 'text-emerald-600' : 'text-slate-400' }`}>
                         { (isTempOptimal && isHumidOptimal) ? t('organic.greenhouse.hyper') : t('organic.greenhouse.dormant') }
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
               <div className="space-y-2 text-center md:text-left">
                  <p className="text-xs font-black text-emerald-600 uppercase tracking-[4px]">{t('organic.greenhouse.hub')}</p>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{t('organic.greenhouse.cultivars')}</h3>
               </div>
               <div className="bg-emerald-600 rounded-3xl p-6 md:p-8 text-white min-w-[280px] shadow-xl md:shadow-2xl shadow-emerald-950/10">
                   <div className="flex justify-between items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-emerald-200" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100/60">AI Prediction</span>
                   </div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black">{currentCropInfo.yield}</span>
                      <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">{t('organic.greenhouse.harvest')}</span>
                   </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
               {greenhouseCrops.map(crop => (
                  <motion.div 
                    key={crop.id}
                    onClick={() => setActiveCrop(crop.id)}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-[35px] border transition-all cursor-pointer group flex flex-col gap-6
                       ${activeCrop === crop.id 
                         ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-950/5 ring-1 ring-emerald-500' 
                         : 'bg-white border-slate-100 hover:border-emerald-200'}
                    `}
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-500 transform-gpu">{crop.icon}</span>
                        {activeCrop === crop.id && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        )}
                     </div>
                     <div className="space-y-1">
                        <p className={`text-lg font-black transition-colors ${activeCrop === crop.id ? 'text-slate-900' : 'text-slate-400'}`}>
                          {crop.name}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {t('organic.greenhouse.sensor')}
                        </p>
                     </div>
                     <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
                        <span className="text-[10px] font-bold text-slate-400">{t('organic.greenhouse.yield')}: {crop.yield}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${activeCrop === crop.id ? 'text-emerald-500 rotate-90' : 'text-slate-300'}`} />
                     </div>
                  </motion.div>
               ))}
            </div>
        </div>

        <motion.div 
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          className="bg-white border border-slate-100 shadow-lg rounded-[40px] p-6 flex flex-wrap items-center justify-center gap-12"
        >
            <div className="flex items-center gap-3">
               <Sun className="w-5 h-5 text-amber-500" />
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Lux Level: <span className="text-slate-800">Optimal (42k)</span></span>
            </div>
            <div className="flex items-center gap-3">
               <Wind className="w-5 h-5 text-sky-600" />
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest">CO2 Flow: <span className="text-slate-800">Active (840ppm)</span></span>
            </div>
            <div className="flex items-center gap-3">
               <Droplets className="w-5 h-5 text-emerald-600" />
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Nutrient Mix: <span className="text-slate-800">Steady (B-Line)</span></span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GreenhouseSection;

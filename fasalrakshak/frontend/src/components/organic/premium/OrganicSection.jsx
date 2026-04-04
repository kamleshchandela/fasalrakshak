import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, TrendingUp, Sparkles, Sprout, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const OrganicSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden text-slate-800">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none -z-10">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full font-bold text-xs uppercase tracking-wider text-emerald-700"
           >
              <Target className="w-3.5 h-3.5" /> {t('organic.diff.desc')}
           </motion.div>
           <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-playfair tracking-tight">
              {t('organic.diff.title')}
           </h2>
        </div>

        {/* Comparison Engine Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
           
           {/* LEFT: Organic Protocol */}
           <motion.div 
             initial={{ x: -30, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             className="bg-emerald-50/30 border border-emerald-100 rounded-[40px] p-8 md:p-12 space-y-8 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-500"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[80px]"></div>
              
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t('organic.diff.sustainable')}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{t('organic.diff.organic')}</h3>
                 </div>
                 <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Sprout className="w-7 h-7" />
                 </div>
              </div>

              <div className="space-y-6">
                 {[
                   { label: t('organic.diff.soil'), val: 94 },
                   { label: t('organic.diff.hydration'), val: 82 },
                   { label: t('organic.diff.viability'), val: 91 }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                         <span>{stat.label}</span>
                         <span className="text-emerald-600 font-bold">{stat.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-emerald-100/50 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${stat.val}%` }}
                           transition={{ delay: i * 0.1, duration: 1.5 }}
                           className="h-full bg-emerald-500 rounded-full" 
                         />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-emerald-100 flex items-center gap-4 text-emerald-800/60 font-medium text-sm">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 {t('organic.diff.validation')}
              </div>
           </motion.div>

           {/* RIGHT: Chemical Legacy */}
           <motion.div 
             initial={{ x: 30, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 md:p-12 space-y-8 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-500"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-[80px]"></div>

              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('organic.diff.legacy')}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{t('organic.diff.chemical')}</h3>
                 </div>
                 <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                    <AlertTriangle className="w-7 h-7" />
                 </div>
              </div>

              <div className="space-y-6">
                 {[
                   { label: t('organic.diff.nutrient'), val: 38 },
                   { label: t('organic.diff.dependency'), val: 86 },
                   { label: t('organic.diff.toxicity'), val: 64 }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                         <span>{stat.label}</span>
                         <span className="text-orange-500 font-bold">{stat.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${stat.val}%` }}
                           transition={{ delay: 0.1 + i * 0.1, duration: 1.5 }}
                           className="h-full bg-orange-400 rounded-full" 
                         />
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="pt-6 border-t border-slate-100 flex items-center gap-4 text-slate-400 font-medium text-sm">
                 <AlertTriangle className="w-5 h-5 opacity-40" />
                 {t('organic.diff.legacy')}
              </div>
           </motion.div>
        </div>
        
        <div className="pt-8 text-center">
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">{t('organic.diff.validation')}</p>
        </div>
      </div>
    </section>
  );
};

export default OrganicSection;

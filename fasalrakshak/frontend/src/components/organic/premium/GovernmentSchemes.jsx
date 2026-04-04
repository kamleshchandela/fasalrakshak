import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Landmark, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const GovernmentSchemes = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      id: 1,
      title: t('organic.schemes.pkvy'),
      desc: "Promoting organic farming through cluster approach and PGS certification.",
      benefits: ["₹50,000 per hectare for 3 years", "Support for green manure/compost", "Free certification assistance"],
      eligibility: "Small and marginal farmers in clusters of 50 or more.",
      color: "from-orange-500 to-amber-600"
    },
    {
      id: 2,
      title: t('organic.schemes.nmsa'),
      desc: "Focusing on climate resilient agriculture and soil health management.",
      benefits: ["Water use efficiency support", "Integrated nutrient management", "Insurance coverage support"],
      eligibility: "Registered farmers with land owner documents.",
      color: "from-green-600 to-emerald-700"
    },
    {
      id: 3,
      title: t('organic.schemes.shc'),
      desc: "Provides information on nutrient status of soil to help farmers use fertilizers wisely.",
      benefits: ["Free soil testing every 2 years", "Personalized manure recommendations", "Cost savings on urea/DAP"],
      eligibility: "All land-holding farmers in India.",
      color: "from-blue-600 to-sky-700"
    },
    {
      id: 4,
      title: t('organic.schemes.rkvy'),
      desc: "Ensuring holistic development of agriculture and allied sectors via states.",
      benefits: ["High-tech horticulture support", "Infrastructure for organic markets", "Direct Benefit Transfers"],
      eligibility: "Farmer groups, individual farmers, and cooperatives.",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#f8fbfa] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-40 right-0 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-emerald-100 rounded-full shadow-sm"
           >
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{t('organic.schemes.tag')}</span>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold text-slate-900 font-playfair tracking-tight"
           >
             {t('organic.schemes.title')}
           </motion.h2>
           
           <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed"
           >
             {t('organic.schemes.desc')}
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {schemes.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-[32px] p-8 md:p-10 h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center text-white shadow-lg`}>
                      <ShieldCheck className="w-7 h-7" />
                   </div>
                   <div className="text-left md:text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('organic.schemes.grant')}</p>
                      <p className="text-xl font-bold text-slate-900">{scheme.benefits[0].split(' ')[0]}</p>
                   </div>
                </div>
                
                <div className="space-y-3 mb-6 flex-1">
                   <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                     {scheme.title}
                   </h3>
                   <p className="text-slate-500 font-medium text-base leading-relaxed">
                     {scheme.desc}
                   </p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mb-8">
                   {scheme.benefits.map((benefit, bIdx) => (
                     <div key={bIdx} className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-semibold text-slate-700">{benefit}</span>
                     </div>
                   ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                   <button className="flex-1 flex items-center justify-between px-6 py-4 bg-slate-900 rounded-2xl text-white font-bold hover:bg-emerald-600 transition-all text-sm">
                      <span>{t('organic.schemes.apply')}</span>
                      <ArrowRight className="w-4 h-4" />
                   </button>
                   <button className="px-6 py-4 bg-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all">
                      {t('organic.schemes.learn')}
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;

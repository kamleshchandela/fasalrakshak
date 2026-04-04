import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sparkles, ChevronRight, Leaf, Globe, Landmark, Target } from 'lucide-react';
import OrganicSection from '../components/organic/premium/OrganicSection';
import GovernmentSchemes from '../components/organic/premium/GovernmentSchemes';
import CropRotation from '../components/organic/premium/CropRotation';
import OrganicAdvisor from '../components/organic/premium/OrganicAdvisor';
import GreenhouseSection from '../components/organic/premium/GreenhouseSection';
import FeaturesSection from '../components/organic/premium/FeaturesSection';
import OrganicSwitchButton from '../components/organic/OrganicSwitchButton';
import { useLanguage } from '../context/LanguageContext';
import farmerMontage from '../images/farmer_montage.png';

const LandingPage = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fbfa] selection:bg-emerald-500 overflow-x-hidden text-slate-800">
      
      {/* 🚀 HERO SECTION: GROW SMARTER. GROW ORGANIC. */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#f8fbfa]">
         <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.06),transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.04),transparent_40%)]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-8 text-center lg:text-left relative z-10">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 font-bold text-xs uppercase tracking-wider mx-auto lg:mx-0"
               >
                  <Sparkles className="w-4 h-4 animate-pulse" /> {t('organic.hero.tag')}
               </motion.div>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]"
               >
                  {t('organic.hero.title1')}<span className="text-emerald-600">{t('organic.hero.title2')}</span><br />
                  {t('organic.hero.title3')}<span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">{t('organic.hero.title4')} 🌱</span>
               </motion.h1>

               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-slate-500 font-medium font-nunito text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
               >
                  {t('organic.hero.desc')}
               </motion.p>
               
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
               >
                  <OrganicSwitchButton soilData={{ph: 7.2, nitrogen: 45}} userId="landing_demo" />
                  
                  <button className="flex items-center gap-2 px-8 py-4 bg-white border border-emerald-100 rounded-full font-bold text-base text-emerald-800 shadow-lg hover:bg-emerald-50 transition-all group">
                     {t('organic.hero.btn2')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </motion.div>

               {/* Stats Strip */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-wrap justify-center lg:justify-start gap-10 pt-8 border-t border-slate-100"
               >
                  {[
                    { label: t('organic.hero.stats.conversion'), val: '98%' },
                    { label: t('organic.hero.stats.market'), val: '2.4x' },
                    { label: t('organic.hero.stats.farmers'), val: '12k+' }
                  ].map((stat, i) => (
                    <div key={i}>
                       <p className="text-2xl font-bold text-slate-800 font-playfair">{stat.val}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  ))}
               </motion.div>
            </div>

            {/* Right: Immersive Sprout Animation */}
            <div className="hidden lg:col-span-12 xl:col-span-5 relative lg:flex items-center justify-center">
               <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="w-[400px] h-[400px] bg-white rounded-[60px] shadow-2xl flex items-center justify-center relative border border-emerald-50 overflow-hidden"
               >
                  <motion.img 
                    src={farmerMontage}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full object-cover rounded-[60px]"
                    alt="Agricultural Montage"
                  />
               </motion.div>
            </div>
         </div>
      </section>

      {/* 🏛️ GOVERNMENT SCHEMES COMPONENT */}
      <div id="schemes">
        <GovernmentSchemes />
      </div>

      {/* 🧠 ORGANIC ADVISOR: 12-WEEK ROADMAP */}
      <div id="advisor">
        <OrganicAdvisor />
      </div>

      {/* 🌾 CROP ROTATION TIMELINE */}
      <div id="timeline">
        <CropRotation />
      </div>

      {/* 🧪 NATURAL FERTILIZER & PEST ENGINE (NEW) */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* 🌿 ORGANIC BENEFITS & COMPARISON */}
      <OrganicSection />

      {/* 🏘️ SMART GREENHOUSE FARMING (PREMIUM SECTION) */}
      <div id="greenhouse">
        <GreenhouseSection />
      </div>

      {/* 🏁 CTA FINAL BANNER */}
      <section className="py-24 px-6">
         <motion.div 
            className="max-w-7xl mx-auto h-[400px] bg-[#064e3b] rounded-[60px] relative overflow-hidden flex flex-col items-center justify-center text-center px-10 shadow-2xl"
         >
            <div className="space-y-4 relative z-10 mb-8">
               <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t('organic.cta.title')}</h2>
               <p className="text-emerald-50/70 font-medium text-lg max-w-xl mx-auto">{t('organic.cta.desc')}</p>
            </div>
            
            <button className="relative z-10 px-12 py-5 bg-white rounded-full font-bold text-xl text-[#064e3b] hover:pr-16 transition-all group/last">
               {t('organic.cta.btn')} <Leaf className="inline-block w-6 h-6 ml-2 group-hover/last:rotate-45 transition-transform" />
            </button>
            <div className="absolute w-[400px] h-[400px] border-[40px] border-white/5 rounded-full -bottom-32 -right-32"></div>
         </motion.div>
      </section>

      <footer className="py-8 border-t border-gray-100 text-center">
         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">© 2026 FasalRakshak AI — {t('nav.home')}</p>
      </footer>
    </div>
  );
};

export default LandingPage;

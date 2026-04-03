import React from 'react';
import { Apple, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

// Using the official Rupiya.app asset as requested
import rupiyaOfficialHero from '../images/rupiya_official_hero.png'; 

const HeroSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="bg-white min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 z-10"
          >
            <div className="space-y-4">
              <h1 className="flex flex-col gap-4">
                <span className="text-[#FF9F43] font-laila font-black text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight">
                  {t('hero_hindi_1')}
                  <br />
                  <span className="text-[#FF9F43]">का</span> <span className="text-primary-green font-nunito font-black">Digital</span> <span className="text-[#FF9F43]">साथी!</span>
                </span>
                <span className="text-primary-green font-nunito font-black text-4xl md:text-5xl lg:text-[4.5rem] leading-none tracking-tighter">
                  {t('hero_english')}
                </span>
              </h1>
              
              <p className="text-slate-500 font-nunito font-bold text-lg md:text-xl max-w-xl leading-relaxed">
                {t('hero_desc')}
              </p>
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-green text-white px-8 py-4 rounded-[1.8rem] flex items-center gap-4 shadow-xl shadow-primary-green/20 hover:shadow-2xl transition-all group"
              >
                <div className="font-nunito font-black text-lg">{t('hero_download')}</div>
                <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
                <div className="flex items-center gap-3">
                   <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                   <Apple className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
                </div>
              </motion.button>
              
              <div className="hidden md:block">
                 <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Scanning active <br/> in 200+ districts</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE - PREMIUM MONTAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="relative group">
              <img 
                src={rupiyaOfficialHero}
                alt="Empowering Indian Farmers - Official Rupiya Montage"
                className="w-full h-auto rounded-[4rem] group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-green/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#FF9F43]/10 rounded-full blur-3xl font-playfair font-black text-gray-50 flex items-center justify-center -rotate-12">AGRI TECH</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

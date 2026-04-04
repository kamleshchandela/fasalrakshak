import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import smilingFarmer from '../images/smiling_farmer.png';

const MotionLink = motion.create(Link);

const CTABanner = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-background-cream">
      <div className="container mx-auto max-w-6xl relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        {/* Real-world background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={smilingFarmer} 
            alt="Farmer smiling in a lush green field" 
            className="w-full h-full object-cover filter blur-[2px] scale-110"
          />
          <div className="absolute inset-0 bg-[#064e3b]/80 backdrop-blur-md"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10">

          {/* Slides in from bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            <span className="inline-block bg-white/20 text-white font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-6 border border-white/30 shadow-sm">
              {t('cta.tag')}
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">
              {t('cta.title')}
            </h2>
            <p className="font-nunito text-lg md:text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">
              {t('cta.desc')}
            </p>

            <MotionLink
              to="/detect"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-primary-darkGreen font-nunito font-extrabold text-xl px-12 py-5 rounded-[20px] shadow-organic hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-white/50"
            >
              <Camera className="w-7 h-7" />
              {t('cta.btn')}
            </MotionLink>

            {/* App store placeholders */}
            <div className="mt-12 flex justify-center gap-6 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] px-8 py-4 cursor-pointer hover:bg-white/20 transition-all shadow-lg">
                <svg viewBox="0 0 512 512" className="w-8 h-8 fill-white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-80 uppercase tracking-widest font-nunito font-black">{t('cta.comingSoon')}</div>
                  <div className="text-lg font-black font-nunito leading-tight">Google Play</div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] px-8 py-4 cursor-pointer hover:bg-white/20 transition-all shadow-lg">
                <svg viewBox="0 0 384 512" className="w-8 h-8 fill-white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-80 uppercase tracking-widest font-nunito font-black">{t('cta.comingSoon')}</div>
                  <div className="text-lg font-black font-nunito leading-tight">App Store</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;

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
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] px-6 py-3 cursor-pointer hover:bg-white/20 transition-colors">
                <div className="text-3xl drop-shadow-sm">▶</div>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-80 uppercase tracking-widest font-nunito font-bold">{t('cta.comingSoon')}</div>
                  <div className="text-sm font-bold font-nunito">Google Play</div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] px-6 py-3 cursor-pointer hover:bg-white/20 transition-colors">
                <div className="text-3xl drop-shadow-sm">🍎</div>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-80 uppercase tracking-widest font-nunito font-bold">{t('cta.comingSoon')}</div>
                  <div className="text-sm font-bold font-nunito">App Store</div>
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

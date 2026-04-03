import React from 'react';
import { WifiOff, Languages, Zap, Heart, History, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../context/LanguageContext';

import featOffline from '../images/feat_offline.png';
import lushGreen from '../images/lush_green.png';
import heroScan from '../images/hero_scan.png';
import heroFarmer from '../images/hero_farmer.png';
import heroLandscape from '../images/hero_landscape.png';
import smilingFarmer from '../images/smiling_farmer.png';

const features = [
  {
    emoji: '📶',
    title: 'Offline Mode',
    desc: 'Internet nahi? Koi baat nahi. App offline bhi kaam karta khet mein!',
    img: featOffline,
    color: 'from-blue-900/90'
  },
  {
    emoji: '🗣️',
    title: 'Gujarati & Hindi',
    desc: 'Apni bhasha mein results pao — Gujarati, Hindi ya English!',
    img: lushGreen,
    color: 'from-indigo-900/90'
  },
  {
    emoji: '⚡',
    title: '2-Second Detection',
    desc: 'Hamara AI model sirf 2 second mein bimari pehchaan leta hai.',
    img: heroScan,
    color: 'from-green-900/90'
  },
  {
    emoji: '💊',
    title: 'Treatment Guide',
    desc: 'Sahi dawai ka naam, matra, aur kab daalni hai, screen pe aayega.',
    img: heroFarmer,
    color: 'from-red-900/90'
  },
  {
    emoji: '📋',
    title: 'Scan History',
    desc: 'Aapki saari purani scans save rehti hain — jab chahein dekhein.',
    img: heroLandscape,
    color: 'from-amber-900/90'
  },
  {
    emoji: '🌦️',
    title: 'Weather Risk',
    desc: 'Aaj ke mausam se bimari ka risk kya hai, app bata dega.',
    img: smilingFarmer,
    color: 'from-sky-900/90'
  }
];

const Features = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-background-cream">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block bg-primary-lightGreen text-primary-darkGreen font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-4 border border-primary-green/20"
          >
            {t('features.tag')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}
            className="font-playfair font-black text-text-charcoal text-4xl md:text-5xl"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="font-nunito font-semibold text-gray-500 mt-4 text-lg max-w-2xl mx-auto"
          >
            {t('features.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const locItem = Array.isArray(t('features.items')) ? t('features.items')[i] : null;
            const title = locItem ? locItem.title : f.title;
            const desc = locItem ? locItem.desc : f.desc;
            return (
              <Tilt 
                  key={i} 
                  tiltMaxAngleX={2} 
                  tiltMaxAngleY={2} 
                  perspective={2000} 
                  transitionSpeed={1500} 
                  scale={1.03}
                  className="h-[320px] flex"
                >
                  <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, type: 'spring', bounce: 0.2 }}
                  className="relative w-full rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex-1 border border-white/10 bg-gray-900"
                >
                  {/* Background Image */}
                  <img src={f.img} alt={f.title} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700 ease-out opacity-80" />
                  
                  {/* Gradient Overlay for text readability */}
                  <div className={`absolute inset-0 z-10 bg-gradient-to-t ${f.color} via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500"></div>
                  
                  {/* Glowing inner border effect */}
                  <div className="absolute inset-0 z-30 rounded-[32px] border-[1.5px] border-white/5 group-hover:border-white/30 transition-colors duration-500 pointer-events-none"></div>

                  {/* Content inside card */}
                  <div className="relative z-20 h-full p-6 flex flex-col justify-end text-white">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-[16px] flex items-center justify-center mb-4 text-2xl border border-white/30 shadow-glass group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      <span>{f.emoji}</span>
                    </div>
                    <h3 className="font-playfair font-black text-2xl mb-2 drop-shadow-md">
                      {title}
                    </h3>
                    <p className="font-nunito font-semibold text-white/90 leading-relaxed text-[15px] drop-shadow-sm">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

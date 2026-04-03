import React, { useEffect, useRef, useState } from 'react';
import { Camera, Shield, Zap, Sparkles, ChevronRight, Smartphone } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../context/LanguageContext';

const MotionLink = motion.create(Link);

import kisan2    from '../images/kisan2.png';
import kisan1    from '../images/kisan1.png';
import kisan3    from '../images/kisan3.png';

import heroImage from '../images/hero.png';

const avatars = [kisan1, kisan2, kisan3];

// Sophisticated letter animation variant
const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 10 } 
  }
};

const wordsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const FloatingElement = ({ children, delay = 0, yOffset = 15, duration = 4, className = "" }) => (
  <motion.div
    animate={{ 
      y: [0, -yOffset, 0],
      rotateZ: [-1, 1, -1] 
    }}
    transition={{
      duration: duration,
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax elements tied to scroll
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100vh] lg:min-h-0 lg:h-screen flex items-center pt-36 md:pt-40 lg:pt-32 pb-10 overflow-hidden selection:bg-[#10b981] selection:text-white bg-white"
    >
      {/* 1. Light Premium Backdrop with pastel floating meshes */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#10b981]/15 rounded-full blur-[120px] animate-pulse-soft pointer-events-none"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[50%] bg-emerald-300/15 rounded-full blur-[120px] animate-pulse-soft delay-1000 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-green-200/20 rounded-full blur-[140px] pointer-events-none"></div>
        
        {/* Subtle grid overlay for premium texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mt-16 md:mt-12 lg:mt-6">

        {/* LEFT CONTENT */}
        <motion.div 
          style={{ opacity: opacityText }} 
          className="flex-1 max-w-2xl mt-8 lg:mt-0 xl:pr-10 z-20 pb-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
            }}
            className="font-sans text-[1.8rem] min-[400px]:text-[2rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-bold text-[#f97316] leading-[1.15] mb-2 tracking-tight"
          >
            <span className="block whitespace-nowrap">{t('hero.title1')}</span>
            <span dangerouslySetInnerHTML={{ __html: t('hero.title2').replace('Digital', '<span class="font-extrabold text-[#166534]">Digital</span>') }} />
          </motion.h1>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
            }}
            className="font-sans text-[2.5rem] md:text-[3rem] lg:text-[3.3rem] font-black text-[#166534] mb-6 tracking-tight mt-3"
          >
            {t('hero.subtitle')}
          </motion.h2>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="font-nunito text-[#4b5563] text-lg md:text-[1.15rem] font-bold leading-relaxed mb-10 max-w-[500px]"
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            {/* Application Download Button */}
            <MotionLink
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(22, 101, 52, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              to="#download"
              className="inline-flex items-center justify-center gap-4 bg-[#166534] text-white font-nunito font-bold text-[17px] px-8 py-[16px] rounded-full transition-all duration-300 shadow-xl"
            >
              <span>{t('hero.downloadBtn')}</span>
              <div className="flex items-center gap-2 border-l border-white/20 pl-4 ml-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
              </div>
            </MotionLink>

            {/* Scanning Active Status Pill */}
            <div className="bg-[#f8fafc] border border-gray-100 rounded-full px-5 py-3 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow bg-opacity-80 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#64748b] font-black tracking-widest uppercase leading-tight">{t('hero.scanningActive')}</span>
                <span className="text-[11px] text-[#334155] font-black tracking-wider uppercase leading-tight">{t('hero.districts')}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="flex-1 w-full max-w-xl lg:max-w-[600px] xl:max-w-[750px] relative z-20"
        >
          {/* A glowing aura perfectly shaped behind the image */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-[#10b981] to-[#34d399] rounded-full blur-[80px] opacity-25 pointer-events-none"
          ></motion.div>

          {/* Advanced 3D Tilt Container for the provided image */}
          <Tilt 
            tiltMaxAngleX={3} 
            tiltMaxAngleY={3} 
            perspective={2000} 
            transitionSpeed={2500} 
            scale={1.01} 
            gyroscope={true}
            className="relative transform-gpu"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              <motion.img
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                src={heroImage}
                alt="Hero Image Collage"
                className="w-full h-auto object-contain max-h-[55vh] lg:max-h-[75vh] 2xl:max-h-[800px] mx-auto relative z-10 origin-bottom"
              />
              
              {/* Badges removed to match screenshot minimalism */}

            </motion.div>
          </Tilt>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;


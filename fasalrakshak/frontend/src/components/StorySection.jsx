import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import kisan1  from '../images/kisan1.png';
import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';

const StorySection = () => {
  const { t } = useLanguage();
  const points = Array.isArray(t('story.points')) ? t('story.points') : [
    'Free for all farmers — forever',
    'Works in Gujarati, Hindi & English',
    'No internet needed in offline mode'
  ];
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-lightGreen/40 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left image collage slides in from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="flex-1 w-full max-w-lg relative pb-10 pr-10"
          >
            <div className="rounded-[32px] overflow-hidden shadow-organic border-[6px] border-white aspect-[4/5] relative group">
              <div className="absolute inset-0 bg-primary-darkGreen/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src={kisan1} alt="Gujarati farmer using smartphone in field" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
               className="absolute -bottom-4 -right-4 w-40 h-32 rounded-[24px] overflow-hidden shadow-organic border-[6px] border-white hover:-translate-y-2 hover:-rotate-3 transition-all duration-300 z-20"
            >
              <img src={mumfali} alt="Mungfali groundnut field Gujarat" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
               className="absolute -top-6 -right-6 w-32 h-28 rounded-[24px] overflow-hidden shadow-organic border-[6px] border-white hover:translate-y-2 hover:rotate-3 transition-all duration-300 z-20"
            >
              <img src={gehu} alt="Gehu wheat field Gujarat" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary-green/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Right text slides in from RIGHT */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2, delay: 0.1 }}
            className="flex-1"
          >
            <span className="inline-block bg-[#10b981]/10 text-[#10b981] font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-6 border border-[#10b981]/20 shadow-sm backdrop-blur-sm">
              {t('story.tag')}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
              {t('story.title1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#059669] to-teal-600 block mt-2 pb-2">{t('story.title2')}</span>
            </h2>
            <p className="font-nunito text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
              {t('story.p1')}
            </p>
            <p className="font-nunito text-gray-500 text-lg font-medium leading-relaxed mb-10"
              dangerouslySetInnerHTML={{ __html: t('story.p2') }}
            />

            {/* Small trust points */}
            <div className="flex flex-col gap-3 mb-8">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shrink-0 shadow-sm">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="font-nunito text-gray-700 font-semibold">{point}</span>
                </div>
              ))}
            </div>

            <a href="#about" className="inline-flex items-center gap-2 group text-[#059669] font-nunito font-extrabold text-lg hover:text-[#047857] transition-colors mt-4">
              <span className="border-b-2 border-[#10b981]/30 group-hover:border-[#059669] pb-0.5 transition-colors">{t('story.readMore')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

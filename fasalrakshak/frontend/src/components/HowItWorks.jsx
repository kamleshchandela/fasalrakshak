import React from 'react';
import { Camera, Search, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../context/LanguageContext';

import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';
import kapas   from '../images/kapas.png';
import heroScan   from '../images/hero_scan.png';
import lushGreen  from '../images/lush_green.png';
import smilingFarmer   from '../images/smiling_farmer.png';

const steps = [
  {
    number: '1', emoji: '📷',
    title: 'Take a Photo',
    desc: 'Click a clear photo of the diseased leaf using your mobile camera, or choose from your gallery.',
    img: heroScan, imgAlt: 'Farmer analyzing field'
  },
  {
    number: '2', emoji: '🤖',
    title: 'AI Analyzes Instantly',
    desc: 'Our AI model identifies the crop disease in just 2 seconds with 94% accuracy.',
    img: lushGreen, imgAlt: 'Healthy lush green crops'
  },
  {
    number: '3', emoji: '💊',
    title: 'Get Treatment Advice',
    desc: 'Disease name, severity, medicine & dosage — shown in English, Hindi or Gujarati.',
    img: smilingFarmer, imgAlt: 'Smiling farmer getting treatment'
  }
];

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    { number: '1', emoji: '📷', img: heroScan, imgAlt: 'Farmer analyzing field', ...( (Array.isArray(t('how.steps')) && t('how.steps')[0]) || { title: 'Take a Photo', desc: 'Click a clear photo of the diseased leaf.' }) },
    { number: '2', emoji: '🤖', img: lushGreen, imgAlt: 'Healthy lush green crops', ...( (Array.isArray(t('how.steps')) && t('how.steps')[1]) || { title: 'AI Analyzes Instantly', desc: 'Our AI identifies disease in 2 seconds.' }) },
    { number: '3', emoji: '💊', img: smilingFarmer, imgAlt: 'Smiling farmer', ...( (Array.isArray(t('how.steps')) && t('how.steps')[2]) || { title: 'Get Treatment Advice', desc: 'Shown in your language.' }) },
  ];
  const crops = Array.isArray(t('how.crops')) ? t('how.crops') : [];
  return (
    <section id="how" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block bg-primary-lightGreen text-primary-darkGreen font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-4 border border-primary-green/20"
          >
            {t('how.tag')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-black text-text-charcoal"
          >
            {t('how.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-4 font-nunito text-gray-500 font-semibold text-lg"
          >
            {t('how.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", bounce: 0.2 }}
              className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-organic hover:-translate-y-2 transition-all duration-300"
            >
              <Tilt 
                 tiltMaxAngleX={2} 
                 tiltMaxAngleY={2} 
                 perspective={2000} 
                 transitionSpeed={1500} 
                 scale={1.02}
                 gyroscope={true}
                 className="relative h-48 overflow-hidden group cursor-pointer"
              >
                <img src={step.img} alt={step.imgAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-darkGreen/60 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center font-playfair font-black text-text-charcoal text-xl shadow-md border-2 border-white">
                  {step.number}
                </div>
              </Tilt>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-[16px] bg-[#10b981]/10 flex items-center justify-center text-2xl border border-[#10b981]/20 group-hover:scale-110 group-hover:bg-[#10b981]/20 transition-all duration-300">
                    {step.emoji}
                  </div>
                  <h3 className="font-playfair font-bold text-text-charcoal text-xl leading-tight">{step.title}</h3>
                </div>
                <p className="font-nunito text-gray-600 font-medium leading-relaxed text-[15px]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gujarat Crop Info Cards */}
        <div className="mt-24 bg-gray-900 rounded-[40px] p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#10b981]/30 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <span className="inline-block bg-white/10 text-white font-nunito font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] mb-4 border border-white/20 backdrop-blur-md shadow-lg">
              {t('how.supportTag')}
            </span>
            <h3 className="font-playfair text-3xl md:text-5xl font-black text-white">
              {t('how.supportTitle')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { img: mumfali, ...(crops[0] || { name: '🥜 Groundnut (Mungfali)', desc: '' }) },
              { img: gehu,    ...(crops[1] || { name: '🌾 Wheat (Gehu)', desc: '' }) },
              { img: kapas,   ...(crops[2] || { name: '☁️ Cotton (Kapas)', desc: '' }) },
            ].map((crop, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6, type: "spring", bounce: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 group/card relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={crop.img} alt={crop.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <h4 className="font-playfair font-bold text-white text-xl mb-4 leading-tight">{crop.name}</h4>
                  <p className="font-nunito text-gray-300 text-[15px] font-medium leading-relaxed">{crop.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

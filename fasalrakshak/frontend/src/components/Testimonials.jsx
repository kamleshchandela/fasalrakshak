import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../context/LanguageContext';

import kisan1  from '../images/kisan1.png';
import kisan2  from '../images/kisan2.png';
import kisan3  from '../images/kisan3.png';
import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';
import kapas   from '../images/kapas.png';

const testimonials = [
  {
    name: "Rameshbhai Patel", location: "Anand, Gujarat",
    quote: "My groundnut crop was getting destroyed. FasalRakshak identified the disease in just 2 seconds. My crop is saved and I saved a lot of money!",
    image: kisan1, cropImg: mumfali, cropLabel: "🥜 Groundnut (Mungfali) Farmer"
  },
  {
    name: "Sureshbhai Chauhan", location: "Rajkot, Gujarat",
    quote: "Results in Gujarati — very easy to understand. Medicine name and dosage are all written in the app. Thank you FasalRakshak!",
    image: kisan2, cropImg: kapas, cropLabel: "🌿 Cotton (Kapas) Farmer"
  },
  {
    name: "Dineshbhai Desai", location: "Saurashtra, Gujarat",
    quote: "Earlier I had to visit the agriculture center. Now my phone is my crop expert. Very fast and useful app for wheat farmers!",
    image: kisan3, cropImg: gehu, cropLabel: "🌾 Wheat (Gehu) Farmer"
  }
];

const Testimonials = () => {
  const { t } = useLanguage();
  const images = [kisan1, kisan2, kisan3];
  const cropImages = [mumfali, kapas, gehu];
  const reviews = Array.isArray(t('testimonials.reviews')) ? t('testimonials.reviews') : testimonials.map(x => ({ quote: x.quote, name: x.name, location: x.location, cropLabel: x.cropLabel }));
  return (
    <section className="py-24 bg-background-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.span 
             initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
             className="inline-block bg-primary-lightGreen text-primary-darkGreen font-nunito font-bold px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-4 border border-primary-green/20"
          >
            {t('testimonials.tag')}
          </motion.span>
          <motion.h2 
             initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}
             className="font-playfair text-4xl md:text-5xl font-black text-text-charcoal"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
             className="mt-4 font-nunito text-gray-500 font-semibold text-lg"
          >
            {t('testimonials.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-10">
          {reviews.map((rev, i) => (
            <Tilt
                key={i}
                tiltMaxAngleX={2}
                tiltMaxAngleY={2}
                perspective={2000}
                transitionSpeed={2000}
                scale={1}
                className="h-full"
            >
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15, duration: 0.6, type: "spring", bounce: 0.2 }}
              className="bg-white rounded-[32px] border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#10b981]/30 transition-all duration-300 group h-full flex flex-col relative"
            >
              {/* Giant quote mark */}
              <div className="absolute top-24 right-6 text-9xl font-serif text-gray-50/80 -z-0 pointer-events-none select-none group-hover:text-[#10b981]/5 transition-colors duration-500">
                "
              </div>
              <div className="relative h-44 overflow-hidden shrink-0 rounded-t-[32px]">
                <img src={cropImages[i]} alt={rev.cropLabel} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <span className="absolute bottom-3 left-6 right-6 text-white text-xs font-nunito font-extrabold tracking-widest uppercase shadow-sm leading-tight">{rev.cropLabel}</span>
              </div>
              
              {/* Pop out avatar */}
              <div className="absolute top-[152px] left-6 z-20">
                <img src={images[i]} alt={rev.name} className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-500 bg-white" />
              </div>

              <div className="p-8 pt-14 flex flex-col flex-1 relative z-10">
                <div className="flex gap-1 text-amber-400 mb-6 drop-shadow-sm">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="font-nunito text-gray-700 font-semibold italic leading-relaxed mb-8 flex-1 text-[16px]">"{rev.quote}"</p>
                
                <div className="pt-5 border-t border-gray-100">
                  <h4 className="font-playfair font-black text-gray-900 text-xl">{rev.name}</h4>
                  <p className="font-nunito text-xs text-[#10b981] font-bold tracking-widest uppercase mt-1">{rev.location}</p>
                </div>
              </div>
            </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

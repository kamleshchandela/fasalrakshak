import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import kisan1  from '../images/kisan1.png';
import mumfali from '../images/mumfali.png';
import gehu    from '../images/gehu.png';

const StorySection = () => {
  return (
    <section className="py-20 bg-[#F9F6EE] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          
          {/* Left: Image collage using local images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full max-w-lg relative pb-10 pr-10"
          >
            {/* Main large farmer photo */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <img src={kisan1} alt="Gujarati farmer using smartphone in field" className="w-full h-full object-cover object-top" />
            </div>
            {/* Overlapping groundnut field */}
            <div className="absolute -bottom-4 -right-4 w-36 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src={mumfali} alt="Mungfali groundnut field Gujarat" className="w-full h-full object-cover" />
            </div>
            {/* Overlapping wheat field */}
            <div className="absolute -top-4 -right-4 w-28 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src={gehu} alt="Gehu wheat field Gujarat" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1A6B2F]/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <span className="inline-block bg-[#F0F7EC] text-[#1A6B2F] font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6">
              Our Story
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Built For Farmers,<br />
              <span className="text-[#1A6B2F]">By Farmers</span>
            </h2>
            <p className="font-nunito text-gray-600 text-lg font-semibold leading-relaxed mb-4">
              Understanding the real needs of Gujarat's farmers, we built FasalRakshak — a tool that is fast, accurate, and completely free.
            </p>
            <p className="font-nunito text-gray-600 text-lg font-semibold leading-relaxed mb-8">
              Whether you grow <strong className="text-gray-900">Groundnut in Anand</strong>, <strong className="text-gray-900">Wheat in North Gujarat</strong>, or <strong className="text-gray-900">Cotton in Saurashtra</strong> — FasalRakshak protects your crop.
            </p>
            <a href="#about" className="inline-flex items-center gap-2 group text-[#1A6B2F] font-nunito font-extrabold text-lg hover:text-[#0D3D1A] transition-colors">
              <span className="border-b-2 border-[#1A6B2F] group-hover:border-[#0D3D1A] pb-0.5">Read Our Story</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

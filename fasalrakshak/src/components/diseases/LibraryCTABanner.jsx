import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const MotionLink = motion(Link);

const LibraryCTABanner = () => (
  <section
    className="py-16 px-4"
    style={{ background: 'linear-gradient(135deg, #1A6B2F 0%, #2E8B57 100%)' }}
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center"
    >
      <Camera className="w-14 h-14 text-white mx-auto mb-5 opacity-90" />
      <h2 className="font-playfair font-bold text-[28px] md:text-[32px] text-white mb-3">
        Think Your Crop Has a Disease?
      </h2>
      <p className="font-nunito text-[16px] text-white/80 mb-8">
        Take a photo and get instant AI diagnosis in 5 seconds
      </p>
      <MotionLink
        to="/detect"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-3 bg-[#F5A623] text-[#1C1C1C] font-nunito font-extrabold text-[18px] px-10 py-4 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-xl transition-all"
      >
        🔬 Scan Your Crop Now
      </MotionLink>
    </motion.div>
  </section>
);

export default LibraryCTABanner;

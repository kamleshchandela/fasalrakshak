import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const CTABanner = () => {
  return (
    <section className="relative py-20 bg-[#1A6B2F] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Slides in from bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block bg-white/20 text-white font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6">
              Start Today — It's Free
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-extrabold text-white mb-5">
              Protect Your Crop Today
            </h2>
            <p className="font-nunito text-xl text-white/80 font-semibold mb-10">
              No registration required — just take a photo and get results instantly
            </p>

            <motion.a
              href="#detect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-[#1A6B2F] font-nunito font-extrabold text-xl px-10 py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200"
            >
              <Camera className="w-7 h-7" />
              📷 Upload Photo Now
            </motion.a>

            {/* App store placeholders */}
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 cursor-not-allowed">
                <div className="text-2xl">▶</div>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-70 uppercase tracking-wider">Coming Soon</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 cursor-not-allowed">
                <div className="text-2xl">🍎</div>
                <div className="text-left text-white">
                  <div className="text-[10px] opacity-70 uppercase tracking-wider">Coming Soon</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;

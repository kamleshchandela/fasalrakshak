import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const CTABanner = () => {
  return (
    <section className="relative py-20 bg-primary-green overflow-hidden">
      {/* Floating Leaves */}
      <div className="absolute top-10 left-10 opacity-20 transform -rotate-45 hidden md:block">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 transform rotate-12 hidden md:block">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Aaj Hi Apni Fasal Bachao
          </h2>
          <p className="font-nunito text-xl text-primary-sage mb-10">
            Free mein use karo — koi sign up zarori nahi
          </p>

          <button className="bg-white text-primary-green font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 mx-auto hover:bg-primary-lightGreen hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
            <Camera className="w-6 h-6" />
            Abhi Photo Upload Karo
          </button>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3 w-40 h-14 backdrop-blur-sm cursor-not-allowed">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </div>
              <div className="text-left leading-tight text-white">
                <div className="text-[10px] opacity-80 uppercase">Coming Soon</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3 w-40 h-14 backdrop-blur-sm cursor-not-allowed">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </div>
              <div className="text-left leading-tight text-white">
                <div className="text-[10px] opacity-80 uppercase">Coming Soon</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

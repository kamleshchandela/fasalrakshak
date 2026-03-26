import React from 'react';
import { Camera, Star, CheckCircle, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Use kisan2 as the main hero image — more relatable, farmer in field
import kisan2    from '../images/kisan2.png';
import kisan1    from '../images/kisan1.png';
import kisan3    from '../images/kisan3.png';
import mumfali   from '../images/mumfali.png';
import gehu      from '../images/gehu.png';
import kapas     from '../images/kapas.png';

const avatars = [kisan1, kisan2, kisan3];

const HeroSection = () => {
  return (
    <section className="bg-white min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT slides in from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-1 max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#F0F7EC] border border-[#c8e0bc] text-[#1A6B2F] px-4 py-2 rounded-full font-nunito font-bold text-sm mb-7"
            >
              🌾 Trusted by 50,000+ Farmers Across Gujarat
            </motion.div>

            <h1 className="font-playfair text-[2.6rem] md:text-5xl lg:text-[3.2rem] font-extrabold text-gray-900 leading-[1.15] mb-5">
              Detect Crop Disease<br />
              <span className="text-[#1A6B2F]">With Just One Photo!</span>
            </h1>

            <p className="font-nunito text-gray-600 text-lg font-semibold leading-relaxed mb-8 max-w-md">
              Take a photo of your crop leaf. Our AI identifies the disease in <strong className="text-[#1A6B2F]">2 seconds</strong> and gives the right treatment in Gujarati, Hindi or English — completely <strong className="text-[#1A6B2F]">free</strong>!
            </p>

            {/* Clean solid CTA */}
            <motion.a
              href="#detect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-[#1A6B2F] text-white font-nunito font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-[#155824] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <Camera className="w-6 h-6" />
              📷 Take Photo — Start Now
            </motion.a>
            <p className="mt-3 text-sm text-gray-400 font-nunito font-semibold ml-1">No sign-up needed • Completely free</p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-5 pt-6 border-t border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <img key={i} src={src} alt="Farmer" className="w-10 h-10 rounded-full border-2 border-white object-cover object-top shadow-sm" />
                  ))}
                </div>
                <div>
                  <div className="flex text-[#F5A623]">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <p className="text-xs font-nunito font-bold text-gray-500">50,000+ farmers trust us</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 text-[#1A6B2F] font-nunito font-bold text-sm px-3 py-1.5 rounded-full border border-green-200">
                <Shield className="w-4 h-4" /> 94% Accuracy
              </div>
              <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 font-nunito font-bold text-sm px-3 py-1.5 rounded-full border border-yellow-200">
                <Zap className="w-4 h-4" /> 2 Second Result
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT slides in from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 w-full max-w-lg flex flex-col gap-4"
          >
            {/* Main image: kisan2 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F0F7EC]">
              <img
                src={kisan2}
                alt="Indian farmer using FasalRakshak app on smartphone in his field"
                className="w-full h-80 object-cover object-center"
              />
              {/* AI result card overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100 flex items-center gap-3"
              >
                <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center text-xl shrink-0">⚠️</div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair font-bold text-gray-900 text-sm">Late Blight Detected</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-2 w-full">
                    <div className="bg-[#1A6B2F] h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-nunito font-semibold mt-1">94% Confidence — Tap to see treatment</p>
                </div>
              </motion.div>
            </div>

            {/* 3 Gujarat crops */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: mumfali, label: '🥜 Groundnut', sub: 'Mungfali' },
                { src: gehu,    label: '🌾 Wheat',     sub: 'Gehu' },
                { src: kapas,   label: '☁️ Cotton',    sub: 'Kapas' },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="relative rounded-xl overflow-hidden shadow-md border border-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  <img src={c.src} alt={c.label} className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 py-2 px-1 text-center">
                    <p className="text-white text-xs font-nunito font-bold leading-tight">{c.label}</p>
                    <p className="text-white/70 text-[9px] font-nunito">{c.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

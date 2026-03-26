import React from 'react';
import { Camera, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Local images placed by user
import heroImg   from '../assets/hero.png';
import kisan1    from '../images/kisan1.png';
import kisan2    from '../images/kisan2.png';
import kisan3    from '../images/kisan3.png';
import mumfali   from '../images/mumfali.png';
import gehu      from '../images/gehu.png';
import kapas     from '../images/kapas.png';

const avatars = [kisan1, kisan2, kisan3];

const HeroSection = () => {
  return (
    <section className="bg-white min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-[#F0F7EC] border border-[#c8e0bc] text-[#1A6B2F] px-4 py-2 rounded-full font-nunito font-bold text-sm mb-6">
              🌾 Trusted by 50,000+ Farmers Across Gujarat
            </div>

            <h1 className="font-playfair text-[2.5rem] md:text-5xl lg:text-[3.1rem] font-extrabold text-gray-900 leading-[1.15] mb-4">
              Detect Crop Disease<br />
              <span className="text-[#1A6B2F]">With Just One Photo!</span>
            </h1>

            <p className="font-nunito text-gray-600 text-lg font-semibold leading-relaxed mb-8 max-w-md">
              Take a photo of your crop leaf with your phone. Our AI identifies the disease in <strong className="text-[#1A6B2F]">2 seconds</strong> and gives you the right treatment in Gujarati, Hindi or English — completely <strong className="text-[#1A6B2F]">free</strong>!
            </p>

            <a
              href="#detect"
              className="inline-flex items-center gap-3 bg-[#1A6B2F] text-white font-nunito font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-[#155824] hover:shadow-xl transition-colors duration-200"
            >
              <Camera className="w-6 h-6" />
              📷 Take Photo — Start Now
            </a>
            <p className="mt-3 text-sm text-gray-400 font-nunito font-semibold ml-1">No sign-up needed • Completely free</p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-5 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <img key={i} src={src} alt="Farmer" className="w-9 h-9 rounded-full border-2 border-white object-cover object-top" />
                  ))}
                </div>
                <div>
                  <div className="flex text-[#F5A623]">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                  <p className="text-xs font-nunito font-bold text-gray-500">50,000+ Farmers</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[#1A6B2F] font-nunito font-bold text-sm">
                <CheckCircle className="w-4 h-4" /> 94% Accuracy
              </div>
              <div className="flex items-center gap-1.5 text-[#1A6B2F] font-nunito font-bold text-sm">
                <CheckCircle className="w-4 h-4" /> 2 Second Result
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Farmer photo + Gujarat crops */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 w-full max-w-lg flex flex-col gap-4"
          >
            {/* Main hero / farmer image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src={heroImg}
                alt="Indian farmer using FasalRakshak app in field"
                className="w-full h-72 md:h-80 object-cover object-top"
              />
              {/* AI result overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-3.5 shadow-lg border border-green-100 flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-gray-900 text-sm">Late Blight Detected</p>
                  <div className="mt-1.5 bg-gray-200 rounded-full h-1.5 w-full">
                    <div className="bg-[#1A6B2F] h-1.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-nunito font-semibold mt-1">94% Confidence — Tap to see treatment</p>
                </div>
              </div>
            </div>

            {/* Gujarat's 3 main crops */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: mumfali, label: '🥜 Groundnut', sub: 'Mungfali' },
                { src: gehu,    label: '🌾 Wheat',     sub: 'Gehu' },
                { src: kapas,   label: '☁️ Cotton',    sub: 'Kapas' },
              ].map((c, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden shadow-md border border-gray-100">
                  <img src={c.src} alt={`${c.label} field in Gujarat`} className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 py-1.5 px-1 text-center">
                    <p className="text-white text-xs font-nunito font-bold leading-tight">{c.label}</p>
                    <p className="text-white/70 text-[9px] font-nunito">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

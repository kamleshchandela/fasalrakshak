import React from 'react';
import { Camera, Play, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary-lightGreen/80 to-transparent blur-[120px] -z-10 rounded-full" />
      
      {/* Scattered particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute opacity-[0.05] -z-10 text-primary-green animate-particle-drift"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
      ))}

      <div className="container mx-auto px-4 md:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 h-full">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 bg-primary-lightGreen text-primary-green px-4 py-2 rounded-full font-nunito font-semibold text-sm mb-6 border border-primary-sage">
              <span>🌾</span> AI-Powered Crop Protection
            </div>

            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-text-charcoal leading-tight mb-6">
              Apni Fasal Ko Bachao <br />
              <span className="text-primary-yellow relative inline-block mt-2">
                Ek Photo Se!
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-green/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
                </svg>
              </span>
            </h1>

            <p className="font-nunito text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              FasalRakshak uses advanced AI to detect crop diseases instantly from a single photo. Get treatment advice in seconds — in Hindi & Gujarati.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-green text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-darkGreen hover:shadow-xl hover:shadow-primary-green/20 transition-all duration-300 transform hover:-translate-y-1">
                <Camera className="w-5 h-5" />
                <span>Photo Kheeche</span>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-primary-green text-primary-green font-bold px-8 py-4 rounded-xl hover:bg-primary-lightGreen transition-all duration-300">
                <Play className="w-5 h-5 fill-current" />
                <span>Demo Dekho</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 text-sm font-nunito font-semibold text-gray-700 bg-white/60 p-3 rounded-2xl border border-primary-sage/50 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-primary-green">
                <CheckCircle2 className="w-5 h-5" />
                <span>50,000+ Kisaano ne use kiya</span>
              </div>
              <div className="w-px h-5 bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <div className="flex text-primary-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9★ Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual (Phone Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-md lg:max-w-lg flex justify-center mt-12 lg:mt-0"
          >
            {/* Phone Container */}
            <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-primary-green/20 border-[8px] border-gray-100 animate-float-up">
              {/* Screen */}
              <div className="relative w-full h-full bg-white rounded-[2.25rem] overflow-hidden flex flex-col">
                
                {/* Navbar area inside phone */}
                <div className="bg-primary-green text-white p-4 text-center rounded-b-2xl shadow-sm z-10">
                  <h3 className="font-playfair font-bold">FasalRakshak</h3>
                  <p className="text-[10px] text-primary-yellow/90 font-nunito">Analyzing image...</p>
                </div>

                {/* Main Scan Area */}
                <div className="relative flex-1 bg-gray-100 m-4 rounded-2xl overflow-hidden shadow-inner">
                  {/* Fake Image */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center"></div>
                  
                  {/* Scan bar effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary-green shadow-[0_0_15px_5px_rgba(26,107,47,0.5)] animate-scan-line z-20"></div>
                  
                  {/* Scan grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(26,107,47,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,107,47,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>
                </div>

                {/* Pop in result card */}
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5, type: 'spring' }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-xl shadow-xl border border-primary-sage p-4 z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-600 p-2 rounded-full">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Late Blight Detected</h4>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div className="bg-primary-yellow h-1.5 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">94% Confidence</p>
                    </div>
                  </div>
                </motion.div>

              </div>
              
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>
            </div>

            {/* Decorative Gujarat text art reference */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyMEgweiIgZmlsbD0iI0UxRURENSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-40 rounded-l-2xl z-0 hidden lg:block"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

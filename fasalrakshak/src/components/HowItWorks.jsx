import React from 'react';
import { Camera, Cpu as BrainCircuit, Heart as FileHeart } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Photo Lo',
    desc: 'Apne mobile se diseased leaf ki photo kheeche ya gallery se upload karo',
    icon: Camera,
    animation: (
      <div className="w-full h-32 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center mt-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Camera className="w-10 h-10 text-primary-green" />
        </motion.div>
      </div>
    )
  },
  {
    number: '02',
    title: 'AI Analyze Karta Hai',
    desc: 'Hamara AI model 0.5 seconds mein disease identify karta hai',
    icon: BrainCircuit,
    animation: (
      <div className="w-full h-32 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center mt-6">
        <div className="w-16 h-20 bg-primary-sage/30 rounded flex items-center justify-center overflow-hidden relative border border-primary-sage/50">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-green shadow-[0_0_10px_2px_rgba(26,107,47,0.8)] animate-scan-line"></div>
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-green/50">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
           </svg>
        </div>
      </div>
    )
  },
  {
    number: '03',
    title: 'Treatment Pao',
    desc: 'Disease name, severity level, aur step-by-step Gujarati/Hindi mein treatment milta hai',
    icon: FileHeart,
    animation: (
      <div className="w-full h-32 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center mt-6 p-4">
        <div className="bg-white border border-primary-sage shadow-sm rounded-lg w-full p-3 flex flex-col gap-2">
           <div className="h-3 bg-red-100 w-3/4 rounded flex items-center px-1"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
           <div className="h-2 bg-gray-200 w-full rounded"></div>
           <div className="h-2 bg-gray-200 w-5/6 rounded"></div>
        </div>
      </div>
    )
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block text-primary-yellow font-laila font-bold tracking-widest uppercase text-sm mb-3">
            Kaise Kaam Karta Hai?
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-charcoal inline-block relative">
            Sirf 3 Simple Steps
            <div className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary-green rounded-full"></div>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[6.5rem] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-primary-sage z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white border border-primary-sage rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-green/10 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-primary-lightGreen rounded-full flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-playfair text-3xl font-bold text-primary-sage">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="font-nunito text-gray-600 leading-relaxed min-h-[4rem]">
                    {step.desc}
                  </p>

                  {step.animation}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

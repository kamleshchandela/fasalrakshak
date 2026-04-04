import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sprout, Zap, Droplets } from 'lucide-react'; 

const OrganicLoader = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Analyzing your farm ecosystem 🌿",
    "Checking soil health signatures...",
    "Analyzing micronutrient balance...",
    "Building personalized organic plan..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-2xl bg-black/60 overflow-hidden"
    >
      {/* Background Ripple Energy Wave */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-[500px] h-[500px] border-[50px] border-emerald-500 rounded-full"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        className="absolute w-[400px] h-[400px] border-[20px] border-green-400 rounded-full"
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth - window.innerWidth/2, 
            y: Math.random() * window.innerHeight + 100,
            opacity: 0 
          }}
          animate={{ 
            y: -window.innerHeight - 100,
            opacity: [0, 0.7, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute"
        >
          <Leaf className="w-6 h-6 text-emerald-400/30 blur-[1px]" />
        </motion.div>
      ))}

      {/* Center Animated Sprout */}
      <div className="relative mb-12">
        <motion.div
          animate={{ 
             scale: [1, 1.1, 1],
             rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="bg-white/10 p-8 rounded-[40px] border border-white/20 backdrop-blur-3xl shadow-2xl relative"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="overflow-hidden"
          >
             <Sprout className="w-20 h-20 text-emerald-400" />
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-emerald-500/20 blur-3xl -z-10 rounded-full"
          />
        </motion.div>
      </div>

      {/* Dynamic Loading Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center space-y-3 px-6"
        >
          <h2 className="text-3xl font-black text-white font-playfair tracking-tight drop-shadow-lg">
             {steps[step]}
          </h2>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3].map(i => (
               <motion.div
                 key={i}
                 initial={{ scale: 0.5, opacity: 0.3 }}
                 animate={{ 
                    scale: i === step ? 1.5 : 1,
                    opacity: i === step ? 1 : 0.3,
                    backgroundColor: i === step ? '#10b981' : '#ffffff33'
                 }}
                 className="w-2.5 h-2.5 rounded-full"
               />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default OrganicLoader;

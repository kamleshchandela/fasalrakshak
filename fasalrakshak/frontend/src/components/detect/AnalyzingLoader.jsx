import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

const STEPS = [
  "📤 Uploading image to cloud...",
  "🔍 Analyzing crop with AI...",
  "🧠 Identifying disease patterns...",
  "💊 Preparing treatment plan...",
  "✅ Almost done..."
];

const AnalyzingLoader = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 0 -> 0s
    // 1 -> 1.5s
    // 2 -> 3s
    // 3 -> 4s
    // 4 -> 5s
    const timings = [1500, 3000, 4000, 5000];
    
    const timeouts = timings.map((time, index) => 
      setTimeout(() => setCurrentStep(index + 1), time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      
      {/* Animated Circular Ring */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
          {/* Outer track */}
          <circle cx="50" cy="50" r="46" fill="transparent" stroke="#E0EDD5" strokeWidth="6" />
          {/* Inner progress dash */}
          <circle 
            cx="50" cy="50" r="46" fill="transparent" stroke="#1A6B2F" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="289" strokeDashoffset="200"
            className="animate-[dash_2s_ease-in-out_infinite_alternate]"
          />
        </svg>
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Leaf className="w-9 h-9 text-primary-green" />
        </motion.div>
      </div>

      {/* Typing Steps Array */}
      <div className="h-[30px] w-full relative mb-12 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute font-nunito font-bold text-[16px] md:text-[18px] text-primary-green tracking-wide"
          >
            {STEPS[Math.min(currentStep, STEPS.length - 1)]}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="font-nunito text-[13px] text-gray-400 mb-4">Results are usually ready in 5-10 seconds</p>
      
      <button 
        onClick={onCancel}
        className="font-nunito text-[14px] font-bold text-red-400 hover:text-red-500 underline underline-offset-2 transition-colors"
      >
        Cancel Analysis
      </button>

      {/* CSS Keyframes block inline for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          0% { stroke-dasharray: 1, 300; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 150, 300; stroke-dashoffset: -40; }
          100% { stroke-dasharray: 150, 300; stroke-dashoffset: -289; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%) skew(-15deg); }
        }
      `}} />
    </div>
  );
};

export default AnalyzingLoader;

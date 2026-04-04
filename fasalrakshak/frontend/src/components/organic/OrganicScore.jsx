import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sprout } from 'lucide-react';

const OrganicScore = ({ targetScore = 84, duration = 2 }) => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCurrentScore(Math.floor(progress * targetScore));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [targetScore, duration]);

  const getColor = () => {
    if (currentScore < 50) return '#ef4444';
    if (currentScore < 80) return '#fbbf24';
    return '#10b981';
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-[32px] shadow-lg shadow-green-900/5 relative overflow-hidden group">
      {/* Background Pulse Effect */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute inset-0 bg-emerald-50/50 -z-10"
      />

      <div className="flex items-center justify-between mb-4">
        <div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-1">Ecosystem Readiness</p>
           <h3 className="text-xl font-black text-gray-900 font-playfair tracking-tight">Organic <span className="text-emerald-500">Score</span></h3>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-50 border-t-white">
           <Sprout className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      <div className="relative pt-2">
         {/* Score Number Display */}
         <div className="flex items-end gap-1 mb-3">
             <motion.span 
               className="text-5xl font-black tabular-nums tracking-tighter"
               style={{ color: getColor() }}
             >
               {currentScore}
             </motion.span>
             <span className="text-xl font-bold text-gray-400 mb-1.5">%</span>
             
             {currentScore >= 80 && (
                <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1, rotate: [0, 15, -15, 0] }}
                   className="ml-auto bg-emerald-100 text-emerald-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm flex items-center gap-1 border border-emerald-200"
                >
                   <Sparkles className="w-3 h-3" /> Ready
                </motion.div>
             )}
         </div>

         {/* Animating Progress Bar */}
         <div className="h-6 w-full bg-gray-100/50 rounded-full p-1 overflow-hidden backdrop-blur-sm border border-gray-50/50 relative shadow-inner">
             <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentScore}%` }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-300 relative shadow-lg shadow-emerald-500/20"
                style={{ 
                   transition: 'width 0.2s ease-out',
                }}
             >
                 {/* Shine bar inside pointer */}
                 <div className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-full"></div>
                 
                 {/* Energy Dot at lead edge */}
                 <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-70"
                 />
             </motion.div>
         </div>
      </div>
      
      {/* Detail Text */}
      <p className="mt-4 text-xs font-bold text-gray-500 font-nunito flex items-center gap-2">
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8 }} className="w-2 h-2 rounded-[2px] bg-emerald-400" />
         Your readiness score is {currentScore < 60 ? 'Moderate' : 'Advanced'}. Follow the conversion plan below to hit 100%.
      </p>
    </div>
  );
};

export default OrganicScore;

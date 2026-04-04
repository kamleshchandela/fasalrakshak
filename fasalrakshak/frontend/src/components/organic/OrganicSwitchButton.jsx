import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Sparkles, AlertCircle } from 'lucide-react';
import OrganicDiagnosisModal from './OrganicDiagnosisModal';

const OrganicSwitchButton = ({ soilData, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleOrganicConversion = () => {
    setShowModal(true);
  };

  return (
    <div className="relative z-50">
      {/* The Button */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 35px rgba(34, 197, 94, 0.8)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOrganicConversion}
        className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#14532d] to-[#22c55e] rounded-full text-white font-black text-lg shadow-[0_0_20px_rgba(34,197,94,0.6)] group overflow-hidden border border-white/20"
      >
        <motion.div
           animate={{ rotate: [0, 10, -10, 0] }}
           transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sprout className="w-6 h-6 text-emerald-200" />
        </motion.div>
        
        <span className="tracking-tight">🌿 Make My Farm Organic</span>
        
        <Sparkles className="w-5 h-5 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Shine highlight */}
        <div className="absolute inset-x-0 h-1/2 top-0 bg-white/20 rounded-t-full"></div>
      </motion.button>

      {/* Pulsing Ripple Background - Animated only when constant or hover */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full -z-10"
      />

      {/* Error Tooltip */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold whitespace-nowrap z-[100] border border-red-400"
          >
            <AlertCircle className="w-5 h-5 shadow-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Resulting Plan Dashboard / Diagnosis Portal */}
      <AnimatePresence>
        {showModal && (
          <OrganicDiagnosisModal 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganicSwitchButton;

import React from 'react';
import { motion } from 'framer-motion';

const LeafShape = ({ style, delay = 0, duration = 14 }) => (
  <motion.div style={style} className="absolute pointer-events-none"
    animate={{ y: [0, -20, 8, -12, 0], x: [0, 10, -6, 14, 0], rotate: [0, 10, -6, 5, 0], opacity: [0.15, 0.3, 0.18, 0.25, 0.15] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 80 120" width="80" height="120" fill="none">
      <path d="M40 10 C55 25 75 45 70 75 C65 105 45 115 40 115 C35 115 15 105 10 75 C5 45 25 25 40 10Z"
        fill="rgba(34,197,94,0.2)" stroke="rgba(22,163,74,0.3)" strokeWidth="1" />
      <line x1="40" y1="20" x2="40" y2="110" stroke="rgba(22,163,74,0.3)" strokeWidth="0.8" />
      <line x1="40" y1="45" x2="25" y2="65" stroke="rgba(22,163,74,0.2)" strokeWidth="0.5" />
      <line x1="40" y1="55" x2="58" y2="75" stroke="rgba(22,163,74,0.2)" strokeWidth="0.5" />
    </svg>
  </motion.div>
);

const BackgroundLayers = () => {
  const leaves = [
    { top: '5%',  left: '5%',  size: 80,  delay: 0,   dur: 14 },
    { top: '10%', left: '78%', size: 65,  delay: 2,   dur: 11 },
    { top: '32%', left: '2%',  size: 100, delay: 4,   dur: 16 },
    { top: '48%', left: '85%', size: 75,  delay: 1.5, dur: 13 },
    { top: '65%', left: '12%', size: 55,  delay: 3,   dur: 12 },
    { top: '74%', left: '68%', size: 80,  delay: 5,   dur: 18 },
    { top: '20%', left: '45%', size: 50,  delay: 6,   dur: 10 },
    { top: '82%', left: '48%', size: 65,  delay: 2.5, dur: 15 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Light airy green base */}
      <motion.div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 35%, #bbf7d0 65%, #d1fae5 100%)' }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Soft top-right glow */}
      <motion.div className="absolute top-0 right-0 pointer-events-none"
        style={{ width: '55vw', height: '55vw', background: 'radial-gradient(circle at top right, rgba(74,222,128,0.25), transparent 65%)' }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Soft bottom-left glow */}
      <motion.div className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: '45vw', height: '45vw', background: 'radial-gradient(circle at bottom left, rgba(34,197,94,0.15), transparent 65%)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, delay: 2, repeat: Infinity }}
      />

      {/* Very subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {leaves.map((leaf, i) => (
        <LeafShape key={i} delay={leaf.delay} duration={leaf.dur}
          style={{ top: leaf.top, left: leaf.left, width: leaf.size, height: leaf.size * 1.4 }}
        />
      ))}

      {/* Soft vignette to frame content */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(187,247,208,0.4) 100%)' }}
      />
    </div>
  );
};

export default BackgroundLayers;

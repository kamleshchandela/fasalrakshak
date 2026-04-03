import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ── Particle ────────────────────────────────────────────────────
const Particle = ({ x, y, size, delay, duration, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      filter: 'blur(0.5px)',
    }}
    animate={{
      y: [0, -60, -20, -80, 0],
      x: [0, 15, -10, 20, 0],
      opacity: [0, 0.8, 0.3, 0.7, 0],
      scale: [0.5, 1.2, 0.8, 1, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// ── Canvas-based pollen dots (for performance) ─────────────────
const Particles = ({ count = 40 }) => {
  const particles = React.useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: 20 + Math.random() * 80,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
      color: [
        'rgba(34,197,94,0.9)',
        'rgba(74,222,128,0.7)',
        'rgba(187,247,208,0.6)',
        'rgba(255,255,255,0.5)',
        'rgba(134,239,172,0.8)',
      ][Math.floor(Math.random() * 5)],
    })),
  [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
};

export default Particles;

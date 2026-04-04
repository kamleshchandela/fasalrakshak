import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Root path definitions for each stage
// Each stage adds progressively more complex branching roots
const ROOT_STAGES = [
  // Stage 0: empty soil line only
  { paths: [], glowing: false },

  // Stage 1: single taproot
  {
    paths: [
      { d: 'M100 10 C100 10 100 70 100 90', strokeWidth: 3, delay: 0 },
    ],
    glowing: false,
  },

  // Stage 2: first branches
  {
    paths: [
      { d: 'M100 10 C100 10 100 70 100 90', strokeWidth: 3, delay: 0 },
      { d: 'M100 40 C100 40 70 55 55 70', strokeWidth: 2, delay: 0.2 },
      { d: 'M100 50 C100 50 130 65 148 78', strokeWidth: 2, delay: 0.3 },
    ],
    glowing: false,
  },

  // Stage 3: complex network
  {
    paths: [
      { d: 'M100 10 C100 10 100 70 100 90', strokeWidth: 3, delay: 0 },
      { d: 'M100 40 C100 40 70 55 55 70', strokeWidth: 2, delay: 0.15 },
      { d: 'M100 50 C100 50 130 65 148 78', strokeWidth: 2, delay: 0.20 },
      { d: 'M55 70 C55 70 35 80 22 94', strokeWidth: 1.5, delay: 0.35 },
      { d: 'M55 70 C55 70 48 88 44 105', strokeWidth: 1.5, delay: 0.4 },
      { d: 'M148 78 C148 78 162 90 172 105', strokeWidth: 1.5, delay: 0.35 },
      { d: 'M100 65 C100 65 85 78 80 92', strokeWidth: 1.5, delay: 0.45 },
    ],
    glowing: false,
  },

  // Stage 4: full glowing root system
  {
    paths: [
      { d: 'M100 10 C100 10 100 70 100 90', strokeWidth: 3.5, delay: 0 },
      { d: 'M100 40 C100 40 70 55 55 70', strokeWidth: 2.5, delay: 0.1 },
      { d: 'M100 50 C100 50 130 65 148 78', strokeWidth: 2.5, delay: 0.15 },
      { d: 'M55 70 C55 70 35 80 22 94', strokeWidth: 2, delay: 0.25 },
      { d: 'M55 70 C55 70 48 88 44 105', strokeWidth: 2, delay: 0.3 },
      { d: 'M148 78 C148 78 162 90 172 105', strokeWidth: 2, delay: 0.25 },
      { d: 'M100 65 C100 65 85 78 80 92', strokeWidth: 2, delay: 0.35 },
      { d: 'M100 65 C100 65 118 80 122 94', strokeWidth: 2, delay: 0.35 },
      { d: 'M22 94 C22 94 10 105 6 118', strokeWidth: 1.5, delay: 0.45 },
      { d: 'M172 105 C172 105 183 115 188 130', strokeWidth: 1.5, delay: 0.45 },
      { d: 'M80 92 C80 92 68 102 64 118', strokeWidth: 1.5, delay: 0.50 },
      { d: 'M122 94 C122 94 134 104 138 120', strokeWidth: 1.5, delay: 0.50 },
    ],
    glowing: true,
  },
];

// ── Animated SVG path with stroke-dasharray draw effect ───────
const AnimatedPath = ({ d, strokeWidth, delay, glowing, error }) => {
  const pathColor = error
    ? '#ef4444'
    : glowing ? '#4ade80' : '#22c55e';

  const glowFilter = glowing
    ? `drop-shadow(0 0 6px #22c55e) drop-shadow(0 0 12px #22c55e)`
    : 'none';

  return (
    <motion.path
      d={d}
      stroke={pathColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      style={{ filter: glowFilter }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 1,
        stroke: error ? ['#ef4444', '#dc2626', '#ef4444'] : pathColor,
      }}
      transition={{
        pathLength: { duration: 0.6, delay, ease: 'easeOut' },
        opacity: { duration: 0.2, delay },
        stroke: error ? { duration: 0.3, repeat: 3 } : undefined,
      }}
    />
  );
};

// ── Glow pulse ring on completion ──────────────────────────────
const CompletePulse = () => (
  <>
    {[1, 2, 3].map(i => (
      <motion.circle
        key={i}
        cx="100"
        cy="65"
        r={20 + i * 15}
        stroke="rgba(34,197,94,0.4)"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
        transition={{ duration: 1.2, delay: i * 0.25, repeat: Infinity, ease: 'easeOut' }}
      />
    ))}
  </>
);

// ── Main Root Animation Component ──────────────────────────────
const RootAnimation = ({ pinLength = 0, error = false }) => {
  const stage = Math.min(pinLength, 4);
  const stageData = ROOT_STAGES[stage];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[200px] h-[140px]">
        <svg
          viewBox="0 0 200 140"
          width="200"
          height="140"
          className="overflow-visible"
        >
          {/* Soil line */}
          <motion.line
            x1="10" y1="12" x2="190" y2="12"
            stroke="rgba(120,80,40,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Soil texture dots */}
          {[30, 60, 90, 120, 150].map(x => (
            <motion.circle
              key={x}
              cx={x + Math.random() * 10}
              cy={8}
              r={2}
              fill="rgba(120,80,40,0.4)"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2 + x * 0.02, repeat: Infinity }}
            />
          ))}

          {/* Animated root paths */}
          <AnimatePresence mode="sync">
            {stageData.paths.map((path, i) => (
              <AnimatedPath
                key={`${stage}-${i}`}
                {...path}
                glowing={stageData.glowing}
                error={error}
              />
            ))}
          </AnimatePresence>

          {/* Completion pulse */}
          {stage === 4 && !error && <CompletePulse />}

          {/* Error shake dots */}
          {error && (
            <motion.g
              animate={{ x: [-4, 4, -4, 4, 0] }}
              transition={{ duration: 0.4 }}
            >
              <circle cx="100" cy="65" r="8" fill="rgba(239,68,68,0.3)" />
              <circle cx="100" cy="65" r="4" fill="#ef4444" />
            </motion.g>
          )}
        </svg>
      </div>

      {/* 4-dot progress indicator */}
      <div className="flex gap-3">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full border"
            style={{
              borderColor: i < pinLength ? '#22c55e' : 'rgba(34,197,94,0.3)',
              background: i < pinLength
                ? `radial-gradient(circle, #4ade80, #22c55e)`
                : 'transparent',
              boxShadow: i < pinLength ? '0 0 8px #22c55e' : 'none',
            }}
            animate={i < pinLength ? { scale: [0.8, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default RootAnimation;

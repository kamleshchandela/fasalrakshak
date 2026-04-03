import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── PIN → Plant stage ─────────────────────────────────────────
const stages = [
  // 0: empty soil
  null,
  // 1: seed
  ({ color, glow }) => (
    <g>
      <ellipse cx="50" cy="82" rx="12" ry="6" fill="#8B6914" opacity="0.6" />
      <ellipse cx="50" cy="80" rx="8" ry="5" fill="#6B4F12" />
    </g>
  ),
  // 2: sprout
  ({ color, glow }) => (
    <g>
      <line x1="50" y1="80" x2="50" y2="55" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="50" cy="80" rx="8" ry="5" fill="#6B4F12" />
      <path d="M50 60 Q40 50 35 40" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="33" cy="38" rx="9" ry="6" fill={color} opacity="0.9" transform="rotate(-30 33 38)" />
    </g>
  ),
  // 3: small plant
  ({ color, glow }) => (
    <g>
      <line x1="50" y1="82" x2="50" y2="40" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="50" cy="82" rx="12" ry="6" fill="#6B4F12" opacity="0.7" />
      {/* left leaf */}
      <path d="M50 55 Q38 45 30 35" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="33" rx="11" ry="7" fill={color} opacity="0.9" transform="rotate(-35 28 33)" />
      {/* right leaf */}
      <path d="M50 65 Q62 55 70 42" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="41" rx="11" ry="7" fill={color} opacity="0.9" transform="rotate(25 72 41)" />
      {/* top bud */}
      <ellipse cx="50" cy="38" rx="7" ry="5" fill={color} opacity="0.8" />
    </g>
  ),
  // 4: full tree 🌳
  ({ color, glow }) => (
    <g>
      {/* trunk */}
      <line x1="50" y1="85" x2="50" y2="50" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="50" cy="85" rx="14" ry="7" fill="#78350f" opacity="0.8" />
      {/* large canopy */}
      <circle cx="50" cy="40" r="24" fill={color} opacity="0.85" />
      <circle cx="33" cy="48" r="16" fill={color} opacity="0.75" />
      <circle cx="67" cy="48" r="16" fill={color} opacity="0.75" />
      <circle cx="50" cy="22" r="16" fill={color} opacity="0.8" />
      {/* glow ring */}
      <circle cx="50" cy="38" r="30" fill="none" stroke={glow} strokeWidth="3" opacity="0.5" />
    </g>
  ),
];

// Rain drop component
const RainDrops = () => {
  const drops = Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-blue-300/50"
          style={{ left: `${d.x}%`, height: '12px', top: '-12px' }}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{ repeat: Infinity, duration: d.duration, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

// Sun rays component
const SunRays = () => (
  <div className="absolute top-[-40px] right-[-40px] pointer-events-none">
    <motion.div
      className="w-64 h-64 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(251,191,36,0) 70%)',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

// Stars for night
const Stars = () => {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + s.delay, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const PlantPinInput = ({ value, onChange, theme, label = 'Your PIN' }) => {
  const stage = value.length; // 0-4
  const StageComponent = stages[stage];

  const leafColor = theme?.type === 'sunny' ? '#22c55e'
    : theme?.type === 'rainy' ? '#60a5fa'
    : theme?.type === 'night' ? '#a78bfa'
    : '#22c55e';

  const glowColor = theme?.plantGlow || '#fbbf24';

  const animSpeed = theme?.type === 'rainy' ? 0.3 : theme?.type === 'sunny' ? 0.8 : 0.6;

  return (
    <div className="space-y-3">
      <label className={`text-sm font-black uppercase tracking-widest ${theme?.textColor || 'text-slate-700'}`}>
        {label}
      </label>

      {/* Soil + Plant SVG */}
      <div className="flex justify-center">
        <motion.div
          className="relative"
          style={{ width: 100, height: 100 }}
        >
          {stage === 4 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle, ${glowColor}55 0%, transparent 70%)` }}
              animate={{ scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Soil base */}
            <ellipse cx="50" cy="87" rx="40" ry="10" fill="#8B6914" opacity="0.3" />
            <ellipse cx="50" cy="85" rx="32" ry="8" fill="#6B4F12" opacity="0.4" />

            <AnimatePresence mode="wait">
              {StageComponent && (
                <motion.g
                  key={stage}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: animSpeed, type: 'spring', bounce: 0.4 }}
                >
                  <StageComponent color={leafColor} glow={glowColor} />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </motion.div>
      </div>

      {/* 4-dot PIN indicator */}
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full border-2"
            style={{
              borderColor: theme?.accentColor || '#276738',
              backgroundColor: i < stage ? (theme?.accentColor || '#276738') : 'transparent',
            }}
            animate={i < stage ? { scale: [0.8, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Hidden PIN input with large tap area */}
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 4))}
        style={{
          background: theme?.inputBg || 'rgba(255,255,255,0.9)',
          border: `1.5px solid ${theme?.borderColor || 'rgba(39,103,56,0.3)'}`,
          color: theme?.type === 'night' ? '#e0e7ff' : '#1e293b',
        }}
        className="w-full h-[52px] text-center rounded-xl text-2xl tracking-[1rem] font-black focus:outline-none focus:ring-2 transition-all backdrop-blur-sm"
        placeholder="••••"
        required
      />
    </div>
  );
};

// ── Weather Background Wrapper ──────────────────────────────────
export const WeatherBackground = ({ theme, children }) => (
  <div className={`relative min-h-screen bg-gradient-to-br ${theme?.gradient || 'from-green-50 to-green-100'} transition-all duration-1000 overflow-hidden`}>
    {theme?.type === 'rainy' && <RainDrops />}
    {theme?.type === 'sunny' && <SunRays />}
    {theme?.type === 'night' && <Stars />}
    {/* Subtle organic blobs */}
    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
      style={{ background: theme?.glowColor || 'rgba(39,103,56,0.3)' }} />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
      style={{ background: theme?.glowColor || 'rgba(39,103,56,0.2)' }} />
    {children}
  </div>
);

export default PlantPinInput;

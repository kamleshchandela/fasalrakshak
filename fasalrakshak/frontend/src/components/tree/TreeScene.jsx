import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SceneLighting from './SceneLighting';
import Particles3D from './Particles3D';
import Seed3D from './Seed3D';
import Roots3D from './Roots3D';
import Tree3D from './Tree3D';
import Leaves3D from './Leaves3D';
import FeatureCards from './FeatureCards';
import CameraRig from './CameraRig';

gsap.registerPlugin(ScrollTrigger);

// ── Stage context labels ──────────────────────────────────────
const STAGES = [
  { at: 0.00, title: 'Every great harvest begins with a single seed.',       sub: 'Scroll to witness the journey ↓',                   emoji: '🌑' },
  { at: 0.15, title: 'The seed awakens. Life stirs beneath the soil.',       sub: 'Stage 2 — Germination',                              emoji: '🌧️' },
  { at: 0.30, title: 'Roots reach deep. An unseen foundation forms.',        sub: 'Stage 3 — Root Expansion',                           emoji: '🌿' },
  { at: 0.50, title: 'Breaking through. The journey upward begins.',         sub: 'Stage 4 — Stem Emergence',                           emoji: '🌱' },
  { at: 0.65, title: 'Rising strong. Branches stretch toward the light.',    sub: 'Stage 5 — Tree Formation',                           emoji: '🌳' },
  { at: 0.85, title: 'A complete ecosystem — powered by intelligence.',      sub: 'Stage 6 — Feature Ecosystem',                        emoji: '✨' },
];

function getStage(p) {
  let idx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (p >= STAGES[i].at) idx = i;
  }
  return STAGES[idx];
}

// ── Stage step pill row ───────────────────────────────────────
const StepPills = ({ progress }) => (
  <div style={{
    position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
    display: 'flex', gap: 8, zIndex: 20,
  }}>
    {STAGES.map((s, i) => {
      const active = progress >= s.at && (i === STAGES.length - 1 || progress < STAGES[i + 1].at);
      const done = i < STAGES.findIndex((_, j) => j === STAGES.length - 1
        ? progress >= STAGES[j].at
        : progress >= STAGES[j].at && progress < STAGES[j + 1].at);
      return (
        <div key={i} style={{
          width: active ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: active ? '#22c55e' : progress >= s.at ? '#166534' : '#1a3020',
          border: '1px solid rgba(34,197,94,0.3)',
          transition: 'all 0.4s ease',
          boxShadow: active ? '0 0 10px #22c55e80' : 'none',
        }} />
      );
    })}
  </div>
);

// ── Main TreeScene component ─────────────────────────────────
const TreeScene = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scroller: window,
        scrub: 1.4,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setProgress(self.progress);
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stage = getStage(progress);

  return (
    <div
      ref={containerRef}
      style={{ height: '500vh', position: 'relative' }}
    >
      {/* ── Sticky viewport ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── 3D Canvas ── */}
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0.3, 5], fov: 55, near: 0.1, far: 100 }}
          style={{ background: '#060d08', width: '100%', height: '100%' }}
          shadows
        >
          <fog attach="fog" args={['#0a1a0e', 10, 28]} />

          <Suspense fallback={null}>
            <SceneLighting progressRef={progressRef} />
            <Particles3D progressRef={progressRef} />
            <Seed3D progressRef={progressRef} />
            <Roots3D progressRef={progressRef} />
            <Tree3D progressRef={progressRef} />
            <Leaves3D progressRef={progressRef} />
            <FeatureCards progressRef={progressRef} progress={progress} />
            <CameraRig progressRef={progressRef} />
          </Suspense>
        </Canvas>

        {/* ── Vignette overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(4,10,6,0.55) 100%)',
        }} />

        {/* ── Stage title ── */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', zIndex: 10, pointerEvents: 'none',
          maxWidth: 560, padding: '0 24px',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{stage.emoji}</div>
          <h2 style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(17px, 2.4vw, 26px)',
            color: '#ecfdf5',
            lineHeight: 1.35,
            margin: '0 0 8px',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            letterSpacing: '-0.02em',
            transition: 'opacity 0.3s',
          }}>
            {stage.title}
          </h2>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(134,239,172,0.65)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {stage.sub}
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'rgba(34,197,94,0.15)', zIndex: 20,
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #22c55e, #4ade80)',
            boxShadow: '0 0 8px #22c55e',
            transition: 'width 0.1s',
          }} />
        </div>

        {/* ── Stage step pills ── */}
        <StepPills progress={progress} />

        {/* ── Stage indicator sidebar ── */}
        <div style={{
          position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10,
          pointerEvents: 'none',
        }}>
          {STAGES.map((s, i) => {
            const done = progress >= s.at;
            const active = done && (i === STAGES.length - 1 || progress < STAGES[i + 1].at);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: done ? 1 : 0.3, transition: 'opacity 0.4s' }}>
                <div style={{
                  width: active ? 10 : 7,
                  height: active ? 10 : 7,
                  borderRadius: '50%',
                  background: done ? '#22c55e' : '#1a3020',
                  border: '1px solid #22c55e60',
                  boxShadow: active ? '0 0 10px #22c55e' : 'none',
                  transition: 'all 0.3s',
                }} />
                {active && (
                  <span style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: '#86efac',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>{s.emoji}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Scroll hint (only at start) ── */}
        {progress < 0.04 && (
          <div style={{
            position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            animation: 'float 2s ease-in-out infinite', zIndex: 10, pointerEvents: 'none',
          }}>
            <div style={{
              width: 24, height: 40, border: '2px solid rgba(34,197,94,0.5)',
              borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
            }}>
              <div style={{
                width: 4, height: 8, borderRadius: 2, background: '#22c55e',
                animation: 'scrollDot 1.5s ease-in-out infinite',
              }} />
            </div>
            <span style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: 'rgba(134,239,172,0.5)',
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>Scroll</span>
          </div>
        )}

        <style>{`
          @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }
          @keyframes scrollDot { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(10px); opacity: 0.4; } }
        `}</style>
      </div>
    </div>
  );
};

export default TreeScene;

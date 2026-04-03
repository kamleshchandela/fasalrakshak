import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const FEATURES = [
  { pos: [4.2, 6.0, 1.3],    icon: '🔬', title: 'Disease Detection',  desc: 'AI scans crop health in real-time',  color: '#4ade80', branch: 0 },
  { pos: [-4.3, 6.5, -1.1],  icon: '🌤️', title: 'Weather AI',         desc: 'Smart forecasts for your fields',    color: '#60a5fa', branch: 1 },
  { pos: [3.3, 7.2, -1.8],   icon: '🛡️', title: 'Crop Insurance',     desc: 'Auto protection for your harvest',   color: '#f472b6', branch: 2 },
  { pos: [-3.2, 6.8, 1.7],   icon: '💰', title: 'Market Prices',      desc: 'Live mandi rates, every minute',     color: '#fb923c', branch: 3 },
  { pos: [3.7, 5.1, -0.6],   icon: '👨‍🌾', title: 'Expert Connect',   desc: 'Chat with certified agronomists',    color: '#a78bfa', branch: 4 },
  { pos: [-3.6, 4.5, 0.9],   icon: '🌱', title: 'Soil Analysis',      desc: 'Deep soil health monitoring',        color: '#34d399', branch: 5 },
];

// Glowing connector line between card and branch
const ConnectorLine = ({ from, to, color, opacity }) => {
  const geometry = useMemo(() => {
    const pts = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity * 0.6} depthWrite={false} />
    </line>
  );
};

const BRANCH_ATTACH = [
  [3.0, 5.0, 0.9], [-3.0, 5.5, -0.7], [2.4, 6.0, -1.3],
  [-2.2, 5.8, 1.1], [2.8, 4.4, -0.2], [-2.8, 4.0, 0.5],
];

const FeatureCards = ({ progress }) => {
  // Cards appear sequentially 0.85 → 1.0, staggered ~0.025 apart
  const cardOpacities = FEATURES.map((_, i) => {
    const start = 0.845 + i * 0.026;
    return Math.max(0, Math.min(1, (progress - start) / 0.05));
  });

  if (progress < 0.82) return null;

  return (
    <>
      {FEATURES.map((f, i) => {
        const op = cardOpacities[i];
        return (
          <group key={i}>
            {/* Glowing connector */}
            <ConnectorLine
              from={BRANCH_ATTACH[i]}
              to={f.pos}
              color={f.color}
              opacity={op}
            />

            {/* Feature card via drei Html */}
            <Html
              position={f.pos}
              distanceFactor={10}
              style={{ pointerEvents: 'none' }}
            >
              <div style={{
                opacity: op,
                transform: `scale(${0.82 + op * 0.18}) translateY(${(1 - op) * 14}px)`,
                background: 'rgba(4, 14, 8, 0.88)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: `1px solid ${f.color}50`,
                borderRadius: 16,
                padding: '14px 18px',
                minWidth: 170,
                boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${f.color}25`,
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                userSelect: 'none',
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                <div style={{
                  color: f.color,
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 4,
                  letterSpacing: '-0.01em',
                  fontFamily: '"Syne", sans-serif',
                }}>
                  {f.title}
                </div>
                <div style={{
                  color: 'rgba(187,247,208,0.6)',
                  fontSize: 11,
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}>
                  {f.desc}
                </div>
                {/* Bottom glow dot */}
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: f.color,
                  boxShadow: `0 0 10px ${f.color}`,
                  margin: '8px auto 0',
                }} />
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
};

export default FeatureCards;

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Seed3D = ({ progressRef }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const glowRef = useRef();
  const crackRef = useRef();

  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    if (!meshRef.current) return;

    // Seed visible 0 → 0.40, fades out 0.28 → 0.40
    const opacity = p < 0.28
      ? 1
      : p < 0.40
      ? 1 - (p - 0.28) / 0.12
      : 0;

    meshRef.current.material.opacity = Math.max(0, opacity);
    meshRef.current.visible = opacity > 0.02;

    // Breathing pulse
    const breath = 1 + Math.sin(t * 1.8) * 0.02;
    if (meshRef.current.visible) {
      meshRef.current.scale.setScalar(breath);
    }

    // Slow Y rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
    }

    // Stage 2: CRACK — seed deforms (0.15 → 0.30)
    if (meshRef.current.visible && p > 0.15 && p < 0.35) {
      const ct = (p - 0.15) / 0.20;
      meshRef.current.scale.x = 1 + ct * 0.25;
      meshRef.current.scale.y = 1 - ct * 0.15;
    }

    // Glow pulse
    if (glowRef.current) {
      const gi = (0.06 + Math.sin(t * 2.2) * 0.03) * (1 - Math.min(1, p * 3));
      glowRef.current.material.opacity = Math.max(0, gi);
    }

    // Crack line visibility
    if (crackRef.current) {
      const cv = p > 0.15 && p < 0.38 ? Math.min(1, (p - 0.15) / 0.12) : 0;
      crackRef.current.material.opacity = cv;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.08, 0]}>
      {/* Main seed body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.26, 20, 16]} />
        <meshStandardMaterial
          color="#6b3e1e"
          roughness={0.85}
          metalness={0.08}
          transparent
          emissive="#1a0e06"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial
          color="#22c55e"
          transparent
          opacity={0.06}
          emissive="#22c55e"
          emissiveIntensity={0.8}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Crack line */}
      <mesh ref={crackRef} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[0.02, 0.35, 0.02]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={2}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
};

export default Seed3D;

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 220;

const Particles3D = ({ progressRef }) => {
  const pointsRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 9 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = 0.003 + Math.random() * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return { positions, velocities };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = geometry.attributes.position;
    const p = progressRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posAttr.array[i * 3 + 0] += velocities[i * 3 + 0];
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];
      if (posAttr.array[i * 3 + 1] > 9) {
        posAttr.array[i * 3 + 1] = -1;
      }
    }
    posAttr.needsUpdate = true;

    // Opacity increases with scene life
    if (pointsRef.current.material) {
      pointsRef.current.material.opacity = 0.2 + p * 0.5;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#86efac"
        size={0.045}
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default Particles3D;

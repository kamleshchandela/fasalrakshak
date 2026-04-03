import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LEAF_COUNT = 350;

// Cluster leaves around branch tips
const BRANCH_TIPS = [
  [3.6, 5.8, 1.1], [-3.7, 6.2, -0.9], [2.9, 6.8, -1.6],
  [-2.7, 6.5, 1.5], [3.2, 4.8, -0.4], [-3.2, 4.4, 0.6],
  [3.8, 5.6, -0.1], [-3.9, 6.0, 0.4], [3.1, 6.5, -0.2], [-3.0, 6.2, 0.3],
];

const Leaves3D = ({ progressRef }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const leafData = useMemo(() => {
    const data = [];
    for (let i = 0; i < LEAF_COUNT; i++) {
      const tip = BRANCH_TIPS[i % BRANCH_TIPS.length];
      const spread = 1.4 + Math.random() * 0.6;
      data.push({
        baseX: tip[0] + (Math.random() - 0.5) * spread,
        baseY: tip[1] + (Math.random() - 0.5) * spread * 0.7,
        baseZ: tip[2] + (Math.random() - 0.5) * spread,
        rand: Math.random(),
        scale: 0.10 + Math.random() * 0.10,
        rotY: Math.random() * Math.PI * 2,
        color: Math.random(),
      });
    }
    return data;
  }, []);

  // Leaf color gradient: light → dark green
  const colorArray = useMemo(() => {
    const arr = new Float32Array(LEAF_COUNT * 3);
    leafData.forEach((ld, i) => {
      const hue = 0.30 + ld.color * 0.07;
      const sat = 0.7 + ld.color * 0.2;
      const lit = 0.25 + ld.color * 0.20;
      const c = new THREE.Color().setHSL(hue, sat, lit);
      arr[i * 3 + 0] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [leafData]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    const leavesProg = Math.max(0, Math.min(1, (p - 0.72) / 0.20));
    const visibleCount = Math.floor(leavesProg * LEAF_COUNT);

    for (let i = 0; i < LEAF_COUNT; i++) {
      const ld = leafData[i];
      if (i < visibleCount) {
        // Wind sway
        const windX = Math.sin(t * 1.6 + ld.rand * 8) * 0.06;
        const windY = Math.cos(t * 1.2 + ld.rand * 5) * 0.03;
        dummy.position.set(ld.baseX + windX, ld.baseY + windY, ld.baseZ);
        dummy.rotation.set(
          Math.sin(t * 1.8 + ld.rand * 4) * 0.18,
          ld.rotY + t * 0.05 * ld.rand,
          Math.cos(t * 2.0 + ld.rand * 6) * 0.12
        );
        dummy.scale.set(ld.scale, ld.scale * 0.65, ld.scale * 0.1);
      } else {
        dummy.scale.setScalar(0);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Global tree breathe
    if (p > 0.75) {
      const breathe = 1 + Math.sin(t * 0.55) * 0.006;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, LEAF_COUNT]} castShadow>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#22c55e"
        roughness={0.75}
        side={THREE.DoubleSide}
        transparent
        alphaTest={0.05}
      />
    </instancedMesh>
  );
};

export default Leaves3D;

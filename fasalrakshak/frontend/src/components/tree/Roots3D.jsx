import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 9 main roots + sub-roots going downward from seed
const ROOT_PATHS = [
  { pts: [[0,-0.1,0],[0.4,-0.7,0.2],[1.0,-1.4,0.5],[1.8,-2.1,0.7]], delay: 0.000 },
  { pts: [[0,-0.1,0],[-0.5,-0.8,-0.1],[-1.2,-1.5,-0.4],[-2.0,-2.2,-0.6]], delay: 0.020 },
  { pts: [[0,-0.1,0],[0.6,-0.9,-0.4],[1.4,-1.7,-0.9],[2.2,-2.4,-1.2]], delay: 0.015 },
  { pts: [[0,-0.1,0],[-0.3,-0.8,0.5],[-0.6,-1.7,1.0],[-1.1,-2.5,1.4]], delay: 0.025 },
  { pts: [[0,-0.1,0],[0.1,-0.7,0.6],[0.2,-1.6,1.2],[0.4,-2.6,1.7]], delay: 0.010 },
  { pts: [[0,-0.1,0],[-0.1,-0.9,-0.6],[-0.3,-1.8,-1.3],[-0.6,-2.6,-1.9]], delay: 0.030 },
  // sub-roots
  { pts: [[1.0,-1.4,0.5],[1.5,-1.9,0.9],[2.2,-2.4,1.1]], delay: 0.060 },
  { pts: [[1.8,-2.1,0.7],[2.4,-2.5,0.4],[2.9,-3.0,0.2]], delay: 0.075 },
  { pts: [[-1.2,-1.5,-0.4],[-1.8,-2.0,-0.8],[-2.4,-2.6,-0.6]], delay: 0.065 },
  { pts: [[1.4,-1.7,-0.9],[1.9,-2.2,-0.5],[2.5,-2.8,-0.3]], delay: 0.080 },
  { pts: [[-0.6,-1.7,1.0],[-1.2,-2.2,1.3],[-1.8,-2.8,1.0]], delay: 0.070 },
];

const RootLine = ({ pts, delay, progressRef }) => {
  const lineRef = useRef();

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const points = curve.getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    // Roots grow during 0.15 → 0.52
    const rootProg = Math.max(0, Math.min(1, (p - 0.15 - delay) / 0.35));
    geometry.setDrawRange(0, Math.max(1, Math.floor(rootProg * 41)));

    lineRef.current.material.opacity = rootProg * 0.75;

    // Subtle color pulse (life energy)
    const hue = 0.33;
    const light = 0.28 + Math.sin(t * 1.5 + delay * 20) * 0.04;
    lineRef.current.material.color.setHSL(hue, 0.75, light);
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#3d6b45"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </line>
  );
};

const Roots3D = ({ progressRef }) => (
  <group position={[0, -0.15, 0]}>
    {ROOT_PATHS.map((r, i) => (
      <RootLine key={i} pts={r.pts} delay={r.delay} progressRef={progressRef} />
    ))}
  </group>
);

export default Roots3D;

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 6 main branches + 6 secondary branches in 3D space
const BRANCH_DEFS = [
  { pts: [[0,3.2,0],[1.1,3.8,0.3],[2.6,4.8,0.8],[3.6,5.8,1.1]],  delay:0.00, r:0.065 },
  { pts: [[0,3.2,0],[-1.3,4.0,-0.2],[-2.8,5.2,-0.6],[-3.7,6.2,-0.9]], delay:0.02, r:0.060 },
  { pts: [[0,3.0,0],[0.9,4.3,-0.6],[2.1,5.7,-1.2],[2.9,6.8,-1.6]], delay:0.04, r:0.055 },
  { pts: [[0,3.0,0],[-0.8,4.1,0.7],[-1.9,5.4,1.2],[-2.7,6.5,1.5]], delay:0.03, r:0.058 },
  { pts: [[0,2.6,0],[1.6,3.4,0.5],[2.7,4.0,0.1],[3.2,4.8,-0.4]], delay:0.05, r:0.050 },
  { pts: [[0,2.6,0],[-1.1,3.2,-0.5],[-2.6,3.7,0.3],[-3.2,4.4,0.6]], delay:0.06, r:0.048 },
  // secondary
  { pts: [[2.6,4.8,0.8],[3.2,5.1,0.2],[3.8,5.6,-0.1]], delay:0.08, r:0.030 },
  { pts: [[-2.8,5.2,-0.6],[-3.4,5.5,0.2],[-3.9,6.0,0.4]], delay:0.09, r:0.028 },
  { pts: [[2.1,5.7,-1.2],[2.7,6.0,-0.5],[3.1,6.5,-0.2]], delay:0.10, r:0.025 },
  { pts: [[-1.9,5.4,1.2],[-2.5,5.8,0.5],[-3.0,6.2,0.3]], delay:0.10, r:0.025 },
];

const BranchTube = ({ pts, delay, r, progressRef }) => {
  const meshRef = useRef();

  const { curve, geometry } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const geometry = new THREE.TubeGeometry(curve, 24, r, 5, false);
    return { curve, geometry };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    // Branches grow 0.65 → 0.90
    const bProg = Math.max(0, Math.min(1, (p - 0.65 - delay) / 0.22));
    const total = geometry.index ? geometry.index.count : geometry.attributes.position.count;
    geometry.setDrawRange(0, Math.floor(bProg * total));

    meshRef.current.visible = bProg > 0.01;
    meshRef.current.material.opacity = Math.min(1, bProg * 2.5);

    // Wind sway on upper branches
    if (p > 0.70) {
      meshRef.current.rotation.z = Math.sin(t * 0.9 + delay * 8) * 0.018;
      meshRef.current.rotation.x = Math.cos(t * 0.7 + delay * 6) * 0.010;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} visible={false}>
      <meshStandardMaterial
        color="#4a3023"
        roughness={0.88}
        metalness={0.05}
        transparent
        opacity={0}
      />
    </mesh>
  );
};

const Tree3D = ({ progressRef }) => {
  const trunkRef = useRef();

  // Trunk curve: seed → sky
  const { trunkCurve, trunkGeom } = useMemo(() => {
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0,  -0.2, 0),
      new THREE.Vector3(0.06, 0.7, 0.02),
      new THREE.Vector3(-0.05, 1.5, -0.03),
      new THREE.Vector3(0.07, 2.3, 0.05),
      new THREE.Vector3(0,  3.3, 0),
    ]);
    const trunkGeom = new THREE.TubeGeometry(trunkCurve, 24, 0.13, 8, false);
    return { trunkCurve, trunkGeom };
  }, []);

  useFrame((state) => {
    if (!trunkRef.current) return;
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    // Trunk grows 0.50 → 0.68
    const tProg = Math.max(0, Math.min(1, (p - 0.50) / 0.18));
    const total = trunkGeom.index ? trunkGeom.index.count : trunkGeom.attributes.position.count;
    trunkGeom.setDrawRange(0, Math.floor(tProg * total));
    trunkRef.current.visible = tProg > 0.01;
    trunkRef.current.material.opacity = Math.min(1, tProg * 3);

    // Breathe
    if (p > 0.65) {
      const breathe = 1 + Math.sin(t * 0.6) * 0.004;
      trunkRef.current.scale.setScalar(breathe);
      trunkRef.current.rotation.z = Math.sin(t * 0.8) * 0.008;
    }
  });

  return (
    <group>
      {/* Trunk */}
      <mesh ref={trunkRef} geometry={trunkGeom} visible={false}>
        <meshStandardMaterial
          color="#5c3d22"
          roughness={0.90}
          metalness={0.04}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Ground soil disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#1a2e1a" roughness={0.95} />
      </mesh>

      {/* Branches */}
      {BRANCH_DEFS.map((b, i) => (
        <BranchTube key={i} {...b} progressRef={progressRef} />
      ))}
    </group>
  );
};

export default Tree3D;

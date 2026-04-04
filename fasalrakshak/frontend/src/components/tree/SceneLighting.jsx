import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SceneLighting = ({ progressRef }) => {
  const dirRef = useRef();
  const ambRef = useRef();
  const pointRef = useRef();

  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    if (ambRef.current) {
      ambRef.current.intensity = 0.15 + p * 0.7;
    }
    if (dirRef.current) {
      dirRef.current.intensity = 0.4 + p * 2.2 + Math.sin(t * 2.5) * 0.04;
    }
    if (pointRef.current) {
      pointRef.current.intensity = p > 0.48 ? Math.min(3, (p - 0.48) * 6) : 0;
      pointRef.current.position.y = 0.5 + p * 7;
    }
  });

  return (
    <>
      <ambientLight ref={ambRef} color="#a7f3d0" intensity={0.15} />
      <directionalLight
        ref={dirRef}
        position={[3, 10, 5]}
        color="#ecfdf5"
        intensity={0.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        ref={pointRef}
        position={[0, 0.5, 1]}
        color="#4ade80"
        intensity={0}
        distance={10}
        decay={2}
      />
      {/* God-ray spotlight */}
      <spotLight
        position={[0.5, 14, 2]}
        angle={0.25}
        penumbra={0.8}
        intensity={0.6}
        color="#bbf7d0"
        target-position={[0, 0, 0]}
      />
      {/* Warm fill from front-left */}
      <directionalLight position={[-4, 3, 6]} color="#86efac" intensity={0.3} />
    </>
  );
};

export default SceneLighting;

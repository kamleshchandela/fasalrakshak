import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Keyframe path: [progress, cameraX, cameraY, cameraZ, targetX, targetY, targetZ]
const KEYFRAMES = [
  { p: 0.00, cam: [0, 0.3, 5.0], look: [0, 0.0, 0] },
  { p: 0.14, cam: [0, 0.2, 4.5], look: [0, 0.0, 0] },   // seed close-up
  { p: 0.25, cam: [0.4, -0.2, 5.0], look: [0.2, -0.3, 0] }, // germination
  { p: 0.45, cam: [0.5, -1.2, 5.5], look: [0, -2.0, 0] }, // roots — tilt down
  { p: 0.55, cam: [0, 0.5, 5.2],  look: [0, 0.5, 0] },   // stem base
  { p: 0.68, cam: [0.3, 2.0, 5.5], look: [0, 2.0, 0] },  // following stem up
  { p: 0.82, cam: [1.0, 3.2, 7.5], look: [0, 3.0, 0] },  // branches forming
  { p: 0.92, cam: [1.5, 3.8, 9.0], look: [0, 3.2, 0] },  // full tree
  { p: 1.00, cam: [2.0, 4.2, 9.5], look: [0, 3.5, 0] },  // slight pull-back
];

const lerp = (a, b, t) => a + (b - a) * t;
const lerpArr = (a, b, t) => a.map((v, i) => lerp(v, b[i], t));

function getCameraState(progress) {
  const keys = KEYFRAMES;
  let lo = keys[0], hi = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) {
    if (progress >= keys[i].p && progress <= keys[i + 1].p) {
      lo = keys[i]; hi = keys[i + 1];
      break;
    }
  }
  const span = hi.p - lo.p;
  const t = span > 0 ? (progress - lo.p) / span : 1;
  // Ease in-out
  const et = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  return {
    cam: lerpArr(lo.cam, hi.cam, et),
    look: lerpArr(lo.look, hi.look, et),
  };
}

const CameraRig = ({ progressRef }) => {
  const { camera } = useThree();
  const curCam = useRef([0, 0.3, 5.0]);
  const curLook = useRef([0, 0.0, 0]);

  useFrame(() => {
    const p = progressRef.current;
    const { cam, look } = getCameraState(p);

    // Very smooth lerp (cinematic feel)
    const SPEED = 0.035;
    curCam.current = lerpArr(curCam.current, cam, SPEED);
    curLook.current = lerpArr(curLook.current, look, SPEED);

    camera.position.set(...curCam.current);
    camera.lookAt(...curLook.current);
  });

  return null;
};

export default CameraRig;

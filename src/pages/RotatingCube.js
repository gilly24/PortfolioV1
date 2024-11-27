import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const RotatingCube = () => {
  const cubeRef = useRef(); // Reference to the cube mesh

  // Animate the cube's rotation
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01; // Slow rotation on the X-axis
      cubeRef.current.rotation.y += 0.01; // Slow rotation on the Y-axis
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#7f5dff" roughness={0.5} metalness={0.7} />
    </mesh>
  );
};

export default RotatingCube;

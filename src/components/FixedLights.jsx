// FixedLights.jsx
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function FixedLights() {
  const group = useRef();

  // Luči naj NE sledijo kameri
  useFrame(({ camera }) => {
    if (group.current) {
      group.current.position.copy(camera.position);
      group.current.rotation.copy(camera.rotation);
    }
  });

  return (
    <group ref={group}>
      {/* Glavna sprednja luč */}
      <directionalLight
        position={[0, 0, 2]}
        intensity={1.2}
        color={'#ffffff'}
        castShadow={false}
      />

      {/* Desna fill luč */}
      <directionalLight
        position={[1.5, 0.5, 1.5]}
        intensity={0.9}
        color={'#ffffff'}
        castShadow={false}
      />
      {/* Right-side soft fill (osvetli desni temnejši del škatle) */}
      <directionalLight
      position={[1.8, 0.3, 1.2]}   // desno + rahlo spredaj
      intensity={0.65}             // dovolj močno, a ne preveč
      color={'#ffffff'}
      castShadow={false}
      />



      {/* Levi soft fill */}
      <directionalLight
        position={[-1.5, 0.5, 1.5]}
        intensity={0.6}
        color={'#ffffff'}
        castShadow={false}
      />

      {/* Top light (soft) */}
      <directionalLight
        position={[0, 2.5, 1]}
        intensity={0.5}
        color={'#ffffff'}
        castShadow={false}
      />
    </group>
  );
}
// -------------------------------------------------------------
// File: src/box/ConfiguratorScene.jsx
// Updated with clean animation system via BoxAnimator.js
// -------------------------------------------------------------
import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

import HingedPanel from './base/HingedPanel.jsx';
import LidGroup from './lid/LidGroup.jsx';
import Figurine from './figurines/Figurine.jsx';
import FigurineDragRotation from './figurines/FigurineDragRotation.jsx';
import PaperInset from './paper/PaperInset.jsx';
import FixedLights from '../core/lighting/FixedLights.jsx';
import { useBoxAnimator } from '../core/animation/BoxAnimator.js';

import { BOX_SIZE, WALL_THICKNESS, ANIM, EPS, PAPER_INSET, CARDBOARD_COLOR } 
  from '../constants.js';

export default function Scene({ papers, figurineUrl }) {

  // Central animation controller -------------------------------------
  const {
    lidSpring,
    wallsSpring,
    open,
    close,
    reset
  } = useBoxAnimator(ANIM);

  // Attach DOM events -------------------------------------------------
  useEffect(() => {
    document.addEventListener("open-box", open);
    document.addEventListener("close-box", close);
    document.addEventListener("reset-box", reset);

    return () => {
      document.removeEventListener("open-box", open);
      document.removeEventListener("close-box", close);
      document.removeEventListener("reset-box", reset);
    };
  }, [open, close, reset]);

  // -------------------------------------------------------------------
  // Scene Rendering
  // -------------------------------------------------------------------
  return (
    <Canvas
      gl={(renderer) => {
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }}
      camera={{ position: [0.28, 0.22, 0.38], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      onPointerMissed={() => {
        const state = window.__r3f?.root?.getState?.();
        const controls = state?.controls;
        if (controls) controls.enabled = true;
      }}
    >
      {/* Ambient + hemisphere light */}
      <ambientLight intensity={0.35} />
      <hemisphereLight
        intensity={0.25}
        skyColor={"#ffffff"}
        groundColor={"#f0eee9"}
      />

      {/* Directional / key lights */}
      <directionalLight
        position={[0, 3, 1.0, 0.4]}
        intensity={2.4}
        castShadow={false}
      />
      <directionalLight
        position={[-0.3, 0.4, -0.4]}
        intensity={0.35}
        castShadow={false}
      />
      <directionalLight
        position={[0, 0.5, -0.5]}
        intensity={0.25}
        castShadow={false}
      />
      <directionalLight
        position={[0.9, 0.4, 1.2]}
        intensity={0.85}
        color={"#ffffff"}
        castShadow={false}
      />
      <directionalLight
        position={[0, 1, 0]}
        intensity={3.0}
        castShadow={false}
      />

      <FixedLights />

      <OrbitControls makeDefault enableDamping dampingFactor={0.1} />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.18}
        scale={1.2}
        blur={2.2}
        far={0.6}
        frames={1}
      />

      {/* Box bottom */}
      <group position={[0, WALL_THICKNESS / 2, 0]}>
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[BOX_SIZE, WALL_THICKNESS, BOX_SIZE]} />
          <meshStandardMaterial
            color={CARDBOARD_COLOR}
            roughness={0.45}
            metalness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Inside base */}
        {papers?.innerBase && (
          <PaperInset
            url={papers.innerBase}
            size={[BOX_SIZE, BOX_SIZE]}
            position={[0, WALL_THICKNESS / 2 + EPS, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit={true}
          />
        )}

        {/* Outside base */}
        {papers?.outerBase && (
          <PaperInset
            url={papers.outerBase}
            size={[BOX_SIZE, BOX_SIZE]}
            position={[0, -WALL_THICKNESS / 2 - EPS, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit={true}
          />
        )}
      </group>

      {/* Four walls */}
      <HingedPanel side="front" spring={wallsSpring} papers={papers} />
      <HingedPanel side="back" spring={wallsSpring} papers={papers} />
      <HingedPanel side="left" spring={wallsSpring} papers={papers} />
      <HingedPanel side="right" spring={wallsSpring} papers={papers} />

      {/* Lid */}
      <LidGroup spring={lidSpring} papers={papers} />

      {/* Figurine */}
      <FigurineDragRotation>
        <Figurine url={figurineUrl} />
      </FigurineDragRotation>
    </Canvas>
  );
}
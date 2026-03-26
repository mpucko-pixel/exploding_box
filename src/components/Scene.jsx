import * as THREE from 'three'
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { useSpring } from '@react-spring/three';

import HingedPanel from './HingedPanel.jsx';
import LidGroup from './LidGroup.jsx';
import FigurineDragRotation from './FigurineDragRotation.jsx';
import Figurine from './Figurine.jsx';
import PaperInset from './PaperInset.jsx';
import FixedLights from './FixedLights.jsx';

import {
  BOX_SIZE,
  WALL_THICKNESS,
  ANIM,
  EPS,
  PAPER_INSET,
  CARDBOARD_COLOR
} from '../constants.js';

export default function Scene({ papers, textures, figurineUrl }) {
  // Sekvenčne animacije
  const [lidSpring, lidApi] = useSpring(() => ({
    open: 0,
    config: { duration: ANIM.lid * 1000 },
  }));

  const [wallsSpring, wallsApi] = useSpring(() => ({
    open: 0,
    config: { duration: ANIM.walls * 1000 },
  }));

  useEffect(() => {
    const open = async () => { await lidApi.start({ open: 1 }); await wallsApi.start({ open: 1 }); };
    const close = async () => { await wallsApi.start({ open: 0 }); await lidApi.start({ open: 0 }); };
    const reset = async () => { await wallsApi.start({ open: 0, immediate: true }); await lidApi.start({ open: 0, immediate: true }); };
    document.addEventListener('open-box', open);
    document.addEventListener('close-box', close);
    document.addEventListener('reset-box', reset);
    return () => {
      document.removeEventListener('open-box', open);
      document.removeEventListener('close-box', close);
      document.removeEventListener('reset-box', reset);
    };
  }, [lidApi, wallsApi]);

  return (
    <Canvas
      // Transparenten Canvas → vidiš CSS gradient ozadje (styles.css)
      gl={(renderer) => {
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      }}
      camera={{ position: [0.28, 0.22, 0.38], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      onPointerMissed={() => {
        const state = window.__r3f?.root?.getState?.();
        const controls = state?.controls;
        if (controls) controls.enabled = true;
      }}
    >
      {/* Ozadje pustimo transparentno (Canvas → CSS gradient) */}
      {/* <color attach="background" args={['#ffffff']} /> */}

      {/* 1) Global ambient fill */}
      {/* REALISTIC 3D PRODUCT LIGHTING — Pastel D3 */}

      <ambientLight intensity={0.35} />

      {/* Sky/Ground dome – mehka difuzija, a ne “pere” kontrasta */}
      <hemisphereLight
        intensity={0.25}
        skyColor={'#ffffff'}
        groundColor={'#f0eee9'} 
      />

      {/* Key light – glavna “volumenska” luč */}
      <directionalLight
        position={[0,3, 1.0, 0.4]}   // 40 cm x 60 cm x 50 cm
        intensity={2.4}
        castShadow={false}
      />

      {/* Fill light – z druge strani, da robovi niso pretemni */}
      <directionalLight
        position={[-0.3, 0.4, -0.4]}
        intensity={0.35}
        castShadow={false}
      />

      {/* Rim light – nežna kontura zadaj, doda “3D pop” */}
      <directionalLight
        position={[0, 0.5, -0.5]}
        intensity={0.25}
        castShadow={false}
      />

      {/* Front-fill light – posvetli sprednjo stranico in poveča belino */}
      <directionalLight
        position={[0.9, 0.4, 1.2]}
        intensity={0.85}
        castShadow={false}
        color={'#ffffff'}
      />
      <directionalLight position={[0,1,0]} intensity={3.0} /> 
      <FixedLights />
      <OrbitControls makeDefault enableDamping dampingFactor={0.1} />

      {/* Soft contact AO – zelo hiter, močno pomaga občutku volumna */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.18}
        scale={1.2}
        blur={2.2}
        far={0.6}
        frames={1}
      />

      {/* (Neobvezno) talna plošča scene — če želiš, jo pusti ali odstrani */}
      {/*<mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial color={'#f3f3f3'} roughness={1} metalness={0} />
      </mesh>*/}

      {/* Dno škatle (karton lit) + nalepki dna */}
      <group position={[0, WALL_THICKNESS / 2, 0]}>
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[BOX_SIZE, WALL_THICKNESS, BOX_SIZE]} />
          <meshStandardMaterial
            color={CARDBOARD_COLOR}  // v constants.js = '#ffffff'
            roughness={0.45}        // 0.55 = realen karton s svetlobnim prehodom
            metalness={0.15}        // doda svetlobni “edge highlight”
            envMapIntensity={1.5}  // doda mehko pastelno refleksijo (brez bleščanja)
            flatShading={false}
          />
        </mesh>

        {/* NOTRANJE dno – gleda gor (+Y) */}
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

        {/* ZUNANJE dno – gleda dol (−Y) */}
        {papers?.outerBase && (
          <PaperInset
            url={papers.outerBase}
            size={[BOX_SIZE, BOX_SIZE]}
            position={[0, -WALL_THICKNESS / 2 - EPS, 0]}
            rotation={[+Math.PI / 2, 0, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit={true}
          />
        )}
      </group>

      {/* Stranice osnove */}
      <HingedPanel side="front" spring={wallsSpring} papers={papers} />
      <HingedPanel side="back"  spring={wallsSpring} papers={papers} />
      <HingedPanel side="left"  spring={wallsSpring} papers={papers} />
      <HingedPanel side="right" spring={wallsSpring} papers={papers} />

      {/* Pokrov */}
      <LidGroup spring={lidSpring} papers={papers} />

      {/* Figurina (po potrebi) */}
      <FigurineDragRotation>
        <Figurine url={figurineUrl} />
      </FigurineDragRotation>
    </Canvas>
  );
}
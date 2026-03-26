import React from 'react';
import { a } from '@react-spring/three';
import {
  BOX_SIZE,
  LID_SIZE,
  LID_OVERLAP,
  WALL_THICKNESS,
  EPS,
  PAPER_INSET,
  CARDBOARD_COLOR
} from '../constants.js';
import PaperInset from './PaperInset.jsx';

export default function LidGroup({ spring, papers }) {
  const tTop = WALL_THICKNESS;   // debelina plošče
  const hSide = LID_OVERLAP;     // višina stranic (29 mm)
  const boxTopY = WALL_THICKNESS + BOX_SIZE;

  const closedCenterY = boxTopY + (tTop - hSide) / 2;
  const groupPos = spring.open.to((o) => [0, closedCenterY + o * 0.05, 0]);

  const halfX = LID_SIZE[0] / 2;
  const halfZ = LID_SIZE[2] / 2;

  const topPlateY = +hSide / 2;
  const sidesY    = -tTop  / 2;

  return (
    <a.group position={groupPos}>
      {/* Plošča pokrova – karton (LIT) */}
      <mesh castShadow={false} receiveShadow={false} position={[0, topPlateY, 0]}>
        <boxGeometry args={[LID_SIZE[0], tTop, LID_SIZE[2]]} />
        <meshStandardMaterial
          color={CARDBOARD_COLOR}  // v constants.js = '#ffffff'
          roughness={0.45}        // 0.55 = realen karton s svetlobnim prehodom
          metalness={0.15}        // doda svetlobni “edge highlight”
          envMapIntensity={1.5}  // doda mehko pastelno refleksijo (brez bleščanja)
          flatShading={false}
        />
      </mesh>

      {/* 4 kartonske stranice pokrova – (LIT) */}
      <mesh castShadow={false} receiveShadow={false} position={[0, sidesY, -(halfZ - WALL_THICKNESS / 2)]}>
        <boxGeometry args={[LID_SIZE[0], hSide, WALL_THICKNESS]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} envMapIntensity={0} flatShading={false} />
      </mesh>
      <mesh castShadow={false} receiveShadow={false} position={[0, sidesY, +(halfZ - WALL_THICKNESS / 2)]}>
        <boxGeometry args={[LID_SIZE[0], hSide, WALL_THICKNESS]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} envMapIntensity={0} flatShading={false} />
      </mesh>
      <mesh castShadow={false} receiveShadow={false} position={[-(halfX - WALL_THICKNESS / 2), sidesY, 0]}>
        <boxGeometry args={[WALL_THICKNESS, hSide, LID_SIZE[2]]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} envMapIntensity={0} flatShading={false} />
      </mesh>
      <mesh castShadow={false} receiveShadow={false} position={[+(halfX - WALL_THICKNESS / 2), sidesY, 0]}>
        <boxGeometry args={[WALL_THICKNESS, hSide, LID_SIZE[2]]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} envMapIntensity={0} flatShading={false} />
      </mesh>

      {/* Papir – vrh */}
      {papers?.lidTop && (
        <PaperInset
          url={papers.lidTop}
          size={[LID_SIZE[0], LID_SIZE[2]]}
          position={[0, topPlateY + tTop / 2 + EPS, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          inset={PAPER_INSET}
          mode="tileBase"
          unlit={true}
          doubleSided={true}
        />
      )}

      {/* Papir – 4 stranice */}
      {papers?.lidSides && (
        <>
          <PaperInset url={papers.lidSides} size={[LID_SIZE[0], hSide]}
            position={[0, sidesY, -(halfZ + EPS)]} rotation={[0, Math.PI, 0]}
            inset={PAPER_INSET} mode="tileBase" unlit={true} doubleSided={true} />
          <PaperInset url={papers.lidSides} size={[LID_SIZE[0], hSide]}
            position={[0, sidesY, +(halfZ + EPS)]} rotation={[0, 0, 0]}
            inset={PAPER_INSET} mode="tileBase" unlit={true} doubleSided={true} />
          <PaperInset url={papers.lidSides} size={[LID_SIZE[2], hSide]}
            position={[-(halfX + EPS), sidesY, 0]} rotation={[0,  Math.PI / 2, 0]}
            inset={PAPER_INSET} mode="tileBase" unlit={true} doubleSided={true} />
          <PaperInset url={papers.lidSides} size={[LID_SIZE[2], hSide]}
            position={[ +(halfX + EPS), sidesY, 0]} rotation={[0, -Math.PI / 2, 0]}
            inset={PAPER_INSET} mode="tileBase" unlit={true} doubleSided={true} />
        </>
      )}
    </a.group>
  );
}
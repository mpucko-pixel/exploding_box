// src/box/lid/LidGroup.jsx
import React from "react";
import { a } from "@react-spring/three";

import {
  BOX_SIZE,
  WALL_THICKNESS,
  EPS,
  PAPER_INSET,
  LID_OVERLAP,
  LID_SIZE,
  CARDBOARD_COLOR,
} from "../../constants.js";

import PaperInset from "../paper/PaperInset.jsx";

export default function LidGroup({ spring, papers }) {
  const tTop = WALL_THICKNESS;     // thickness of lid top plate
  const hSide = LID_OVERLAP;       // height of lid side walls
  const boxTopY = WALL_THICKNESS + BOX_SIZE;

  // vertical center of lid when closed
  const closedCenterY = boxTopY + (tTop - hSide) / 2;

  // smooth float-up animation using spring
  const groupPos = spring.open.to((o) => [0, closedCenterY + o * 0.05, 0]);

  const halfX = LID_SIZE[0] / 2;
  const halfZ = LID_SIZE[2] / 2;

  const topPlateY = hSide / 2; // lid top plate center
  const sidesY = -tTop / 2;    // side walls sit below top plate

  return (
    <a.group position={groupPos}>

      {/* Lid Top Plate (Cardboard) */}
      <mesh castShadow={false} receiveShadow={false} position={[0, topPlateY, 0]}>
        <boxGeometry args={[LID_SIZE[0], tTop, LID_SIZE[2]]} />
        <meshStandardMaterial
          color={CARDBOARD_COLOR}
          roughness={0.45}
          metalness={0.15}
          envMapIntensity={1.5}
          flatShading={false}
        />
      </mesh>

      {/* 4 Lid Side Walls */}
      {/* Front */}
      <mesh position={[0, sidesY, -(halfZ - WALL_THICKNESS / 2)]}>
        <boxGeometry args={[LID_SIZE[0], hSide, WALL_THICKNESS]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} />
      </mesh>

      {/* Back */}
      <mesh position={[0, sidesY, +(halfZ - WALL_THICKNESS / 2)]}>
        <boxGeometry args={[LID_SIZE[0], hSide, WALL_THICKNESS]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} />
      </mesh>

      {/* Left */}
      <mesh position={[-(halfX - WALL_THICKNESS / 2), sidesY, 0]}>
        <boxGeometry args={[WALL_THICKNESS, hSide, LID_SIZE[2]]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} />
      </mesh>

      {/* Right */}
      <mesh position={[+(halfX - WALL_THICKNESS / 2), sidesY, 0]}>
        <boxGeometry args={[WALL_THICKNESS, hSide, LID_SIZE[2]]} />
        <meshStandardMaterial color={CARDBOARD_COLOR} roughness={1} metalness={0} />
      </mesh>

      {/* PAPER — TOP */}
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

      {/* PAPER — SIDE WALLS */}
      {papers?.lidSides && (
        <>
          {/* Front */}
          <PaperInset
            url={papers.lidSides}
            size={[LID_SIZE[0], hSide]}
            position={[0, sidesY, -(halfZ + EPS)]}
            rotation={[0, Math.PI, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit
            doubleSided
          />

          {/* Back */}
          <PaperInset
            url={papers.lidSides}
            size={[LID_SIZE[0], hSide]}
            position={[0, sidesY, +(halfZ + EPS)]}
            rotation={[0, 0, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit
            doubleSided
          />

          {/* Left */}
          <PaperInset
            url={papers.lidSides}
            size={[LID_SIZE[2], hSide]}
            position={[-(halfX + EPS), sidesY, 0]}
            rotation={[0, Math.PI / 2, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit
            doubleSided
          />

          {/* Right */}
          <PaperInset
            url={papers.lidSides}
            size={[LID_SIZE[2], hSide]}
            position={[+(halfX + EPS), sidesY, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit
            doubleSided
          />
        </>
      )}
    </a.group>
  );
}
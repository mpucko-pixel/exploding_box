// src/box/base/HingedPanel.jsx
import React, { useMemo } from "react";
import { a } from "@react-spring/three";

import {
  BOX_SIZE,
  WALL_THICKNESS,
  EPS,
  PAPER_INSET,
  CARDBOARD_COLOR,
} from "../../constants.js";

import PaperInset from "../paper/PaperInset.jsx";

export default function HingedPanel({ side, spring, papers }) {
  const h = BOX_SIZE / 2;

  // Pivot position (hinge)
  const pivot = useMemo(() => {
    switch (side) {
      case "front": return [0, WALL_THICKNESS, -h];
      case "back": return [0, WALL_THICKNESS, +h];
      case "left": return [-h, WALL_THICKNESS, 0];
      case "right": return [h, WALL_THICKNESS, 0];
      default: return [0, WALL_THICKNESS, -h];
    }
  }, [side, h]);

  // Rotation animation
  const rotation = spring.open.to((o) => {
    const a = (Math.PI / 2) * o;
    switch (side) {
      case "front": return [-a, 0, 0];
      case "back": return [a, 0, 0];
      case "left": return [0, 0, a];
      case "right": return [0, 0, -a];
      default: return [0, 0, 0];
    }
  });

  // Center of panel geometry
  const center = useMemo(() => {
    switch (side) {
      case "front": return [0, BOX_SIZE / 2, -WALL_THICKNESS / 2];
      case "back":  return [0, BOX_SIZE / 2, WALL_THICKNESS / 2];
      case "left":  return [-WALL_THICKNESS / 2, BOX_SIZE / 2, 0];
      case "right": return [WALL_THICKNESS / 2, BOX_SIZE / 2, 0];
      default: return [0, BOX_SIZE / 2, -WALL_THICKNESS / 2];
    }
  }, [side]);

  // Box geometry dims
  const dims = useMemo(() => {
    if (side === "left" || side === "right")
      return [WALL_THICKNESS, BOX_SIZE, BOX_SIZE];
    return [BOX_SIZE, BOX_SIZE, WALL_THICKNESS];
  }, [side]);

  // Outer paper positioning (front-facing)
  const outerCfg = useMemo(() => {
    switch (side) {
      case "front": return { pos: [0, 0, -(WALL_THICKNESS / 2 + EPS)], rot: [0, Math.PI, 0] };
      case "back":  return { pos: [0, 0,  +(WALL_THICKNESS / 2 + EPS)], rot: [0, 0, 0] };
      case "left":  return { pos: [-(WALL_THICKNESS / 2 + EPS), 0, 0], rot: [0, -Math.PI / 2, 0] };
      case "right": return { pos: [ +(WALL_THICKNESS / 2 + EPS), 0, 0], rot: [0, Math.PI / 2, 0] };
      default: return { pos: [0, 0, 0], rot: [0, 0, 0] };
    }
  }, [side]);

  // Inner paper positioning
  const innerCfg = useMemo(() => {
    switch (side) {
      case "front": return { pos: [0, 0, +(WALL_THICKNESS / 2 + EPS)], rot: [0, 0, 0] };
      case "back":  return { pos: [0, 0, -(WALL_THICKNESS / 2 + EPS)], rot: [0, Math.PI, 0] };
      case "left":  return { pos: [ +(WALL_THICKNESS / 2 + EPS), 0, 0], rot: [0, Math.PI / 2, 0] };
      case "right": return { pos: [ -(WALL_THICKNESS / 2 + EPS), 0, 0], rot: [0, -Math.PI / 2, 0] };
      default: return { pos: [0, 0, 0], rot: [0, 0, 0] };
    }
  }, [side]);

  return (
    <a.group position={pivot} rotation={rotation}>
      <group position={center}>

        {/* Cardboard wall */}
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={dims} />
          <meshStandardMaterial
            color={CARDBOARD_COLOR}
            roughness={0.45}
            metalness={0.15}
            envMapIntensity={1.5}
            flatShading={false}
          />
        </mesh>

        {/* Outer paper */}
        {papers?.outerBase && (
          <PaperInset
            url={papers.outerBase}
            size={[BOX_SIZE, BOX_SIZE]}
            position={outerCfg.pos}
            rotation={outerCfg.rot}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit={true}
          />
        )}

        {/* Inner paper */}
        {papers?.innerBase && (
          <PaperInset
            url={papers.innerBase}
            size={[BOX_SIZE, BOX_SIZE]}
            position={innerCfg.pos}
            rotation={innerCfg.rot}
            inset={PAPER_INSET}
            mode="tileBase"
            unlit={true}
          />
        )}
      </group>
    </a.group>
  );
}
// src/box/decor/DecorativeLayer.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

import { loadCachedTexture } from "../../core/utils/textureCache.js";
import { BOX_SIZE, LID_SIZE } from "../../constants.js";

export default function DecorativeLayer({ side, textures }) {
  // Determine texture URL based on the side
  const url = useMemo(() => {
    if (side === "front") return textures?.front ?? textures?.outer ?? null;
    if (side === "back") return textures?.back ?? textures?.outer ?? null;
    if (side === "left") return textures?.left ?? textures?.inner ?? textures?.outer ?? null;
    if (side === "right") return textures?.right ?? textures?.inner ?? textures?.outer ?? null;

    if (side === "lid") {
      return (
        textures?.lidTop ??
        textures?.lid ??
        textures?.top ??
        textures?.outer ??
        textures?.front ??
        null
      );
    }

    return null;
  }, [side, textures]);

  // Load texture
  const tex = useMemo(() => {
    if (!url) return null;

    const t = loadCachedTexture(url);
    if (!t) return null;

    // Ensure correct color space & filtering
    if ("colorSpace" in t) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;

    return t;
  }, [url]);

  if (!tex) return null;

  // Surface size
  const size = side === "lid" ? [LID_SIZE[0], LID_SIZE[2]] : [BOX_SIZE, BOX_SIZE];

  // Plane rotation
  const rotation = useMemo(() => {
    switch (side) {
      case "front": return [0, Math.PI, 0];
      case "back": return [0, 0, 0];
      case "left": return [0, -Math.PI / 2, 0];
      case "right": return [0, Math.PI / 2, 0];
      case "lid": return [-Math.PI / 2, 0, 0];
      default: return [0, 0, 0];
    }
  }, [side]);

  return (
    <mesh rotation={rotation} key={String(url)}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={tex}
        side={THREE.DoubleSide}
        transparent={false}
        toneMapped={true}
      />
    </mesh>
  );
}
``
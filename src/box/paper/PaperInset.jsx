// src/box/paper/PaperInset.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

import { loadCachedTexture } from "../../core/utils/textureCache.js";
import { PAPER_INSET, PAPER_TILE_BASE } from "../../constants.js";

/**
 * PaperInset — Paper decal layer with 3 mapping modes:
 * fit, tileSquare, tileBase
 */
export default function PaperInset({
  url,
  size,
  inset = PAPER_INSET,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  unlit = true,
  doubleSided = false,
  mode = "fit",
  tileBase = PAPER_TILE_BASE,
  tileLockSquare = true,
}) {
  // Load + clone texture
  const tex = useMemo(() => {
    if (!url) return null;

    const src = loadCachedTexture(url);
    if (!src || !src.image) return null;

    const t = src.clone();
    t.image = src.image;
    t.needsUpdate = true;

    if ("colorSpace" in t) t.colorSpace = THREE.SRGBColorSpace;
    else t.encoding = THREE.sRGBEncoding;

    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 8;
    t.generateMipmaps = true;

    return t;
  }, [url]);

  if (!tex) return null;

  // Inset size
  const w = Math.max(1e-6, size[0] - 2 * inset);
  const h = Math.max(1e-6, size[1] - 2 * inset);

  // Mapping modes
  if (mode === "tileBase") {
    const imgW = tex.image?.width || 1;
    const imgH = tex.image?.height || 1;
    const imgAspect = imgH / imgW;

    const baseX = tileBase;
    const baseY = tileLockSquare ? tileBase : tileBase * imgAspect;

    const repeatX = Math.max(1e-6, w / baseX);
    const repeatY = Math.max(1e-6, h / baseY);

    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
  } else if (mode === "tileSquare") {
    const s = Math.min(w, h);
    const repeatX = Math.max(1e-6, w / s);
    const repeatY = Math.max(1e-6, h / s);

    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
  } else {
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
  }

  tex.needsUpdate = true;

  return (
    <mesh rotation={rotation} position={position}>
      <planeGeometry args={[w, h]} />

      {unlit ? (
        <meshBasicMaterial
          map={tex}
          side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
        />
      ) : (
        <meshStandardMaterial
          map={tex}
          roughness={1}
          metalness={0}
          side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
        />
      )}
    </mesh>
  );
}
// src/box/paper/PaperInset.jsx

import React, { useMemo } from "react";
import * as THREE from "three";

import { loadCachedTexture } from "../../core/utils/textureCache.js";
import { PAPER_INSET, PAPER_TILE_BASE } from "../../constants.js";

/**
 * PaperInset
 * ----------
 * A “paper sticker” inset system with 3 mapping modes:
 *
 * - mode="fit"         → stretch to fill (may distort)
 * - mode="tileSquare"  → repeat with uniform tile scaling
 * - mode="tileBase"    → repeat based on real‑world units (consistent pattern size)
 *
 * tileBase = world‑space size of one tile (meters; e.g. 0.02 = 20 mm)
 * tileLockSquare = keep tiles square; otherwise use aspect ratio of image
 */
export default function PaperInset({
  url,
  size,                  // [width, height] in meters before inset
  inset = PAPER_INSET,   // 2 mm
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  unlit = true,
  doubleSided = false,
  mode = "fit",          // "fit" | "tileSquare" | "tileBase"
  tileBase = PAPER_TILE_BASE,
  tileLockSquare = true,
}) {

  /**
   * Load + clone texture (clone prevents modifying shared cache)
   */
  const tex = useMemo(() => {
    if (!url) return null;

    const src = loadCachedTexture(url);
    if (!src || !src.image) return null;

    // Clone cached texture instance to safely modify repeat/wrap
    const t = src.clone();
    t.image = src.image;
    t.needsUpdate = true;

    // Use SRGB color space (Three r160+)
    if ("colorSpace" in t) t.colorSpace = THREE.SRGBColorSpace;
    else t.encoding = THREE.sRGBEncoding;

    // Filtering / sampling
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 8;
    t.generateMipmaps = true;

    return t;
  }, [url]);

  if (!tex) return null;

  // Final paper dimensions with inset
  const w = Math.max(1e-6, size[0] - 2 * inset);
  const h = Math.max(1e-6, size[1] - 2 * inset);

  //---------------------------------------------------------------------------
  // TEXTURE MAPPING MODES
  //---------------------------------------------------------------------------

  if (mode === "tileBase") {
    // Consistent world‑space pattern size
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
    tex.needsUpdate = true;

  } else if (mode === "tileSquare") {
    // Maintain identical tile scale on both axes
    const shortest = Math.min(w, h);
    const repeatX = Math.max(1e-6, w / shortest);
    const repeatY = Math.max(1e-6, h / shortest);

    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.needsUpdate = true;

  } else {
    // FIT (no repetition)
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.needsUpdate = true;
  }

  //---------------------------------------------------------------------------
  // RENDER
  //---------------------------------------------------------------------------

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
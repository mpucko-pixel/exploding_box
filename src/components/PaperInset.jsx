// src/components/PaperInset.jsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { loadCachedTexture } from '../textureCache.js';
import { PAPER_INSET, PAPER_TILE_BASE } from '../constants.js';

/**
 * PaperInset
 * ----------
 * "Nalepka" z inset robom in tremi načini mapiranja:
 *  - mode="fit"        → sliko raztegne na ploskev (lahko popači motiv)
 *  - mode="tileSquare" → ponavlja motiv z enakim merilom v X in Y (pike ostanejo okrogle)
 *  - mode="tileBase"   → ponavlja motiv po fiksni svetovni osnovi (tileBase v metrih),
 *                        tako da je velikost motiva konsistentna na vseh ploskvah
 *
 * Za tileBase:
 *  - tileBase = širina enega "tile-a" v svetu (npr. 0.02 m = 20 mm)
 *  - tileLockSquare: če je true, je "tile" kvadraten (enaka mm skala po X in Y);
 *                    če je false, prilagodi Y po razmerju slike (imgH/imgW).
 */
export default function PaperInset({
  url,
  size,                         // [width, height] v metrih (pred inset)
  inset = PAPER_INSET,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  unlit = true,
  doubleSided = false,
  mode = 'fit',                 // 'fit' | 'tileSquare' | 'tileBase'
  tileBase = PAPER_TILE_BASE,   // npr. 0.02 (20 mm)
  tileLockSquare = true,        // ohrani kvadratni motiv
}) {
  const tex = useMemo(() => {
    if (!url) return null;

    // vzemi source iz cache-a in ustvari KLON (da wrap/repeat ne vplivata na druge)
    const src = loadCachedTexture(url);
    if (!src) return null;

    const t = src.clone();
    t.image = src.image;
    t.needsUpdate = true;

    // barvni prostor (Three r160+)
    if ('colorSpace' in t) t.colorSpace = THREE.SRGBColorSpace;

    // vzorčenje
    t.anisotropy = 8;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;

    return t;
  }, [url]);

  if (!tex) return null;

  // končne mere nalepke z upoštevanim insetom
  const w = Math.max(1e-6, size[0] - 2 * inset);
  const h = Math.max(1e-6, size[1] - 2 * inset);

  // nastavitev načina mapiranja
  if (mode === 'tileBase') {
    // konsistentna mm skala (svetovna)
    const imgW = tex.image?.width || 1;
    const imgH = tex.image?.height || 1;
    const imgAspect = imgH / imgW;

    const baseX = tileBase;                        // širina enega tile-a v svetu
    const baseY = tileLockSquare ? tileBase       // kvadratni tile
                                 : tileBase * imgAspect;

    const repeatX = Math.max(1e-6, w / baseX);
    const repeatY = Math.max(1e-6, h / baseY);

    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.needsUpdate = true;
  } else if (mode === 'tileSquare') {
    const base = Math.min(w, h);
    const repeatX = Math.max(1e-6, w / base);
    const repeatY = Math.max(1e-6, h / base);

    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.needsUpdate = true;
  } else {
    // FIT: brez ponavljanja
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.needsUpdate = true;
  }

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
          side={doubleSided ? THREE.DoubleSide : THREE.FrontSide}
          roughness={1}
          metalness={0}
        />
      )}
    </mesh>
  );
}
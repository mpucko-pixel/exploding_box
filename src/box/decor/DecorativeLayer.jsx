import React, { useMemo } from 'react';
import * as THREE from 'three';
import { loadCachedTexture } from './core/utils/textureCache.js';
import { BOX_SIZE, LID_SIZE } from '../constants.js';


export default function DecorativeLayer({ side, textures }) {
  // Izberi pravi URL za teksturo glede na 'side'
  const url = useMemo(() => {
    if (side === 'front') return textures?.front || textures?.outer || null;
    if (side === 'back')  return textures?.back  || textures?.outer || null;
    if (side === 'left')  return textures?.left  || textures?.inner || textures?.outer || null;
    if (side === 'right') return textures?.right || textures?.inner || textures?.outer || null;

    // TOP pokrova: najprej 'lidTop' (tvoj UI), potem fallbacki
    if (side === 'lid')
      return (
        textures?.lidTop ||
        textures?.lid ||
        textures?.top ||
        textures?.outer ||
        textures?.front ||
        null
      );

    return null;
  }, [side, textures]);

  const tex = useMemo(() => {
    if (!url) return null;
    const t = loadCachedTexture(url);
    if (t) {
      t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.needsUpdate = true;
    }
    return t;
  }, [url]);

  if (!tex) return null;

  // Velikost: lid = plošča pokrova; ostalo = stene
  const size = side === 'lid' ? [LID_SIZE[0], LID_SIZE[2]] : [BOX_SIZE, BOX_SIZE];

  // Rotacije ravnine (da normal gleda ven v pravo smer)
  const rotation = useMemo(() => {
    switch (side) {
      case 'front': return [0, Math.PI, 0];        // normal -Z
      case 'back':  return [0, 0, 0];              // normal +Z
      case 'left':  return [0, -Math.PI / 2, 0];   // normal -X
      case 'right': return [0,  Math.PI / 2, 0];   // normal +X
      case 'lid':   return [-Math.PI / 2, 0, 0];   // vodoravno (XZ)
      default:      return [0, 0, 0];
    }
  }, [side]);

  // S 'key' prisilimo rerender materiala, ko se URL zamenja (blob URL iz <input type="file">)
  return (
    <mesh rotation={rotation} key={String(url)}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={tex}
        side={THREE.DoubleSide}
        // Transparent: FALSE, da se izognemo slučajnim alfa-kanalom iz PNG
        transparent={false}
        toneMapped={true}
      />
    </mesh>
  );
}
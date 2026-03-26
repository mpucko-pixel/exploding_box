// src/textureCache.js
import * as THREE from 'three';

const cache = new Map();
const loader = new THREE.TextureLoader();

/**
 * Naloži teksturo z lokalnim cache-om (mapa/URL ali blob: URL).
 * - Nastavi pravilni color space (Three r160+: colorSpace = SRGBColorSpace)
 * - Doda nekaj kvalitete (anisotropy)
 */
export function loadCachedTexture(url, onLoad = () => {}) {
  if (!url) return null;

  if (cache.has(url)) return cache.get(url);

  const tex = loader.load(
    url,
    () => {
      // Three r152+ uporablja colorSpace; za stare verzije ohranimo encoding fallback
      if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
      else tex.encoding = THREE.sRGBEncoding;

      tex.anisotropy = 8;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      onLoad(tex);
    },
    undefined,
    (err) => console.warn('Texture load error:', url, err)
  );

  cache.set(url, tex);
  return tex;
}

/**
 * Očisti in dispose-a vse teksture v cache-u.
 */
export function clearTextureCache() {
  for (const tex of cache.values()) {
    try { tex.dispose?.(); } catch {}
  }
  cache.clear();
}

// Dodamo še default export, da je modul še bolj “odporno” uvozen:
export default { loadCachedTexture, clearTextureCache };
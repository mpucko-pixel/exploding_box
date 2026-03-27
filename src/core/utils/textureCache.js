// src/core/utils/textureCache.js
import * as THREE from "three";

const cache = new Map();
const loader = new THREE.TextureLoader();

export function loadCachedTexture(url, onLoad = () => {}) {
  if (!url) return null;
  if (cache.has(url)) return cache.get(url);

  const tex = loader.load(
    url,
    () => {
      if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
      else tex.encoding = THREE.sRGBEncoding;

      tex.anisotropy = 8;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      onLoad(tex);
    },
    undefined,
    (err) => console.warn("Texture load error:", url, err)
  );

  cache.set(url, tex);
  return tex;
}

export function clearTextureCache() {
  for (const tex of cache.values()) {
    try {
      tex.dispose?.();
    } catch {}
  }
  cache.clear();
}

export default {
  loadCachedTexture,
  clearTextureCache,
};
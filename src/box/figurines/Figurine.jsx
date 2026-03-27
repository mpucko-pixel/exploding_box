import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FIGURE_MAX_HEIGHT, WALL_THICKNESS } from '../../constants.js';

/**
 * Figurine
 * --------
 * - NE nalaga nič, če `url` ni podan → vrne null (s tem izgine “privzeti trikotnik”).
 * - Če `url` je podan, poskusi naložiti GLB in ga varno prikaže.
 * - Če nalaganje pade, uporabi fallback (le v primeru, da je bil poskus nalaganja).
 * - Auto-fit na max višino FIGURE_MAX_HEIGHT in poravnava na y = WALL_THICKNESS.
 */
export default function Figurine({ url }) {
  const [obj, setObj] = useState(null);

  useEffect(() => {
    let mounted = true;
    let cleanupFns = [];

    // Brez URL -> nič figurine
    if (!url) {
      setObj(null);
      return () => {};
    }

    const loader = new GLTFLoader();

    const tryLoad = (u) =>
      new Promise((resolve) => {
        loader.load(
          u,
          (g) => resolve({ ok: true, g }),
          undefined,
          () => resolve({ ok: false })
        );
      });

    (async () => {
      // Poskusi naložiti user-jev URL
      let res = await tryLoad(url);

      // Če userjev URL pade, poskusi fallback placeholder iz assets
      if (!res.ok) {
        res = await tryLoad('/src/assets/placeholder.glb');
      }

      if (!mounted) return;

      let sceneObj;

      if (res.ok) {
        // Kloniraj in pripravi gltf sceno
        sceneObj = res.g.scene.clone(true);

        // Vse materiale prestavi v standardni material, če so nenavadni
        sceneObj.traverse((n) => {
          if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material) {
              // poskrbi za linear/sRGB pravilnost v novejših three
              if ('colorSpace' in n.material && n.material.map) {
                n.material.map.colorSpace = THREE.SRGBColorSpace;
              }
            }
          }
        });
      } else {
        // V skrajnem primeru pokaži nevsiljiv fallback
        sceneObj = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.02, 1),
          new THREE.MeshStandardMaterial({ color: '#a3a3a3' })
        );
      }

      // Izračunaj višino in skaliranje
      const bbox = new THREE.Box3().setFromObject(sceneObj);
      const height = Math.max(1e-6, bbox.max.y - bbox.min.y);
      const scale = FIGURE_MAX_HEIGHT / height;
      sceneObj.scale.setScalar(scale);

      // Poravnava na dno škatle (y = WALL_THICKNESS)
      const bbox2 = new THREE.Box3().setFromObject(sceneObj);
      const offsetY = WALL_THICKNESS - bbox2.min.y;
      sceneObj.position.set(0, offsetY, 0);

      setObj(sceneObj);

      // Cleanup: po želji bi lahko trackali geometrije/materiale za dispose
      cleanupFns.push(() => {
        sceneObj.traverse((n) => {
          if (n.isMesh) {
            n.geometry?.dispose?.();
            // Pozor: materialov ne disposamo, če jih deli več mesh-ev; tukaj je varno:
            if (Array.isArray(n.material)) n.material.forEach((m) => m?.dispose?.());
            else n.material?.dispose?.();
          }
        });
      });
    })();

    return () => {
      mounted = false;
      cleanupFns.forEach((fn) => fn());
    };
  }, [url]);

  if (!obj) return null;
  return <primitive object={obj} />;
}
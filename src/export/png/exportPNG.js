// src/export/png/exportPNG.js
import { saveAs } from "file-saver";

/**
 * exportPNG
 * ----------
 * Renders the current scene to a high‑resolution PNG.
 *
 * Options:
 *   - resolution: multiplier (1, 2, 4, 8)
 *   - transparent: boolean
 *   - background: CSS color or gradient (if not transparent)
 *   - camera: optional camera override
 */
export async function exportPNG({
  gl,
  scene,
  camera,
  resolution = 2,
  transparent = true,
  background = null,
}) {
  if (!gl || !scene || !camera) {
    console.warn("exportPNG: missing scene, gl, or camera.");
    return;
  }

  const prevBG = gl.getClearColor().clone();
  const prevAlpha = gl.getClearAlpha();

  if (transparent) {
    gl.setClearColor("#000000", 0); // fully transparent
  } else if (background) {
    gl.setClearColor(background, 1);
  }

  const width = gl.domElement.width * resolution;
  const height = gl.domElement.height * resolution;

  const prevPixelRatio = gl.getPixelRatio();
  gl.setPixelRatio(resolution);
  gl.setSize(width, height, false);

  gl.render(scene, camera);

  const dataURL = gl.domElement.toDataURL("image/png");
  const blob = await (await fetch(dataURL)).blob();

  saveAs(blob, `exploding_box_${Date.now()}.png`);

  // Restore renderer state
  gl.setClearColor(prevBG, prevAlpha);
  gl.setPixelRatio(prevPixelRatio);
  gl.setSize(window.innerWidth, window.innerHeight);

  return blob;
}

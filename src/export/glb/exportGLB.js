// src/export/glb/exportGLB.js
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { saveAs } from "file-saver";

/**
 * exportGLB
 * ----------
 * Exports the entire scene (or a specific group) to a GLB file.
 */
export function exportGLB(object3D, options = {}) {
  if (!object3D) {
    console.warn("exportGLB: no object3D provided.");
    return;
  }

  const exporter = new GLTFExporter();

  const exportOptions = {
    binary: true,
    trs: true,
    onlyVisible: true,
    embedImages: true,
    ...options,
  };

  exporter.parse(
    object3D,
    (glb) => {
      const blob = new Blob([glb], { type: "model/gltf-binary" });
      saveAs(blob, `exploding_box_${Date.now()}.glb`);
    },
    (error) => {
      console.error("exportGLB error:", error);
    },
    exportOptions
  );
}
``
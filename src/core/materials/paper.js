// src/core/materials/paper.js
import * as THREE from "three";

/**
 * createPaperMaterial
 * -------------------
 * Factory for paper materials.
 *
 * Supports:
 *  - unlit (MeshBasicMaterial)      → perfect color accuracy
 *  - lit  (MeshStandardMaterial)    → optional for future modes (glossy, highlights)
 *
 * Default behavior for your project:
 *  → unlit = true, because printed textures must be exact.
 */

export function createPaperMaterial({
  map = null,
  unlit = true,
  doubleSided = false,
  roughness = 1.0,
  metalness = 0.0,
  color = "#ffffff",
  opacity = 1.0,
  transparent = false,
  ...overrides
} = {}) {
  if (unlit) {
    return {
      map,
      color,
      opacity,
      transparent,
      side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
      toneMapped: false,              // unlit renders exactly as print color
      ...overrides,
    };
  }

  // Lit version (for glossy, premium paper, export previews later)
  return {
    map,
    color,
    roughness,
    metalness,
    opacity,
    transparent,
    side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    toneMapped: true,
    ...overrides,
  };
}

/**
 * PRESET PAPER MATERIALS
 * -----------------------
 * Useful for UI presets and template systems.
 *
 * NOTE:
 *  Textures (map) will be applied by PaperInset.jsx.
 *  Presets define the *surface* characteristics.
 */

export const PaperPresets = {
  // Default unlit matte paper (your current configuration)
  matte: createPaperMaterial({
    unlit: true,
    roughness: 1.0,
    metalness: 0.0,
    color: "#ffffff",
  }),

  // Slightly softer, warm tone
  warmMatte: createPaperMaterial({
    unlit: true,
    color: "#fdfbf5",
  }),

  // Premium glossy paper (lighting-enabled)
  glossy: createPaperMaterial({
    unlit: false,
    roughness: 0.15,
    metalness: 0.05,
    color: "#ffffff",
    toneMapped: true,
  }),

  // Metallic foil-like reflective surface
  foil: createPaperMaterial({
    unlit: false,
    roughness: 0.1,
    metalness: 0.6,
    color: "#f6f6f6",
    toneMapped: true,
  }),

  // Textured pastel paper (lit variant)
  textured: createPaperMaterial({
    unlit: false,
    roughness: 0.85,
    metalness: 0.0,
    color: "#f9f9f7",
  }),
};

/**
 * getPaperMaterial
 * ----------------
 * Fetch a named preset with optional overrides.
 */
export function getPaperMaterial(name = "matte", overrides = {}) {
  const base = PaperPresets[name] || PaperPresets.matte;
  return { ...base, ...overrides };
}
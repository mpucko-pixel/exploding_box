// src/core/lighting/presets.js
//
// Lighting presets for the exploding box configurator.
// These presets define the INTENSITY + COLOR of each virtual light
// used by the FixedLights.jsx rig.
//
// NOTE:
//  - All lights in FixedLights move with the camera (camera-aligned rig)
//  - These presets only define the individual light strengths
//  - You can expose these presets in UI for "Render Mode", "Lighting Style", etc.

export const LightingPresets = {
  // ----------------------------------------------
  // Soft, bright, clean — ideal for a white cardboard product shot.
  // ----------------------------------------------
  studioSoft: {
    key: 1.6,
    fillRight: 0.9,
    fillLeft: 0.8,
    top: 0.7,
    ambient: 0.35,
    hemisphere: 0.25,
  },

  // ----------------------------------------------
  // Stronger front light + punchy fills.
  // Great for high‑contrast shots.
  // ----------------------------------------------
  studioHard: {
    key: 2.4,
    fillRight: 1.2,
    fillLeft: 1.1,
    top: 0.9,
    ambient: 0.28,
    hemisphere: 0.22,
  },

  // ----------------------------------------------
  // Low intensity, good for real‑time preview / low-power devices.
  // ----------------------------------------------
  previewFast: {
    key: 1.2,
    fillRight: 0.5,
    fillLeft: 0.45,
    top: 0.4,
    ambient: 0.25,
    hemisphere: 0.18,
  },

  // ----------------------------------------------
  // Warm, photography-style preset.
  // Great for wedding / romantic templates.
  // ----------------------------------------------
  warmCinematic: {
    key: 1.8,
    fillRight: 1.0,
    fillLeft: 0.9,
    top: 0.8,
    ambient: 0.3,
    hemisphere: 0.22,
    color: "#fff4e6", // slight warmth
  },

  // ----------------------------------------------
  // Cool tone — good for modern / minimalistic themes.
  // ----------------------------------------------
  coolMinimal: {
    key: 1.7,
    fillRight: 0.9,
    fillLeft: 0.85,
    top: 0.75,
    ambient: 0.3,
    hemisphere: 0.25,
    color: "#e9f2ff",
  },

  // ----------------------------------------------
  // High-intensity lighting for high-quality renders
  // (combined with future "High Quality Mode": AO, supersampling, bloom, etc.)
  // ----------------------------------------------
  renderHQ: {
    key: 2.8,
    fillRight: 1.5,
    fillLeft: 1.4,
    top: 1.2,
    ambient: 0.4,
    hemisphere: 0.3,
  },
};

/**
 * getLightingPreset(name)
 * -----------------------
 * Retrieve a lighting preset by name.
 * Falls back to "studioSoft" if not found.
 */
export function getLightingPreset(name = "studioSoft") {
  return LightingPresets[name] || LightingPresets.studioSoft;
}
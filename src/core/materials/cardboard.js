// src/core/materials/cardboard.js
import * as THREE from "three";

/**
 * createCardboardMaterial
 * ------------------------
 * Reusable cardboard material factory for the exploding box.
 *
 * Features:
 * - Perfect for white studio‑cardboard look
 * - Tuned roughness + metalness to catch light without gloss
 * - SRGB‑correct color handling
 * - Optional overrides for templates, render modes, or special styles
 *
 * Usage:
 *   const mat = createCardboardMaterial();
 *   <meshStandardMaterial {...mat} />
 */

export function createCardboardMaterial(overrides = {}) {
  const defaults = {
    color: "#fafafa",           // Studio white
    roughness: 0.45,            // Balanced matte
    metalness: 0.15,            // Adds gentle edge contrast
    envMapIntensity: 1.5,       // Soft, pastel reflection feel
    flatShading: false,
    toneMapped: true,
  };

  return { ...defaults, ...overrides };
}

/**
 * PRESET MATERIALS
 * -----------------
 * Allows future UI to switch looks quickly.
 */

export const CardboardPresets = {
  studioWhite: createCardboardMaterial(),

  warmWhite: createCardboardMaterial({
    color: "#f6f3ea",
    roughness: 0.5,
    metalness: 0.12,
  }),

  coldWhite: createCardboardMaterial({
    color: "#f4f6f9",
    roughness: 0.42,
    metalness: 0.18,
  }),

  matteGrey: createCardboardMaterial({
    color: "#dcdcdc",
    roughness: 0.65,
    metalness: 0.05,
    envMapIntensity: 1.0,
  }),

  highContrast: createCardboardMaterial({
    color: "#ffffff",
    roughness: 0.3,
    metalness: 0.25,
    envMapIntensity: 2.0,
  }),
};

/**
 * Utility:
 * getCardboardMaterial(name, overrides) → quick lookup
 */
export function getCardboardMaterial(name = "studioWhite", overrides = {}) {
  const base = CardboardPresets[name] || CardboardPresets.studioWhite;
  return { ...base, ...overrides };
}
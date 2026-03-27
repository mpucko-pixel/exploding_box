// src/core/utils/geometry.js

// Create pivot transform for a panel using a parent Group
export function createPivot(group, pivot) {
  group.position.set(pivot[0], pivot[1], pivot[2]);
  return group;
}

// Convert degrees to radians
export function degToRad(d) {
  return (d * Math.PI) / 180;
}

// Convert mm to meters (for your paper-craft dimensions)
export function mm(v) {
  return v / 1000;
}

// Slight offset to avoid z‑fighting (works like EPS)
export function zLift(v = 0.00025) {
  return v;
}
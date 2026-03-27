// src/core/utils/math.js

// Clamp value into inclusive range
export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// Linear interpolation
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Smoothstep easing
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// Cubic ease-out (nice for lid animation)
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Exponential ease-out
export function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
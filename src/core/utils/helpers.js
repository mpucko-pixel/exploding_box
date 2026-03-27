// src/core/utils/helpers.js

// Returns true if value is defined and not null
export function exists(v) {
  return v !== undefined && v !== null;
}

// Create a safe JSON deep clone
export function cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Format mm for UI displays
export function mmLabel(v) {
  return `${(v * 1000).toFixed(0)} mm`;
}

// Random ID generator (useful for configs)
export function uid(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).slice(2);
}

# Exploding Box – React + Three.js Configurator

Full project source code: https://github.com/mpucko-pixel/exploding_box

A fully interactive 3D exploding‑box configurator built with **React**, **React Three Fiber**, **Three.js**, **Drei**, **React Spring**, **Zustand**, and **Vite 8**.

Users can customize:
- outer box textures
- lid top & lid sides
- figurine model
- animation state
- export high‑res PNG or GLB

This README reflects the complete refactored architecture as of March 27, 2026.

---
## ✨ Features

### 🎁 Realistic 3D Exploding Box
- Physically accurate dimensions
- Smooth sequential animations
- Hinged panels (R3F + react‑spring)
- Configurable materials & papers

### 🧻 Paper & Texture System
- TileBase, tileSquare, and fit mapping
- 2mm inset, EPS z‑offset
- SRGB‑correct
- Texture caching

### 💡 Lighting
- Camera‑aligned studio lighting rig
- Additional ambient + hemisphere lights
- Lighting preset system

### 🎨 Materials
- Cardboard presets
- Paper presets (matte, glossy, foil, textured)

### 🧰 Utilities
- wait.js, math.js, easing.js
- textureCache.js with SRGB handling

### 🤖 Global State (Zustand)
Controls:
- textures
- papers
- figurine
- UI panels
- animation triggers
- full reset
- configuration export/import

### 📤 Export System
- PNG export (supersampled)
- GLB export
- Studio backgrounds

---
## 📂 Project Structure
```
src/
  assets/
  box/
    base/
    lid/
    paper/
    figurines/
    decor/
    ConfiguratorScene.jsx
  core/
    animation/
    lighting/
    materials/
    utils/
  export/
    png/
    glb/
    background/
  ui/
    panels/
    controls/
    widgets/
    layout/
  state/
  App.jsx
  constants.js
  index.jsx
  styles.css
```

---
## ▶️ Running
```
npm install
npm run dev
npm run build
npm run preview
```

---
## 🧭 Roadmap
- Template system
- Interior textures
- Export UI panel
- Multi‑size presets
- Ordering JSON packet

---
## 📜 License
MIT

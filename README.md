# Exploding Box – React + Three.js Configurator
Interactive 3D gift box configurator built with **React**, **React Three Fiber**, **Three.js**, and **Vite**.

This project renders a fully animated “exploding box” with:
- opening lid  
- four unfolding side panels  
- configurable paper textures (outer/inner)  
- dynamic lid design  
- figurine/model preview  
- realistic 3D studio-light look  
- camera-aligned lighting system  
- high-quality rendering pipeline  

The codebase is structured for long-term extensibility and is optimized for integration with product configurators, template systems, or custom 3D generators.

---

## ✨ Features

### 🎁 **Realistic 3D Exploding Box**
- Accurate real‑world dimensions (104×104×30 mm lid, 100×100×100 mm base).
- Hinged front/back/left/right walls.
- Spring‑based animation (react‑spring) for lid and side panels.

### 🧻 **Paper / Texture System**
- Apply **custom textures** to the lid, lid sides, base, walls, and interior.
- Supports:
  - `fit` mode  
  - `tileSquare` mode  
  - `tileBase` mode (consistent physical scale)
- Paper material uses **unlit** rendering for perfect color accuracy.
- Configurable **2 mm inset** for realistic paper thickness.

### 📦 **Cardboard Material (Realistic)**
Physically‑based cardboard using:

```jsx
<meshStandardMaterial
  color={CARDBOARD_COLOR}   // recommended: #fafafa (studio white)
  roughness={0.45}
  metalness={0.15}
  envMapIntensity={1.5}
  flatShading={false}
/>
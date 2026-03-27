# Exploding Box – React + Three.js Configurator

Interactive 3D exploding gift box configurator built with **React**, **React Three Fiber**, **Three.js**, **Drei**, **React Spring**, and **Vite**.

This project renders a fully animated “exploding box” with:

- sequential lid + wall unfolding animation
- configurable paper textures (inner + outer)
- 2 mm realistic paper inset
- physically‑based cardboard material
- studio‑quality camera‑aligned lighting rig
- pastel-gradient background
- tone‑mapped rendering pipeline
- optional figurine inside the box

The system is built for product visualization, template workflows, and high‑quality 3D previews.

---

# ✨ Features

## 🎁 Realistic 3D Exploding Box
- True‑to‑life physical dimensions  
- React‑spring based sequential animation system  
- **New:** centralized `BoxAnimator.js` controlling open/close/reset  
- Lid always opens first → then walls  
- Walls always close first → then lid  

## 🧻 Paper & Texture System
- Independent textures for:
  - lid top  
  - lid sides  
  - base  
  - inner base  
- PaperInset component with:
  - **2 mm inset**
  - anti z‑fighting EPS offset
  - tiling modes: `fit`, `tileSquare`, `tileBase`
- MeshBasicMaterial for exact color reproduction (unlit)
- Texture caching for instant swapping

## 📦 Cardboard Material (PBR)
```jsx
<meshStandardMaterial
  color={CARDBOARD_COLOR}
  roughness={0.45}
  metalness={0.15}
  envMapIntensity={1.5}
  flatShading={false}
/>

A perfect balance between realism, contrast, and softness.

## 💡 Camera‑Aligned Lighting (FixedLights)
A photography-style lighting rig:

- front key light  
- right fill  
- left fill  
- top soft light  
- lights automatically rotate with the camera  
- object rotates independently  
- ensures consistent “product shot” illumination  
- no hard shadows, no directional drift  

## 🎨 Pastel Studio Background

Canvas is transparent while CSS defines the backdrop:

```css
background: linear-gradient(180deg,
  #f2eee6 0%,
  #e6e2dd 50%,
  #dcd8d4 100%
);
```

Perfect for white-cardboard rendering.

## 🎞 Tone Mapping & Color Pipeline

```jsx
renderer.toneMapping = LinearToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.outputColorSpace = SRGBColorSpace;
```

Prevents “gray white” cardboard and supports realistic highlights.

---

# ▶️ How to Run the App (Development)

The project uses **Vite** as the build/run system.

## 1. Install dependencies

```bash
npm install
```

## 2. Start the development server

```bash
npm run dev
```

Then open:
```
http://localhost:5173
```

Vite automatically reloads on changes.

---

# 🏗️ Production Build

Create optimized build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

Output is saved in the **dist/** directory.

---

# 📁 Project Structure

```
exploding_box/
│
├── src/
│   ├── animation/
│   │   └── BoxAnimator.js      
│   │
│   ├── components/
│   │   ├── Scene.jsx           
│   │   ├── LidGroup.jsx
│   │   ├── HingedPanel.jsx
│   │   ├── PaperInset.jsx
│   │   ├── FixedLights.jsx
│   │   ├── Figurine.jsx
│   │   └── FigurineDragRotation.jsx
│   │
│   ├── constants.js
│   ├── textureCache.js
│   ├── styles.css
│   ├── App.jsx
│   └── index.jsx
│
├── README.md
├── snapshot.txt
├── roadmap.txt
├── master_prompt.txt
├── index.html
└── vite.config.js
```

---

# 🧩 New Animation System (2026 Update)
Introduced:
✔ /src/animation/BoxAnimator.js

- Centralized spring management
- Open/close/reset methods
- Manual delays for precise sequencing:
  - Lid completes visually → then walls
  - Walls complete visually → then lid
- Animation‑lock to prevent overlapping events

Scene.jsx now only:
- subscribes to DOM events (open-box, close-box, reset-box)
- receives spring values from BoxAnimator
- renders geometry, lighting, and materials

This modular design is ideal for future features such as:
- render modes
- camera presets
- multi‑box support

# 🧭 Development Snapshot & Context Files

The project includes three important meta‑documents:

### 🔹 snapshot.txt  
A complete technical snapshot (geometry, lighting, materials, animation flow, diagrams).

### 🔹 roadmap.txt  
Planned development steps (UI templates, inner textures, render modes, export pipeline).

### 🔹 master_prompt.txt  
A ready-to-use prompt for restarting AI‑assisted development from scratch.

These files allow development to continue smoothly after long breaks or in new AI sessions.

---

# 🛣️ Roadmap (Next Development Steps)

### 🎨 UI Templates
- lid templates: full, split, stripe, collage  
- automatic placement & preview  

### 🧻 Inside Textures  
- inner lid  
- inner walls  
- inner base  
- optional color-only interior  

### 📤 Export System  
- high-quality PNG export (2×/4× supersampling)  
- transparency support  
- GLB 3D model export  

### 🔆 Render Modes  
- Preview Mode (fast, minimal lighting)  
- High-Quality Mode (enhanced lighting, AO, bloom, crisp rendering)  

### ➕ Additional Enhancements  
- measurement overlays  
- camera presets  
- texture guides  
- multi‑box size presets  

---

# 🧪 Technologies Used

- React  
- Three.js  
- React Three Fiber  
- React Spring  
- Drei  
- Vite  
- JavaScript (ESM)

---

# 📜 License
MIT License (see LICENSE).

---

# 🤖 AI Development Workflow

To resume development in a new AI session:

1. Provide the GitHub repository URL  
2. Paste the contents of `master_prompt.txt`  
3. AI will load:
   - README  
   - snapshot  
   - roadmap  
   - project structure  
   - components layout  

This reliably restores the entire project context.

---

# 📬 Issues & Contributions

When the project is on GitHub, you can open issues for:
- bugs  
- enhancements  
- feature requests  
- improvements  

PRs are welcome.


// src/App.jsx
import React, { useCallback, useEffect, useState } from "react";

import TextureControls from "./ui/panels/TextureControls.jsx";
import FigurineControls from "./ui/panels/FigurineControls.jsx";
import FigurineLibrary from "./ui/panels/FigurineLibrary.jsx";
import FigurineLoader from "./ui/panels/FigurineLoader.jsx";
import ResetPanel from "./ui/panels/ResetPanel.jsx";

import ConfiguratorScene from "./box/ConfiguratorScene.jsx";
import { clearTextureCache } from "./core/utils/textureCache.js";

export default function App() {
  // per-wall textures
  const [textures, setTextures] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
    lid: null,
  });

  // figurine
  const [figurineUrl, setFigurineUrl] = useState(null);

  // combined papers for PaperInset
  const [papers, setPapers] = useState({
    outerBase: null,
    innerBase: null,
    lidTop: null,
    lidSides: null,
  });

  // Recompute papers on texture change
  useEffect(() => {
    const outerBase =
      textures.front || textures.back || textures.left || textures.right || null;

    const innerBase = null; // reserved for UI panel
    const lidTop = textures.lid || null;
    const lidSides = textures.lid || null;

    const next = { outerBase, innerBase, lidTop, lidSides };
    setPapers(next);

    // Debug
    window.__textures_state__ = textures;
    window.__papers_state__ = next;
  }, [textures]);

  // RESET
  const reset = useCallback(() => {
    clearTextureCache();
    setTextures({ front: null, back: null, left: null, right: null, lid: null });
    setFigurineUrl(null);

    document.dispatchEvent(new Event("reset-box"));
    document.dispatchEvent(new Event("reset-figurine-rotation"));
    document.dispatchEvent(new Event("reset-ui-inputs"));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "a") document.dispatchEvent(new Event("open-box"));
      if (k === "o") document.dispatchEvent(new Event("close-box"));
      if (k === "r") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  return (
    <>
      {/* UI Panels */}
      <div className="ui">
        <TextureControls textures={textures} setTextures={setTextures} />
        <FigurineControls figurineUrl={figurineUrl} setFigurineUrl={setFigurineUrl} />
        <FigurineLibrary setFigurineUrl={setFigurineUrl} />
        <FigurineLoader setFigurineUrl={setFigurineUrl} />
        <ResetPanel reset={reset} />
      </div>

      {/* Hotkey hint */}
      <div className="key-hint">
        Tipke: <b>A</b> odpri · <b>O</b> zapri · <b>R</b> reset
      </div>

      {/* 3D Scene */}
      <div className="canvas-wrap">
        <ConfiguratorScene papers={papers} figurineUrl={figurineUrl} />
      </div>
    </>
  );
}
// src/App.jsx
import React, { useEffect } from "react";
import SidebarLayout from "./ui/layout/SidebarLayout.jsx";
import ConfiguratorScene from "./box/ConfiguratorScene.jsx";

import { useStore } from "./state/store.js";
import { selectPapers } from "./state/selectors.js";
import { selectFigurineUrl } from "./state/selectors.js";
import { selectResetAll } from "./state/selectors.js";
import { clearTextureCache } from "./core/utils/textureCache.js";

export default function App() {
  const papers = useStore(selectPapers);
  const figurineUrl = useStore(selectFigurineUrl);
  const resetAll = useStore(selectResetAll);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      if (key === "a") document.dispatchEvent(new Event("open-box"));
      if (key === "o") document.dispatchEvent(new Event("close-box"));
      if (key === "r") {
        clearTextureCache();
        resetAll();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [resetAll]);

  return (
    <>
      <SidebarLayout />

      <div className="key-hint">
        Tipke: <b>A</b> odpri · <b>O</b> zapri · <b>R</b> reset
      </div>

      <div className="canvas-wrap">
        <ConfiguratorScene papers={papers} figurineUrl={figurineUrl} />
      </div>
    </>
  );
}
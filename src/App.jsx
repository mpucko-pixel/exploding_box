import React, { useCallback, useEffect, useState } from 'react';
import Scene from './components/Scene.jsx';

import TextureControls from './ui/TextureControls.jsx';
import FigurineControls from './ui/FigurineControls.jsx';
import FigurineLibrary from './ui/FigurineLibrary.jsx';
import FigurineLoader from './ui/FigurineLoader.jsx';
import ResetPanel from './ui/ResetPanel.jsx';

import { clearTextureCache } from './textureCache.js';

export default function App() {
  // per-wall teksture iz UI
  const [textures, setTextures] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
    lid: null,
  });

  // figurina
  const [figurineUrl, setFigurineUrl] = useState(null);

  // papers – to uporabljajo paneli/pokrov/dna (2 mm inset)
  const [papers, setPapers] = useState({
    outerBase: null,
    innerBase: null,
    lidTop: null,
    lidSides: null,
  });

  // Ko se teksture spremenijo, vedno preračunaj papers.
  useEffect(() => {
    const outerBase =
      textures.front || textures.back || textures.left || textures.right || null;

    const innerBase = null; // za zdaj prazno, dodali bomo PaperControls

    const lidTop = textures.lid || null;
    const lidSides = textures.lid || null;

    const next = { outerBase, innerBase, lidTop, lidSides };
    setPapers(next);

    // Debug: omogoči hiter pogled v konzoli
    window.__textures_state__ = textures;
    window.__papers_state__ = next;
  }, [textures]);

  // RESET
  const reset = useCallback(() => {
    clearTextureCache();

    // Počisti teksture in figurino
    setTextures({ front: null, back: null, left: null, right: null, lid: null });
    setFigurineUrl(null);

    // Dogodki v 3D sceno
    document.dispatchEvent(new Event('reset-box'));
    document.dispatchEvent(new Event('reset-figurine-rotation'));

    // Povej UI-ju naj pobriše thumbnails/URL polja
    document.dispatchEvent(new Event('reset-ui-inputs'));
  }, []);

  // Keybinds
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'a') document.dispatchEvent(new Event('open-box'));
      if (k === 'o') document.dispatchEvent(new Event('close-box'));
      if (k === 'r') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reset]);

  return (
    <>
      <div className="canvas-wrap">
        <Scene papers={papers} textures={textures} figurineUrl={figurineUrl} />
      </div>

      <div className="ui">
        <TextureControls textures={textures} setTextures={setTextures} />
        <FigurineControls />
        <FigurineLibrary setFigurineUrl={setFigurineUrl} />
        <FigurineLoader setFigurineUrl={setFigurineUrl} />
        <ResetPanel onReset={reset} />
      </div>

      <div className="key-hint">
        Tipke: <b>A</b> odpri · <b>O</b> zapri · <b>R</b> reset
      </div>
    </>
  );
}
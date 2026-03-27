// src/ui/panels/FigurineLoader.jsx
import React, { useState } from "react";

export default function FigurineLoader({ setFigurineUrl }) {
  const [url, setUrl] = useState("");

  const loadFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const objectUrl = URL.createObjectURL(f);
    setFigurineUrl(objectUrl);
  };

  return (
    <div className="panel">
      <h3>Figurine Loader</h3>

      <label>Load from URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
      />
      <button onClick={() => setFigurineUrl(url || null)}>
        Load URL
      </button>

      <label>Load local file</label>
      <input type="file" accept=".glb,.gltf" onChange={loadFile} />
    </div>
  );
}
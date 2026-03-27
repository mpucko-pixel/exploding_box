// src/ui/panels/FigurineLibrary.jsx
import React from "react";

export default function FigurineLibrary({ setFigurineUrl }) {
  return (
    <div className="panel">
      <h3>Figurine Library</h3>

      <button onClick={() => setFigurineUrl("/src/assets/sample.glb")}>
        Sample Figurine
      </button>

      <button onClick={() => setFigurineUrl("/src/assets/placeholder.glb")}>
        Placeholder Figurine
      </button>
    </div>
  );
}
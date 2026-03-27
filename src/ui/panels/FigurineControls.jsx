// src/ui/panels/FigurineControls.jsx
import React from "react";

export default function FigurineControls() {
  const resetRotation = () => {
    document.dispatchEvent(new Event("reset-figurine-rotation"));
  };

  return (
    <div className="panel">
      <h3>Figurine Controls</h3>

      <button onClick={resetRotation}>
        Reset Rotation
      </button>
    </div>
  );
}

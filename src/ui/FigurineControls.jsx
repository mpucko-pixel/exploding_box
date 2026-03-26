import React from 'react';

export default function FigurineControls() {
  return (
    <div className="panel">
      <h3>Figurine Controls</h3>
      <button
        className="secondary"
        onClick={() => document.dispatchEvent(new Event('reset-figurine-rotation'))}
      >
        Reset rotation
      </button>
    </div>
  );
}

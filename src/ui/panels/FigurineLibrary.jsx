import React from 'react';

export default function FigurineLibrary({ setFigurineUrl }) {
  return (
    <div className="panel">
      <h3>Figurine Library</h3>
      <button onClick={() => setFigurineUrl('/src/assets/sample.glb')}>Sample GLB</button>
      <button className="secondary" onClick={() => setFigurineUrl('/src/assets/placeholder.glb')}>Placeholder</button>
    </div>
  );
}

import React, { useState } from 'react';

export default function FigurineLoader({ setFigurineUrl }) {
  const [url, setUrl] = useState('');

  const loadFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const objUrl = URL.createObjectURL(f);
    setFigurineUrl(objUrl);
  };

  return (
    <div className="panel">
      <h3>Figurine Load</h3>
      <input type="file" accept=".glb" onChange={loadFile} />

      <label>URL</label>
      <input type="text" placeholder="https://.../model.glb" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={() => setFigurineUrl(url || null)}>Load URL</button>
    </div>
  );
}

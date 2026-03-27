import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * TextureControls
 *  - ob file izberi: pokaže thumbnail + ime
 *  - ob URL vnos: prikaže (URL) in thumbnail
 *  - na reset (R ali gumb Reset) počisti vsa polja
 */
export default function TextureControls({ textures, setTextures }) {
  // lokalno stanje za prikaz imen in thumbnailov
  const [names, setNames] = useState({});
  const [urls, setUrls] = useState({
    front: '', back: '', left: '', right: '', lid: ''
  });

  // refi za file inpute – da jih lahko ob resetu "praznimo"
  const fileRefs = {
    front: useRef(null),
    back: useRef(null),
    left: useRef(null),
    right: useRef(null),
    lid: useRef(null),
  };

  useEffect(() => { window.__textures_state__ = textures; }, [textures]);

  // Listen na "reset-ui-inputs" (kliče App.reset)
  useEffect(() => {
    const resetUi = () => {
      // počisti local state
      setNames({});
      setUrls({ front: '', back: '', left: '', right: '', lid: '' });
      // počisti file inpute
      Object.values(fileRefs).forEach((r) => {
        if (r.current) r.current.value = '';
      });
    };
    document.addEventListener('reset-ui-inputs', resetUi);
    return () => document.removeEventListener('reset-ui-inputs', resetUi);
  }, []);

  const setFile = (key) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setTextures((t) => ({ ...t, [key]: objectUrl }));
    setNames((n) => ({ ...n, [key]: file.name, [key + '_thumb']: objectUrl }));
  };

  const setUrl = (key) => (e) => {
    const v = e.target.value;
    setUrls((u) => ({ ...u, [key]: v }));
    setTextures((t) => ({ ...t, [key]: v || null }));
    setNames((n) => ({ ...n, [key]: v ? '(URL)' : '', [key + '_thumb']: v || '' }));
  };

  const Row = ({ label, keyName }) => (
    <div style={{ marginBottom: 10 }}>
      <label>{label} – file</label>
      <input ref={fileRefs[keyName]} type="file" accept="image/*" onChange={setFile(keyName)} />
      {names[keyName] && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          {names[keyName + '_thumb'] ? (
            <img
              src={names[keyName + '_thumb']}
              alt=""
              width={28}
              height={28}
              style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #444' }}
            />
          ) : null}
          <span style={{ fontSize: 12, opacity: .9 }}>{names[keyName]}</span>
        </div>
      )}

      <label>{label} – URL</label>
      <input
        type="text"
        placeholder="https://..."
        value={urls[keyName]}
        onChange={setUrl(keyName)}
      />
    </div>
  );

  return (
    <div className="panel">
      <h3>Textures (per-wall)</h3>
      <Row label="Front"  keyName="front" />
      <Row label="Back"   keyName="back" />
      <Row label="Left"   keyName="left" />
      <Row label="Right"  keyName="right" />
      <Row label="Lid (top)" keyName="lid" />
      <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>
        Za zdaj: Front/Back/Left/Right → <b>outerBase</b> (vse zunanje stranice + zunanje dno).<br/>
        Lid (top) → <b>vrh pokrova in 4 stranice pokrova</b>.
      </div>
    </div>
  );
}
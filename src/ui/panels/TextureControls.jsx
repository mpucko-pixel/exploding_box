// src/ui/panels/TextureControls.jsx
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../state/store.js";

export default function TextureControls() {
  // Zustand setters
  const setTextures = useStore((s) => s.setTextures);

  // local UI state for preview filenames
  const [names, setNames] = useState({});
  const [urls, setUrls] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
    lid: "",
    outerBase: "",
    innerBase: "",
  });

  const fileRefs = {
    front: useRef(null),
    back: useRef(null),
    left: useRef(null),
    right: useRef(null),
    lid: useRef(null),
    outerBase: useRef(null),
    innerBase: useRef(null),
  };

  // RESET LISTENER (matches your existing code)
  useEffect(() => {
    const resetUi = () => {
      setNames({});
      setUrls({
        front: "",
        back: "",
        left: "",
        right: "",
        lid: "",
        outerBase: "",
        innerBase: "",
      });
      Object.values(fileRefs).forEach((r) => {
        if (r.current) r.current.value = "";
      });
    };
    document.addEventListener("reset-ui-inputs", resetUi);
    return () => document.removeEventListener("reset-ui-inputs", resetUi);
  }, []);

  // FILE UPLOAD HANDLER
  const setFile = (key) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    // UPDATE GLOBAL ZUSTAND TEXTURES
    setTextures({ [key]: objectUrl });

    // UPDATE UI LABEL
    setNames((n) => ({
      ...n,
      [key]: file.name,
      [key + "_thumb"]: objectUrl,
    }));
  };

  // URL INPUT HANDLER
  const setUrl = (key) => (e) => {
    const value = e.target.value;

    // UPDATE UI TEXT FIELD
    setUrls((u) => ({ ...u, [key]: value }));

    // UPDATE GLOBAL ZUSTAND TEXTURES
    setTextures({ [key]: value || null });

    // UPDATE LABEL
    setNames((n) => ({
      ...n,
      [key]: value ? "(URL)" : "",
      [key + "_thumb"]: value || "",
    }));
  };

  // RENDER A ROW FOR EACH TEXTURE
  const Row = ({ label, keyName }) => (
    <div style={{ marginBottom: "12px" }}>
      <label>{label} – File</label>
      <input
        type="file"
        ref={fileRefs[keyName]}
        onChange={setFile(keyName)}
        accept="image/*"
      />

      {names[keyName] && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {names[keyName + "_thumb"] && (
            <img
              src={names[keyName + "_thumb"]}
              alt=""
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          )}
          <span>{names[keyName]}</span>
        </div>
      )}

      <label>{label} – URL</label>
      <input
        type="text"
        value={urls[keyName]}
        onChange={setUrl(keyName)}
        placeholder="https://example.com/texture.png"
      />
    </div>
  );

  return (
    <div className="panel">
      <h3>Textures (Per-wall)</h3>

      <Row label="Front" keyName="front" />
      <Row label="Back" keyName="back" />
      <Row label="Left" keyName="left" />
      <Row label="Right" keyName="right" />
      <Row label="Lid" keyName="lid" />
      <Row label="Outer Base" keyName="outerBase" />
      <Row label="Inner Base" keyName="innerBase" />
    </div>
  );
}
// src/ui/panels/TextureControls.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * TextureControls
 *
 * Handles:
 *  - file upload per wall
 *  - URL input per wall
 *  - thumbnail preview
 *  - reacts to RESET event
 *
 * Maps to:
 *   front/back/left/right → papers.outerBase
 *   lid → lidTop & lidSides
 */

export default function TextureControls({ textures, setTextures }) {
  const [names, setNames] = useState({});
  const [urls, setUrls] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
    lid: "",
  });

  // File input refs (so Reset can clear them)
  const fileRefs = {
    front: useRef(null),
    back: useRef(null),
    left: useRef(null),
    right: useRef(null),
    lid: useRef(null),
  };

  // Expose for debugging
  useEffect(() => {
    window.__textures_state__ = textures;
  }, [textures]);

  // Reset triggered by App.reset()
  useEffect(() => {
    const resetUi = () => {
      setNames({});
      setUrls({
        front: "",
        back: "",
        left: "",
        right: "",
        lid: "",
      });

      // Clear all file inputs
      Object.values(fileRefs).forEach((r) => {
        if (r.current) r.current.value = "";
      });
    };

    document.addEventListener("reset-ui-inputs", resetUi);
    return () => document.removeEventListener("reset-ui-inputs", resetUi);
  }, []);

  //---------------------------------------------------------------------------
  // FILE HANDLER
  //---------------------------------------------------------------------------
  const setFile = (key) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    // Update texture state
    setTextures((t) => ({
      ...t,
      [key]: objectUrl,
    }));

    // Update UI thumbnails / names
    setNames((n) => ({
      ...n,
      [key]: file.name,
      [key + "_thumb"]: objectUrl,
    }));
  };

  //---------------------------------------------------------------------------
  // URL HANDLER
  //---------------------------------------------------------------------------
  const setUrlInput = (key) => (e) => {
    const value = e.target.value;

    setUrls((u) => ({
      ...u,
      [key]: value,
    }));

    setTextures((t) => ({
      ...t,
      [key]: value || null,
    }));

    setNames((n) => ({
      ...n,
      [key]: value ? "(URL)" : "",
      [key + "_thumb"]: value || "",
    }));
  };

  //---------------------------------------------------------------------------
  // ROW COMPONENT
  //---------------------------------------------------------------------------
  const Row = ({ label, keyName }) => (
    <div style={{ marginBottom: "14px" }}>
      {/* FILE INPUT */}
      <label>{label} – File</label>
      <input
        type="file"
        ref={fileRefs[keyName]}
        onChange={setFile(keyName)}
        accept="image/*"
      />

      {names[keyName] && (
        <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
          {names[keyName + "_thumb"] && (
            <img
              src={names[keyName + "_thumb"]}
              alt="thumb"
              style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }}
            />
          )}
          <span>{names[keyName]}</span>
        </div>
      )}

      {/* URL INPUT */}
      <label style={{ marginTop: "8px" }}>{label} – URL</label>
      <input
        type="text"
        placeholder="https://example.com/texture.png"
        value={urls[keyName]}
        onChange={setUrlInput(keyName)}
      />
    </div>
  );

  //---------------------------------------------------------------------------
  // PANEL RENDER
  //---------------------------------------------------------------------------
  return (
    <div className="panel">
      <h3>Textures (Per-wall)</h3>

      <p style={{ marginBottom: "10px" }}>
        Front / Back / Left / Right → <b>outerBase</b><br />
        Lid (top) → <b>lidTop + lidSides</b>
      </p>

      <Row label="Front" keyName="front" />
      <Row label="Back" keyName="back" />
      <Row label="Left" keyName="left" />
      <Row label="Right" keyName="right" />
      <Row label="Lid" keyName="lid" />
    </div>
  );
}
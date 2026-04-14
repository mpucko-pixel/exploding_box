// src/ui/panels/TemplatePanel.jsx
import React from "react";
import { useStore } from "../../state/store.js";
import { templates } from "../../templates";

export default function TemplatePanel() {
  const templateId = useStore((s) => s.templateId);
  const templateVersion = useStore((s) => s.templateVersion);
  const templateScaleMode = useStore((s) => s.templateScaleMode);

  const setTemplate = useStore((s) => s.setTemplate);
  const setTemplateVersion = useStore((s) => s.setTemplateVersion);
  const setTemplateScaleMode = useStore((s) => s.setTemplateScaleMode);

  return (
    <div className="panel">
      <h3>Templates</h3>

      {Object.values(templates).map((tpl) => (
        <div
          key={tpl.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>{tpl.name}</span>
          <button onClick={() => setTemplate(tpl.id)}>Apply</button>
        </div>
      ))}

      <label style={{ marginTop: "10px" }}>Texture Version</label>
      <select
        value={templateVersion}
        onChange={(e) => setTemplateVersion(e.target.value)}
      >
        <option value="tile">Tileable</option>
        <option value="real">Realistic</option>
      </select>

      <label style={{ marginTop: "10px" }}>Scale Mode</label>
      <select
        value={templateScaleMode}
        onChange={(e) => setTemplateScaleMode(e.target.value)}
      >
        <option value="real-world">Real World</option>
        <option value="fit">Fit</option>
      </select>
    </div>
  );
}
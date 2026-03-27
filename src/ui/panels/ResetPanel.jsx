// src/ui/panels/ResetPanel.jsx
import React from "react";

export default function ResetPanel({ reset }) {
  return (
    <div className="panel">
      <h3>Reset Design</h3>
      <p>Počisti teksture, figurino in zapri škatlo.</p>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

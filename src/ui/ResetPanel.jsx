import React from 'react';

export default function ResetPanel({ onReset }) {
  return (
    <div className="panel">
      <h3>Reset Design</h3>
      <button onClick={onReset}>Počisti teksture + figurino in zapri škatlo</button>
    </div>
  );
}

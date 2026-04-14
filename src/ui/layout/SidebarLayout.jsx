// src/ui/layout/SidebarLayout.jsx
import React from "react";

import TemplatePanel from "../panels/TemplatePanel.jsx";
import TextureControls from "../panels/TextureControls.jsx";
import FigurineControls from "../panels/FigurineControls.jsx";
import FigurineLibrary from "../panels/FigurineLibrary.jsx";
import FigurineLoader from "../panels/FigurineLoader.jsx";
import ExportPanel from "../panels/ExportPanel.jsx";
import ResetPanel from "../panels/ResetPanel.jsx";

export default function SidebarLayout() {
  return (
    <div className="ui">
      <TemplatePanel />
      <TextureControls />
      <FigurineControls />
      <FigurineLibrary />
      <FigurineLoader />
      <ExportPanel />
      <ResetPanel />
    </div>
  );
}
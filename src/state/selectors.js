// src/state/selectors.js
export const selectTextures = (s) => s.textures;
export const selectSetTexture = (s) => s.setTexture;

export const selectPapers = (s) => s.papers;
export const selectComputePapers = (s) => s.computePapers;

export const selectFigurineUrl = (s) => s.figurineUrl;
export const selectSetFigurineUrl = (s) => s.setFigurineUrl;
export const selectResetFigurine = (s) => s.resetFigurine;

export const selectActivePanel = (s) => s.activePanel;
export const selectSetActivePanel = (s) => s.setActivePanel;

export const selectOpenBox = (s) => s.openBox;
export const selectCloseBox = (s) => s.closeBox;
export const selectResetBox = (s) => s.resetBox;

export const selectResetAll = (s) => s.resetAll;

export const selectExportConfig = (s) => s.exportConfig;
export const selectLoadConfig = (s) => s.loadConfig;
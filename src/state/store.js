// src/state/store.js
import { create } from "zustand";
import { cloneJSON } from "../core/utils/helpers.js";

/**
 * Global Store for Exploding Box Configurator
 */
export const useStore = create((set, get) => ({

  //---------------------------------------------------------------------------
  // TEXTURES (raw input from UI)
  //---------------------------------------------------------------------------
  textures: {
    front: null,
    back: null,
    left: null,
    right: null,
    lid: null,
  },

  setTexture: (side, url) =>
    set((s) => ({
      textures: { ...s.textures, [side]: url },
    })),

  resetTextures: () =>
    set({
      textures: {
        front: null,
        back: null,
        left: null,
        right: null,
        lid: null,
      },
    }),

  //---------------------------------------------------------------------------
  // PAPERS (computed “final surfaces” for PaperInset)
  //---------------------------------------------------------------------------
  papers: {
    outerBase: null,
    innerBase: null,
    lidTop: null,
    lidSides: null,
  },

  computePapers: () => {
    const { textures } = get();

    const outerBase =
      textures.front ||
      textures.back ||
      textures.left ||
      textures.right ||
      null;

    const innerBase = null; // reserved for future controls
    const lidTop = textures.lid || null;
    const lidSides = textures.lid || null;

    set({
      papers: { outerBase, innerBase, lidTop, lidSides },
    });
  },

  //---------------------------------------------------------------------------
  // FIGURINE
  //---------------------------------------------------------------------------
  figurineUrl: null,

  setFigurineUrl: (url) => set({ figurineUrl: url }),

  resetFigurine: () => {
    set({ figurineUrl: null });
    document.dispatchEvent(new Event("reset-figurine-rotation"));
  },

  //---------------------------------------------------------------------------
  // UI
  //---------------------------------------------------------------------------
  activePanel: "textures", // textures | figurine | export | templates | etc.

  setActivePanel: (panel) => set({ activePanel: panel }),

  //---------------------------------------------------------------------------
  // ANIMATION TRIGGERS (3D SCENE)
  //---------------------------------------------------------------------------
  openBox: () => document.dispatchEvent(new Event("open-box")),
  closeBox: () => document.dispatchEvent(new Event("close-box")),
  resetBox: () => document.dispatchEvent(new Event("reset-box")),

  //---------------------------------------------------------------------------
  // RESET EVERYTHING
  //---------------------------------------------------------------------------
  resetAll: () => {
    get().resetTextures();
    get().resetFigurine();
    get().resetBox();
    document.dispatchEvent(new Event("reset-ui-inputs"));
  },

  //---------------------------------------------------------------------------
  // EXPORT CONFIGURATION
  //---------------------------------------------------------------------------
  exportConfig: () => {
    const { textures, papers, figurineUrl } = get();
    return cloneJSON({
      textures,
      papers,
      figurineUrl,
      timestamp: Date.now(),
    });
  },

  //---------------------------------------------------------------------------
  // LOAD CONFIGURATION (JSON import)
  //---------------------------------------------------------------------------
  loadConfig: (config) => {
    if (!config) return;

    set({
      textures: cloneJSON(config.textures),
      papers: cloneJSON(config.papers),
      figurineUrl: config.figurineUrl || null,
    });

    document.dispatchEvent(new Event("reset-ui-inputs"));
  },
}));
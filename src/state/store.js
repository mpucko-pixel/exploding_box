// src/state/store.js
import { create } from "zustand";
import { cloneJSON } from "../core/utils/helpers.js";
import { templates } from "../templates";

export const useStore = create((set, get) => ({

  // ===========================================================================
  // TEXTURES (raw source used by computePapers → Scene)
  // ===========================================================================
  textures: {
    lid: null,        // lidTop + lidSides
    outerBase: null,  // outer walls + outer floor
    innerBase: null   // inner floor (used later)
  },

  setTextures: (t) => set({ textures: { ...get().textures, ...t } }),

  resetTextures: () =>
    set({
      textures: {
        lid: null,
        outerBase: null,
        innerBase: null
      }
    }),

  // ===========================================================================
  // PAPERS (what the Scene actually reads)
  // ===========================================================================
  papers: {
    lidTop: null,
    lidSides: null,
    outerBase: null,
    innerBase: null
  },

  computePapers: () => {
    const t = get().textures;

    set({
      papers: {
        lidTop: t.lid,
        lidSides: t.lid,
        outerBase: t.outerBase,
        innerBase: t.innerBase
      }
    });
  },

  // ===========================================================================
  // FIGURINE
  // ===========================================================================
  figurineUrl: null,

  setFigurineUrl: (url) => set({ figurineUrl: url }),

  resetFigurine: () => {
    set({ figurineUrl: null });
    document.dispatchEvent(new Event("reset-figurine-rotation"));
  },

  // ===========================================================================
  // UI STATE
  // ===========================================================================
  activePanel: "textures",
  setActivePanel: (p) => set({ activePanel: p }),

  // ===========================================================================
  // BOX ANIMATION
  // ===========================================================================
  openBox: () => document.dispatchEvent(new Event("open-box")),
  closeBox: () => document.dispatchEvent(new Event("close-box")),
  resetBox: () => document.dispatchEvent(new Event("reset-box")),

  resetAll: () => {
    get().resetTextures();
    get().resetFigurine();
    get().resetBox();
    document.dispatchEvent(new Event("reset-ui-inputs"));
  },

  // ===========================================================================
  // TEMPLATE SYSTEM
  // ===========================================================================
  templateId: null,
  templateVersion: "tile",          // "tile" | "real"
  templateScaleMode: "real-world",  // "real-world" | "fit"

  setTemplate: (templateId) => {
    const tpl = templates[templateId];
    if (!tpl) return;

    set({
      templateId,
      templateVersion: tpl.default.version,
      templateScaleMode: tpl.default.scaleMode
    });

    get().applyTemplateTextures(templateId);
  },

  setTemplateVersion: (v) => {
    set({ templateVersion: v });
    const id = get().templateId;
    if (id) get().applyTemplateTextures(id);
  },

  setTemplateScaleMode: (m) =>
    set({ templateScaleMode: m }),

  // ===========================================================================
  // APPLY TEMPLATE TEXTURES (final fix: Vite-valid URLs)
  // ===========================================================================
  applyTemplateTextures: (templateId) => {
    const tpl = templates[templateId];
    if (!tpl) return;

    const version = get().templateVersion;
    const s = tpl.textures;

    // Vite-compatible URL builder
    const makeUrl = (file) =>
      new URL(
        `../assets/templates/${templateId}/${file}`,
        import.meta.url
      ).href;

    const next = {
      lid: makeUrl(s.lidTop[version]),
      outerBase: makeUrl(s.outerWalls[version]),
      innerBase: makeUrl(s.innerBase[version])
    };

    set({ textures: next });
    get().computePapers();
  },

  // ===========================================================================
  // EXPORT / IMPORT
  // ===========================================================================
  exportConfig: () => {
    const { textures, papers, figurineUrl, templateId } = get();

    return cloneJSON({
      templateId,
      textures,
      papers,
      figurineUrl,
      timestamp: Date.now()
    });
  },

  loadConfig: (cfg) => {
    if (!cfg) return;

    set({
      templateId: cfg.templateId,
      textures: cloneJSON(cfg.textures),
      papers: cloneJSON(cfg.papers),
      figurineUrl: cfg.figurineUrl || null
    });

    document.dispatchEvent(new Event("reset-ui-inputs"));
  },

}));

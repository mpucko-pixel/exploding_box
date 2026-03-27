// src/export/background/studioBackgrounds.js

/**
 * A collection of studio-style gradient backgrounds
 * that match your cardboard & pastel-lighting aesthetic.
 */
export const StudioBackgrounds = {
  pastelCream: {
    name: "Pastel Cream",
    css: "linear-gradient(180deg, #f2eee6 0%, #e6e2dd 50%, #dcd8d4 100%)",
    colorForPNG: "#e6e2dd",
  },

  softGray: {
    name: "Soft Gray",
    css: "linear-gradient(180deg, #eeeeee 0%, #dcdcdc 60%, #c8c8c8 100%)",
    colorForPNG: "#dcdcdc",
  },

  warmStudio: {
    name: "Warm Studio",
    css: "linear-gradient(180deg, #fff7ee 0%, #f0e9da 60%, #e6dcc7 100%)",
    colorForPNG: "#f0e9da",
  },

  coldStudio: {
    name: "Cold Studio",
    css: "linear-gradient(180deg, #eef4ff 0%, #dce9ff 60%, #c7daff 100%)",
    colorForPNG: "#dce9ff",
  },
};

/**
 * Utility:
 * getBackground(name) returns a background preset
 */
export function getBackground(name = "pastelCream") {
  return StudioBackgrounds[name] || StudioBackgrounds.pastelCream;
}

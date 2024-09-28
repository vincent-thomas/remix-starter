import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const colors = createThemeContract({
  background: {
    primary: null,
    secondary: null,

    element: null,
    hover: null,
    active: null,
  },

  text: {
    primary: null,
    primaryInverse: null,

    secondary: null,
    secondaryInverse: null,
  },
  branding: {
    primary: null,
    secondary: null,
    hover: null,
  },
  accent: {
    background: null,
    foreground: null,
    hover: null,
  },

  border: {
    subtle: null,
    /**
     * For UI Element border and focus rings.
     */
    element: null,
    hover: null,
  },
});

export const themeClass = createTheme(colors, {
  background: {
    primary: "#111111",
    secondary: "#191919",

    element: "#222222",
    hover: "#2A2A2A",
    active: "#313131",
  },
  branding: {
    primary: "#0588F0",
    secondary: "#0090FF",
    hover: "#0588F0",
  },
  accent: {
    background: "#111111",
    foreground: "#EEEEEE",
    hover: "#202020",
  },
  text: {
    primary: "#EEEEEE",
    primaryInverse: "#202020",
    secondary: "#B4B4B4",
    secondaryInverse: "#646464",
  },
  border: {
    subtle: "#3A3A3A",
    element: "#484848",
    hover: "#606060",
  },
});

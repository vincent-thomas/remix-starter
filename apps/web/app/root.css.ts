import { colors } from "@starter/components/theme";
import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  backgroundColor: colors.background.primary,
});

export const rootClassname = style({
  display: "flex",
  flexDirection: "column",
});

globalStyle("*, *::before, *::after", {
  padding: 0,
  margin: 0,
  fontFamily: '"Inter", sans-serif',
  fontStyle: "normal",
  fontSize: "16px",
  boxSizing: "border-box",
});

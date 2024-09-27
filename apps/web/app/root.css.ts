import { colors } from "@starter/components/src/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  backgroundColor: colors.background.primary,
});

//globalStyle("*", {
//  fontFamily: "'Inter', sans-serif",
//  margin: 0,
//  padding: 0,
//});

export const rootClassname = style({
  display: "flex",
  flexDirection: "column",
});

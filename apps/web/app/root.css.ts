import { colors } from "@starter/components/theme";
import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  backgroundColor: colors.background.primary,
});

export const rootClassname = style({
  display: "flex",
  flexDirection: "column",
});

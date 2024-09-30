import { colors } from "@starter/components/theme";
import { style } from "@vanilla-extract/css";

export const indexRoot = style({
  display: "flex",
  flexDirection: "column",

  maxWidth: "1000px",
  width: "100%",
  alignSelf: "center",

  gap: "6rem",
});

export const heroContainer = style({
  display: "flex",
  width: "100%",
});

export const heroTitle = style({
  fontSize: "3.4rem",
  color: colors.text.primary,

  maxWidth: "15ch",
});

export const heroDescription = style({
  color: colors.text.secondary,
});

export const mainStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "6rem",
});

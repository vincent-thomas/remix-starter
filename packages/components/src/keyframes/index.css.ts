import { keyframes, style } from "@vanilla-extract/css";

export const rotateSpinKeyframes = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const rotateSpin = style({
  animationName: rotateSpinKeyframes,
  animationDuration: "1.5s",
});

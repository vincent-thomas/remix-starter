"use client";

import { recipe } from "@vanilla-extract/recipes";
import { colors } from "../theme/index.css";
import { createVar, style } from "@vanilla-extract/css";

export const pY = createVar();
export const pX = createVar();
export const fontSize = createVar();
export const gap = createVar();

export const buttonStyle = recipe({
  base: style({
    vars: {
      [gap]: pX,
    },
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    display: "flex",
    textDecoration: "none",

    paddingInline: pX,
    paddingBlock: pY,
    gap,

    fontSize,

    cursor: "pointer",
  }),
  variants: {
    variant: {
      outlined: {},
      filled: {},
      ghost: {},
    },
    colors: {
      accent: {},
      branding: {},
    },
    size: {
      sm: style({
        vars: {
          [pY]: "0.2rem",
          [pX]: "0.45rem",

          [fontSize]: "0.75rem",
        },
      }),
      md: style({
        vars: {
          [pX]: "1rem",
          [pY]: "0.7rem",

          [fontSize]: "0.9rem",
        },
      }),
      lg: style({
        vars: {
          [pX]: "2rem",
          [pY]: "0.8rem",

          [fontSize]: "1rem",
        },
      }),
    },
  },

  compoundVariants: [
    {
      variants: {
        variant: "filled",
        colors: "branding",
      },
      style: {
        backgroundColor: colors.branding.primary,
        color: colors.text.primary,
      },
    },
    {
      variants: {
        variant: "filled",
        colors: "accent",
      },
      style: {
        backgroundColor: colors.accent.foreground,
        color: colors.text.primaryInverse,
      },
    },

    {
      variants: {
        variant: "outlined",
        colors: "branding",
      },
      style: {
        border: `1px solid ${colors.branding.primary}`,
        color: colors.text.primary,
      },
    },
    {
      variants: {
        variant: "outlined",
        colors: "accent",
      },
      style: {
        backgroundColor: "transparent",
        border: `2px solid ${colors.accent.foreground}`,
        color: colors.accent.foreground,
      },
    },
    {
      variants: {
        variant: "ghost",
        colors: "accent",
      },
      style: {
        color: colors.text.primary,
        ":hover": {
          backgroundColor: colors.accent.hover,
        },
      },
    },
    {
      variants: {
        variant: "ghost",
        colors: "branding",
      },
      style: {
        color: colors.text.primary,
        ":hover": {
          backgroundColor: colors.branding.hover,
        },
      },
    },
  ],
});

import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { colors as themeColors } from "../theme.css";

const space = {
  none: 0,
  small: "4px",
  medium: "8px",
  large: "16px",
  xlarge: "22px",
};

const fontWeights = {
  bold: 700,
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    rowGap: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    gap: space,

    fontWeight: fontWeights,
    // etc.
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

const colors = {
  textPrimary: themeColors.text.primary,
  textPrimaryInverse: themeColors.text.primaryInverse,
  textSecondary: themeColors.text.secondary,
  textSecondaryInverse: themeColors.text.secondaryInverse,
};

const backgrounds = {
  primary: themeColors.background.primary,
  secondary: themeColors.background.secondary,
  hover: themeColors.background.hover,
  active: themeColors.background.active,
  element: themeColors.background.element,
};

const borderColors = {
  subtle: themeColors.border.subtle,
  element: themeColors.border.element,
  hover: themeColors.border.hover,
};

const colorProperties = defineProperties({
  properties: {
    color: colors,
    background: backgrounds,

    borderColor: borderColors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];

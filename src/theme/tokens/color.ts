import { ThemeColorPresets } from "#/enum";
import { rgbAlpha } from "@/utils/theme";

/**
 * We recommend picking colors with these values for [Tailwind Colors](https://uicolors.app/tailwind-colors):
 *  + lighter : 100
 *  + light : 300
 *  + default : 500
 *  + dark : 700
 *  + darker : 900
 */
export const presetsColors = {
  [ThemeColorPresets.Red]: {
    lighter: "#fee2e2",
    light: "#fca5a5",
    default: "#ef4444",
    dark: "#b91c1c",
    darker: "#7f1d1d",
  },
  [ThemeColorPresets.Orange]: {
    lighter: "#ffedd5",
    light: "#fdba74",
    default: "#f97316",
    dark: "#c2410c",
    darker: "#7c2d12",
  },
  [ThemeColorPresets.Amber]: {
    lighter: "#fef3c7",
    light: "#fcd34d",
    default: "#f59e0b",
    dark: "#b45309",
    darker: "#78350f",
  },
  [ThemeColorPresets.Yellow]: {
    lighter: "#fef9c3",
    light: "#fde047",
    default: "#eab308",
    dark: "#a16207",
    darker: "#713f12",
  },
  [ThemeColorPresets.Lime]: {
    lighter: "#ecfccb",
    light: "#bef264",
    default: "#84cc16",
    dark: "#4d7c0f",
    darker: "#365314",
  },
  [ThemeColorPresets.Green]: {
    lighter: "#dcfce7",
    light: "#86efac",
    default: "#22c55e",
    dark: "#15803d",
    darker: "#14532d",
  },
  [ThemeColorPresets.Emerald]: {
    lighter: "#d1fae5",
    light: "#6ee7b7",
    default: "#10b981",
    dark: "#047857",
    darker: "#064e3b",
  },
  [ThemeColorPresets.Teal]: {
    lighter: "#ccfbf1",
    light: "#5eead4",
    default: "#14b8a6",
    dark: "#0f766e",
    darker: "#134e4a",
  },
  [ThemeColorPresets.Cyan]: {
    lighter: "#cffafe",
    light: "#67e8f9",
    default: "#06b6d4",
    dark: "#0e7490",
    darker: "#164e63",
  },
  [ThemeColorPresets.Sky]: {
    lighter: "#e0f2fe",
    light: "#7dd3fc",
    default: "#0ea5e9",
    dark: "#0369a1",
    darker: "#0c4a6e",
  },
  [ThemeColorPresets.Blue]: {
    lighter: "#dbeafe",
    light: "#93c5fd",
    default: "#3b82f6",
    dark: "#1d4ed8",
    darker: "#1e3a8a",
  },
  [ThemeColorPresets.Indigo]: {
    lighter: "#e0e7ff",
    light: "#a5b4fc",
    default: "#6366f1",
    dark: "#4338ca",
    darker: "#312e81",
  },
  [ThemeColorPresets.Violet]: {
    lighter: "#ede9fe",
    light: "#c4b5fd",
    default: "#8b5cf6",
    dark: "#6d28d9",
    darker: "#4c1d95",
  },
  [ThemeColorPresets.Purple]: {
    lighter: "#f3e8ff",
    light: "#d8b4fe",
    default: "#a855f7",
    dark: "#7e22ce",
    darker: "#581c87",
  },
  [ThemeColorPresets.Fuchsia]: {
    lighter: "#fae8ff",
    light: "#f0abfc",
    default: "#d946ef",
    dark: "#a21caf",
    darker: "#701a75",
  },
  [ThemeColorPresets.Pink]: {
    lighter: "#fce7f3",
    light: "#f9a8d4",
    default: "#ec4899",
    dark: "#be185d",
    darker: "#831843",
  },
  [ThemeColorPresets.Rose]: {
    lighter: "#ffe4e6",
    light: "#fda4af",
    default: "#f43f5e",
    dark: "#be123c",
    darker: "#881337",
  },
};

export const paletteColors = {
  primary: presetsColors[ThemeColorPresets.Pink],
  success: {
    lighter: "#D1FADF",
    light: "#6EE7B7",
    default: "#10B981",
    dark: "#059669",
    darker: "#047857",
  },
  warning: {
    lighter: "#FEF3C7",
    light: "#FDE68A",
    default: "#F59E0B",
    dark: "#D97706",
    darker: "#B45309",
  },
  error: {
    lighter: "#FEE2E2",
    light: "#FCA5A5",
    default: "#EF4444",
    dark: "#DC2626",
    darker: "#B91C1C",
  },
  info: {
    lighter: "#DBEAFE",
    light: "#93C5FD",
    default: "#3B82F6",
    dark: "#2563EB",
    darker: "#1D4ED8",
  },
  gray: {
    "100": "#F9FAFB",
    "200": "#F4F6F8",
    "300": "#DFE3E8",
    "400": "#C4CDD5",
    "500": "#919EAB",
    "600": "#637381",
    "700": "#454F5B",
    "800": "#1C252E",
    "900": "#141A21",
  },
};

export const commonColors = {
  white: "#FFFFFF",
  black: "#09090B",
};

export const actionColors = {
  hover: rgbAlpha(paletteColors.gray[500], 0.1),
  selected: rgbAlpha(paletteColors.gray[500], 0.1),
  focus: rgbAlpha(paletteColors.gray[500], 0.12),
  disabled: rgbAlpha(paletteColors.gray[500], 0.48),
  active: rgbAlpha(paletteColors.gray[500], 1),
};

export const lightColorTokens = {
  palette: paletteColors,
  common: commonColors,
  action: actionColors,
  text: {
    primary: paletteColors.gray[800],
    secondary: paletteColors.gray[600],
    disabled: paletteColors.gray[500],
  },
  background: {
    default: commonColors.white,
    paper: commonColors.white,
    neutral: paletteColors.gray[200],
  },
};

export const darkColorTokens = {
  palette: paletteColors,
  common: commonColors,
  action: actionColors,
  text: {
    primary: commonColors.white,
    secondary: paletteColors.gray[500],
    disabled: paletteColors.gray[600],
  },
  background: {
    default: commonColors.black,
    paper: commonColors.black,
    neutral: "#27272A",
  },
};

import { ThemeColorPresets } from "@/types/enum";
import type { ColorGroup } from "./types";

const colorGroups: Record<ColorGroup, ThemeColorPresets[]> = {
  warm: [
    ThemeColorPresets.Red,
    ThemeColorPresets.Orange,
    ThemeColorPresets.Amber,
    ThemeColorPresets.Yellow,
    ThemeColorPresets.Rose,
    ThemeColorPresets.Pink,
    ThemeColorPresets.Fuchsia,
  ],
  cool: [
    ThemeColorPresets.Lime,
    ThemeColorPresets.Green,
    ThemeColorPresets.Emerald,
    ThemeColorPresets.Teal,
    ThemeColorPresets.Cyan,
    ThemeColorPresets.Sky,
    ThemeColorPresets.Blue,
    ThemeColorPresets.Indigo,
    ThemeColorPresets.Violet,
    ThemeColorPresets.Purple,
  ],
};
const groupLabels: Record<ColorGroup, string> = {
  warm: "暖色系",
  cool: "冷色系",
};
export { colorGroups, groupLabels };

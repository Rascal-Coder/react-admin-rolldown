import type { ThemeMode } from "#/enum";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { themeVars } from "@/theme/theme.css";
import { baseThemeTokens } from "@/theme/tokens/base";
import {
  darkColorTokens,
  lightColorTokens,
  presetsColors,
} from "@/theme/tokens/color";
import { darkShadowTokens, lightShadowTokens } from "@/theme/tokens/shadow";
import { typographyTokens } from "@/theme/tokens/typography";

export function useTheme() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();

  let colorTokens =
    settings.themeMode === "light" ? lightColorTokens : darkColorTokens;

  colorTokens = {
    ...colorTokens,
    palette: {
      ...colorTokens.palette,
      primary: presetsColors[settings.themeColorPresets],
    },
  };

  return {
    mode: settings.themeMode,
    setMode: (mode: ThemeMode) => {
      updateAppSettings({
        themeMode: mode,
      });
    },
    themeVars,
    themeTokens: {
      base: baseThemeTokens,
      color: colorTokens,
      shadow:
        settings.themeMode === "light" ? lightShadowTokens : darkShadowTokens,
      typography: typographyTokens,
    },
  };
}

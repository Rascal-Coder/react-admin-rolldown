import { useLayoutEffect } from "react";
import { HtmlDataAttribute, ThemeMode } from "#/enum";
import { useAppSettings } from "@/store/setting-store";
import { useSystemTheme } from "./hooks/use-system-theme";
import type { UILibraryAdapter } from "./type";

interface ThemeProviderProps {
  children: React.ReactNode;
  adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
  const { themeMode, themeColorPresets, fontFamily, fontSize } =
    useAppSettings();
  const systemTheme = useSystemTheme();
  // 同步设置主题属性，避免闪烁
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    if (themeMode === ThemeMode.System) {
      root.setAttribute(HtmlDataAttribute.ThemeMode, systemTheme);
    } else {
      root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
    }

    // 设置颜色预设
    root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);

    // 设置字体大小
    root.style.fontSize = `${fontSize}px`;

    if (body) {
      // 设置字体族
      body.style.fontFamily = fontFamily;
    }
  }, [themeMode, themeColorPresets, fontFamily, fontSize, systemTheme]);

  // Wrap children with adapters
  const wrappedWithAdapters = adapters.reduce(
    (WrappedChildren, Adapter) => (
      <Adapter key={Adapter.name} mode={themeMode}>
        {WrappedChildren}
      </Adapter>
    ),
    children
  );

  return wrappedWithAdapters;
}

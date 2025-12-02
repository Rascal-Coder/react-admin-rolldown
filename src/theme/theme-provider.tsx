import { useEffect, useLayoutEffect } from "react";
import { HtmlDataAttribute } from "#/enum";
import { useAppSettings } from "@/store/setting-store";
import type { UILibraryAdapter } from "./type";

interface ThemeProviderProps {
  children: React.ReactNode;
  adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
  const { themeMode, themeColorPresets, fontFamily, fontSize } =
    useAppSettings();

  // 同步设置主题属性，避免闪烁
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    // 设置主题模式
    root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);

    // 设置颜色预设
    root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);

    // 设置字体大小
    root.style.fontSize = `${fontSize}px`;

    if (body) {
      // 设置字体族
      body.style.fontFamily = fontFamily;
    }
  }, [themeMode, themeColorPresets, fontFamily, fontSize]);

  // 监听设置变化并更新
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
  }, [themeMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);
  }, [themeColorPresets]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.fontSize = `${fontSize}px`;

    const body = window.document.body;
    if (body) {
      body.style.fontFamily = fontFamily;
    }
  }, [fontFamily, fontSize]);

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

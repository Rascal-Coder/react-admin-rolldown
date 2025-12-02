import { useEffect, useState } from "react";
import { ThemeMode } from "@/types/enum";

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(ThemeMode.Light);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemThemeResult = mediaQuery.matches
      ? ThemeMode.Dark
      : ThemeMode.Light;
    setSystemTheme(systemThemeResult);

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? ThemeMode.Dark : ThemeMode.Light);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return systemTheme;
}

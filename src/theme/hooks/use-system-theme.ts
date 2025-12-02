import { useEffect, useState } from "react";
import { ThemeMode } from "@/types/enum";

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(ThemeMode.Light);
  useEffect(() => {
    const systemThemeResult = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? ThemeMode.Dark
      : ThemeMode.Light;
    setSystemTheme(systemThemeResult);
  }, []);
  return systemTheme;
}

import { DirectionProvider as RdxDirProvider } from "@radix-ui/react-direction";
import { useEffect, useState } from "react";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { DirectionContext } from "./direction-context";
import type { Direction } from "./types";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { direction } = settings;
  const [dir, _setDir] = useState<Direction>(
    () => direction || settings.direction
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("dir", dir);
  }, [dir]);

  const setDir = (dirValue: Direction) => {
    _setDir(dirValue);
    updateAppSettings({ direction: dirValue });
  };

  const resetDir = () => {
    _setDir("ltr");
    updateAppSettings({ direction: "ltr" });
  };

  return (
    <DirectionContext.Provider
      value={{
        defaultDir: "ltr",
        dir,
        setDir,
        resetDir,
      }}
    >
      <RdxDirProvider dir={dir}>{children}</RdxDirProvider>
    </DirectionContext.Provider>
  );
}

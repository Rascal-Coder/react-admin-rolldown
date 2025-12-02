import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";

export type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  accordion: boolean;
  multiTab: boolean;
  darkSidebar: boolean;
  fontFamily: string;
  fontSize: number;
  direction: "ltr" | "rtl";
  sidebarOpen: boolean;
  sidebarWidth: string;
};
type SettingStore = {
  appSettings: SettingsType;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setAppSettings: (appSettings: SettingsType) => void;
    updateAppSettings: (partial: Partial<SettingsType>) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      appSettings: {
        themeColorPresets: ThemeColorPresets.Default,
        themeMode: ThemeMode.Light,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        accordion: false,
        multiTab: false,
        darkSidebar: false,
        fontFamily: FontFamilyPreset.openSans,
        fontSize: Number(typographyTokens.fontSize.sm),
        direction: "ltr",
        sidebarOpen: true,
        sidebarWidth: "16rem",
      },
      actions: {
        setAppSettings: (appSettings) => {
          set({ appSettings });
        },
        updateAppSettings: (partial) => {
          set((state) => ({
            appSettings: { ...state.appSettings, ...partial },
          }));
        },
        clearSettings() {
          useSettingStore.persist.clearStorage();
        },
      },
    }),
    {
      name: StorageEnum.Settings, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ [StorageEnum.Settings]: state.appSettings }),
    }
  )
);

export const useAppSettings = () =>
  useSettingStore((state) => state.appSettings);

export const useSettingsActions = () =>
  useSettingStore((state) => state.actions);

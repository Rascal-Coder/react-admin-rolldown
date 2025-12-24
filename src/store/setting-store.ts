import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Direction,
  StorageEnum,
  TabType,
  ThemeColorPresets,
  ThemeLayout,
  ThemeMode,
} from "#/enum";
import type { BreadcrumbVariant } from "@/components/ui/layout/breadcrumb/types";
import { GLOBAL_CONFIG } from "@/global-config";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";
export type SidebarVariant = "inset" | "sidebar" | "floating";
export type CollapsibleType = "icon" | "offcanvas";

// 页面切换动画类型
export type PageTransitionType =
  | "fadeInLeft"
  | "fadeInRight"
  | "fadeInUp"
  | "fadeInDown"
  | "zoomIn"
  | "bounceIn"
  | "flipInX"
  | "scaleInX";

export type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  breadCrumbVariant: BreadcrumbVariant;
  multiTab: boolean;
  fontFamily: string;
  fontSize: number;
  direction: Direction;
  sidebarOpen: boolean;
  sidebarVariant: "sidebar" | "floating" | "inset";
  grayMode: boolean;
  colorWeakMode: boolean;
  tabType: TabType;
  tabSortable: boolean;
  headerFixed: boolean;
  footerFixed: boolean;
  showFooter: boolean;
  collapsibleType: CollapsibleType;
  icpLink: string;
  icp: string;
  copyrightDate: string;
  companyName: string;
  companySiteLink: string;
  pageTransition: PageTransitionType;
  watermarkEnabled: boolean;
  watermarkContent: string;
  watermarkColor: string;
  checkUpdateEnabled: boolean;
  /**
   * 是否在菜单中展示所有路由，但无权限时仅内容区域 fallback 到 403
   * false: 按角色过滤菜单
   * true: 菜单展示所有路由，权限由布局 AuthGuard 控制并显示 403
   */
  showAllMenuWith403: boolean;
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
        themeColorPresets: ThemeColorPresets.Pink,
        themeMode: ThemeMode.Light,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        breadCrumbVariant: "ribbon",
        multiTab: true,
        fontFamily: FontFamilyPreset.openSans,
        fontSize: Number(typographyTokens.fontSize.sm),
        direction: Direction.LTR,
        sidebarOpen: true,
        sidebarVariant: "inset",
        grayMode: false,
        colorWeakMode: false,
        tabType: TabType.Chrome,
        tabSortable: true,
        headerFixed: false,
        footerFixed: false,
        showFooter: true,
        collapsibleType: "icon",
        icpLink: "",
        icp: "",
        copyrightDate: "",
        companyName: GLOBAL_CONFIG.appName,
        companySiteLink: "https://react-admin-rolldown.vercel.app/",
        pageTransition: "fadeInLeft",
        watermarkEnabled: false,
        watermarkContent: GLOBAL_CONFIG.appName,
        watermarkColor: "#ec4899",
        checkUpdateEnabled: true,
        showAllMenuWith403: false,
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

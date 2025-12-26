import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BackendMenuItem } from "@/api/services/menu-service";
import type { MenuItemsData } from "@/utils/menu";

/** localStorage key for persisted menu */
const MENU_STORAGE_KEY = "backendMenu";

export type MenuStore = {
  /** 处理后的菜单数据，用于渲染 */
  menuData: MenuItemsData | null;
  /** 后端原始菜单数据，用于持久化和恢复路由 */
  backendMenu: BackendMenuItem[] | null;
  actions: {
    setMenuData: (data: MenuItemsData) => void;
    setBackendMenu: (menu: BackendMenuItem[]) => void;
    clearMenuData: () => void;
  };
};

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      menuData: null,
      backendMenu: null,
      actions: {
        setMenuData: (data) => set({ menuData: data }),
        setBackendMenu: (menu) => set({ backendMenu: menu }),
        clearMenuData: () => set({ menuData: null, backendMenu: null }),
      },
    }),
    {
      name: MENU_STORAGE_KEY,
      // 只持久化 backendMenu，menuData 可以从 backendMenu 重新生成
      partialize: (state) => ({ backendMenu: state.backendMenu }),
    }
  )
);

export default useMenuStore;

export const useMenuData = () => useMenuStore((state) => state.menuData);
export const useBackendMenu = () => useMenuStore((state) => state.backendMenu);
export const useMenuActions = () => useMenuStore((state) => state.actions);

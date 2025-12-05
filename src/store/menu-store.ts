import { create } from "zustand";
import type { MenuItemsData } from "@/utils/menu";

export type MenuStore = {
  menuData: MenuItemsData | null;
  actions: {
    setMenuData: (data: MenuItemsData) => void;
    clearMenuData: () => void;
  };
};

const useMenuStore = create<MenuStore>((set) => ({
  menuData: null,
  actions: {
    setMenuData: (data) => set({ menuData: data }),
    clearMenuData: () => set({ menuData: null }),
  },
}));

export const useMenuData = () => useMenuStore((state) => state.menuData);
export const useMenuActions = () => useMenuStore((state) => state.actions);

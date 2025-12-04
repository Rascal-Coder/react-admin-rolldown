import type * as React from "react";
import { create } from "zustand";
import type { MenuItemData } from "@/components/ui/layout/tree-menu/types";

export type MenuStoreData = {
  menuItems: MenuItemData[];
  flattenMenuItems: Map<React.Key, MenuItemData>;
  allFlattenMenuItems: Map<React.Key, MenuItemData>;
};

type MenuStore = {
  menuData: MenuStoreData | null;
  actions: {
    setMenuData: (data: MenuStoreData) => void;
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

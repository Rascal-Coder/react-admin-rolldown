import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum } from "#/enum";
import type { LayoutTabItem } from "@/components/ui/layout/tabs/types";

export type TabsStore = {
  tabs: LayoutTabItem[];
  activeTab: string;
  reloadFlag: boolean;
  actions: {
    setTabs: (tabs: LayoutTabItem[]) => void;
    setActiveTab: (activeTab: string) => void;
    updateTabs: (fn: (draft: LayoutTabItem[]) => void) => void;
    clearTabs: () => void;
    setReloadFlag: (reloadFlag: boolean) => void;
  };
};

const useTabsStore = create<TabsStore>()(
  persist(
    (set) => ({
      tabs: [],
      activeTab: "",
      reloadFlag: false,
      actions: {
        setTabs: (tabs) => {
          set({ tabs });
        },
        setActiveTab: (activeTab) => {
          set({ activeTab });
        },
        updateTabs: (fn) => {
          set(
            produce((state: TabsStore) => {
              fn(state.tabs);
            })
          );
        },
        setReloadFlag: (reloadFlag) => {
          set({ reloadFlag });
        },
        clearTabs: () => {
          useTabsStore.persist.clearStorage();
          set({ tabs: [], activeTab: "" });
        },
      },
    }),
    {
      name: StorageEnum.Tabs,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tabs: state.tabs,
        activeTab: state.activeTab,
      }),
    }
  )
);

export const useTabsData = () => useTabsStore((state) => state.tabs);
export const useActiveTab = () => useTabsStore((state) => state.activeTab);
export const useReloadFlag = () => useTabsStore((state) => state.reloadFlag);
export const useTabsActions = () => useTabsStore((state) => state.actions);

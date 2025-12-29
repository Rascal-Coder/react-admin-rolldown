import { useCallback, useEffect, useRef } from "react";
import type { RouteConfig } from "@/routes/types";
import { useCacheActions } from "@/store/cache-store";
import { useActiveTab, useTabsActions, useTabsData } from "@/store/tabs-store";
import type { LayoutTabItem } from "../types";
import {
  createTabFromRoute,
  createTabItem,
  isValidRouteForTab,
  updateTabFromRoute,
} from "./utils";

export interface UseTabsOptions {
  defaultActiveTab?: string;
  curRoute?: RouteConfig;
  pathname?: string;
  onNavigate?: (pathname: string) => void;
  flattenRoutes?: Map<string, RouteConfig>;
  onScrollToTab?: (tabKey: string) => void;
}

export function useTabs(options?: UseTabsOptions) {
  const {
    defaultActiveTab,
    curRoute,
    pathname,
    onNavigate,
    flattenRoutes,
    onScrollToTab,
  } = options || {};

  // 从 store 获取状态
  const tabs = useTabsData();
  const activeTab = useActiveTab();
  const { setActiveTab, updateTabs: updateTabsInStore } = useTabsActions();
  const { setRemoveCacheKey } = useCacheActions();

  const prevPathnameRef = useRef<string | undefined>(undefined);
  const prevFlattenRoutesRef = useRef<Map<string, RouteConfig> | undefined>(
    undefined
  );
  const isInitializedRef = useRef(false);

  // 更新tabs
  const updateTabs = useCallback(
    (fn: (draft: LayoutTabItem[]) => void) => {
      updateTabsInStore(fn);
    },
    [updateTabsInStore]
  );

  // 激活 tab 并导航
  const activateTabAndNavigate = useCallback(
    (tabKey: string) => {
      // 更新当前激活的 tab
      setActiveTab(tabKey);

      // 只有当目标路径与当前路径不一致时才执行导航，避免重复 push
      if (onNavigate && pathname !== tabKey) {
        onNavigate(tabKey);
      }

      // 滚动到对应的 tab
      if (onScrollToTab) {
        requestAnimationFrame(() => {
          onScrollToTab(tabKey);
        });
      }
    },
    [onNavigate, onScrollToTab, pathname, setActiveTab]
  );

  // 添加或更新tab
  const addOrUpdateTab = useCallback(
    (route: RouteConfig, routePathname: string, shouldActivate = true) => {
      if (!isValidRouteForTab(route)) {
        return;
      }

      updateTabs((draft) => {
        const existingTabIndex = draft.findIndex(
          (tab) => tab.key === routePathname
        );

        if (existingTabIndex !== -1) {
          // 如果tab已存在，更新它
          updateTabFromRoute(draft[existingTabIndex], route);
        } else {
          // 如果tab不存在，添加新tab
          const newTab = createTabFromRoute(route, routePathname);
          draft.push(newTab);
        }
      });

      // 如果需要激活，则激活
      if (shouldActivate) {
        activateTabAndNavigate(routePathname);
      }
    },
    [updateTabs, activateTabAndNavigate]
  );

  // 初始化默认激活的 tab（仅在第一次没有 activeTab 时）
  useEffect(() => {
    if (activeTab) {
      return;
    }

    if (defaultActiveTab) {
      setActiveTab(defaultActiveTab);
    } else if (pathname) {
      setActiveTab(pathname);
    }
  }, [defaultActiveTab, pathname, activeTab, setActiveTab]);

  // 当路由配置变化时，更新所有已存在的 tabs 配置
  useEffect(() => {
    if (!flattenRoutes) {
      return;
    }

    // 检查 flattenRoutes 是否真的变化了
    if (prevFlattenRoutesRef.current === flattenRoutes) {
      return;
    }

    // 如果是首次初始化或路由配置发生变化，更新所有 tabs
    updateTabs((draft) => {
      for (const tab of draft) {
        const route = flattenRoutes.get(tab.key);
        if (route && isValidRouteForTab(route)) {
          updateTabFromRoute(tab, route);
        }
      }
    });

    prevFlattenRoutesRef.current = flattenRoutes;
    isInitializedRef.current = true;
  }, [flattenRoutes, updateTabs]);

  // 处理路由变化：添加或更新当前路由对应的 tab
  useEffect(() => {
    if (!curRoute) {
      return;
    }
    if (!pathname) {
      return;
    }

    // 如果路由没有变化，不处理
    if (prevPathnameRef.current === pathname) {
      return;
    }

    prevPathnameRef.current = pathname;

    // 添加或更新 tab，并激活它
    addOrUpdateTab(curRoute, pathname, true);
  }, [curRoute, pathname, addOrUpdateTab]);

  const handleTabItemClick = useCallback(
    (item: LayoutTabItem) => {
      activateTabAndNavigate(item.key);
    },
    [activateTabAndNavigate]
  );

  // 处理关闭当前激活tab时的导航逻辑
  const handleActiveTabClose = useCallback(
    (prevTabs: LayoutTabItem[], tabIndex: number) => {
      // 优先选择右侧的 tab（后一个），如果是最后一个则选择左侧的 tab（前一个）
      const nextTabIndex =
        tabIndex < prevTabs.length - 1 ? tabIndex + 1 : tabIndex - 1;
      const nextTab = prevTabs[nextTabIndex];
      if (nextTab) {
        activateTabAndNavigate(nextTab.key);
      }
    },
    [activateTabAndNavigate]
  );

  const handleCloseTab = useCallback(
    (tabKey: string) => {
      updateTabs((draft) => {
        // 如果是最后一个标签页，不允许关闭
        if (draft.length <= 1) {
          return;
        }

        // 找到要关闭的标签页索引
        const tabIndex = draft.findIndex((tab) => tab.key === tabKey);

        // 如果标签页不存在，直接返回
        if (tabIndex === -1) {
          return;
        }

        // 如果是固定的标签页，不允许关闭
        if (draft[tabIndex].pinned) {
          return;
        }

        // 如果关闭的是当前选中的标签页，选择下一个或上一个标签页并导航
        if (activeTab === tabKey) {
          handleActiveTabClose(draft, tabIndex);
        }

        // 移除标签页
        draft.splice(tabIndex, 1);
      });

      // 通知 cache-store 移除该路由的缓存
      setRemoveCacheKey(tabKey);
    },
    [updateTabs, activeTab, handleActiveTabClose, setRemoveCacheKey]
  );

  // 添加新的tab
  const addTabItem = useCallback(
    (tabItem: Omit<LayoutTabItem, "key"> & { key?: string }) => {
      const key = tabItem.key || tabItem.title;

      updateTabs((draft) => {
        // 检查tab是否已存在
        const existingTabIndex = draft.findIndex((tab) => tab.key === key);

        if (existingTabIndex !== -1) {
          // 如果已存在，激活该tab并"刷新"（更新title等属性）
          Object.assign(draft[existingTabIndex], tabItem, { key });
          activateTabAndNavigate(key);
        } else {
          // 如果不存在，添加新tab并激活
          const newTab = createTabItem(tabItem);
          draft.push(newTab);
          activateTabAndNavigate(key);
        }
      });
    },
    [updateTabs, activateTabAndNavigate]
  );

  return {
    activeTab,
    setActiveTab,
    tabs,
    updateTabs,
    handleTabItemClick,
    handleCloseTab,
    addTabItem,
  };
}

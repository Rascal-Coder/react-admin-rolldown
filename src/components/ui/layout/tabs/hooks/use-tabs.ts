import { produce } from "immer";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RouteConfig } from "@/lib/router-toolset/types";
import type { LayoutTabItem } from "../types";

const TABS_CACHE_KEY = "layout-tabs-data";
const ACTIVE_TAB_CACHE_KEY = "layout-active-tab";

export interface UseTabsOptions {
  defaultActiveTab?: string;
  curRoute?: RouteConfig;
  pathname?: string;
  onNavigate?: (pathname: string) => void;
}

export function useTabs(options?: UseTabsOptions) {
  const { defaultActiveTab, curRoute, pathname, onNavigate } = options || {};

  const [tabs, setTabs] = useState<LayoutTabItem[]>([]);
  const prevPathnameRef = useRef<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  // 从localStorage恢复激活的tab
  const getInitialActiveTab = useCallback(() => {
    if (defaultActiveTab) {
      return defaultActiveTab;
    }

    if (pathname) {
      return pathname;
    }

    try {
      const cached = localStorage.getItem(ACTIVE_TAB_CACHE_KEY);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn("Failed to get active tab from cache:", error);
    }

    return "";
  }, [defaultActiveTab, pathname]);

  const [activeTab, setActiveTab] = useState(getInitialActiveTab());

  // 缓存tabs到localStorage
  const cacheTabs = useCallback((tabsToCache: LayoutTabItem[]) => {
    try {
      localStorage.setItem(TABS_CACHE_KEY, JSON.stringify(tabsToCache));
    } catch (error) {
      console.warn("Failed to cache tabs:", error);
    }
  }, []);

  // 从localStorage恢复tabs
  const restoreCachedTabs = useCallback(() => {
    try {
      const cached = localStorage.getItem(TABS_CACHE_KEY);
      if (cached) {
        const parsedTabs = JSON.parse(cached) as LayoutTabItem[];
        return parsedTabs;
      }
    } catch (error) {
      console.warn("Failed to restore tabs from cache:", error);
    }
    return null;
  }, []);

  // 更新tabs的函数
  const updateTabs = useCallback(
    (fn: (draft: LayoutTabItem[]) => void) => {
      setTabs((prev) => {
        const newTabs = produce(prev, fn);
        cacheTabs(newTabs);
        return newTabs;
      });
    },
    [cacheTabs]
  );

  // 添加或更新tab的通用函数
  const addOrUpdateTab = useCallback(
    (route: RouteConfig, routePathname: string) => {
      // 跳过重定向路由
      if (route.redirect) {
        return;
      }

      // 跳过没有组件的路由（通常是父路由）
      if (!route.component) {
        return;
      }

      updateTabs((draft) => {
        const existingTabIndex = draft.findIndex(
          (tab) => tab.key === routePathname
        );

        if (existingTabIndex !== -1) {
          // 如果tab已存在，更新它并激活
          draft[existingTabIndex].title =
            route.name || route.helmet || routePathname;
          setActiveTab(routePathname);
        } else {
          // 如果tab不存在，添加新tab并激活
          const newTab: LayoutTabItem = {
            key: routePathname,
            title: route.name || route.helmet || routePathname,
            closable: true,
            pinned: false,
            icon: route.icon,
          };
          draft.push(newTab);
          setActiveTab(routePathname);
        }
      });
    },
    [updateTabs]
  );

  // 初始化时恢复缓存
  useEffect(() => {
    const cachedTabs = restoreCachedTabs();
    if (cachedTabs && cachedTabs.length > 0) {
      setTabs(cachedTabs);
    }
    // 标记为已初始化
    setIsInitialized(true);
  }, [restoreCachedTabs]);

  // 初始化时检查当前路由并创建tab
  useEffect(() => {
    // 等待缓存恢复完成后再处理
    if (!isInitialized) {
      return;
    }

    // 如果没有路由信息，不处理
    if (!curRoute) {
      return;
    }
    if (!pathname) {
      return;
    }

    // 检查当前路由是否已经在tabs中
    setTabs((prevTabs) => {
      const existingTab = prevTabs.find((tab) => tab.key === pathname);
      // 如果tab不存在且路由有效，创建它
      if (!existingTab) {
        // 跳过重定向路由
        if (curRoute.redirect) {
          return prevTabs;
        }

        // 跳过没有组件的路由（通常是父路由）
        if (!curRoute.component) {
          return prevTabs;
        }
        console.log("curRoute.icon", curRoute.icon);
        // 添加新tab并激活
        const newTab: LayoutTabItem = {
          key: pathname,
          title: curRoute.name || curRoute.helmet || pathname,
          closable: true,
          pinned: false,
          icon: curRoute.icon,
        };

        setActiveTab(pathname);
        return [...prevTabs, newTab];
      }
      // 如果tab已存在，只有当 pathname 与当前 activeTab 不同时才更新激活状态
      setActiveTab((currentActiveTab) => {
        if (currentActiveTab !== pathname) {
          return pathname;
        }
        return currentActiveTab;
      });
      return prevTabs;
    });
  }, [isInitialized, curRoute, pathname]);

  // 监听路由变化，动态添加/更新tab
  useEffect(() => {
    // 如果没有路由信息，不处理
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

    // 更新当前路径引用
    prevPathnameRef.current = pathname;

    // 添加或更新tab
    addOrUpdateTab(curRoute, pathname);
  }, [curRoute, pathname, addOrUpdateTab]);

  // 缓存激活的tab
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_CACHE_KEY, activeTab);
    } catch (error) {
      console.warn("Failed to cache active tab:", error);
    }
  }, [activeTab]);

  const handleTabItemClick = (item: LayoutTabItem) => {
    setActiveTab(item.key);
    // 导航到对应的路由
    if (onNavigate) {
      onNavigate(item.key);
    }
  };

  // 处理关闭当前激活tab时的导航逻辑
  const handleActiveTabClose = (
    prevTabs: LayoutTabItem[],
    tabIndex: number
  ) => {
    // 优先选择右侧的 tab（后一个），如果是最后一个则选择左侧的 tab（前一个）
    const nextTabIndex =
      tabIndex < prevTabs.length - 1 ? tabIndex + 1 : tabIndex - 1;
    const nextTab = prevTabs[nextTabIndex];
    if (nextTab) {
      setActiveTab(nextTab.key);
      // 导航到下一个tab对应的路由
      if (onNavigate) {
        onNavigate(nextTab.key);
      }
    }
  };

  const handleCloseTab = (tabKey: string) => {
    updateTabs((draft) => {
      // 如果是最后一个标签页，不允许关闭
      if (draft.length <= 1) {
        return;
      }

      // 找到要关闭的标签页索引
      const tabIndex = draft.findIndex((tab) => tab.key === tabKey);

      // 如果关闭的是当前选中的标签页，选择下一个或上一个标签页并导航
      if (activeTab === tabKey) {
        handleActiveTabClose(draft, tabIndex);
      }

      // 移除标签页
      draft.splice(tabIndex, 1);
    });
  };

  // 添加新的tab
  const addTabItem = (
    tabItem: Omit<LayoutTabItem, "key"> & { key?: string }
  ) => {
    const key = tabItem.key || tabItem.title;

    updateTabs((draft) => {
      // 检查tab是否已存在
      const existingTabIndex = draft.findIndex((tab) => tab.key === key);

      if (existingTabIndex !== -1) {
        // 如果已存在，激活该tab并"刷新"（更新title等属性）
        Object.assign(draft[existingTabIndex], tabItem, { key });
        setActiveTab(key);
      } else {
        // 如果不存在，添加新tab并激活
        const newTab: LayoutTabItem = {
          ...tabItem,
          key,
          title: tabItem.title || key,
        };
        draft.push(newTab);
        setActiveTab(key);
      }
    });
  };

  return {
    activeTab,
    setActiveTab,
    tabs,
    updateTabs,
    handleTabItemClick,
    handleCloseTab,
    addTabItem,
    cacheTabs,
    restoreCachedTabs,
  };
}

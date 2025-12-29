import type { RouteConfig } from "@/routes/types";
import type { LayoutTabItem } from "../types";

/**
 * 检查路由是否有效（可以创建 tab）
 */
export function isValidRouteForTab(route: RouteConfig): boolean {
  // 跳过重定向路由
  if (route.redirect) {
    return false;
  }
  // 跳过没有 lazy 组件的路由（通常是父路由）
  if (!route.lazy) {
    return false;
  }
  return true;
}

/**
 * 从路由配置创建 tab 项
 */
export function createTabFromRoute(
  route: RouteConfig,
  routePathname: string
): LayoutTabItem {
  return {
    key: routePathname,
    title: route.name || routePathname,
    closable: true,
    pinned: route.pinned ?? false,
    icon: route.icon,
  };
}

/**
 * 从部分 tab 数据创建完整的 tab 项
 */
export function createTabItem(
  tabItem: Omit<LayoutTabItem, "key"> & { key?: string }
): LayoutTabItem {
  const key = tabItem.key || tabItem.title;
  return {
    ...tabItem,
    key,
    title: tabItem.title || key,
  };
}

/**
 * 从路由配置更新 tab 项
 */
export function updateTabFromRoute(
  tab: LayoutTabItem,
  route: RouteConfig
): void {
  tab.title = route.name || tab.key;
  if (route.icon !== undefined) {
    tab.icon = route.icon;
  }
  if (route.pinned !== undefined) {
    tab.pinned = route.pinned;
  }
}

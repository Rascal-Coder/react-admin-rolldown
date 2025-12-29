import type { BackendMenuItem } from "@/api/services/menu-service";
import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "./create-router";

// 按 order 字段排序
function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// 将单个后端菜单项转换为 RouteConfig
function backendMenuItemToRoute(item: BackendMenuItem): RouteConfig {
  const route: RouteConfig = {
    path: item.path,
    name: item.name,
    icon: item.icon,
    hidden: item.hidden,
    keepAlive: item.keepAlive,
    pinned: item.pinned,
    flatten: item.flatten,
    caseSensitive: item.caseSensitive,
    order: item.order,
    badgeType: item.badgeType,
    badgeText: item.badgeText,
    badgeVariant: item.badgeVariant,
  };

  // 根据后端返回的 component 字段创建懒加载组件
  if (item.component) {
    route.lazy = createLazyComponent(item.component);
  } else if (item.externalUrl) {
    // 有 externalUrl 时，根据 isIframe 决定使用 iframe 还是新窗口打开
    const url = item.externalUrl;
    const useIframe = item.isIframe ?? false;
    route.lazy = async () => {
      const module = useIframe
        ? await import("@/pages/_built/link/iframe")
        : await import("@/pages/_built/link/external-link");
      const Component = module.default;
      return {
        Component: () => <Component src={url} />,
      };
    };
  }

  // 处理子路由
  if (item.children && item.children.length > 0) {
    const sortedChildren = sortByOrder(item.children);
    route.children = sortedChildren.map(backendMenuItemToRoute);

    // 如果有 redirect，在 children 开头插入索引重定向路由
    if (item.redirect) {
      route.children.unshift({ redirect: item.redirect });
    }
  }

  return route;
}

// 后端菜单树转换为动态业务路由列表
export function backendMenuToDynamicRoutes(
  menuList: BackendMenuItem[]
): RouteConfig[] {
  const sortedList = sortByOrder(menuList);
  return sortedList.map(backendMenuItemToRoute);
}

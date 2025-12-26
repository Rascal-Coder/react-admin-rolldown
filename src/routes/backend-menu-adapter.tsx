import type { BackendMenuItem } from "@/api/services/menu-service";
import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "./utils";

// 将单个后端菜单项转换为 RouteConfig（权限仍由前端路由配置自己控制）
function backendMenuItemToRoute(item: BackendMenuItem): RouteConfig {
  const route: RouteConfig = {
    path: item.path,
    name: item.name,
    icon: item.icon,
    hidden: item.hidden,
    // 支持所有后端可返回的 RouteConfig 字段
    keepAlive: item.keepAlive,
    pinned: item.pinned,
    progress: item.progress,
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

  if (item.redirect) {
    route.redirect = item.redirect;
  }

  if (item.children && item.children.length > 0) {
    route.children = item.children.map(backendMenuItemToRoute);
  }

  return route;
}

// 后端菜单树转换为动态业务路由列表
export function backendMenuToDynamicRoutes(
  menuList: BackendMenuItem[]
): RouteConfig[] {
  return menuList.map(backendMenuItemToRoute);
}

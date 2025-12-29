import type { RouteConfig } from "@/routes/types";
import { dynamicRoutes } from "./dynamic";
import { staticRoutes } from "./static";

/**
 * 工具方法：合并静态路由和传入的动态路由
 *
 * 将动态路由注入到静态路由的基础布局容器中
 * 这样可以在保持向后兼容的同时，为后续的权限控制提供基础
 */
function mergeStaticAndDynamic(dynamic: RouteConfig[]): RouteConfig[] {
  // 深拷贝静态路由，避免修改原始配置
  const routes: RouteConfig[] = staticRoutes.map((route) => ({
    ...route,
    children: route.children ? [...route.children] : undefined,
  }));

  // 找到基础布局容器路由（path 为 "/" 且包含 LayoutBase）
  const baseLayoutRoute = routes.find(
    (route) => route.path === "/" && route.lazy && route.flatten === true
  );

  // 将动态路由注入到基础布局容器的 children 中
  if (baseLayoutRoute) {
    baseLayoutRoute.children = [
      ...(baseLayoutRoute.children || []),
      ...dynamic,
    ];
  }

  return routes;
}

/**
 * 前端路由模式下，使用本地 dynamicRoutes 合并路由
 */
export function getRoutesConfig(): RouteConfig[] {
  return mergeStaticAndDynamic(dynamicRoutes);
}

/**
 * 通用方法：使用外部传入的动态路由构建完整路由表（用于后端路由模式）
 */
export function buildRoutesWithDynamic(dynamic: RouteConfig[]): RouteConfig[] {
  return mergeStaticAndDynamic(dynamic);
}

export const routesConfig: RouteConfig[] = getRoutesConfig();

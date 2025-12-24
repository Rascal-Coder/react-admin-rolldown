import type { RouteConfig } from "@/lib/router-toolset/types";
import { dynamicRoutes } from "./dynamic";
import { staticRoutes } from "./static";

/**
 * 合并静态路由和动态路由
 *
 * 将动态路由注入到静态路由的基础布局容器中
 * 这样可以在保持向后兼容的同时，为后续的权限控制提供基础
 *
 * @param permissions 用户权限列表，用于过滤路由。如果不提供，则返回所有路由（不进行权限过滤）
 * @returns 合并后的路由配置数组
 */
export function getRoutesConfig(): RouteConfig[] {
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
      ...dynamicRoutes,
    ];
  }

  return routes;
}

/**
 * 默认路由配置（不进行权限过滤，用于向后兼容）
 * 注意：在生产环境中，应该使用 getRoutesConfig(permissions) 来获取过滤后的路由
 */
export const routesConfig: RouteConfig[] = getRoutesConfig();

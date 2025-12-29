import {
  createBrowserRouter,
  createHashRouter,
  matchRoutes,
  type RouteObject,
} from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";

import type { RouteConfig } from "./types";
import { formatRoutes, generateReactRoutes } from "./utils";

interface RouterOptions {
  /**
   * 开发或生产环境服务的公共基础路径，
   * 无子路径可不填，默认值 '/'
   * @example '/subpath'
   */
  basename?: string;
}

const regPath = /\/$/;

/**
 * 根据配置创建路由实例
 *
 * 支持 history 和 hash 两种模式，由 globalConfig.routerMode 控制
 */
function createRouterInstance() {
  const routerCreator =
    GLOBAL_CONFIG.routerMode === "hash"
      ? createHashRouter
      : createBrowserRouter;

  return routerCreator;
}
/**
 * 创建基于 React Router Data Router API 的路由实例
 * @param routesConfig 路由配置数组
 * @param options 路由选项
 * @returns React Router 实例和路由信息
 */
export function createRouter(
  routesConfig: RouteConfig[],
  options?: RouterOptions
) {
  const basename = options?.basename || "/";

  // 生成 React Router 格式的路由
  const reactRoutes = generateReactRoutes(routesConfig);

  // 格式化路由，生成 pathname 和扁平化映射
  const { routes, flattenRoutes } = formatRoutes(routesConfig);

  const routerCreator = createRouterInstance();
  // 创建 React Router 实例
  const router = routerCreator(reactRoutes, {
    basename: basename !== "/" ? basename : undefined,
  });

  return {
    router,
    reactRoutes,
    routes,
    flattenRoutes,
    basename,
  };
}

/**
 * 从 pathname 获取路由路径（routePath）
 * routePath 里可能有动态参数如 :id
 * @param reactRoutes React Router 格式的路由配置
 * @param pathname 当前路径名
 * @returns 路由路径，例如 '/:id/home'
 */
export function getRoutePathFromPathname(
  reactRoutes: RouteObject[],
  pathname: string
): string {
  const matchedRoutes = matchRoutes(reactRoutes, pathname);
  const routePath =
    matchedRoutes
      ?.map((item) => {
        const reactRoutePath = item.route.path === "/" ? "" : item.route.path;
        return reactRoutePath;
      })
      .join("/")
      .replace(regPath, "") ?? "";
  return routePath;
}

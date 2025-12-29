import { useMemo } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  matchRoutes,
  type RouteObject,
  useLocation,
} from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import {
  useFlattenRoutes,
  useReactRoutes,
  useRoutes,
} from "@/store/router-store";
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

/**
 * 在 React 组件中获取路由信息的 Hook
 * 从 RouterContext 中获取路由实例信息
 * @returns 路由信息对象
 */
export function useRouter() {
  // const routerContext = useRouterContext();
  const reactRoutes = useReactRoutes();
  const flattenRoutes = useFlattenRoutes();
  const routes = useRoutes();
  const location = useLocation();

  // 计算当前路由路径
  const routePath = useMemo(
    () => getRoutePathFromPathname(reactRoutes, location.pathname),
    [reactRoutes, location.pathname]
  );

  // 获取当前路由配置
  const curRoute = useMemo(
    () => flattenRoutes.get(routePath),
    [flattenRoutes, routePath]
  );

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    curRoute,
  };
}

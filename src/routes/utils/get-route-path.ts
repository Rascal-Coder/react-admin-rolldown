import { matchRoutes, type RouteObject } from "react-router";

const regPath = /\/$/;

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

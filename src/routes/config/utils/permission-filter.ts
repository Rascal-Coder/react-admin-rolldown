import type { Role } from "@/_mock/assets";
import type { RouteConfig } from "@/routes/types";

/**
 * 根据用户角色过滤路由配置
 *
 * 规则：
 * 1. 如果路由没有设置 permission 字段，则保留该路由（默认允许访问）
 * 2. 如果路由设置了 permission 字段，则检查用户角色列表中是否包含该角色
 * 3. 角色匹配规则：检查 role.code 是否等于路由的 permission 字段值（注意：这里的 permission 字段实际存储的是 role code）
 * 4. 递归处理子路由，如果父路由被过滤，子路由也会被过滤
 *
 * @param routes 路由配置数组
 * @param roles 用户角色列表
 * @returns 过滤后的路由配置数组
 */
export function filterRoutesByRole(
  routes: RouteConfig[],
  roles: Role[] = []
): RouteConfig[] {
  // 如果没有角色列表，返回所有没有设置 permission 的路由
  if (!roles || roles.length === 0) {
    return routes.filter((route) => !route.permission);
  }

  // 创建角色代码集合，用于快速查找
  const roleCodes = new Set(roles.map((r) => r.code));

  /**
   * 递归过滤路由
   */
  function filterRoute(route: RouteConfig): RouteConfig | null {
    // 如果路由设置了 permission（实际是 role code），检查用户是否有该角色
    // 如果用户没有该角色，过滤掉该路由及其所有子路由
    if (route.permission && !roleCodes.has(route.permission)) {
      return null;
    }

    // 处理子路由
    let filteredChildren: RouteConfig[] | undefined;
    if (route.children && route.children.length > 0) {
      filteredChildren = route.children
        .map((child) => filterRoute(child))
        .filter((child): child is RouteConfig => child !== null);

      // 如果所有子路由都被过滤，且当前路由没有其他内容，则过滤掉当前路由
      // 但如果路由有 redirect 或 lazy，即使没有子路由也应该保留
      if (filteredChildren.length === 0 && !route.redirect && !route.lazy) {
        return null;
      }
    }

    // 返回过滤后的路由配置
    return {
      ...route,
      children: filteredChildren,
    };
  }

  return routes
    .map((route) => filterRoute(route))
    .filter((route): route is RouteConfig => route !== null);
}

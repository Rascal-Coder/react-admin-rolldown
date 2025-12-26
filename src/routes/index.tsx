import { GLOBAL_CONFIG } from "@/global-config";
import type { RouteConfig } from "@/lib/router-toolset/types";
import { formatRoutes, generateReactRoutes } from "@/lib/router-toolset/utils";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import { getRoutesConfig } from "./config";
import { staticRoutes } from "./config/static";

const basename = GLOBAL_CONFIG.basename;

/**
 * 获取静态路由配置（仅包含认证页面、错误页面等基础路由）
 * 用于后端路由模式下的初始化
 */
export function getStaticRoutesConfig(): RouteConfig[] {
  return staticRoutes;
}

/**
 * 根据 authRouteMode 创建路由实例
 * - frontend: 使用本地 dynamicRoutes（前端路由模式）
 * - backend:  只加载静态路由，动态路由在登录后加载
 */
export function createAppRouter() {
  let routesConfig: RouteConfig[];
  let isRoutesLoaded: boolean;

  if (GLOBAL_CONFIG.authRouteMode === "backend") {
    routesConfig = getStaticRoutesConfig();
    isRoutesLoaded = false;
  } else {
    routesConfig = getRoutesConfig();
    isRoutesLoaded = true;
  }

  // 生成 React Router 格式的路由
  const reactRoutes = generateReactRoutes(routesConfig);

  // 格式化路由，生成 pathname 和扁平化映射
  const { routes, flattenRoutes } = formatRoutes(routesConfig);

  // 初始化 keepAlive 路由的缓存键
  initCacheRoutesFromRouter(flattenRoutes);

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    basename,
    isRoutesLoaded,
  };
}

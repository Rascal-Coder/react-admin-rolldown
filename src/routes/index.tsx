import { GLOBAL_CONFIG } from "@/global-config";
import type { RouteConfig } from "@/routes/types";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import routerStore from "@/store/router-store";
import { getRoutesConfig } from "./config";
import { staticRoutes } from "./config/static";
import { formatRoutes, generateReactRoutes } from "./utils";
import { createDataRouter } from "./utils/create-router";

const basename = GLOBAL_CONFIG.basename;
const authRouteMode = GLOBAL_CONFIG.authRouteMode;
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
function createAppRouter() {
  let routesConfig: RouteConfig[];

  if (authRouteMode === "backend") {
    routesConfig = getStaticRoutesConfig();
  } else {
    routesConfig = getRoutesConfig();
  }

  // 生成 React Router 格式的路由
  const reactRoutes = generateReactRoutes(routesConfig);

  // 格式化路由，生成 pathname 和扁平化映射
  const { routes, flattenRoutes } = formatRoutes(routesConfig);

  routerStore
    .getState()
    .actions.setRouterState(routes, reactRoutes, flattenRoutes);
  // 初始化 keepAlive 路由的缓存键
  initCacheRoutesFromRouter(flattenRoutes);

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    basename,
    authRouteMode,
  };
}

export const routerInstance = createAppRouter();

export const router = createDataRouter(
  routerInstance.reactRoutes,
  routerInstance.basename
);

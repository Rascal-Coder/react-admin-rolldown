import menuService from "@/api/services/menuService";
import { GLOBAL_CONFIG } from "@/global-config";
import { createRouter } from "@/lib/router-toolset/router";
import type { RouteConfig } from "@/lib/router-toolset/types";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import { backendMenuToDynamicRoutes } from "./backend-menu-adapter";
import { buildRoutesWithDynamic, getRoutesConfig } from "./config";

const basename = GLOBAL_CONFIG.basename;

/**
 * 根据 authRouteMode 创建路由实例
 * - frontend: 使用本地 dynamicRoutes（前端路由模式）
 * - backend:  调用后端 getMenuList，转换为 RouteConfig 作为动态路由
 */
export async function createAppRouter() {
  let routesConfig: RouteConfig[];

  if (GLOBAL_CONFIG.authRouteMode === "backend") {
    // 后端路由模式：从后端获取菜单并转换为动态路由
    const menuList = await menuService.getMenuList();
    const backendDynamicRoutes = backendMenuToDynamicRoutes(menuList);
    routesConfig = buildRoutesWithDynamic(backendDynamicRoutes);
  } else {
    // 前端路由模式：沿用原有本地 dynamicRoutes
    routesConfig = getRoutesConfig();
  }

  // 创建路由实例
  const routerInstance = createRouter(routesConfig, {
    basename,
  });

  // 初始化 keepAlive 路由的缓存键
  initCacheRoutesFromRouter(routerInstance.flattenRoutes);

  return routerInstance;
}

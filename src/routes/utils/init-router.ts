import type { RouteObject } from "react-router";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import menuStore from "@/store/menu-store";
import routerStore from "@/store/router-store";
import { generateMenuItems } from "@/utils/menu";
import { backendMenuToDynamicRoutes } from "./backend-menu-adapter";
import { formatRoutes, generateReactRoutes } from "./index";

/**
 * 初始化后端路由模式下的动态路由
 * 将后端菜单数据转换为 React Router 路由并注入到 base-layout 下
 */
export function initAuthRoutes(
  patchRoutes: (parentId: string | null, routes: RouteObject[]) => void
) {
  const menuList = menuStore.getState().backendMenu;

  if (!menuList || menuList.length === 0) {
    console.warn("[initAuthRoutes] No backend menu data found");
    return;
  }

  // 1. 后端菜单 -> RouteConfig[]
  const dynamicRoutes = backendMenuToDynamicRoutes(menuList);

  // 2. RouteConfig[] -> ReactRouter RouteObject[]
  const reactRoutes = generateReactRoutes(dynamicRoutes);

  // 3. 格式化路由，生成 pathname 映射和扁平化数据
  const { routes, flattenRoutes } = formatRoutes(dynamicRoutes);

  // 4. 初始化 keepAlive 路由缓存
  initCacheRoutesFromRouter(flattenRoutes);

  // 5. 生成菜单数据并存储
  const menuData = generateMenuItems(routes);
  menuStore.getState().actions.setMenuData(menuData);

  // 6. 更新 RouterStore 状态
  routerStore
    .getState()
    .actions.setRouterState(routes, reactRoutes, flattenRoutes);

  // 7. 将动态路由注入到 base-layout 下
  patchRoutes("base-layout", reactRoutes);

  console.log("[initAuthRoutes] Dynamic routes injected:", reactRoutes);
}

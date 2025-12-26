import { useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  type RouteObject,
  RouterProvider,
} from "react-router";
import { useRouterContext } from "@/lib/router-toolset/router-context";
import menuService from "./api/services/menu-service";
import App from "./app";
import GlobalLoading from "./components/ui/loading/global-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { backendMenuToDynamicRoutes } from "./routes/backend-menu-adapter";
import { useMenuActions } from "./store/menu-store";
import { useUserToken } from "./store/user-store";

// 已经 patch 过的路由路径集合
const patchedPaths = new Set<string>();
// 用于匹配路径首段的正则
const leadingSlashRegex = /^\//;

/**
 * 清除已 patch 的路径记录
 */
export function clearPatchedPaths() {
  patchedPaths.clear();
}

/**
 * 在动态路由中查找匹配的路由
 */
function findMatchingDynamicRoute(
  path: string,
  dynamicRoutes: RouteObject[]
): RouteObject | null {
  const pathSegments = path.split("/").filter(Boolean);
  if (pathSegments.length === 0) {
    return null;
  }

  const firstSegment = pathSegments[0];

  for (const route of dynamicRoutes) {
    const routePath = route.path?.replace(leadingSlashRegex, "") || "";
    if (routePath === firstSegment) {
      return route;
    }
  }

  return null;
}

/**
 * 创建 data router 实例
 */
function createDataRouter(
  initialRoutes: RouteObject[],
  basename: string,
  usePatch: boolean
) {
  const routerCreator =
    GLOBAL_CONFIG.routerMode === "hash"
      ? createHashRouter
      : createBrowserRouter;

  // 为基础布局路由添加 ID，以便 patch 时定位
  const routesWithIds = initialRoutes.map((route, index) => {
    // 找到基础布局容器（path 为 "/" 且有 lazy）
    if (route.path === "/" && route.lazy && !route.id) {
      return { ...route, id: "base-layout" };
    }
    return { ...route, id: route.id || `route-${index}` };
  });

  const options: Parameters<typeof routerCreator>[1] = {
    basename: basename !== "/" ? basename : undefined,
  };
  // 只有在动态路由模式下才使用 patchRoutesOnNavigation
  if (usePatch) {
    options.patchRoutesOnNavigation = ({ path, patch }) => {
      // 使用模块级变量获取最新的动态路由
      const currentDynamicRoutes = initialRoutes;
      if (currentDynamicRoutes.length === 0) {
        return;
      }

      // 查找匹配的动态路由
      const matchedRoute = findMatchingDynamicRoute(path, currentDynamicRoutes);
      if (!matchedRoute) {
        return;
      }

      const routePath = matchedRoute.path || "";
      if (patchedPaths.has(routePath)) {
        return;
      }

      // 将动态路由 patch 到 base-layout 的 children 中
      patch("base-layout", [matchedRoute]);
      patchedPaths.add(routePath);
    };
  }

  return routerCreator(
    [
      {
        path: "/",
        id: "root",
        Component: App,
        children: routesWithIds,
        HydrateFallback: GlobalLoading,
      },
    ],
    options
  );
}

/**
 * 动态路由模式下的 Router 组件
 * 使用 createBrowserRouter + patchRoutesOnNavigation 实现动态路由
 */
export function DynamicRouterApp() {
  const { reactRoutes, basename, updateRoutes } = useRouterContext();
  const token = useUserToken();
  const { setBackendMenu } = useMenuActions();

  // 登录后获取菜单并更新路由
  useEffect(() => {
    async function fetchMenuAfterLogin() {
      if (token) {
        const menuList = await menuService.getMenuList();
        setBackendMenu(menuList);
        const dynamicRoutes = backendMenuToDynamicRoutes(menuList);
        updateRoutes(dynamicRoutes);
      }
    }
    fetchMenuAfterLogin();
  }, [token, setBackendMenu, updateRoutes]);

  return (
    <RouterProvider router={createDataRouter(reactRoutes, basename, true)} />
  );
}

/**
 * 静态路由模式下的 Router 组件
 * 使用 createBrowserRouter 创建 data router
 */
export function StaticRouterApp({
  reactRoutes,
  basename,
}: {
  reactRoutes: RouteObject[];
  basename: string;
}) {
  const router = useMemo(
    () => createDataRouter(reactRoutes, basename, false),
    [reactRoutes, basename]
  );

  return <RouterProvider router={router} />;
}

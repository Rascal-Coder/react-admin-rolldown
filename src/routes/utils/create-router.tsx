import {
  createBrowserRouter,
  createHashRouter,
  matchRoutes,
  type RouteObject,
} from "react-router";
import App from "@/app";
import GlobalLoading from "@/components/ui/loading/global-loading";
import { GLOBAL_CONFIG } from "@/global-config";
import userStore from "@/store/user-store";
import { initAuthRoutes } from "./init-router";

const Pages = import.meta.glob("/src/pages/**/*.tsx");

function convert(m: any) {
  const { default: Component } = m;

  return {
    Component,
  };
}
/**
 * 根据路径创建 React Router 的 lazy 函数
 * @param path 组件路径，如 "/pages/dashboard/workbench"
 * @returns React Router lazy 函数（返回 Promise<{ Component }>）
 */
export const createLazyComponent = (
  path = ""
): (() => Promise<{ Component: React.ComponentType<any> }>) => {
  if (!path) {
    throw new Error("Component path is required");
  }

  let importFn = Pages[`/src${path}.tsx`];
  if (!importFn) {
    importFn = Pages[`/src${path}/index.tsx`];
  }
  if (!importFn) {
    throw new Error(`Component not found for path: ${path}`);
  }

  return async () => {
    const module = (await importFn()) as { default: React.ComponentType<any> };
    return convert(module);
  };
};

/**
 * 创建 data router 实例
 */
export function createDataRouter(routes: RouteObject[], basename: string) {
  const routerCreator =
    GLOBAL_CONFIG.routerMode === "hash"
      ? createHashRouter
      : createBrowserRouter;
  // 为基础布局路由添加 ID，以便 patch 时定位
  const routesWithIds = routes.map((route, index) => {
    // 找到基础布局容器（path 为 "/" 且有 lazy）
    if (route.path === "/" && route.lazy && !route.id) {
      return { ...route, id: "base-layout" };
    }
    return { ...route, id: route.id || `route-${index}` };
  });
  function getIsNeedPatch(path: string) {
    // 没登录不需要patch
    if (!userStore.getState().userToken.accessToken) {
      return false;
    }

    const matchRoute = matchRoutes(routes, { pathname: path }, basename);

    // 如果匹配到路由但是404，则需要patch
    if (matchRoute) {
      return matchRoute[0].route.path === "*";
    }

    return false;
  }
  const options: Parameters<typeof routerCreator>[1] = {
    basename: basename !== "/" ? basename : undefined,
  };
  if (GLOBAL_CONFIG.authRouteMode === "backend") {
    options.patchRoutesOnNavigation = ({ patch, path }) => {
      if (getIsNeedPatch(path)) {
        initAuthRoutes(patch);
      }
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

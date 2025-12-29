import { createContext, useContext, useMemo } from "react";
import type { RouteObject } from "react-router";
import {
  useBasename,
  useFlattenRoutes,
  useReactRoutes,
  useRoutes,
} from "@/store/router-store";
import type { RouteConfig } from "./types";

/**
 * 路由上下文值
 */
export interface RouterContextValue {
  reactRoutes: RouteObject[];
  routes: RouteConfig[];
  flattenRoutes: Map<string, RouteConfig>;
  basename: string;
}

const RouterContext = createContext<RouterContextValue | null>(null);

/**
 * RouterProvider - 从 router-store 读取状态并提供给子组件
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const routes = useRoutes();
  const reactRoutes = useReactRoutes();
  const flattenRoutes = useFlattenRoutes();
  const basename = useBasename();

  const contextValue = useMemo<RouterContextValue>(
    () => ({
      reactRoutes,
      routes,
      flattenRoutes,
      basename,
    }),
    [reactRoutes, routes, flattenRoutes, basename]
  );

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * 获取路由上下文的 Hook
 */
export function useRouterContext(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouterContext must be used within RouterProvider");
  }
  return context;
}

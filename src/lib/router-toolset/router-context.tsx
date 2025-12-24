import { createContext, useContext } from "react";
import type { RouteConfig } from "./types";

/**
 * 路由上下文，用于在组件树中传递路由实例
 */
export interface RouterContextValue {
  reactRoutes: import("react-router").RouteObject[];
  routes: RouteConfig[];
  flattenRoutes: Map<string, RouteConfig>;
  basename: string;
}

const RouterContext = createContext<RouterContextValue | null>(null);

/**
 * 提供路由上下文的组件
 */
export function RouterProvider({
  value,
  children,
}: {
  value: RouterContextValue;
  children: React.ReactNode;
}) {
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
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

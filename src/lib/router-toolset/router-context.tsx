import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { RouteObject } from "react-router";
import { useMenuActions } from "@/store/menu-store";
import { generateMenuItems } from "@/utils/menu";
import type { RouteConfig } from "./types";
import { formatRoutes, generateReactRoutes } from "./utils";

/**
 * 基础路由上下文值（不包含动态更新能力）
 */
export interface BaseRouterContextValue {
  reactRoutes: RouteObject[];
  routes: RouteConfig[];
  flattenRoutes: Map<string, RouteConfig>;
  basename: string;
}

/**
 * 完整路由上下文值（包含动态更新能力）
 */
export interface RouterContextValue extends BaseRouterContextValue {
  /** 更新动态路由的方法 */
  updateRoutes: (dynamicRoutes: RouteConfig[]) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

// 默认的空操作函数，用于向后兼容
const noop = () => {
  console.warn(
    "updateRoutes called on RouterProvider without dynamic support. Use DynamicRouterProvider instead."
  );
};

/**
 * 提供路由上下文的组件（基础版本，向后兼容）
 *
 * 注意：此组件不支持动态路由更新，updateRoutes 调用会打印警告
 * 如需动态更新路由，请使用 DynamicRouterProvider
 */
export function RouterProvider({
  value,
  children,
}: {
  value: BaseRouterContextValue;
  children: React.ReactNode;
}) {
  // 为向后兼容，提供默认的 updateRoutes 和 isRoutesLoaded
  const contextValue: RouterContextValue = {
    ...value,
    updateRoutes: noop,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * DynamicRouterProvider 的初始化参数
 */
export interface DynamicRouterProviderProps {
  /** 初始路由配置 */
  initialRoutes: RouteConfig[];
  /** 初始 React Router 格式的路由 */
  initialReactRoutes: RouteObject[];
  /** 初始扁平化路由映射 */
  initialFlattenRoutes: Map<string, RouteConfig>;
  /** 路由基础路径 */
  basename: string;

  /** 路由合并函数，用于将动态路由合并到静态路由中 */
  mergeRoutes: (dynamicRoutes: RouteConfig[]) => RouteConfig[];
  /** 路由更新回调，用于通知外部路由已更新 */
  onRoutesUpdate?: (
    routes: RouteConfig[],
    reactRoutes: RouteObject[],
    flattenRoutes: Map<string, RouteConfig>
  ) => void;
  children: React.ReactNode;
}

/**
 * 支持动态路由更新的 RouterProvider
 *
 * 包装原有 RouterProvider，添加动态更新路由的能力
 * 当调用 updateRoutes 时，会重新计算路由配置并触发重新渲染
 */
export function DynamicRouterProvider({
  initialRoutes,
  initialReactRoutes,
  initialFlattenRoutes,
  basename,
  mergeRoutes,
  onRoutesUpdate,
  children,
}: DynamicRouterProviderProps) {
  const { setMenuData } = useMenuActions();

  const [routes, setRoutes] = useState<RouteConfig[]>(initialRoutes);
  const [reactRoutes, setReactRoutes] =
    useState<RouteObject[]>(initialReactRoutes);
  const [flattenRoutes, setFlattenRoutes] =
    useState<Map<string, RouteConfig>>(initialFlattenRoutes);

  /**
   * 更新动态路由
   * 将传入的动态路由与静态路由合并，并更新上下文状态
   */
  const updateRoutes = useCallback(
    (dynamicRoutes: RouteConfig[]) => {
      // 使用合并函数将动态路由合并到静态路由中
      const mergedRoutes = mergeRoutes(dynamicRoutes);

      // 生成 React Router 格式的路由
      const newReactRoutes = generateReactRoutes(mergedRoutes);

      // 格式化路由，生成 pathname 和扁平化映射
      const { routes: formattedRoutes, flattenRoutes: newFlattenRoutes } =
        formatRoutes(mergedRoutes);

      const menuData = generateMenuItems(dynamicRoutes);
      setMenuData(menuData);
      // 更新状态
      setRoutes(formattedRoutes);
      setReactRoutes(newReactRoutes);
      setFlattenRoutes(newFlattenRoutes);

      // 通知外部路由已更新
      onRoutesUpdate?.(formattedRoutes, newReactRoutes, newFlattenRoutes);
    },
    [mergeRoutes, setMenuData, onRoutesUpdate]
  );

  const contextValue = useMemo<RouterContextValue>(
    () => ({
      reactRoutes,
      routes,
      flattenRoutes,
      basename,
      updateRoutes,
    }),
    [reactRoutes, routes, flattenRoutes, basename, updateRoutes]
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

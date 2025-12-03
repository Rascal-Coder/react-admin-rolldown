import type { JSX, ReactNode } from "react";
import type { RouteObject } from "react-router";
import { Navigate, useParams } from "react-router";
import type { RouteConfig } from "./types";

const regPath = /\/$/;
/**
 * 使用RouteConfig定义的路由数据，生成react-router需要的路由配置
 */
export function generateReactRoutes(configs?: RouteConfig[]) {
  const ret = (configs ?? [])
    .filter((configItem) => !configItem.external)
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: 路由配置的复杂性
    .map((configItem) => {
      const { redirect, lazy, layout, /* progress = true,  */ children } =
        configItem;
      let element: ReactNode | null = null;
      let index = false;
      const pageModules = import.meta.glob("/src/pages/**/*.tsx");
      const normalizedPath = (path: string) => {
        // 规范化 lazy 路径，处理以 / 开头的情况
        const normalizedPathStr = path.startsWith("/") ? path : `/${path}`;

        // 尝试两种可能的路径：.tsx 和 /index.tsx
        const path1 = `/src/pages${normalizedPathStr}.tsx`;
        const path2 = `/src/pages${normalizedPathStr}/index.tsx`;
        return { path1, path2 };
      };
      // 只有当 lazy 存在且非空时，才创建 lazyComponent
      const lazyComponent: Promise<{
        Component: () => JSX.Element;
      }> | null =
        lazy && lazy.trim() !== ""
          ? (async () => {
              const { path1, path2 } = normalizedPath(lazy);
              // 优先尝试 .tsx 后缀
              let moduleLoader = pageModules[path1];

              // 如果不存在，尝试 /index.tsx 后缀
              if (!moduleLoader) {
                moduleLoader = pageModules[path2];
              }

              if (!moduleLoader) {
                throw new Error(
                  `无法找到模块，已尝试路径: ${path1} 和 ${path2}`
                );
              }

              const module = (await moduleLoader()) as {
                default: () => JSX.Element;
              };
              // console.log("module===========", module);

              return { Component: module.default };
            })()
          : null;

      if (redirect) {
        index = true;
        element = <Navigate replace to={redirect} />;
      }

      // 构建路由对象
      // 注意：在 react-router 中，index 路由不应该有 path
      const routeObject: RouteObject = index
        ? {
            index: true,
            element,
            caseSensitive: configItem.caseSensitive ?? false,
          }
        : {
            path: configItem.path,
            caseSensitive: configItem.caseSensitive ?? false,
          };

      // 如果有 lazy 组件，设置 lazy 属性（但 redirect 路由不需要 lazy）
      if (lazyComponent && !index) {
        routeObject.lazy = async () => lazyComponent;
      }

      if (layout) {
        routeObject.element = layout;
      }
      if (children) {
        routeObject.children = generateReactRoutes(children);
      }
      return routeObject;
    });
  return ret;
}

// export function notEmptyPath(path: string) {
//   return path === "" ? "/" : path;
// }

/**
 * 使用RouteConfig定义的路由数据，拓展出一些用于渲染(如菜单)的数据
 */
export function formatRoutes(
  routesConfig: RouteConfig[],
  parent?: RouteConfig
): {
  routes: RouteConfig[];
  flattenRoutes: Map<string, RouteConfig>;
} {
  const flattenRoutes: Map<string, RouteConfig> = new Map();

  /**
   * 计算路径相关的属性
   */
  function calculatePathProperties(
    routeItem: RouteConfig,
    _parent?: RouteConfig
  ) {
    const path = routeItem.path === "/" ? "" : (routeItem.path ?? "");
    const { collecttedPathname: parentPathname, collecttedPath: parentPath } =
      _parent ?? {};
    const collecttedPathname = parentPathname
      ? [...parentPathname, `${parentPathname.at(-1)}/${path}`]
      : [path];
    const collecttedPath = parentPath ? [...parentPath, path] : [path];
    const pathname = collecttedPath.join("/").replace(regPath, "") || "/";
    return { path, collecttedPathname, collecttedPath, pathname };
  }

  /**
   * 构建格式化的路由对象
   */
  function buildFormattedRoute(
    routeItem: RouteConfig,
    pathProps: ReturnType<typeof calculatePathProperties>,
    _parent?: RouteConfig
  ): RouteConfig {
    const ret: RouteConfig = {
      ...routeItem,
      ...pathProps,
      parent: _parent,
    };
    if (routeItem.children) {
      ret.children = _formatRoutes(routeItem.children ?? [], ret);
    }
    flattenRoutes.set(pathProps.pathname, {
      ...flattenRoutes.get(pathProps.pathname), // 可能有redirect
      ...ret,
    });
    return ret;
  }

  function _formatRoutes(
    _routesConfigs: RouteConfig[],
    _parent?: RouteConfig
  ): RouteConfig[] {
    return _routesConfigs.map((routeItem) => {
      const pathProps = calculatePathProperties(routeItem, _parent);
      return buildFormattedRoute(routeItem, pathProps, _parent);
    });
  }

  const routes = _formatRoutes(routesConfig, parent);
  return {
    routes,
    flattenRoutes,
  };
}

/**
 * 根据当前路由 routePath 和 params(useParams), 替换掉path中的动态路由参数如":id"
 * @example '/:id/home' -> '/123/home'
 */
export function getPathnameByRoutePathAndParams(
  routePath: string,
  params: Record<string, string | undefined> | null | undefined
) {
  let ret = routePath;
  for (const key of Object.keys(params ?? {})) {
    const reg = new RegExp(`:${key}`);
    ret = ret.replace(reg, params?.[key] ?? "");
  }
  return ret;
}

/**
 * 根据当前路由 routePath, 替换掉path中的动态路由参数如":id"的hooks写法
 * @example '/:id/home' -> '/123/home'
 */
export function usePathname() {
  const params = useParams();
  return (routePath: string) => {
    const pathname = getPathnameByRoutePathAndParams(routePath, params);
    return pathname;
  };
}

/**
 * 把/:id去掉，以及其后面的去掉
 * 应用场景例如计算菜单展开时, 父路由下的详情页会选中其父菜单
 */
export function tryFindRouteFather(routePath: string, hidden?: boolean) {
  if (!(hidden ?? false)) {
    return routePath;
  }
  const pathAry = routePath.split(":");
  if (pathAry.length === 1) {
    return pathAry[0];
  }
  const ret = pathAry
    .slice(0, pathAry.length - 1)
    .join(":")
    .replace(regPath, "");
  return ret;
}

export function findroutesConfigItem(
  routesConfig: RouteConfig[],
  routePath: string
) {
  const computedPath: string[] = [];

  function buildCurrentPath(): string {
    return computedPath.join("/");
  }

  function matchesRoutePath(
    currentPath: string,
    routeItem: RouteConfig
  ): boolean {
    return currentPath === routePath && !routeItem.redirect;
  }

  function searchChildren(
    routeItem: RouteConfig,
    _routePath: string
  ): RouteConfig | null {
    if (!routeItem.children || routeItem.children.length === 0) {
      return null;
    }
    return loopTree(routeItem.children, _routePath);
  }

  function loopTree(
    _routesConfig: RouteConfig[],
    _routePath: string
  ): RouteConfig | null {
    for (const routeItem of _routesConfig) {
      computedPath.push(routeItem.path === "/" ? "" : (routeItem.path ?? ""));
      const currentPath = buildCurrentPath();

      if (matchesRoutePath(currentPath, routeItem)) {
        return routeItem;
      }

      const childrenRet = searchChildren(routeItem, _routePath);
      if (childrenRet) {
        return childrenRet;
      }

      computedPath.pop();
    }
    return null;
  }

  const item = loopTree(routesConfig, routePath);
  return item;
}

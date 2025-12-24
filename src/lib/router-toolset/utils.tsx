import type { ReactNode } from "react";
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
    .map((configItem) => {
      const { redirect, component, children } = configItem;
      let element: ReactNode | null;

      // 如果有 redirect 且没有 children，创建索引路由（不需要 path 和 caseSensitive）
      if (redirect && !children) {
        element = <Navigate replace to={redirect} />;
        const routeObject: RouteObject = {
          index: true,
          element,
        };
        return routeObject;
      }

      // 普通路由（需要 path 和 caseSensitive）
      // if (redirect) {
      //   element = <Navigate replace to={redirect} />;
      // } else if (component) {

      // }
      element = component;
      const routeObject: RouteObject = {
        path: configItem.path,
        element,
        caseSensitive: configItem.caseSensitive ?? false,
      };

      if (children) {
        routeObject.children = generateReactRoutes(children);
      }
      return routeObject;
    });
  return ret;
}

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
    const { collectedPathname: parentPathname, collectedPath: parentPath } =
      _parent ?? {};
    const collectedPathname = parentPathname
      ? [...parentPathname, `${parentPathname.at(-1)}/${path}`]
      : [path];
    const collectedPath = parentPath ? [...parentPath, path] : [path];
    const pathname = collectedPath.join("/").replace(regPath, "") || "/";
    return { path, collectedPathname, collectedPath, pathname };
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

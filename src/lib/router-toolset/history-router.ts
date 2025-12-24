import type { To } from "history";
import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import {
  matchPath,
  matchRoutes,
  type RouteObject,
  useLocation,
} from "react-router";
import type { Subject } from "rxjs";
import Events from "../events";
import type { EventsRecord } from "../events/types";
import history from "./history";
import type { RouteConfig } from "./types";
import {
  findroutesConfigItem,
  formatRoutes,
  generateReactRoutes,
  getPathnameByRoutePathAndParams,
} from "./utils";

interface RouterOptions {
  /**
   * 开发或生产环境服务的公共基础路径，
   * 无子路径可不填，默认值 '/'
   * @example '/subpath'
   */
  basename?: string;
}

const regPath = /\/$/;

export class Router {
  static EVENT_NAME__onChangeRoutesConfig = "EVENT_NAME__onChangeRoutesConfig";

  private readonly _events: Events;
  private _routesConfig: RouteConfig[] = [];
  private _reactRoutes: RouteObject[] = [];
  private _routes: RouteConfig[] = [];
  private _flattenRoutes: Map<string, RouteConfig> = new Map();
  basename = "/";

  constructor(routesConfig: RouteConfig[], options?: RouterOptions) {
    this._events = new Events();
    this._routesConfig = routesConfig;
    this._updateRoutes();
    this.basename = options?.basename || "/";

    this._onChangeRoutesConfig();
  }

  /**
   * 更新路由相关数据（reactRoutes/routes/flattenRoutes）
   */
  private _updateRoutes() {
    this._reactRoutes = generateReactRoutes(this._routesConfig);
    const { routes, flattenRoutes } = formatRoutes(this._routesConfig);
    this._routes = routes;
    this._flattenRoutes = flattenRoutes;
  }

  /**
   * 获取路由配置
   */
  get routesConfig(): RouteConfig[] {
    return this._routesConfig;
  }

  /**
   * 获取 React Router 格式的路由配置（计算属性）
   */
  get reactRoutes(): RouteObject[] {
    return this._reactRoutes;
  }

  /**
   * 获取格式化后的路由配置（计算属性）
   */
  get routes(): RouteConfig[] {
    return this._routes;
  }

  /**
   * 获取扁平化的路由映射（计算属性）
   */
  get flattenRoutes(): Map<string, RouteConfig> {
    return this._flattenRoutes;
  }

  /**
   * 事件系统：订阅事件
   */
  on(name: string, callback: (data?: unknown) => void): Subject<unknown> {
    // EventsRecord 是 Record<string, ...>，所以所有字符串键都是有效的
    return this._events.on(name as keyof EventsRecord, callback);
  }

  /**
   * 事件系统：发布事件
   */
  emit(name: string, data?: unknown): void {
    this._events.emit(name as keyof EventsRecord, data);
  }

  /**
   * 事件系统：移除事件监听
   */
  remove(name: string, subscription?: Subject<unknown>): void {
    this._events.remove(name as keyof EventsRecord, subscription);
  }
  /**
   * 获取当前路由的pathname
   * 会去除basename（若有）
   * @example '/home'
   */
  get pathname() {
    const reg = new RegExp(`^${this.basename}`);
    const fullPath = history.location.pathname;
    return this.basename === "/" ? fullPath : fullPath.replace(reg, "") || "/";
  }
  /**
   * 监听this.routesConfigs变化，并更新reactRoutes/routes/flattenRoutes
   */
  private _onChangeRoutesConfig() {
    const sub = this.on(
      Router.EVENT_NAME__onChangeRoutesConfig,
      (routesConfig) => {
        // 事件回调的数据类型是 unknown，需要类型断言
        if (Array.isArray(routesConfig)) {
          this._routesConfig = routesConfig as RouteConfig[];
          this._updateRoutes();
        }
      }
    );
    return () => {
      this.remove(Router.EVENT_NAME__onChangeRoutesConfig, sub);
    };
  }
  /**
   * 设置路由项
   * @param pathname 指定路由
   * @param cb 参数为pathname对应的路由
   */
  setItem = (
    pathname: string | ((routesConfigItem: RouteConfig) => void),
    cb?: (routesConfigItem: RouteConfig) => void
  ) => {
    const _pathname = typeof pathname === "string" ? pathname : this.pathname;
    const routePath = this.getRoutePath(_pathname);

    const newRoutesConfigs = produce(this._routesConfig, (draft) => {
      const routesConfigItem = findroutesConfigItem(draft, routePath);
      if (routesConfigItem) {
        if (typeof pathname === "string") {
          cb?.(routesConfigItem);
        } else {
          pathname(routesConfigItem);
        }
      }
    });

    this._routesConfig = newRoutesConfigs;
    this.emit(Router.EVENT_NAME__onChangeRoutesConfig, newRoutesConfigs);
  };
  /**
   * 设置pathname的兄弟路由
   * @param pathname 指定路由
   * @param cb 参数routesConfigs为pathname的兄弟路由
   * @param cb 参数parentRoute为pathname的父路由
   */
  setSiblings = (
    pathname:
      | string
      | ((routesConfig: RouteConfig[], parentRoute: RouteConfig) => void),
    cb?: (routesConfig: RouteConfig[], parentRoute: RouteConfig) => void
  ) => {
    const _pathname = typeof pathname === "string" ? pathname : this.pathname;
    const routePath = this.getRoutePath(_pathname);

    const parentRoute = this._flattenRoutes.get(routePath)?.parent;
    if (parentRoute?.pathname) {
      this.setItem(parentRoute?.pathname, (routesConfig) => {
        if (routesConfig.children) {
          if (typeof pathname === "string") {
            cb?.(routesConfig.children, routesConfig);
          } else {
            pathname(routesConfig.children, routesConfig);
          }
        }
      });
    }
  };
  /**
   * 根据pathname获取router的path
   * router的path里可能有:id
   * @example '/123/home' -> '/:id/home'
   */
  getRoutePath = (pathname: string) => {
    const matchedRoutes = matchRoutes(this._reactRoutes, pathname);
    const routePath =
      matchedRoutes
        ?.map((item) => {
          const reactRoutePath = item.route.path === "/" ? "" : item.route.path;
          return reactRoutePath;
        })
        .join("/")
        .replace(regPath, "") ?? "";
    return routePath;
  };
  /**
   * 根据当前路由 params
   * 替换掉目标routePath中的动态路由参数如":id"
   * @example '/:id/home' -> '/123/home'
   */
  getPathname = (routePath: string) => {
    const curRoutePath = this.getRoutePath(this.pathname);
    const { params } = matchPath({ path: curRoutePath }, this.pathname) ?? {};
    const pathname = getPathnameByRoutePathAndParams(routePath, params);
    return pathname;
  };
  /**
   * 拼接basename和pathname
   */
  getFullPath(pathname: string) {
    return this.basename === "/" ? pathname : `${this.basename}${pathname}`;
  }
  /**
   * 包含basename的history.push
   */
  push(to: To, state?: unknown) {
    if (typeof to === "string") {
      history.push(this.getFullPath(to), state);
    } else {
      history.push(
        {
          ...to,
          pathname: this.getFullPath(to.pathname ?? ""),
        },
        state
      );
    }
  }
  /**
   * 包含basename的history.replace
   */
  replace(to: To, state?: unknown) {
    if (typeof to === "string") {
      history.replace(this.getFullPath(to), state);
    } else {
      history.replace(
        {
          ...to,
          pathname: this.getFullPath(to.pathname ?? ""),
        },
        state
      );
    }
  }
  /**
   * 包含basename的history.createHref
   */
  createHref(to: To): string {
    if (typeof to === "string") {
      return history.createHref(this.getFullPath(to));
    }
    return history.createHref({
      ...to,
      pathname: this.getFullPath(to.pathname ?? ""),
    });
  }
}

/**
 * 在react组件中获取最新的reactRoutes/routes/flattenRoutes/curRoute
 */
export function useRouter(router: Router) {
  const [reactRoutes, setReactRoutes] = useState<RouteObject[]>(
    router.reactRoutes
  );
  const [routes, setRoutes] = useState<RouteConfig[]>(router.routes);
  const [flattenRoutes, setFlattenRoutes] = useState<Map<string, RouteConfig>>(
    router.flattenRoutes
  );
  const location = useLocation();

  const curRoute = useMemo(() => {
    const routePath = router.getRoutePath(location.pathname);
    return flattenRoutes.get(routePath);
  }, [flattenRoutes, location.pathname, router]);

  useEffect(() => {
    const sub = router.on(
      Router.EVENT_NAME__onChangeRoutesConfig,
      (newRoutesConfigs) => {
        // 事件回调的数据类型是 unknown，需要类型检查
        if (Array.isArray(newRoutesConfigs)) {
          const configs = newRoutesConfigs as RouteConfig[];
          const _reactRoutes = generateReactRoutes(configs);
          const { routes: _routes, flattenRoutes: _flattenRoutes } =
            formatRoutes(configs);
          setReactRoutes(_reactRoutes);
          setRoutes(_routes);
          setFlattenRoutes(_flattenRoutes);
        }
      }
    );
    return () => {
      router.remove(Router.EVENT_NAME__onChangeRoutesConfig, sub);
    };
  }, [router]);

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    curRoute,
    back: () => history.back(),
  };
}

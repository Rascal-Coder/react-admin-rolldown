import { useMemo } from "react";
import {
  type NavigateOptions,
  type To,
  useLocation,
  useNavigate,
} from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import { getRoutePathFromPathname } from "@/lib/router-toolset/router";
import {
  useFlattenRoutes,
  useReactRoutes,
  useRoutes,
} from "@/store/router-store";
import { type LocationQueryRaw, stringifyQuery } from "./query";

/** 扩展的导航选项，支持 query 参数 */
type ExtendedNavigateOptions = NavigateOptions & {
  query?: LocationQueryRaw;
};

/** 构建带查询参数的路径 */
function buildPathWithQuery(path: To, query?: LocationQueryRaw): To {
  if (!query) {
    return path;
  }

  const pathStr = typeof path === "string" ? path : path.pathname || "";
  const search = stringifyQuery(query);

  return `${pathStr}?${search}` as To;
}
export function useRouterNavigation() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      navigateUp: () => navigate(".."),
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => navigate(0),
      go: (delta: number) => navigate(delta),
      /**
       * 推入新的历史记录并导航到新路径 支持完整的 RouterNavigateOptions 和 query 参数
       *
       * @example
       *   // 基础用法
       *   router.push('/users');
       *
       *   // 带查询参数
       *   router.push('/users', { query: { page: 1, size: 10 } });
       *
       *   // 带状态和选项
       *   router.push('/users', {
       *     query: { page: 1 },
       *     state: { from: 'home' },
       *     preventScrollReset: true
       *   });
       *
       *   // 替换模式（向后兼容）
       *   router.push('/users', { replace: true });
       */
      push: (path: To, options?: ExtendedNavigateOptions) => {
        const { query, ...navigateOptions } = options || {};
        const finalPath = buildPathWithQuery(path, query);
        return navigate(finalPath, navigateOptions);
      },
      /** 替换当前历史记录并导航到新路径 支持完整的 RouterNavigateOptions 和 query 参数 */
      replace: (path: To, options?: ExtendedNavigateOptions) => {
        const { query, ...navigateOptions } = options || {};
        const finalPath = buildPathWithQuery(path, query);
        return navigate(finalPath, { ...navigateOptions, replace: true });
      },
      goHome: (options?: NavigateOptions) =>
        navigate(GLOBAL_CONFIG.defaultRoute, options),
    }),
    [navigate]
  );

  return router;
}

/**
 * 在 React 组件中获取路由信息的 Hook
 * 从 router-store 中获取路由实例信息
 * @returns 路由信息对象
 */
export function useRouter() {
  const reactRoutes = useReactRoutes();
  const flattenRoutes = useFlattenRoutes();
  const routes = useRoutes();
  const location = useLocation();

  // 计算当前路由路径
  const routePath = useMemo(
    () => getRoutePathFromPathname(reactRoutes, location.pathname),
    [reactRoutes, location.pathname]
  );

  // 获取当前路由配置
  const curRoute = useMemo(
    () => flattenRoutes.get(routePath),
    [flattenRoutes, routePath]
  );

  return {
    reactRoutes,
    routes,
    flattenRoutes,
    curRoute,
  };
}

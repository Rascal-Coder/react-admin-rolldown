import { useMemo } from "react";
import { type NavigateOptions, type To, useNavigate } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
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

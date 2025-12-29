import { create } from "zustand";
import type { RouteConfig } from "@/routes/types";

export type CacheStore = {
  /** keepAlive 路由的 pathname 列表 */
  cacheRoutes: string[];
  removeCacheKey: string[] | string | null;
  actions: {
    /** 从 flattenRoutes 初始化缓存键 */
    initCacheKeys: (flattenRoutes: Map<string, RouteConfig>) => void;
    /** 批量移除缓存键（支持单个或多个） */
    setRemoveCacheKey: (removeCacheKey: string[] | string | null) => void;
  };
};

const useCacheStore = create<CacheStore>()((set) => ({
  /** - 需要进行缓存的页面 */
  cacheRoutes: [],
  /** - 需要删除的缓存页面 */
  removeCacheKey: null,
  actions: {
    initCacheKeys: (flattenRoutes) => {
      // 从 flattenRoutes 中提取所有 keepAlive 为 true 的路由的 pathname
      const cacheRoutes: string[] = [];
      for (const route of flattenRoutes.values()) {
        if (route.keepAlive && route.pathname) {
          cacheRoutes.push(route.pathname);
        }
      }
      set({ cacheRoutes });
    },
    setRemoveCacheKey: (removeCacheKey: string[] | string | null) => {
      set({ removeCacheKey });
    },
  },
}));

export const useCacheRoutes = () => useCacheStore((state) => state.cacheRoutes);
export const useRemoveCacheKey = () =>
  useCacheStore((state) => state.removeCacheKey);
export const useCacheActions = () => useCacheStore((state) => state.actions);

export const initCacheRoutesFromRouter = (
  flattenRoutes: Map<string, RouteConfig>
) => {
  useCacheStore.getState().actions.initCacheKeys(flattenRoutes);
};

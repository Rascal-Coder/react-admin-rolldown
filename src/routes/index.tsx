import { GLOBAL_CONFIG } from "@/global-config";
import { Router } from "@/lib/router-toolset/history-router";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import { routesConfig } from "./config";

const basename = GLOBAL_CONFIG.basename;

export const routes = new Router(routesConfig, {
  basename,
});

// 初始化 keepAlive 路由的缓存键
initCacheRoutesFromRouter(routes.flattenRoutes);

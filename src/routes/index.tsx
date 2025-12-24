import { GLOBAL_CONFIG } from "@/global-config";
import { createRouter } from "@/lib/router-toolset/router-v2";
import { initCacheRoutesFromRouter } from "@/store/cache-store";
import { routesConfig } from "./config";

const basename = GLOBAL_CONFIG.basename;

// 创建路由实例
export const routerInstance = createRouter(routesConfig, {
  basename,
});

// 初始化 keepAlive 路由的缓存键
initCacheRoutesFromRouter(routerInstance.flattenRoutes);

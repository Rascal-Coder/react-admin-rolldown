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

// 调试：打印所有路由信息
console.log("=== All Routes Debug ===");
routes.flattenRoutes.forEach((route, pathname) => {
  console.log(
    `Path: ${pathname}, keepAlive: ${route.keepAlive}, name: ${route.name}`
  );
});

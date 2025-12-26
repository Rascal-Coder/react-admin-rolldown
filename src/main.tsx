import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import {
  DynamicRouterProvider,
  RouterProvider,
} from "@/lib/router-toolset/router-context";
import { ThemeProvider } from "@/theme/theme-provider";
import { initCopyRight, urlJoin } from "@/utils";
import { worker } from "./_mock";
import { GLOBAL_CONFIG } from "./global-config";
import { DynamicRouterApp, StaticRouterApp } from "./router-app";
import { createAppRouter } from "./routes";
import { buildRoutesWithDynamic } from "./routes/config";
import { initCacheRoutesFromRouter } from "./store/cache-store";

const container = document.getElementById("root");

await worker.start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: urlJoin(GLOBAL_CONFIG.basename, "mockServiceWorker.js"),
  },
});

function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }

  // 根据路由模式（frontend/backend）创建路由实例
  const routerInstance = createAppRouter();

  // 根据路由模式选择不同的 Provider
  if (GLOBAL_CONFIG.authRouteMode === "backend") {
    const initialReactRoutes = routerInstance.reactRoutes;
    const initialRoutes = routerInstance.routes;
    const initialFlattenRoutes = routerInstance.flattenRoutes;

    createRoot(container).render(
      <ThemeProvider>
        <DynamicRouterProvider
          basename={routerInstance.basename}
          initialFlattenRoutes={initialFlattenRoutes}
          initialReactRoutes={initialReactRoutes}
          initialRoutes={initialRoutes}
          mergeRoutes={buildRoutesWithDynamic}
          onRoutesUpdate={(_routes, _reactRoutes, flattenRoutes) => {
            // 路由更新时重新初始化缓存
            initCacheRoutesFromRouter(flattenRoutes);
          }}
        >
          <DynamicRouterApp />
        </DynamicRouterProvider>
      </ThemeProvider>
    );
  } else {
    // 前端路由模式：使用 data router
    createRoot(container).render(
      <ThemeProvider>
        <RouterProvider
          value={{
            reactRoutes: routerInstance.reactRoutes,
            routes: routerInstance.routes,
            flattenRoutes: routerInstance.flattenRoutes,
            basename: routerInstance.basename,
          }}
        >
          <StaticRouterApp
            basename={routerInstance.basename}
            reactRoutes={routerInstance.reactRoutes}
          />
        </RouterProvider>
      </ThemeProvider>
    );
  }
}

setupApp();

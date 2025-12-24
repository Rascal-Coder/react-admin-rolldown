import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import GlobalLoading from "@/components/ui/loading/global-loading";
import { RouterProvider } from "@/lib/router-toolset/router-context";
import { ThemeProvider } from "@/theme/theme-provider";
import { initCopyRight, urlJoin } from "@/utils";
import { worker } from "./_mock";
import App from "./app";
import { GLOBAL_CONFIG } from "./global-config";
import { routerInstance } from "./routes";

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

  // 创建包含 App 组件的完整路由配置
  const appRoute: import("react-router").RouteObject = {
    path: "/",
    element: <App />,
    children: routerInstance.reactRoutes,
    HydrateFallback: GlobalLoading,
  };

  // 创建 React Router 实例
  const router = createBrowserRouter([appRoute], {
    basename:
      routerInstance.basename !== "/" ? routerInstance.basename : undefined,
  });

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
        <ReactRouterProvider router={router} />
      </RouterProvider>
    </ThemeProvider>
  );
}

setupApp();

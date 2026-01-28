import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import { DirectionProvider } from "@/context/direction/direction-provider";
import { MotionLazy } from "./components/ui/animate/motion-lazy";
import { CheckUpdate } from "./components/ui/check-update";
import { ErrorFallback } from "./components/ui/error-fallback";
import { RouteLoadingProgress } from "./components/ui/loading/route-loading";
import Toast from "./components/ui/toast";
import { GLOBAL_CONFIG } from "./global-config";
import { useRouter } from "./hooks/use-router";
import { useMenuActions } from "./store/menu-store";
import { useUserToken } from "./store/user-store";
import { generateMenuItems } from "./utils/menu";

function App() {
  const { curRoute, routes: routerRoutes } = useRouter();
  const { setMenuData } = useMenuActions();
  // const { showAllMenuWith403 } = useAppSettings();
  // const roles = useUserRoles();
  const { accessToken } = useUserToken();
  useEffect(() => {
    // 根据偏好设置决定菜单生成策略：
    // - showAllMenuWith403 为 true：菜单展示所有路由，无权限时由布局 AuthGuard 控制并显示 403
    // - showAllMenuWith403 为 false：按角色过滤路由，只有有权限的路由会出现在菜单中
    if (!accessToken) {
      return;
    }
    // const routesForMenu = showAllMenuWith403
    //   ? routerRoutes
    //   : filterRoutesByRole(routerRoutes, roles);
    const menuData = generateMenuItems(routerRoutes);
    setMenuData(menuData);
  }, [accessToken, routerRoutes, setMenuData]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={new QueryClient()}>
        <HelmetProvider>
          <Helmet>
            <title>
              {curRoute?.name
                ? `${curRoute.name} | ${GLOBAL_CONFIG.appName}`
                : GLOBAL_CONFIG.appName}
            </title>
            <link href={"/logo.svg"} rel="icon" />
          </Helmet>
          <Toast />
          <RouteLoadingProgress />
          <DirectionProvider>
            <MotionLazy>
              <CheckUpdate />
              <Outlet />
            </MotionLazy>
          </DirectionProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

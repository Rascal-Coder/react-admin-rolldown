import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";
import { DirectionProvider } from "@/context/direction/direction-provider";
import { filterRoutesByRole } from "@/routes/config/utils/permission-filter";
import { MotionLazy } from "./components/ui/animate/motion-lazy";
import { CheckUpdate } from "./components/ui/check-update";
import { ErrorFallback } from "./components/ui/error-fallback";
import { RouteLoadingProgress } from "./components/ui/loading/route-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { useRouter } from "./lib/router-toolset/router";
import { useMenuActions } from "./store/menu-store";
import { useUserRoles } from "./store/user-store";
import { generateMenuItems } from "./utils/menu";

function App() {
  const { curRoute, routes: routerRoutes } = useRouter();
  const { setMenuData } = useMenuActions();
  const roles = useUserRoles();

  // 根据用户角色过滤路由，用于菜单生成
  // 注意：路由配置中的 permission 字段实际存储的是 role code
  const filteredRoutes = useMemo(
    () => filterRoutesByRole(routerRoutes, roles),
    [routerRoutes, roles]
  );

  useEffect(() => {
    const menuData = generateMenuItems(filteredRoutes);
    setMenuData(menuData);
    // setMenuData 来自 Zustand store 的 actions，引用是稳定的
  }, [filteredRoutes, setMenuData]);
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

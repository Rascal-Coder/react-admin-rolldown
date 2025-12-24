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
import { GLOBAL_CONFIG } from "./global-config";
import { useRouter } from "./lib/router-toolset/router-v2";
import { useMenuActions } from "./store/menu-store";
import { generateMenuItems } from "./utils/menu";

function App() {
  const { curRoute, routes: routerRoutes } = useRouter();
  const { setMenuData } = useMenuActions();
  useEffect(() => {
    const menuData = generateMenuItems(routerRoutes);
    setMenuData(menuData);
  }, [routerRoutes, setMenuData]);
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

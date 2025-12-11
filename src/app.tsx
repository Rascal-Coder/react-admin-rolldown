import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRoutes } from "react-router";
import { DirectionProvider } from "@/context/direction-provider";
import { ErrorFallback } from "./components/ui/error-fallback";
import { RouteLoadingProgress } from "./components/ui/loading/route-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { useRouter } from "./lib/router-toolset/history-router";
import { routes } from "./routes";
import { useMenuActions } from "./store/menu-store";
import { generateMenuItems } from "./utils/menu";

function App() {
  const { reactRoutes, curRoute, routes: routerRoutes } = useRouter(routes);
  const element = useRoutes(reactRoutes);
  const { setMenuData } = useMenuActions();
  useEffect(() => {
    const menuData = generateMenuItems(routerRoutes);
    setMenuData(menuData);
  }, [routerRoutes, setMenuData]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
        <DirectionProvider>{element}</DirectionProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

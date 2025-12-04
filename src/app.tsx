import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRoutes } from "react-router";
import { RouteLoadingProgress } from "./components/ui/loading/route-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { useRouter } from "./lib/router-toolset/history-router";
import { routes } from "./routes";

function App() {
  const { reactRoutes, curRoute } = useRouter(routes);
  const element = useRoutes(reactRoutes);
  return (
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
      {element}
    </HelmetProvider>
  );
}

export default App;

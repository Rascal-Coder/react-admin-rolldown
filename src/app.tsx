import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRoutes } from "react-router";
import { useRouter } from "./lib/router-toolset/history-router";
import { routes } from "./routes";

function App() {
  const { reactRoutes } = useRouter(routes);
  const element = useRoutes(reactRoutes);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Bug Admin</title>
        <link href={"/logo.svg"} rel="icon" />
      </Helmet>
      {element}
    </HelmetProvider>
  );
}

export default App;

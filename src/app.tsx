import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Bug Admin</title>
        <link href={"/logo.svg"} rel="icon" />
      </Helmet>
      <Outlet />
    </HelmetProvider>
  );
}

export default App;

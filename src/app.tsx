import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "./layouts";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Bug Admin</title>
          <link href="/logo.svg" rel="icon" />
        </Helmet>
        <Layout />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

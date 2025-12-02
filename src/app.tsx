import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/theme-provider";

function App({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Bug Admin</title>
          <link href="/logo.svg" rel="icon" />
        </Helmet>
        {/* <Layout /> */}
        {children}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

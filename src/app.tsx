import { Helmet, HelmetProvider } from "react-helmet-async";

function App({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Bug Admin</title>
        <link href="/logo.svg" rel="icon" />
      </Helmet>
      {/* <Layout /> */}
      {children}
    </HelmetProvider>
  );
}

export default App;

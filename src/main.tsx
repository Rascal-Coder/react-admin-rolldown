import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { initCopyRight } from "@/utils";
import App from "./app";
import GlobalLoading from "./components/ui/global-loading";
import { routes } from "./routes";
import { ThemeProvider } from "./theme/theme-provider";

const container = document.getElementById("root");
const basename = import.meta.env.VITE_BASENAME;
function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }
  const router = createBrowserRouter(
    [
      {
        Component: () => <App />,
        children: routes.reactRoutes,
        HydrateFallback: GlobalLoading,
      },
    ],
    {
      basename,
    }
  );
  createRoot(container).render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

setupApp();

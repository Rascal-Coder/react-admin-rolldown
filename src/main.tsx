import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import GlobalLoading from "@/components/ui/global-loading.tsx";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { initCopyRight } from "@/utils";
import App from "./app.tsx";
import { routesSection } from "./routes";
import { ThemeProvider } from "./theme/theme-provider.tsx";

const container = document.getElementById("root");

function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }
  const router = createBrowserRouter(
    [
      {
        Component: () => (
          <App>
            <Outlet />
          </App>
        ),
        children: routesSection,
        HydrateFallback: GlobalLoading,
      },
    ],
    {
      basename: "/",
    }
  );
  createRoot(container).render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

setupApp();

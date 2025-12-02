import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { initCopyRight } from "@/utils";
import App from "./app.tsx";
import { routesSection } from "./routes";

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
      },
    ],
    {
      basename: "/",
    }
  );
  createRoot(container).render(<RouterProvider router={router} />);
}

setupApp();

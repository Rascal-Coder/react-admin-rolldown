import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { ThemeProvider } from "@/theme/theme-provider";
import { initCopyRight, urlJoin } from "@/utils";
import { worker } from "./_mock";
import { GLOBAL_CONFIG } from "./global-config";
import { router } from "./routes";

const container = document.getElementById("root");

await worker.start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: urlJoin(GLOBAL_CONFIG.basename, "mockServiceWorker.js"),
  },
});

function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }

  createRoot(container).render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

setupApp();

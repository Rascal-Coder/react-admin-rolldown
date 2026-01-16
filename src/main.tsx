import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { ThemeProvider } from "@/theme/theme-provider";
import { initCopyRight } from "@/utils";
import { router } from "./routes";
import { AntdAdapter } from "./theme/adapter/antd.adapter";

const container = document.getElementById("root");

// 移除mock
// await worker.start({
//   onUnhandledRequest: "bypass",
//   serviceWorker: {
//     url: urlJoin(GLOBAL_CONFIG.basename, "mockServiceWorker.js"),
//   },
// });

function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }

  createRoot(container).render(
    <ThemeProvider adapters={[AntdAdapter]}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

setupApp();

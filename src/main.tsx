import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import GlobalLoading from "@/components/ui/loading/global-loading";
import history from "@/lib/router-toolset/history";
import HistoryRouter from "@/lib/router-toolset/router-comp";
import { ThemeProvider } from "@/theme/theme-provider";
import { initCopyRight } from "@/utils";
import App from "./app";
import { GLOBAL_CONFIG } from "./global-config";

const container = document.getElementById("root");
const basename = GLOBAL_CONFIG.basename;
function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }
  createRoot(container).render(
    <ThemeProvider>
      <HistoryRouter
        basename={basename}
        history={history}
        hydrateFallback={GlobalLoading}
      >
        <App />
      </HistoryRouter>
    </ThemeProvider>
  );
}

setupApp();

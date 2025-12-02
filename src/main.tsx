import "./styles/global.css";
import "./theme/theme.css";
import { createRoot } from "react-dom/client";
import registerLocalIcons from "@/components/ui/icon/register-icons.ts";
import { initCopyRight } from "@/utils";
import App from "./app.tsx";

const container = document.getElementById("root");

function setupApp() {
  registerLocalIcons();
  initCopyRight();
  if (!container) {
    return;
  }

  createRoot(container).render(<App />);
}

setupApp();

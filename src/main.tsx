import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initCopyRight } from "@/utils";
import App from "./app.tsx";
import registerLocalIcons from "./components/icon/register-icons.ts";

const container = document.getElementById("root");
function setupApp() {
  initCopyRight();
  registerLocalIcons();
  if (!container) {
    return;
  }

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

setupApp();

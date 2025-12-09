import { GLOBAL_CONFIG } from "@/global-config";
import { Router } from "@/lib/router-toolset/history-router";
import { routesConfig } from "./config";

const basename = GLOBAL_CONFIG.basename;

export const routes = new Router(routesConfig, {
  basename,
});

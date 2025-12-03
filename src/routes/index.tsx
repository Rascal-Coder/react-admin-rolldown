import { Router } from "@/lib/router-toolset/history-router";
import { routesConfig } from "./config";

const basename = import.meta.env.VITE_BASENAME;

export const routes = new Router(routesConfig, { basename });

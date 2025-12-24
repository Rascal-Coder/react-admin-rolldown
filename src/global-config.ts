import packageJson from "../package.json";

/**
 * Global application configuration type definition
 */
export type GlobalConfig = {
  /** Application name */
  appName: string;
  /** Application version number */
  appVersion: string;
  /** Default route path for the application */
  defaultRoute: string;
  /** Base path for the application */
  basename: string;
  /** Authentication route mode: frontend routing or backend routing */
  authRouteMode: "frontend" | "backend";
  /** Application route mode: history or hash */
  routerMode: "history" | "hash";
  /** Whether to enable visualizer */
  visualizer: string;
  /** Whether to enable html plugin */
  htmlPlugin: string;
  /** Whether to enable compress plugin */
  compressPlugin: string;
};

/**
 * Global configuration constants
 * Reads configuration from environment variables and package.json
 *
 * @warning
 * Please don't use the import.meta.env to get the configuration, use the GLOBAL_CONFIG instead
 */
export const GLOBAL_CONFIG: GlobalConfig = {
  appName: "Bug Admin",
  appVersion: packageJson.version,
  defaultRoute:
    import.meta.env.VITE_APP_DEFAULT_ROUTE || "/dashboard/workbench",
  basename: import.meta.env.VITE_APP_BASENAME || "/",
  authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE || "frontend",
  routerMode: import.meta.env.VITE_APP_ROUTER_MODE || "history",
  visualizer: import.meta.env.VITE_APP_VISUALIZER || "false",
  htmlPlugin: import.meta.env.VITE_APP_HTML_PLUGIN || "false",
  compressPlugin: import.meta.env.VITE_APP_COMPRESS_PLUGIN,
};

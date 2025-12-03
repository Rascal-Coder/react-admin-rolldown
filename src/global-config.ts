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
  /** Routing mode: frontend routing or backend routing */
  routerMode: "frontend" | "backend";
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
  defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || "/workbench",
  basename: import.meta.env.VITE_APP_BASENAME || "/",
  routerMode: import.meta.env.VITE_APP_ROUTER_MODE || "frontend",
  visualizer: import.meta.env.VITE_APP_VISUALIZER || "false",
  htmlPlugin: import.meta.env.VITE_APP_HTML_PLUGIN || "false",
  compressPlugin: import.meta.env.VITE_APP_COMPRESS_PLUGIN,
};

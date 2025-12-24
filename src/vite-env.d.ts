/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Home route path for the application */
  readonly VITE_APP_HOME_ROUTE: string;
  /** Login route path for the application */
  //   readonly VITE_APP_LOGIN_ROUTE: string;
  /** Base URL for API endpoints */
  //   readonly VITE_APP_API_BASE_URL: string;
  /** Default route path for the application */
  readonly VITE_APP_DEFAULT_ROUTE: string;
  /** Public path for static assets */
  readonly VITE_APP_BASENAME: string;
  /** Authentication route mode: frontend routing or backend routing */
  readonly VITE_AUTH_ROUTE_MODE: "frontend" | "backend";
  /** Application route mode: history or hash */
  readonly VITE_APP_ROUTER_MODE: "history" | "hash";
  /** Whether to enable visualizer */
  readonly VITE_APP_VISUALIZER: "true" | "false";
  /** Whether to enable html plugin */
  readonly VITE_APP_HTML_PLUGIN: "true" | "false";
  /** Whether to enable compress plugin */
  readonly VITE_APP_COMPRESS_PLUGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

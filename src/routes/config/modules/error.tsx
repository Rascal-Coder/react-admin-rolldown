import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../../utils";

/**
 * 错误页面模块路由配置
 */
const errorRoutes: RouteConfig[] = [
  {
    path: "error",
    icon: "bxs:error-alt",
    name: "错误页面",
    children: [
      { redirect: "404" },
      {
        path: "403",
        lazy: createLazyComponent("/pages/_built/page-403"),
        name: "403",
      },
      {
        path: "404",
        lazy: createLazyComponent("/pages/_built/page-404"),
        name: "404",
      },
      {
        path: "500",
        lazy: createLazyComponent("/pages/_built/page-500"),
        name: "500",
      },
    ],
  },
];
export default errorRoutes;

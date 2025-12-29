import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "../../utils/create-router";

/**
 * KeepAlive 模块路由配置
 */
const aliveRoutes: RouteConfig[] = [
  {
    path: "alive",
    lazy: createLazyComponent("/pages/alive"),
    name: "KeepAlive",
    icon: "local:kun",
    keepAlive: true,
  },
];
export default aliveRoutes;

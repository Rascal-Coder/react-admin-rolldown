import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../../utils";

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

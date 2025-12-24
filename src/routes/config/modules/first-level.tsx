import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../../utils";

/**
 * 一级菜单模块路由配置
 */
const firstLevelRoutes: RouteConfig[] = [
  {
    path: "first_level",
    name: "一级菜单",
    icon: "local:file-ai",
    lazy: createLazyComponent("/pages/first-level"),
  },
];
export default firstLevelRoutes;

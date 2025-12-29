import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "../../utils/create-router";

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

import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "../../utils/create-router";

/**
 * System 模块路由配置
 */
const systemRoutes: RouteConfig[] = [
  {
    path: "system",
    name: "系统管理",
    children: [
      { redirect: "menu-manage" },
      {
        path: "menu-manage",
        lazy: createLazyComponent("/pages/system/menu-manage"),
        name: "菜单管理",
      },
      {
        path: "role-manage",
        lazy: createLazyComponent("/pages/system/role-manage"),
        name: "角色管理",
      },
      {
        path: "user-manage",
        lazy: createLazyComponent("/pages/system/user-manage"),
        name: "用户管理",
      },
    ],
  },
];

export default systemRoutes;

import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "../../utils/create-router";

/**
 * 用户管理模块路由配置
 */
const userRoutes: RouteConfig[] = [
  {
    path: "user",
    name: "用户管理",
    icon: "lucide:user",
    permission: "SUPER_ADMIN", // 需要 SUPER_ADMIN 角色才能访问
    children: [
      { redirect: "list" },
      {
        path: "list",
        lazy: createLazyComponent("/pages/user/list"),
        name: "用户列表",
        icon: "lucide:users",
        permission: "SUPER_ADMIN",
      },
      {
        path: ":id",
        lazy: createLazyComponent("/pages/user/detail"),
        name: "用户详情",
        icon: "lucide:user-circle",
        hidden: true, // 动态路由通常隐藏在菜单中
      },
    ],
  },
];

export default userRoutes;

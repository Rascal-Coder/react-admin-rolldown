import type { RouteConfig } from "@/lib/router-toolset/types";

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    flatten: true,
    component: () => import("@/layouts/base"),
    children: [
      {
        path: "dashboard",
        name: "仪表盘",
        icon: "lucide:layout-dashboard",
        children: [
          { path: "", redirect: "workbench" },
          {
            path: "workbench",
            component: () => import("@/pages/dashboard/workbench"),
            name: "工作台",
            pinned: true,
            icon: "lucide:workflow",
          },
          {
            path: "analysis",
            component: () => import("@/pages/dashboard/analysis"),
            icon: "lucide:bar-chart-3",
            name: "分析",
          },
        ],
      },
      {
        path: "menu_level",
        component: () => import("@/pages/menu-level"),
        name: "多级菜单",
        icon: "lucide:layers",
        children: [
          { path: "", redirect: "1a" },
          {
            path: "1a",
            component: () => import("@/pages/menu-level/menu-level-1a"),
            name: "多级菜单1a",
            icon: "lucide:menu",
          },
          {
            path: "1b",
            component: () => import("@/pages/menu-level/menu-level-1b"),
            name: "多级菜单1b",
            icon: "lucide:menu",
            children: [
              {
                path: "",
                redirect: "2a",
              },
              {
                path: "2a",
                component: () =>
                  import("@/pages/menu-level/menu-level-1b/menu-level-1b-2a"),
                name: "多级菜单2a",
                icon: "lucide:file-text",
              },
              {
                path: "2b",
                component: () =>
                  import("@/pages/menu-level/menu-level-1b/menu-level-1b-2b"),
                name: "多级菜单2b",
                icon: "lucide:menu",
                children: [
                  {
                    path: "",
                    redirect: "3a",
                  },
                  {
                    path: "3a",
                    component: () =>
                      import(
                        "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
                      ),
                    name: "多级菜单3a",
                    icon: "lucide:file-text",
                  },
                  {
                    path: "3b",
                    component: () =>
                      import(
                        "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
                      ),
                    name: "多级菜单3b",
                    icon: "lucide:file-text",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "first_level",
        name: "一级菜单",
        icon: "local:file-ai",
        component: () => import("@/pages/first-level"),
      },
      {
        path: "test_badge",
        name: "测试徽章1111111",
        icon: "lucide:sparkles",
        badgeType: "text",
        badgeText: "new",
        badgeVariant: "info",
        children: [
          { path: "", redirect: "1" },
          {
            path: "1",
            component: () => import("@/pages/test-badge/test-badge-1"),
            name: "测试徽章2222222",
            icon: "lucide:sparkles",
            badgeType: "normal",
            badgeVariant: "success",
          },
        ],
      },
      {
        path: "user",
        name: "用户管理",
        icon: "lucide:user",
        children: [
          { path: "", redirect: "list" },
          {
            path: "list",
            component: () => import("@/pages/user/list"),
            name: "用户列表",
            icon: "lucide:users",
          },
          {
            path: ":id",
            component: () => import("@/pages/user/detail"),
            name: "用户详情",
            icon: "lucide:user-circle",
            hidden: true, // 动态路由通常隐藏在菜单中
          },
        ],
      },
    ],
  },
  {
    path: "/separation",
    component: () => import("@/pages/separation"),
    name: "独立布局",
    icon: "lucide:square",
  },
  {
    path: "*",
    component: () => import("@/pages/_built/404"),
    flatten: true,
  },
];

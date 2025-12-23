import type { RouteConfig } from "@/lib/router-toolset/types";
import { Component, LayoutBase, LayoutSimple } from "../utils";

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    flatten: true,
    component: <LayoutBase />,
    children: [
      {
        path: "dashboard",
        name: "仪表盘",
        icon: "lucide:layout-dashboard",
        children: [
          { path: "", redirect: "workbench" },
          {
            path: "workbench",
            component: Component("/pages/dashboard/workbench"),
            name: "工作台",
            pinned: true,
            icon: "lucide:workflow",
          },
          {
            path: "analysis",
            component: Component("/pages/dashboard/analysis"),
            icon: "lucide:bar-chart-3",
            name: "分析",
          },
        ],
      },
      {
        path: "menu_level",
        component: Component("/pages/menu-level"),
        name: "多级菜单",
        icon: "lucide:layers",
        children: [
          { path: "", redirect: "1a" },
          {
            path: "1a",
            component: Component("/pages/menu-level/menu-level-1a"),
            name: "多级菜单1a",
            icon: "lucide:menu",
          },
          {
            path: "1b",
            component: Component("/pages/menu-level/menu-level-1b"),
            name: "多级菜单1b",
            icon: "lucide:menu",
            children: [
              {
                path: "",
                redirect: "2a",
              },
              {
                path: "2a",
                component: Component(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2a"
                ),
                name: "多级菜单2a",
                icon: "lucide:file-text",
              },
              {
                path: "2b",
                component: Component(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2b"
                ),
                name: "多级菜单2b",
                icon: "lucide:menu",
                children: [
                  {
                    path: "",
                    redirect: "3a",
                  },
                  {
                    path: "3a",
                    component: Component(
                      "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
                    ),
                    name: "多级菜单3a",
                    icon: "lucide:file-text",
                  },
                  {
                    path: "3b",
                    component: Component(
                      "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
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
        component: Component("/pages/first-level"),
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
            component: Component("/pages/test-badge/test-badge-1"),
            name: "测试徽章2222222",
            icon: "lucide:sparkles",
            badgeType: "normal",
            badgeVariant: "success",
          },
        ],
      },
      {
        path: "alive",
        component: Component("/pages/alive"),
        name: "KeepAlive",
        icon: "local:kun",
        keepAlive: true,
      },
      {
        path: "user",
        name: "用户管理",
        icon: "lucide:user",
        children: [
          { path: "", redirect: "list" },
          {
            path: "list",
            component: Component("/pages/user/list"),
            name: "用户列表",
            icon: "lucide:users",
          },
          {
            path: ":id",
            component: Component("/pages/user/detail"),
            name: "用户详情",
            icon: "lucide:user-circle",
            hidden: true, // 动态路由通常隐藏在菜单中
          },
        ],
      },
      {
        path: "error",
        icon: "bxs:error-alt",
        name: "错误页面",
        children: [
          { path: "", redirect: "404" },
          {
            path: "403",
            component: Component("/pages/_built/page-403"),
            name: "403",
          },
          {
            path: "404",
            component: Component("/pages/_built/page-404"),
            name: "404",
          },
          {
            path: "500",
            component: Component("/pages/_built/page-500"),
            name: "500",
          },
        ],
      },
      {
        path: "link",
        name: "链接",
        icon: "lucide:link",
        children: [
          { path: "", redirect: "ant-design-iframe" },
          {
            name: "Ant Design (内嵌)",
            icon: "lucide:monitor",
            path: "ant-design-iframe",
            component: Component("/pages/_built/link/iframe", {
              src: "https://ant.design/index-cn",
            }),
          },
          {
            name: "Ant Design (外部链接)",
            icon: "lucide:external-link",
            path: "ant-design-external-link",
            component: Component("/pages/_built/link/external-link", {
              src: "https://ant.design/index-cn",
            }),
          },
          {
            name: "shadcn",
            icon: "lucide:monitor",
            path: "shadcn-iframe",
            component: Component("/pages/_built/link/iframe", {
              src: "https://ui.shadcn.com/docs",
            }),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    component: <LayoutSimple />,
    name: "登录",
    icon: "lucide:lock",
    hidden: true,
    flatten: true,
    children: [
      { path: "", redirect: "sign-in" },
      {
        path: "sign-in",
        component: Component("/pages/_built/auth/sign-in"),
      },
      {
        path: "sign-up",
        component: Component("/pages/_built/auth/sign-up"),
      },
      {
        path: "forgot-password",
        component: Component("/pages/_built/auth/forgot-password"),
      },
    ],
  },
  {
    path: "/separation",
    component: Component("/pages/separation"),
    name: "独立布局",
    icon: "lucide:square",
    flatten: true,
  },
  {
    path: "/403",
    component: Component("/pages/_built/page-403"),
    flatten: true,
  },
  {
    path: "/500",
    component: Component("/pages/_built/page-500"),
    flatten: true,
  },
  {
    path: "*",
    component: Component("/pages/_built/page-404"),
    flatten: true,
  },
];

import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../utils";

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    flatten: true,
    lazy: async () => {
      const LayoutBase = (await import("@/layouts/base")).default;
      const LoginAuthGuard = (
        await import("@/components/advanced/auth/login-auth-guard")
      ).default;
      return {
        Component: () => (
          <LoginAuthGuard>
            <LayoutBase />
          </LoginAuthGuard>
        ),
      };
    },
    children: [
      {
        path: "dashboard",
        name: "仪表盘",
        icon: "lucide:layout-dashboard",
        children: [
          { redirect: "workbench" },
          {
            path: "workbench",
            lazy: createLazyComponent("/pages/dashboard/workbench"),
            name: "工作台",
            pinned: true,
            icon: "lucide:workflow",
          },
          {
            path: "analysis",
            lazy: createLazyComponent("/pages/dashboard/analysis"),
            icon: "lucide:bar-chart-3",
            name: "分析",
          },
        ],
      },
      {
        path: "menu_level",
        lazy: createLazyComponent("/pages/menu-level"),
        name: "多级菜单",
        icon: "lucide:layers",
        children: [
          { redirect: "1a" },
          {
            path: "1a",
            lazy: createLazyComponent("/pages/menu-level/menu-level-1a"),
            name: "多级菜单1a",
            icon: "lucide:menu",
          },
          {
            path: "1b",
            lazy: createLazyComponent("/pages/menu-level/menu-level-1b"),
            name: "多级菜单1b",
            icon: "lucide:menu",
            children: [
              {
                redirect: "2a",
              },
              {
                path: "2a",
                lazy: createLazyComponent(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2a"
                ),
                name: "多级菜单2a",
                icon: "lucide:file-text",
              },
              {
                path: "2b",
                lazy: createLazyComponent(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2b"
                ),
                name: "多级菜单2b",
                icon: "lucide:menu",
                children: [
                  {
                    redirect: "3a",
                  },
                  {
                    path: "3a",
                    lazy: createLazyComponent(
                      "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
                    ),
                    name: "多级菜单3a",
                    icon: "lucide:file-text",
                  },
                  {
                    path: "3b",
                    lazy: createLazyComponent(
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
        lazy: createLazyComponent("/pages/first-level"),
      },
      {
        path: "test_badge",
        name: "测试徽章1111111",
        icon: "lucide:sparkles",
        badgeType: "text",
        badgeText: "new",
        badgeVariant: "info",
        children: [
          { redirect: "1" },
          {
            path: "1",
            lazy: createLazyComponent("/pages/test-badge/test-badge-1"),
            name: "测试徽章2222222",
            icon: "lucide:sparkles",
            badgeType: "normal",
            badgeVariant: "success",
          },
        ],
      },
      {
        path: "alive",
        lazy: createLazyComponent("/pages/alive"),
        name: "KeepAlive",
        icon: "local:kun",
        keepAlive: true,
      },
      {
        path: "user",
        name: "用户管理",
        icon: "lucide:user",
        children: [
          { redirect: "list" },
          {
            path: "list",
            lazy: createLazyComponent("/pages/user/list"),
            name: "用户列表",
            icon: "lucide:users",
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
      {
        path: "link",
        name: "链接",
        icon: "lucide:link",
        children: [
          { redirect: "ant-design-iframe" },
          {
            name: "Ant Design (内嵌)",
            icon: "lucide:monitor",
            path: "ant-design-iframe",
            lazy: async () => {
              const Iframe = (await import("@/pages/_built/link/iframe"))
                .default;
              return {
                Component: () => <Iframe src="https://ant.design/index-cn" />,
              };
            },
          },
          {
            name: "Ant Design (外部链接)",
            icon: "lucide:external-link",
            path: "ant-design-external-link",
            lazy: async () => {
              const ExternalLink = (
                await import("@/pages/_built/link/external-link")
              ).default;
              return {
                Component: () => (
                  <ExternalLink src="https://ant.design/index-cn" />
                ),
              };
            },
          },
          {
            name: "shadcn",
            icon: "lucide:monitor",
            path: "shadcn-iframe",
            lazy: async () => {
              const Iframe = (await import("@/pages/_built/link/iframe"))
                .default;
              return {
                Component: () => <Iframe src="https://ui.shadcn.com/docs" />,
              };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    lazy: async () => {
      const LayoutSimple = (await import("@/layouts/simple")).default;
      return { Component: LayoutSimple };
    },
    name: "登录",
    icon: "lucide:lock",
    hidden: true,
    flatten: true,
    children: [
      { path: "", redirect: "sign-in" },
      {
        path: "sign-in",
        lazy: createLazyComponent("/pages/_built/auth/sign-in"),
        hidden: true,
      },
      {
        path: "sign-up",
        lazy: createLazyComponent("/pages/_built/auth/sign-up"),
        hidden: true,
      },
      {
        path: "forgot-password",
        lazy: createLazyComponent("/pages/_built/auth/forgot-password"),
        hidden: true,
      },
    ],
  },
  {
    path: "/separation",
    lazy: createLazyComponent("/pages/separation"),
    name: "独立布局",
    icon: "lucide:square",
    flatten: true,
  },
  {
    path: "/403",
    lazy: createLazyComponent("/pages/_built/page-403"),
    flatten: true,
  },
  {
    path: "/500",
    lazy: createLazyComponent("/pages/_built/page-500"),
    flatten: true,
  },
  {
    path: "*",
    lazy: createLazyComponent("/pages/_built/page-404"),
    flatten: true,
  },
];

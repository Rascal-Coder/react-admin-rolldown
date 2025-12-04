import {
  BarChart3,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  Menu,
  Sparkles,
  Workflow,
} from "lucide-react";
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
        icon: <LayoutDashboard className="h-4 w-4" />,
        children: [
          { path: "", redirect: "workbench" },
          {
            path: "workbench",
            component: () => import("@/pages/dashboard/workbench"),
            name: "工作台",
            icon: <Workflow className="h-4 w-4" />,
          },
          {
            path: "analysis",
            component: () => import("@/pages/dashboard/analysis"),
            icon: <BarChart3 className="h-4 w-4" />,
            name: "分析",
          },
        ],
      },
      {
        path: "menu_level",
        name: "多级菜单",
        icon: <Layers className="h-4 w-4" />,
        children: [
          { path: "", redirect: "1a" },
          {
            path: "1a",
            component: () => import("@/pages/menu-level/menu-level-1a"),
            name: "多级菜单1a",
            icon: <Menu className="h-4 w-4" />,
          },
          {
            path: "1b",
            name: "多级菜单1b",
            icon: <Menu className="h-4 w-4" />,
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
                icon: <FileText className="h-4 w-4" />,
              },
              {
                path: "2b",
                name: "多级菜单2b",
                icon: <Menu className="h-4 w-4" />,
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
                    icon: <FileText className="h-4 w-4" />,
                  },
                  {
                    path: "3b",
                    component: () =>
                      import(
                        "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
                      ),
                    name: "多级菜单3b",
                    icon: <FileText className="h-4 w-4" />,
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
        icon: <Home className="h-4 w-4" />,
        component: () => import("@/pages/first-level"),
      },
      {
        path: "test_badge",
        name: "测试徽章1111111",
        icon: <Sparkles className="h-4 w-4" />,
        badgeType: "text",
        badgeText: "new",
        badgeVariant: "info",
        children: [
          { path: "", redirect: "1" },
          {
            path: "1",
            component: () => import("@/pages/test-badge/test-badge-1"),
            name: "测试徽章2222222",
            icon: <Sparkles className="h-4 w-4" />,
            badgeType: "normal",
            badgeVariant: "success",
          },
        ],
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/pages/_built/404"),
    flatten: true,
  },
];

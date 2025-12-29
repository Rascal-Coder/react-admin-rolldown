import type { RouteConfig } from "@/routes/types";
import { createLazyComponent } from "../../utils/create-router";

/**
 * 仪表盘模块路由配置
 */
const dashboardRoutes: RouteConfig[] = [
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
];
export default dashboardRoutes;

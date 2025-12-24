import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../../utils";

/**
 * 测试徽章模块路由配置
 */
const testBadgeRoutes: RouteConfig[] = [
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
];

export default testBadgeRoutes;

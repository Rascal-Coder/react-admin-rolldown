import type { RouteConfig } from "@/lib/router-toolset/types";

/**
 * 链接模块路由配置
 */
const linkRoutes: RouteConfig[] = [
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
          const Iframe = (await import("@/pages/_built/link/iframe")).default;
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
            Component: () => <ExternalLink src="https://ant.design/index-cn" />,
          };
        },
      },
      {
        name: "shadcn",
        icon: "lucide:monitor",
        path: "shadcn-iframe",
        lazy: async () => {
          const Iframe = (await import("@/pages/_built/link/iframe")).default;
          return {
            Component: () => <Iframe src="https://ui.shadcn.com/docs" />,
          };
        },
      },
    ],
  },
];

export default linkRoutes;

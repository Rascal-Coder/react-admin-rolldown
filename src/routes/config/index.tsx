import Layout from "@/layouts/base";
import type { RouteConfig } from "@/lib/router-toolset/types";

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    children: [
      {
        path: "404",
        lazy: "/_built/404",
      },
    ],
  },
  {
    layout: <Layout />,
    children: [
      {
        redirect: "/workbench",
      },
      {
        path: "workbench",
        lazy: "/dashboard/workbench",
      },
      {
        path: "analysis",
        lazy: "/dashboard/analysis",
      },
      {
        path: "menu_level",
        children: [
          { redirect: "1a" },
          { path: "1a", lazy: "/menu-level/menu-level-1a" },
          {
            path: "1b",
            children: [
              { redirect: "2a" },
              {
                path: "2a",
                lazy: "/menu-level/menu-level-1b/menu-level-1b-2a",
              },
              {
                path: "2b",
                children: [
                  { redirect: "3a" },
                  {
                    path: "3a",
                    lazy: "/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a",
                  },
                  {
                    path: "3b",
                    lazy: "/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "test_badge",
        children: [
          { redirect: "1" },
          { path: "1", lazy: "/test-badge/test-badge-1" },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: "/_built/404",
  },
];

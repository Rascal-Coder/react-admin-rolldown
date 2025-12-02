import { Navigate, type RouteObject } from "react-router";
import Layout from "@/layouts";

export const routesSection: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "404",
        async lazy() {
          const { default: NotFound } = await import("@/pages/_built/404");
          return { Component: NotFound };
        },
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/workbench" />,
      },
      {
        path: "workbench",
        async lazy() {
          const { default: Workbench } = await import(
            "@/pages/dashboard/workbench"
          );
          return { Component: Workbench };
        },
        handle: {
          hidden: true,
        },
      },
      {
        path: "analysis",
        async lazy() {
          const { default: Analysis } = await import(
            "@/pages/dashboard/analysis"
          );
          return { Component: Analysis };
        },
      },
      {
        path: "menu_level",
        children: [
          { index: true, element: <Navigate replace to="1a" /> },
          {
            path: "1a",
            async lazy() {
              const { default: MenuLevel1a } = await import(
                "@/pages/menu-level/menu-level-1a"
              );
              return { Component: MenuLevel1a };
            },
          },
          {
            path: "1b",
            children: [
              { index: true, element: <Navigate replace to="2a" /> },
              {
                path: "2a",
                async lazy() {
                  const { default: MenuLevel1b2a } = await import(
                    "@/pages/menu-level/menu-level-1b/menu-level-1b-2a"
                  );
                  return { Component: MenuLevel1b2a };
                },
              },
              {
                path: "2b",
                children: [
                  { index: true, element: <Navigate replace to="3a" /> },
                  {
                    path: "3a",
                    async lazy() {
                      const { default: MenuLevel1b2b3a } = await import(
                        "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
                      );
                      return { Component: MenuLevel1b2b3a };
                    },
                  },
                  {
                    path: "3b",
                    async lazy() {
                      const { default: MenuLevel1b2b3b } = await import(
                        "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
                      );
                      return { Component: MenuLevel1b2b3b };
                    },
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
          { index: true, element: <Navigate replace to="1" /> },
          {
            path: "1",
            async lazy() {
              const { default: TestBadge1 } = await import(
                "@/pages/test-badge/test-badge-1"
              );
              return { Component: TestBadge1 };
            },
          },
        ],
      },
    ],
  },
  // No Match
  { path: "*", element: <Navigate replace to="/404" /> },
];

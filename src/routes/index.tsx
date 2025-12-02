import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";
import Layout from "@/layouts";

const MenuLevel1a = lazy(() => import("@/pages/menu-level/menu-level-1a"));
const MenuLevel1b2a = lazy(
  () => import("@/pages/menu-level/menu-level-1b/menu-level-1b-2a")
);
const MenuLevel1b2b3a = lazy(
  () =>
    import(
      "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
    )
);
const MenuLevel1b2b3b = lazy(
  () =>
    import(
      "@/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
    )
);
const Workbench = lazy(() => import("@/pages/dashboard/workbench"));
const Analysis = lazy(() => import("@/pages/dashboard/analysis"));
const TestBadge1 = lazy(() => import("@/pages/test-badge/test-badge-1"));
const NotFound = lazy(() => import("@/pages/_built/404"));
export const routesSection: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "404",
        element: <NotFound />,
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
        element: <Workbench />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
      {
        path: "menu_level",
        children: [
          { index: true, element: <Navigate replace to="1a" /> },
          { path: "1a", element: <MenuLevel1a /> },
          {
            path: "1b",
            children: [
              { index: true, element: <Navigate replace to="2a" /> },
              {
                path: "2a",
                element: <MenuLevel1b2a />,
              },
              {
                path: "2b",
                children: [
                  { index: true, element: <Navigate replace to="3a" /> },
                  {
                    path: "3a",
                    element: <MenuLevel1b2b3a />,
                  },
                  {
                    path: "3b",
                    element: <MenuLevel1b2b3b />,
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
          { path: "1", element: <TestBadge1 /> },
        ],
      },
    ],
  },
  // No Match
  { path: "*", element: <Navigate replace to="/404" /> },
];

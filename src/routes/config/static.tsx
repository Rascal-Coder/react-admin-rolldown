import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../utils";

/**
 * 静态路由配置
 * 包含基础框架路由，如认证页面、错误页面、基础布局等
 * 这些路由不依赖业务逻辑，在构建时即可确定
 */
export const staticRoutes: RouteConfig[] = [
  // 根路径重定向
  {
    path: "/",
    redirect: "/dashboard",
  },
  // 基础布局容器（包含认证守卫，但不包含业务子路由）
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
    // 注意：业务子路由将在 dynamicRoutes 中定义
    children: [],
  },
  // 认证相关路由
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
  // 独立布局路由
  {
    path: "/separation",
    lazy: createLazyComponent("/pages/separation"),
    name: "独立布局",
    icon: "lucide:square",
    flatten: true,
  },
  // 错误页面路由
  {
    path: "/403",
    hidden: true,
    lazy: async () => {
      const SimpleLayout = (await import("@/layouts/simple")).default;
      const Page403 = (await import("@/pages/_built/page-403")).default;
      return {
        Component: () => (
          <SimpleLayout>
            <Page403 />
          </SimpleLayout>
        ),
      };
    },
    // flatten: true,
  },
  {
    path: "/500",
    hidden: true,
    lazy: async () => {
      const SimpleLayout = (await import("@/layouts/simple")).default;
      const Page500 = (await import("@/pages/_built/page-500")).default;
      return {
        Component: () => (
          <SimpleLayout>
            <Page500 />
          </SimpleLayout>
        ),
      };
    },
    // flatten: true,
  },
  {
    path: "*",
    hidden: true,
    lazy: async () => {
      const SimpleLayout = (await import("@/layouts/simple")).default;
      const Page404 = (await import("@/pages/_built/page-404")).default;
      return {
        Component: () => (
          <SimpleLayout>
            <Page404 />
          </SimpleLayout>
        ),
      };
    },
    // flatten: true,
  },
];

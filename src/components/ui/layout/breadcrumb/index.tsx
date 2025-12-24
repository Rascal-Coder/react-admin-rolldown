import { useLocation } from "react-router";
import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { CapsuleBreadcrumb } from "./capsule-breadcrumb";
import { ParallelogramBreadcrumb } from "./parallelogram-breadcrumb";
import { RibbonBreadcrumb } from "./ribbon-breadcrumb";
import type { BreadcrumbVariant } from "./types";

export function Breadcrumb({
  variant = "ribbon",
}: {
  variant?: BreadcrumbVariant;
}) {
  const { curRoute, flattenRoutes } = useRouter(routes);
  const location = useLocation();
  const currentPath = location.pathname;

  /**
   * 解析路径的最终目标（处理redirect）
   */
  const resolveFinalPath = (path: string): string => {
    const route = flattenRoutes.get(path);
    if (route?.redirect) {
      // 处理redirect，需要拼接完整路径
      const redirectPath = route.redirect.startsWith("/")
        ? route.redirect
        : `${path}/${route.redirect}`;
      // 递归解析，防止多层redirect
      return resolveFinalPath(redirectPath);
    }
    return path;
  };

  const breadcrumbList =
    curRoute?.collectedPathname
      ?.filter((path) => path !== "")
      .map((path) => {
        const route = flattenRoutes.get(path);
        const label = route?.name || "";
        return {
          label,
          href: path,
          icon: route?.icon,
        };
      }) ?? [];

  if (variant === "parallelogram") {
    return (
      <ParallelogramBreadcrumb
        currentPath={currentPath}
        list={breadcrumbList}
        resolveFinalPath={resolveFinalPath}
      />
    );
  }
  if (variant === "ribbon") {
    return (
      <RibbonBreadcrumb
        currentPath={currentPath}
        list={breadcrumbList}
        resolveFinalPath={resolveFinalPath}
      />
    );
  }
  return (
    <CapsuleBreadcrumb
      currentPath={currentPath}
      list={breadcrumbList}
      resolveFinalPath={resolveFinalPath}
    />
  );
}

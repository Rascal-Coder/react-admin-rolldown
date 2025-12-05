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

  const breadcrumbList =
    curRoute?.collecttedPathname
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
    return <ParallelogramBreadcrumb list={breadcrumbList} />;
  }
  if (variant === "ribbon") {
    return <RibbonBreadcrumb list={breadcrumbList} />;
  }
  return <CapsuleBreadcrumb list={breadcrumbList} />;
}

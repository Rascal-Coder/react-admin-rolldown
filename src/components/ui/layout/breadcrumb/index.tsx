import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { ParallelogramBreadcrumb } from "./parallelogram-breadcrumb";

// const breadcrumbList = [
//   {
//     label: "首页",
//     href: "/",
//   },
//   {
//     label: "概览",
//     href: "/overview",
//   },
//   {
//     label: "Echarts高级图表",
//     href: "/echarts",
//   },
//   {
//     label: "设置",
//     href: "/settings",
//   },
// ];

export function Breadcrumb() {
  const { curRoute, flattenRoutes } = useRouter(routes);
  const breadcrumbList = curRoute?.collecttedPathname
    ?.filter((path) => path !== "")
    .map((path) => {
      const route = flattenRoutes.get(path);
      const label = route?.name || "";
      return {
        label,
        href: path,
      };
    });
  return <ParallelogramBreadcrumb list={breadcrumbList ?? []} />;
  // return <RibbonBreadcrumb list={breadcrumbList ?? []} />;
  // return <CapsuleBreadcrumb list={breadcrumbList ?? []} />;
}

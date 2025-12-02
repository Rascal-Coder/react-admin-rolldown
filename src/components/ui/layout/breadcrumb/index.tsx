import { ParallelogramBreadcrumb } from "./parallelogram-breadcrumb";

const breadcrumbList = [
  {
    label: "首页",
    href: "/",
  },
  {
    label: "概览",
    href: "/overview",
  },
  {
    label: "Echarts高级图表",
    href: "/echarts",
  },
  {
    label: "设置",
    href: "/settings",
  },
];

export function Breadcrumb() {
  return <ParallelogramBreadcrumb list={breadcrumbList} />;
  // return <RibbonBreadcrumb list={breadcrumbList} />;
  // return <CapsuleBreadcrumb list={breadcrumbList} />;
}

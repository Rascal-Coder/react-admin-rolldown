import { CapsuleBreadcrumb } from "./capsule-breadcrumb";

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
  return <CapsuleBreadcrumb list={breadcrumbList} />;
  // return <RibbonBreadcrumb list={breadcrumbList} />;
  // return <ParallelogramBreadcrumb list={breadcrumbList} />;
}

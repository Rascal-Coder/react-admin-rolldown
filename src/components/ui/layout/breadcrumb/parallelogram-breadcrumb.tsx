import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";

export function ParallelogramBreadcrumb({
  list,
}: {
  list: { label: string; href: string }[];
}) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden sm:gap-0">
        {list.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {index === list.length - 1 ? (
              <BreadcrumbPage className="parallelogram-breadcrumb inline-flex items-center gap-0.5 bg-muted px-4 text-sm leading-[2.15] transition-all duration-300 hover:bg-accent">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                className="parallelogram-breadcrumb mr-[-6px] inline-flex items-center gap-0.5 bg-muted px-4 text-sm leading-[2.15] transition-all duration-300 hover:bg-accent"
                href={item.href}
              >
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbBase>
  );
}

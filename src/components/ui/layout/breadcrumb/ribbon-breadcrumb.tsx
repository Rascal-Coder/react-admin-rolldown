import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";
import { cn } from "@/utils";

export function RibbonBreadcrumb({
  list,
}: {
  list: { label: string; href: string }[];
}) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center overflow-hidden rounded-sm">
        {list.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {index === list.length - 1 ? (
              <BreadcrumbPage className="ribbon-breadcrumb-last inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-all duration-300 hover:bg-accent">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                className={cn(
                  "ribbon-breadcrumb mr-[calc(-1*10px+-8px)] inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-all duration-300 hover:bg-accent",
                  {
                    "ribbon-breadcrumb-first": index === 0,
                  }
                )}
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

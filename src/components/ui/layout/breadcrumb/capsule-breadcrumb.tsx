import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";

export function CapsuleBreadcrumb({
  list,
}: {
  list: { label: string; href: string }[];
}) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden rounded-full border border-[currentColor] bg-[currentColor] text-layout-breadcrumb-border sm:gap-0">
        {list.map((item, index) => (
          <BreadcrumbItem
            className="group text-muted-foreground"
            key={item.href}
          >
            {index === list.length - 1 ? (
              <BreadcrumbPage className="capsule-breadcrumb inline-flex items-center gap-0.5 bg-layout-breadcrumb px-4 pl-8 text-sm leading-loose transition-all duration-300 hover:bg-layout-breadcrumb-accent">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                className="group-not-first:capsule-breadcrumb mr-[-0.52lh] inline-flex items-center gap-0.5 rounded-r-full bg-layout-breadcrumb px-4 text-sm leading-loose transition-all duration-300 hover:bg-layout-breadcrumb-accent group-first:rounded-full group-not-first:pl-8"
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

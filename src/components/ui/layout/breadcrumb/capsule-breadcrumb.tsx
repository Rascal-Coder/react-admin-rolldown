import { Breadcrumb as BreadcrumbBase } from "@/components/base/breadcrumb";
import Icon from "@/components/ui/icon/icon";
import { useRouterNavigation } from "@/hooks/use-router";
import { AnimatedBreadcrumbItem } from "./animated-breadcrumb-item";
import { AnimatedBreadcrumbList } from "./animated-breadcrumb-list";
import type { BreadcrumbItem } from "./types";

export function CapsuleBreadcrumb({
  list,
  currentPath,
  resolveFinalPath,
}: {
  list: BreadcrumbItem[];
  currentPath: string;
  resolveFinalPath: (path: string) => string;
}) {
  const navigate = useRouterNavigation();

  const handleNavigate = (href: string) => {
    const finalPath = resolveFinalPath(href);
    // 如果解析后的目标路径就是当前路径，则不导航
    if (finalPath === currentPath) {
      return;
    }
    navigate.push(href);
  };

  return (
    <BreadcrumbBase className="p-1">
      <AnimatedBreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden rounded-full border border-[currentColor] bg-[currentColor] text-border sm:gap-0">
        {list.map((item, index) => (
          <AnimatedBreadcrumbItem
            className="group text-muted-foreground"
            key={item.href}
          >
            <div
              className={
                index === list.length - 1
                  ? "capsule-breadcrumb inline-flex items-center gap-0.5 bg-mutd px-4 pl-5 text-sm leading-loose transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60"
                  : "group-not-first:capsule-breadcrumb mr-[-0.52lh] inline-flex cursor-pointer items-center gap-0.5 rounded-r-full bg-muted px-4 pl-5 text-sm leading-loose transition-all duration-300 hover:bg-accent group-first:rounded-full group-not-first:pl-8 dark:hover:bg-accent-foreground/60"
              }
              {...(index !== list.length - 1 && {
                onClick: () => handleNavigate(item.href),
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }
                },
                role: "button",
                tabIndex: 0,
              })}
            >
              <span className="flex-y-center gap-1.5 truncate">
                {item.icon && <Icon icon={item.icon} size={16} />}
                {item.label}
              </span>
            </div>
          </AnimatedBreadcrumbItem>
        ))}
      </AnimatedBreadcrumbList>
    </BreadcrumbBase>
  );
}

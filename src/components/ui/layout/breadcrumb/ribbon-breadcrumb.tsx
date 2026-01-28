import { Breadcrumb as BreadcrumbBase } from "@/components/base/breadcrumb";
import Icon from "@/components/ui/icon/icon";
import { useRouterNavigation } from "@/hooks/use-router";
import { cn } from "@/utils";
import { AnimatedBreadcrumbItem } from "./animated-breadcrumb-item";
import { AnimatedBreadcrumbList } from "./animated-breadcrumb-list";
import type { BreadcrumbItem } from "./types";

export function RibbonBreadcrumb({
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
    navigate.push(finalPath);
  };
  return (
    <BreadcrumbBase className="p-1">
      <AnimatedBreadcrumbList className="w-max flex-y-center overflow-hidden rounded-sm">
        {list.map((item, index) => {
          const isLast = index === list.length - 1;
          const isFirst = index === 0;
          const isSingle = list.length <= 1;
          const isClickable = !isLast;

          const getClassName = () => {
            if (isSingle) {
              return "inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-[background-color] duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60";
            }
            if (isLast) {
              return "ribbon-breadcrumb-last inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-[background-color] duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60";
            }
            return cn(
              "ribbon-breadcrumb mr-[calc(-1*10px+-8px)] inline-flex cursor-pointer items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-[background-color] duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60",
              {
                "ribbon-breadcrumb-first": isFirst,
              }
            );
          };

          return (
            <AnimatedBreadcrumbItem key={item.href}>
              <div
                className={getClassName()}
                {...(isClickable
                  ? {
                      onClick: () => handleNavigate(item.href),
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleNavigate(item.href);
                        }
                      },
                      role: "button",
                      tabIndex: 0,
                    }
                  : {})}
              >
                <span className="flex-y-center gap-1.5 truncate">
                  {item.icon && <Icon icon={item.icon} size={16} />}
                  {item.label}
                </span>
              </div>
            </AnimatedBreadcrumbItem>
          );
        })}
      </AnimatedBreadcrumbList>
    </BreadcrumbBase>
  );
}

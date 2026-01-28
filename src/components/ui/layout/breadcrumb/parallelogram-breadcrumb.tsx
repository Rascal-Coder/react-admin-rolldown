import { Breadcrumb as BreadcrumbBase } from "@/components/base/breadcrumb";
import Icon from "@/components/ui/icon/icon";
import { useRouterNavigation } from "@/hooks/use-router";
import { AnimatedBreadcrumbItem } from "./animated-breadcrumb-item";
import { AnimatedBreadcrumbList } from "./animated-breadcrumb-list";
import type { BreadcrumbItem } from "./types";

export function ParallelogramBreadcrumb({
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
      <AnimatedBreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden sm:gap-0">
        {list.map((item, index) => (
          <AnimatedBreadcrumbItem key={item.href}>
            <div
              className={`parallelogram-breadcrumb inline-flex items-center gap-0.5 bg-muted px-4 text-sm leading-[2.15] transition-[background-color] duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60 ${
                index !== list.length - 1 ? "mr-[-6px] cursor-pointer" : ""
              }`}
              {...(index !== list.length - 1
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
        ))}
      </AnimatedBreadcrumbList>
    </BreadcrumbBase>
  );
}

import { useNavigate } from "react-router";
import { Breadcrumb as BreadcrumbBase } from "@/components/base/breadcrumb";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";
import { AnimatedBreadcrumbItem } from "./animated-breadcrumb-item";
import { AnimatedBreadcrumbList } from "./animated-breadcrumb-list";
import type { BreadcrumbItem } from "./types";

export function RibbonBreadcrumb({ list }: { list: BreadcrumbItem[] }) {
  const navigate = useNavigate();
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
                      onClick: () => navigate(item.href),
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(item.href);
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

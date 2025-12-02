import { useMemo } from "react";
import { cn } from "@/utils";
import { useSidebar } from "./resizable-sidebar";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  icpLink?: string;
  icp?: string;
  date?: string;
  companyName?: string;
  companySiteLink?: string;
  className?: string;
  isFixed?: boolean;
  variant?: "sidebar" | "floating" | "inset";
}

export function Footer({
  icpLink,
  icp,
  date,
  companyName,
  companySiteLink,
  className,
  isFixed = false,
  variant = "sidebar",
}: FooterProps) {
  const { state } = useSidebar();
  const marginLeftClass = useMemo(() => {
    if (!isFixed) {
      return "";
    }

    if (state === "collapsed") {
      if (variant === "sidebar") {
        return "ml-(--sidebar-width-icon)";
      }
      if (variant === "floating") {
        return "ml-[calc(var(--sidebar-width-icon)+(--spacing(4)))]";
      }
      if (variant === "inset") {
        return "ml-[calc(var(--sidebar-width-icon)+(--spacing(5)))]";
      }
    }

    if (state === "expanded") {
      // 侧边栏展开时，所有变体都使用相同的宽度
      return "ml-(--sidebar-width)";
    }

    return "";
  }, [isFixed, state, variant]);

  return (
    <footer
      className={cn(
        "flex w-full items-center justify-center bg-background py-1 text-foreground",
        marginLeftClass,
        isFixed &&
          "fixed right-0 bottom-0 left-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div>
        <a className="mx-1 hover:text-primary" href={icpLink ?? ""}>
          {icp ?? ""}
        </a>
        Copyright © {date}
        {companyName && (
          <a className="mx-1 hover:text-primary" href={companySiteLink ?? ""}>
            {companyName}
          </a>
        )}
      </div>
    </footer>
  );
}

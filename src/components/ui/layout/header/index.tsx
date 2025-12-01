import { useMemo } from "react";
import { cn } from "@/utils";
import { useSidebar } from "../resizable-sidebar";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  isFixed?: boolean;
  variant?: "sidebar" | "floating" | "inset";
};

/**
 * Header 组件 - 支持固定定位和侧边栏状态响应
 * @param isFixed - 是否固定定位
 * @param variant - 布局变体：sidebar（默认）、floating（浮动）、inset（内嵌）
 */
export function Header({
  className,
  isFixed = false,
  children,
  variant = "sidebar",
  ...props
}: HeaderProps) {
  const { state } = useSidebar();

  // 根据固定定位和侧边栏状态计算 margin-left 类名
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
  // transition-[margin-left] duration-200 ease-linear
  const fixedClass = isFixed
    ? " bg-background/80 backdrop-blur-md fixed top-0 right-0 left-0 z-50 shadow-md"
    : "bg-background";

  return (
    <header
      className={cn("py-1.5", fixedClass, marginLeftClass, className)}
      {...props}
    >
      {children}
    </header>
  );
}

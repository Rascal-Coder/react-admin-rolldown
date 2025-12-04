import { useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/utils";
import { useSidebar } from "../resizable-sidebar";

// Header 支持的布局变体类型
type HeaderVariant = "sidebar" | "floating" | "inset";

const COLLAPSED_MARGIN_LEFT_BY_VARIANT: Record<HeaderVariant, string> = {
  sidebar: "ml-(--sidebar-width-icon)",
  floating: "ml-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
  inset: "ml-[calc(var(--sidebar-width-icon)+(--spacing(5)))]",
};

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  isFixed?: boolean;
  variant?: HeaderVariant;
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const marginLeftClass = useMemo(() => {
    if (!isFixed || isMobile) {
      return "";
    }

    if (state === "expanded") {
      return "ml-(--sidebar-width)";
    }

    if (state === "collapsed") {
      return COLLAPSED_MARGIN_LEFT_BY_VARIANT[variant];
    }

    return "";
  }, [isFixed, state, variant, isMobile]);

  const fixedClass = isFixed
    ? " bg-background/80 backdrop-blur-md fixed top-0 right-0 left-0 z-50 shadow-md"
    : "bg-background";

  return (
    <header className={cn(fixedClass, marginLeftClass, className)} {...props}>
      {children}
    </header>
  );
}

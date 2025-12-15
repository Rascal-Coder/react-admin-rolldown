import { cva } from "class-variance-authority";
import { useNavigate } from "react-router";
import { Badge } from "@/components/base/badge";
import DotBadge from "@/components/base/dot-badge";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";
import type { NavItemProps } from "./types";

// Variants for NavItem
const navItemVariants = cva(
  "inline-flex min-h-[32px] w-full max-w-[250px] cursor-pointer items-center rounded-md px-2 py-1.5 align-middle text-sm transition-all duration-300 ease-in-out",
  {
    variants: {
      active: {
        true: "",
        false: "text-text-secondary! hover:bg-action-hover!",
      },
      depth: {
        1: "",
        2: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        depth: 1,
        className: "bg-primary/hover! text-primary! hover:bg-primary/focus!",
      },
      {
        active: true,
        depth: 2,
        className: "bg-action-hover!",
      },
    ],
    defaultVariants: {
      active: false,
      depth: 1,
    },
  }
);

// Icon styles
const navIconVariants = cva(
  "inline-flex size-[22px] shrink-0 items-center justify-center"
);

// Label/Title styles
const navLabelVariants = cva(
  "ml-2 line-clamp-1 flex-auto overflow-hidden text-ellipsis text-left font-medium text-sm leading-normal"
);

// Arrow styles
const navArrowVariants = cva(
  "ml-1.5 inline-flex size-4 shrink-0 items-center justify-center transition-all duration-300 ease-in-out"
);

export const NavItem = ({
  icon,
  label,
  badgeText,
  badgeType,
  badgeVariant,
  hasChild,
  active = false,
  depth = 1,
  className,
  id,
  external = false,
  onClick,
  ...props
}: NavItemProps & { className?: string }) => {
  const navigate = useNavigate();

  // Map depth to valid variant values (1 or 2)
  const depthVariant = (depth === 1 ? 1 : 2) as 1 | 2;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 如果有自定义点击事件，优先执行
    if (onClick) {
      onClick(e);
      return;
    }

    // 如果有子菜单，不进行跳转（由 HoverCard 处理）
    if (hasChild) {
      return;
    }

    // 处理外链
    if (external && id) {
      window.open(id, "_blank", "noopener,noreferrer");
      return;
    }

    // 处理内部路由跳转
    if (id && !hasChild) {
      navigate(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 支持 Enter 和 Space 键触发点击
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const isInteractive = !hasChild || !!onClick;

  const interactiveProps = isInteractive
    ? {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        role: "button" as const,
        tabIndex: 0,
      }
    : {};

  return (
    <div
      className={cn(
        navItemVariants({ active, depth: depthVariant }),
        isInteractive && "cursor-pointer",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <span className={navIconVariants()}>
          <Icon icon={icon} />
        </span>
      )}

      {/* Label */}
      <span className={navLabelVariants()}>{label}</span>

      {/* Badge */}
      {badgeText && badgeType === "text" && (
        <Badge variant={badgeVariant || "default"}>{badgeText}</Badge>
      )}
      {badgeType === "normal" && (
        <DotBadge variant={badgeVariant || "default"} />
      )}

      {/* Arrow */}
      {hasChild && <ItemIcon depth={depth} />}
    </div>
  );
};

const ItemIcon = ({ depth = 1 }: { depth?: number }) => {
  const icon =
    depth === 1 ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill";
  return <Icon className={navArrowVariants()} icon={icon} />;
};

export { navItemVariants };

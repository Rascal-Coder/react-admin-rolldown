// import useLocale from "@/locales/use-locale";

import type { CSSProperties } from "react";
import Icon from "@/components/ui/icon/icon";
import { themeVars } from "@/theme/theme.css";
import { cn } from "@/utils";
import type { NavItemProps } from "./types";
export type NavItemStyles = {
  icon: CSSProperties;
  texts: CSSProperties;
  title: CSSProperties;
  caption: CSSProperties;
  info: CSSProperties;
  arrow: CSSProperties;
};

export const navItemStyles: NavItemStyles = {
  icon: {
    display: "inline-flex",
    flexShrink: 0,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  texts: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: "1 1 auto",
  },
  title: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.875rem",
    fontWeight: 500,
    textAlign: "left",
    lineHeight: 18 / 12,
  },
  caption: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: themeVars.colors.text.disabled,
    textAlign: "left",
    lineHeight: 18 / 12,
  },

  info: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginLeft: "6px",
  },

  arrow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 16,
    height: 16,
    marginLeft: "6px",
    transition: "all 0.3s ease-in-out",
  },
};

export const navItemClasses = {
  base: "inline-flex w-full items-center align-middle rounded-md px-2 py-1.5 text-sm transition-all duration-300 ease-in-out text-text-secondary! cursor-pointer",
  hover: "hover:bg-action-hover!",
  active: "bg-primary/hover! hover:bg-primary/focus! text-primary!",
  disabled: "cursor-not-allowed hover:bg-transparent text-action-disabled!",
};

export const NavItem = (item: NavItemProps) => {
  //   const { t } = useLocale();

  const content = (
    <>
      {/* Icon */}
      {item.icon && (
        <span
          className="items-center justify-center"
          style={navItemStyles.icon}
        >
          <Icon icon={item.icon} />
        </span>
      )}

      {/* Label */}
      <span className="block! ml-2 flex-auto!" style={navItemStyles.title}>
        {item.label}
      </span>

      {/* Badge */}
      {item.badgeText && (
        <span style={navItemStyles.info}>{item.badgeText}</span>
      )}

      {/* Arrow */}
      {item.hasChild && <ItemIcon depth={item.depth} />}
    </>
  );

  const itemClassName = cn(
    navItemClasses.base,
    navItemClasses.hover,
    "min-h-[32px] max-w-[250px]",
    item.active && item.depth === 1 && navItemClasses.active,
    item.active && item.depth !== 1 && "bg-action-hover!",
    item.disabled && navItemClasses.disabled
  );

  return <div className={itemClassName}>{content}</div>;
};

const ItemIcon = ({ depth = 1 }: { depth?: number }) => {
  const icon =
    depth === 1 ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill";
  return <Icon icon={icon} style={navItemStyles.arrow} />;
};

import type { BadgeProps } from "@/components/base/dot-badge/types";

export interface MenuItemData {
  label: string;
  icon?: string;
  id: string;
  children?: MenuItemData[];
  badgeType?: "text" | "normal";
  badgeText?: string;
  badgeVariant?: BadgeProps["variant"];
  external?: boolean;
}

export type NavItemOptionsProps = {
  depth?: number;
  hasChild?: boolean;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
};

/**
 * Item
 */
export type NavItemProps = React.ComponentProps<"div"> &
  NavItemOptionsProps &
  NavItemStateProps & {
    label: string;
    icon?: string;
    id: string;
    badgeType?: "text" | "normal";
    badgeText?: string;
    badgeVariant?: BadgeProps["variant"];
    external?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, "depth"> & {
  data: MenuItemData;
};

/**
 * Main
 */
export type NavProps = React.ComponentProps<"nav"> & {
  data: MenuItemData[];
};

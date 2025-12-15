import type { BadgeProps } from "@/components/base/dot-badge/types";

// Use the same MenuItemData structure as vertical menu
export interface MenuItemData {
  label: string;
  icon?: string;
  id: string;
  children?: MenuItemData[];
  badgeType?: "text" | "normal";
  badgeText?: string;
  badgeVariant?: BadgeProps["variant"];
}

export type NavItemOptionsProps = {
  depth?: number;
  hasChild?: boolean;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
  hidden?: boolean;
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
  };

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, "depth"> & {
  data: MenuItemData;
};

/**
 * Group
 */
export type NavGroupProps = Omit<NavListProps, "data" | "depth"> & {
  name?: string;
  items: MenuItemData[];
};

/**
 * Main
 */
export type NavProps = React.ComponentProps<"nav"> & {
  data: {
    name?: string;
    items: MenuItemData[];
  }[];
};

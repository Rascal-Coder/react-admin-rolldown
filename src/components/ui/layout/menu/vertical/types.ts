import type { BadgeProps } from "@/components/base/dot-badge/types";

interface MenuItemData {
  label: string;
  icon?: string;
  id: string;
  children?: MenuItemData[];
  badgeType?: "text" | "normal";
  badgeText?: string;
  badgeVariant?: BadgeProps["variant"];
  external?: boolean;
}

export type { MenuItemData };

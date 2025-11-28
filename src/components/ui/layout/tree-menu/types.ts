import type { ReactNode } from "react";
import type { BadgeProps } from "@/components/base/dot-badge/types";

interface MenuItemData {
  label: string;
  icon?: ReactNode;
  id: string;
  children?: MenuItemData[];
  badgeType?: "text" | "normal";
  badgeText?: string;
  badgeVariant?: BadgeProps["variant"];
}

export type { MenuItemData };

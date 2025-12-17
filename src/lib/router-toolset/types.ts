import type { JSX } from "react";
import type { BadgeProps } from "@/components/base/dot-badge/types";
import type { MenuItemData } from "@/components/ui/layout/menu/vertical/types";

export type RouteConfig = {
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 页面组件 */
  component?: () => Promise<{ default: () => JSX.Element }>;
  /** 是否固定在标签页 */
  pinned?: boolean;
  /** 路径，同react-router */
  path: string;
  /** 对应react-router的pathname，所有非父路由将会有该值 */
  pathname?: string;
  /** ['', '/layout', '/layout/layout-children1', '/layout/layout-children1/permission'] */
  collecttedPathname?: string[];
  /** ['', 'layout', 'layout-children1', 'permission'] */
  collecttedPath?: string[];
  /** 隐藏在菜单 */
  hidden?: boolean;
  /** 菜单名称 */
  name?: string;
  /** 菜单icon */
  icon?: string;
  /** 菜单权限 */
  permission?: string;
  /** 重定向path */
  redirect?: string;
  /** 进度条 */
  progress?: boolean;
  /** 将子路由的菜单层级提升到本级 */
  flatten?: boolean;
  /** 子路由，同react-router */
  children?: RouteConfig[];
  /** 同react-router
   * 路径匹配是否不区分大小写，默认false
   * @example '/Home' -> '/home'
   */
  caseSensitive?: boolean;
  /** 是否是外链 */
  external?: boolean;
  /** 父路由 */
  parent?: RouteConfig;
  /** 排序 */
  order?: number;
  /** 徽章类型 */
  badgeType?: MenuItemData["badgeType"];
  /** 徽章文本 */
  badgeText?: string;
  /** 徽章变体 */
  badgeVariant?: BadgeProps["variant"];
};

import type { BadgeProps } from "@/components/base/dot-badge/types";
import type { MenuItemData } from "@/components/ui/layout/menu/vertical/types";
import apiClient from "../api-client";

// 后端菜单项类型定义
// 包含 RouteConfig 中后端可以返回的所有字段（排除前端计算的字段）
export interface BackendMenuItem {
  /** 菜单id */
  id: string;
  /** 父菜单id */
  parentId: string | null;
  /** 菜单创建时间 */
  /** 路径，同react-router（redirect 项可能没有 path） */
  path?: string;
  /** 菜单名称 */
  name?: string;
  /** 菜单icon */
  icon?: string;
  /** 页面组件路径，用于前端 lazy 加载（如 "/pages/dashboard/workbench"） */
  component?: string;
  /** 重定向path */
  redirect?: string;
  /** 隐藏在菜单 */
  hidden?: boolean;
  /** 子路由 */
  children?: BackendMenuItem[];
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 是否固定在标签页 */
  pinned?: boolean;
  // /** 进度条 */
  // progress?: boolean;
  /** 将子路由的菜单层级提升到本级 */
  flatten?: boolean;
  /** 路径匹配是否不区分大小写，默认false */
  caseSensitive?: boolean;
  /** 排序 */
  order?: number;
  /** 徽章类型 */
  badgeType?: MenuItemData["badgeType"];
  /** 徽章文本 */
  badgeText?: string;
  /** 徽章变体 */
  badgeVariant?: BadgeProps["variant"];
  /** 外部链接URL（用于 external-link 或 iframe 组件） */
  externalUrl?: string;
  /** 是否使用 iframe 内嵌显示外部链接，默认 false 则新窗口打开 */
  isIframe?: boolean;
}

// 菜单相关接口枚举
export enum MenuApi {
  GetMenuList = "/menu/list",
}

// 获取当前用户菜单列表（后端路由）
const getMenuList = () =>
  apiClient.get<BackendMenuItem[]>({
    url: MenuApi.GetMenuList,
  });

export default {
  getMenuList,
};

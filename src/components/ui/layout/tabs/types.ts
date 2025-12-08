import type { ReactNode, RefAttributes } from "react";
export type TabType = "chrome" | "vscode" | "card";
export type LayoutTabItem = {
  title: string;
  key: string;
  pinned?: boolean;
  closable?: boolean;
  disabled?: boolean;
  icon?: string;
};

export type UpdateTabsFunc = (fn: (draft: LayoutTabItem[]) => void) => void;
export type LayoutTabItemProps = {
  tab: LayoutTabItem;
  active: boolean;
  tabsCount?: number;
  onClose?: (value: string) => void;
  onPin?: (value: string) => void;
  onReload?: (value: string) => void;
  onOpenInNewTab?: (value: string) => void;
  onMaximize?: (value: string) => void;
} & RefAttributes<HTMLDivElement>;

export type TabsContextMenuAction =
  | "close"
  | "pin"
  | "closeLeft"
  | "closeRight"
  | "closeOthers"
  | "reload"
  | "openInNewTab"
  | "maximize";

export interface TabsContextMenuProps {
  tab: LayoutTabItem;
  tabs: LayoutTabItem[];
  children: React.ReactNode;
  activeTab: string;
  updateTabs: UpdateTabsFunc;
  setActiveTab: (activeTab: string) => void;
  onNavigate?: (pathname: string) => void;
}

export interface ScrollButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  canScroll: boolean;
  direction: "left" | "right";
  className?: string;
  scroll: () => void;
}

export type SortableTabsProps = {
  sortable: boolean;
  tabs: LayoutTabItem[];
  setTabs: (tabs: LayoutTabItem[]) => void;
  children: (item: LayoutTabItem) => ReactNode;
  activeTab: string;
  tabType: TabType;
};

export interface UseTabsContextMenuProps {
  updateTabs: UpdateTabsFunc;
  setActiveTab: (activeTab: string) => void;
  activeTab: string;
  onNavigate?: (pathname: string) => void;
}

export interface UseTabsScrollOptions {
  scrollStep?: number;
}

export type LayoutTabsProps = {
  sortable?: boolean;
  activeTab?: string;
  defaultActiveTab?: string;
  tabType?: TabType;
};

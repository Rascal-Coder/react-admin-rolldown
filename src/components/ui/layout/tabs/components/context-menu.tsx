import { ExternalLink, Pin, RefreshCw, X } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/base/context-menu";
import { useTabsContextMenu } from "../hooks/use-tabs-context-menu";
import type { TabsContextMenuProps } from "../types";

export function TabsContextMenu({
  tab,
  tabs,
  children,
  activeTab,
  updateTabs,
  setActiveTab,
  onNavigate,
}: TabsContextMenuProps) {
  // 使用自定义hook处理标签页上下文菜单逻辑
  const {
    handleCloseTab,
    handlePinTab,
    handleCloseLeftTabs,
    handleCloseRightTabs,
    handleCloseOtherTabs,
    handleReloadTab,
    handleOpenInNewTab,
  } = useTabsContextMenu({
    updateTabs,
    setActiveTab,
    activeTab,
    onNavigate,
  });

  // 查找当前tab在数组中的索引
  const currentIndex = tabs.findIndex((t) => t.key === tab.key);

  // 检查是否有左侧/右侧的tab可以关闭（排除pinned的标签页）
  const hasTabsToLeft = tabs.slice(0, currentIndex).some((t) => !t.pinned);
  const hasTabsToRight = tabs.slice(currentIndex + 1).some((t) => !t.pinned);
  const hasOtherTabs = tabs.some((t) => t.key !== tab.key && !t.pinned);

  // 检查当前标签页是否为激活状态
  const isActiveTab = activeTab === tab.key;

  // 检查是否可以关闭（只有激活的标签页才能使用关闭左侧/右侧/其他功能）
  const canUseCloseActions = isActiveTab;
  const canCloseCurrent = tab.closable !== false && !tab.pinned;

  return (
    <ContextMenu>
      <ContextMenuTrigger className="size-full">{children}</ContextMenuTrigger>
      <ContextMenuContent
        className="w-56"
        onClick={(e) => {
          // 阻止菜单内容的点击事件冒泡
          e.stopPropagation();
        }}
      >
        {/* 关闭当前标签页 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          disabled={!canCloseCurrent}
          onSelect={() => {
            handleCloseTab(tab.key);
          }}
        >
          <X className="size-4" />
          <span>关闭当前页</span>
        </ContextMenuItem>

        {/* 固定/取消固定标签页 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          onSelect={() => {
            handlePinTab(tab.key);
          }}
        >
          <Pin className="size-4" />
          <span>{tab.pinned ? "取消固定" : "固定"}</span>
        </ContextMenuItem>

        {/* 分隔线 */}
        <ContextMenuSeparator />

        {/* 关闭左侧标签页 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          disabled={!(canUseCloseActions && hasTabsToLeft)}
          onSelect={() => {
            handleCloseLeftTabs(tab.key);
          }}
        >
          <X className="size-4" />
          <span>关闭左侧</span>
        </ContextMenuItem>

        {/* 关闭右侧标签页 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          disabled={!(canUseCloseActions && hasTabsToRight)}
          onSelect={() => {
            handleCloseRightTabs(tab.key);
          }}
        >
          <X className="size-4" />
          <span>关闭右侧</span>
        </ContextMenuItem>

        {/* 关闭其他标签页 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          disabled={!(canUseCloseActions && hasOtherTabs)}
          onSelect={() => {
            handleCloseOtherTabs(tab.key);
          }}
        >
          <X className="size-4" />
          <span>关闭其他</span>
        </ContextMenuItem>

        {/* 分隔线 */}
        <ContextMenuSeparator />

        {/* 重新加载 - 只有激活的标签页才能重新加载 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          disabled={!isActiveTab}
          onSelect={() => {
            handleReloadTab();
          }}
        >
          <RefreshCw className="size-4" />
          <span>重新加载</span>
        </ContextMenuItem>

        {/* 在新标签页中打开 */}
        <ContextMenuItem
          className="flex items-center gap-2"
          onSelect={() => {
            handleOpenInNewTab(tab.key);
          }}
        >
          <ExternalLink className="size-4" />
          <span>在新的浏览器标签打开</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

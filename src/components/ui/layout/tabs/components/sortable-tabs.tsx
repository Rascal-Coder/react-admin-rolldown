import { arrayMove } from "@dnd-kit/sortable";
import { AnimatePresence } from "motion/react";
import {
  Sortable,
  SortableContent,
  SortableOverlay,
} from "@/components/base/sortable";
import { cn } from "@/utils";
import type { LayoutTabItem, SortableTabsProps } from "../types";
import { TabItemWrapper } from "./tab-item-wrapper";

export function SortableTabs({
  sortable,
  tabs,
  setTabs,
  children,
  activeTab,
  tabType,
  onTabClick,
}: SortableTabsProps & {
  onTabClick: (item: LayoutTabItem) => void;
}) {
  const handleTabsMove = (event: {
    activeIndex: number;
    overIndex: number;
  }) => {
    const { activeIndex, overIndex } = event;

    // 获取被拖拽的标签项
    const activeItem = tabs[activeIndex];

    // 如果被拖拽项不存在，直接返回
    if (!activeItem) {
      return;
    }

    // 计算固定标签的数量
    const pinnedCount = tabs.filter((tab) => tab.pinned).length;

    // 如果是非固定标签试图移动到固定标签区域之前，阻止移动
    if (!activeItem.pinned && overIndex < pinnedCount) {
      return;
    }

    // 执行移动操作
    const newTabs = arrayMove(tabs, activeIndex, overIndex);
    setTabs(newTabs);
  };

  return (
    <Sortable
      getItemValue={(item) => item.key}
      onMove={handleTabsMove}
      orientation="horizontal"
      value={tabs}
    >
      <SortableContent
        className={cn("size-full flex-y-center", {
          "gap-2": tabType === "card",
        })}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {tabs.map((item, index) => (
            <TabItemWrapper
              activeTab={activeTab}
              asHandle={sortable && !item.pinned}
              index={index}
              item={item}
              key={item.key}
              onTabClick={onTabClick}
              sortable
              tabType={tabType}
            >
              {children(item)}
            </TabItemWrapper>
          ))}
        </AnimatePresence>
      </SortableContent>
      <SortableOverlay>
        {(activeItem) => {
          const item = tabs.find((tabItem) => tabItem.key === activeItem.value);

          if (!item) {
            return null;
          }

          return (
            <div
              className={cn(
                "group layout-tabs-tab-item size-full flex-y-center",
                {
                  active: activeTab === item.key,
                  [`layout-tabs-${tabType}-tab-item`]: true,
                }
              )}
            >
              {children(item)}
            </div>
          );
        }}
      </SortableOverlay>
    </Sortable>
  );
}

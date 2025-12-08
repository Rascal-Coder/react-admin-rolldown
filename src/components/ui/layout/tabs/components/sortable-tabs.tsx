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
  const handleTabsSort = (newTabs: LayoutTabItem[]) => {
    // 将固定标签页始终放在前面
    const pinnedTabs = newTabs.filter((tab) => tab.pinned);
    const nonPinnedTabs = newTabs.filter((tab) => !tab.pinned);
    const sortedTabs = [...pinnedTabs, ...nonPinnedTabs];
    setTabs(sortedTabs);
  };

  return (
    <Sortable
      getItemValue={(item) => item.key}
      onValueChange={handleTabsSort}
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

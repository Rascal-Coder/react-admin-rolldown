import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableOverlay,
} from "@/components/base/sortable";
import { cn } from "@/utils";
import type { LayoutTabItem, SortableTabsProps } from "../types";

export function SortableTabs({
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
        {tabs.map((item, index) =>
          item.pinned ? (
            <div
              className={cn(
                "group layout-tabs-tab-item size-full flex-y-center",
                {
                  active: activeTab === item.key,
                  [`layout-tabs-${tabType}-tab-item`]: true,
                }
              )}
              data-tab-key={item.key}
              key={item.key}
              onClick={() => {
                onTabClick(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTabClick(item);
                }
              }}
              role="tab"
              tabIndex={index}
            >
              {children(item)}
            </div>
          ) : (
            <SortableItem
              asHandle
              className={cn(
                "group layout-tabs-tab-item size-full flex-y-center",
                {
                  active: activeTab === item.key,
                  [`layout-tabs-${tabType}-tab-item`]: true,
                }
              )}
              data-tab-key={item.key}
              key={item.key}
              onClick={() => {
                onTabClick(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTabClick(item);
                }
              }}
              role="tab"
              tabIndex={index}
              value={item.key}
            >
              {children(item)}
            </SortableItem>
          )
        )}
      </SortableContent>
      <SortableOverlay>
        {(activeItem) => {
          const item = tabs.find((tabItem) => tabItem.key === activeItem.value);

          if (!item) {
            return null;
          }

          return children(item);
        }}
      </SortableOverlay>
    </Sortable>
  );
}

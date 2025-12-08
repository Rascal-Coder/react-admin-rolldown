import { SortableItem } from "@/components/base/sortable";
import { cn } from "@/utils";
import type { LayoutTabItem, TabType } from "../types";

interface TabItemWrapperProps {
  item: LayoutTabItem;
  index: number;
  activeTab: string;
  tabType: TabType;
  onTabClick: (item: LayoutTabItem) => void;
  children: React.ReactNode;
  sortable?: boolean;
  asHandle?: boolean;
}

export function TabItemWrapper({
  item,
  index,
  activeTab,
  tabType,
  onTabClick,
  children,
  sortable = false,
  asHandle = true,
}: TabItemWrapperProps) {
  const commonProps = {
    className: cn("group layout-tabs-tab-item size-full flex-y-center", {
      active: activeTab === item.key,
      [`layout-tabs-${tabType}-tab-item`]: true,
    }),
    "data-tab-key": item.key,
    onClick: () => onTabClick(item),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onTabClick(item);
      }
    },
    role: "tab" as const,
    tabIndex: index,
  };

  if (sortable) {
    return (
      <SortableItem {...commonProps} asHandle={asHandle} value={item.key}>
        {children}
      </SortableItem>
    );
  }

  return <div {...commonProps}>{children}</div>;
}

import { motion } from "motion/react";
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

// 动画配置
const tabAnimationVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    x: -20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: -20,
  },
};

const tabTransition = {
  duration: 0.15,
};

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
    onClick: () => activeTab !== item.key && onTabClick(item),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (activeTab !== item.key) {
          onTabClick(item);
        }
      }
    },
    role: "tab" as const,
    tabIndex: index,
  };

  if (sortable) {
    return (
      <SortableItem {...commonProps} asHandle={asHandle} value={item.key}>
        <motion.div
          animate="animate"
          className="size-full"
          exit="exit"
          initial="initial"
          layout
          transition={tabTransition}
          variants={tabAnimationVariants}
          whileTap={{ scale: activeTab === item.key ? 1 : 0.9 }}
        >
          {children}
        </motion.div>
      </SortableItem>
    );
  }

  return (
    <motion.div
      {...commonProps}
      animate="animate"
      exit="exit"
      initial="initial"
      layout
      transition={tabTransition}
      variants={tabAnimationVariants}
    >
      {children}
    </motion.div>
  );
}

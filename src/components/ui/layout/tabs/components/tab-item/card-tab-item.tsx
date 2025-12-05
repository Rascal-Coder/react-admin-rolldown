import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";
import TabActionButton from "../tab-action-button";

export function CardTabItem({
  tab,
  active,
  onClose,
  onPin,
  tabsCount,
}: LayoutTabItemProps) {
  return (
    <div className="h-full py-1">
      <div
        className={cn(
          "relative flex h-full cursor-pointer items-center justify-between px-2",
          "rounded border border-border bg-background text-foreground hover:bg-accent hover:text-foreground/70 group-[.active]:text-primary group-[.active]:hover:bg-primary/focus group-[.active]:hover:text-primary",
          "transition-all duration-200 ease-in-out",
          {
            "border-primary/hover bg-primary/focus": active,
            "hover:bg-accent": !active,
          }
        )}
        role="tab"
        tabIndex={0}
      >
        <span
          className={cn(
            "flex-1 flex-y-center gap-1.5 truncate pr-4 text-left text-sm",
            {
              "text-primary": active,
            }
          )}
          title={tab.title || ""}
        >
          {tab.icon && <Icon icon={tab.icon} size={16} />}
          {tab.title}
        </span>
        <div className="shrink-0">
          <TabActionButton
            onClose={onClose}
            onPin={onPin}
            pinned={tab.pinned ?? false}
            tabKey={tab.key}
            tabsCount={tabsCount}
          />
        </div>
      </div>
    </div>
  );
}

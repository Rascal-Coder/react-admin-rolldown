import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";
import TabActionButton from "../tab-action-button";

export function VscodeLikeTabItem({
  tab,
  active,
  onClose,
  onPin,
  tabsCount,
}: LayoutTabItemProps) {
  return (
    <div
      className={cn(
        "relative h-full flex-y-center cursor-pointer justify-between border-r border-r-border pr-2 pl-3 text-foreground hover:bg-background hover:text-foreground/70 group-[.active]:text-primary group-[.active]:hover:bg-background group-[.active]:hover:text-primary",
        {
          "before:druation-200 before:absolute before:top-0 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition before:ease-in-out hover:before:scale-x-100": true,
          "active border-b-transparent! bg-background text-primary before:scale-x-100!":
            active,
        }
      )}
      role="tab"
      tabIndex={0}
    >
      <span
        className="flex-1 flex-y-center gap-1.5 truncate pr-4 text-sm"
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
  );
}

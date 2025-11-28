import { X } from "lucide-react";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";

export function VscodeLikeTabItem({
  tab,
  active,
  onClose,
}: LayoutTabItemProps) {
  return (
    <div
      className={cn(
        "relative h-full flex-y-center cursor-pointer justify-between border-r border-r-layout-tabs-borderpy-1 pr-2 pl-3 text-layout-tabs-primary-foreground hover:not-[.active]:bg-layout-tabs-accent",
        {
          "before:druation-200 before:absolute before:top-0 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition before:ease-in-out hover:before:scale-x-100": true,
          "active border-b-transparent! bg-layout-tabs-primary text-layout-tabs-primary-foreground before:scale-x-100!":
            active,
        }
      )}
      role="tab"
      tabIndex={0}
    >
      <span className="flex-1 truncate pr-4" title={tab.title || ""}>
        {tab.title}
      </span>
      <button
        className="size-4 flex-center cursor-pointer rounded-full transition-all duration-20 hover:bg-layout-tabs-close-accent"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.(tab.key);
        }}
        type="button"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

import { X } from "lucide-react";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";

export function CardTabItem({ tab, active, onClose }: LayoutTabItemProps) {
  return (
    <div className="h-full py-1">
      <div
        className={cn(
          "relative flex h-full cursor-pointer items-center justify-between px-2",
          "rounded border border-layout-tabs-border bg-layout-tabs text-layout-tabs-foreground",
          "transition-all duration-200 ease-in-out",
          {
            "border-layout-tabs-primary bg-layout-tabs-primary text-layout-tabs-primary-foreground":
              active,
            "hover:bg-layout-tabs-accent": !active,
          }
        )}
        role="tab"
        tabIndex={0}
      >
        <span
          className="flex-1 truncate pr-4 text-left"
          title={tab.title || ""}
        >
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
    </div>
  );
}

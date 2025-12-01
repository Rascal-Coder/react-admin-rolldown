import { X } from "lucide-react";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";

export function CardTabItem({ tab, active, onClose }: LayoutTabItemProps) {
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
          className={cn("flex-1 truncate pr-4 text-left text-sm", {
            "text-primary": active,
          })}
          title={tab.title || ""}
        >
          {tab.title}
        </span>
        <button
          className="size-4 flex-center cursor-pointer rounded-full text-muted-foreground transition-all duration-20 hover:bg-muted hover:text-base"
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

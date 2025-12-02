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
      <span className="flex-1 truncate pr-4 text-sm" title={tab.title || ""}>
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
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import type { ScrollButtonProps } from "../types";

const LeftIcon = ({ canScroll }: { canScroll: boolean }) => (
  <div className={cn("relative", { "animate-arrow-left": canScroll })}>
    <ChevronLeft className="size-4" />
  </div>
);

const RightIcon = ({ canScroll }: { canScroll: boolean }) => (
  <div className={cn("relative", { "animate-arrow-right": canScroll })}>
    <ChevronRight className="size-4" />
  </div>
);
export function ScrollButton({
  canScroll,
  direction,
  scroll,
  className,
}: ScrollButtonProps) {
  return (
    <button
      className={cn(
        "h-full flex-y-center cursor-pointer bg-background px-2 text-foreground transition-all duration-200 hover:bg-layout-tabs",
        {
          "cursor-not-allowed opacity-50": !canScroll,
          "shadow-md hover:shadow-lg": canScroll, // 只有可滚动时才有阴影
          "justify-end border-l border-l-border": direction === "right",
          "border-r border-r-border": direction === "left",
        },
        className
      )}
      disabled={!canScroll}
      onClick={scroll}
      type="button"
    >
      {direction === "left" ? (
        <LeftIcon canScroll={canScroll} />
      ) : (
        <RightIcon canScroll={canScroll} />
      )}
    </button>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";

interface ScrollButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  canScroll: boolean;
  direction: "left" | "right";
  className?: string;
  scroll: () => void;
}
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
        "h-full flex-y-center cursor-pointer bg-layout-tabs/90 px-2 transition-all duration-200 hover:bg-layout-tabs",
        {
          "cursor-not-allowed opacity-50": !canScroll,
          "shadow-md hover:shadow-lg": canScroll, // 只有可滚动时才有阴影
          "justify-end border-l border-l-layout-tabs-border":
            direction === "right",
          "border-r border-r-layout-tabs-border": direction === "left",
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

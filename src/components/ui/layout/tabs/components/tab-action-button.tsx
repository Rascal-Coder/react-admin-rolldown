import { Pin, X } from "lucide-react";
import { Button } from "@/components/base/button";
import { cn } from "@/utils";

export function TabActionButton({
  pinned,
  tabKey,
  tabsCount = 1,
  onPin,
  onClose,
}: {
  pinned: boolean;
  tabKey: string;
  tabsCount?: number;
  onPin?: (key: string) => void;
  onClose?: (key: string) => void;
}) {
  //   // 如果只剩一个 tab 且不是 pinned，则不显示 X 图标
  //   const shouldShowClose = tabsCount > 1;
  //   // 当两个图标都不可见时，隐藏整个按钮
  //   const shouldShowButton = pinned || shouldShowClose;

  //   console.log(!pinned && shouldShowClose);
  console.log("!pinned && tabsCount > 1", tabsCount);

  return (
    <Button
      className={cn("size-4 rounded-sm")}
      onClick={(e) => {
        e.stopPropagation();
        if (pinned) {
          onPin?.(tabKey);
        } else if (!pinned && tabsCount > 1) {
          onClose?.(tabKey);
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      size="icon"
      type="button"
      variant="ghost"
    >
      {/* 如果 */}
      {pinned && <Pin className={cn("pointer-events-none size-3")} />}
      {!pinned && tabsCount > 1 && (
        <X className={cn("pointer-events-none size-3")} />
      )}
    </Button>
  );
}
export default TabActionButton;

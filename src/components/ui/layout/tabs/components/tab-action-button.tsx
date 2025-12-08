import { Pin, X } from "lucide-react";
import { Button } from "@/components/base/button";
import { cn } from "@/utils";

interface TabActionButtonProps {
  pinned: boolean;
  tabKey: string;
  tabsCount?: number;
  onPin?: (key: string) => void;
  onClose?: (key: string) => void;
}

const ICON_CLASSES = "pointer-events-none size-3";

export function TabActionButton({
  pinned,
  tabKey,
  tabsCount = 1,
  onPin,
  onClose,
}: TabActionButtonProps) {
  // 如果只有一个标签且未固定，不显示按钮
  if (tabsCount <= 1 && !pinned) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (pinned) {
      onPin?.(tabKey);
    } else {
      onClose?.(tabKey);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <Button
      className={cn("size-4 rounded-sm")}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      size="icon"
      type="button"
      variant="ghost"
    >
      {pinned ? (
        <Pin className={ICON_CLASSES} />
      ) : (
        <X className={ICON_CLASSES} />
      )}
    </Button>
  );
}

export default TabActionButton;

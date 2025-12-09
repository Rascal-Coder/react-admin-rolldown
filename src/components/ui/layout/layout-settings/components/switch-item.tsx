import { type ReactNode, useState } from "react";
import { Switch } from "@/components/base/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base/tooltip";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;
interface SwitchItemProps {
  disabled?: boolean;
  tip?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: ReactNode;
  shortcut?: ReactNode;
  tipContent?: ReactNode;
  className?: string;
  side?: (typeof SIDE_OPTIONS)[number];
}

export function SwitchItem({
  disabled = false,
  tip = "",
  checked: controlledChecked,
  onCheckedChange,
  children,
  shortcut,
  tipContent,
  className,
  side = "bottom",
}: SwitchItemProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const checked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    const newChecked = !checked;

    if (controlledChecked !== undefined && onCheckedChange) {
      onCheckedChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  const handleSwitchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: no need to semantic element
    <div
      aria-disabled={disabled}
      className={cn(
        "my-1 flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2.5 text-left hover:bg-accent",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      <span className="flex items-center text-sm">
        {children}

        {(tipContent || tip) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon
                  className="ml-1 size-3 cursor-help"
                  icon="lucide:circle-help"
                />
              </TooltipTrigger>
              <TooltipContent side={side}>
                {tipContent ||
                  tip
                    .split("\n")
                    .map((line, index) => (
                      <p key={`tip-line-${index}-${line.slice(0, 10)}`}>
                        {line}
                      </p>
                    ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>

      {shortcut && (
        <span className="mr-2 ml-auto text-xs opacity-60">{shortcut}</span>
      )}

      <Switch
        checked={checked}
        onCheckedChange={
          controlledChecked !== undefined ? onCheckedChange : setInternalChecked
        }
        onClick={handleSwitchClick}
      />
    </div>
  );
}

import type { ReactNode } from "react";
import { Input } from "@/components/base/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base/tooltip";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;

interface InputItemProps {
  disabled?: boolean;
  tip?: string;
  children?: ReactNode;
  shortcut?: ReactNode;
  tipContent?: ReactNode;
  className?: string;
  side?: (typeof SIDE_OPTIONS)[number];
  value: string;
  onChange: (value: string) => void;
}

export function InputItem({
  disabled = false,
  tip = "",
  value,
  children,
  shortcut,
  tipContent,
  className,
  side = "bottom",
  onChange,
}: InputItemProps) {
  // 清除输入框内容
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onChange("");
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        "my-1 flex w-full cursor-default items-center justify-between rounded-md px-2 py-1 text-left hover:bg-accent",
        {
          "pointer-events-none opacity-50": disabled,
        },
        className
      )}
      role="group"
      tabIndex={-1}
    >
      <span className="flex flex-1 shrink items-center text-foreground text-sm">
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

      <div className="relative">
        <Input
          className="h-7 w-48 pr-8"
          disabled={disabled}
          onChange={handleInputChange}
          value={value}
        />
        {value && !disabled && (
          <button
            aria-label="清除输入"
            className="-translate-y-1/2 absolute top-1/2 right-2 flex size-3 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted"
            onClick={handleClear}
            type="button"
          >
            <Icon
              className="size-2 text-muted-foreground hover:text-foreground"
              icon="lucide:x"
            />
          </button>
        )}
      </div>
    </div>
  );
}

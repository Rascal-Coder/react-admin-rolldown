import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";
import "./chrome-like-tab-item.css";
import Icon from "@/components/ui/icon/icon";
import TabActionButton from "../tab-action-button";

function ChromeTabBackground() {
  return (
    <svg
      className="h-full w-full"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol id="chrome-tab-geometry-left" viewBox="0 0 150 36">
          <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
        </symbol>
        <symbol id="chrome-tab-geometry-right" viewBox="0 0 150 36">
          <use xlinkHref="#chrome-tab-geometry-left" />
        </symbol>
        <clipPath id="crop">
          <rect height="100%" width="100%" x="0" />
        </clipPath>
      </defs>
      <svg height="100%" width="52%">
        <use
          className="chrome-tab-geometry"
          fill="currentcolor"
          height="40"
          width="150"
          xlinkHref="#chrome-tab-geometry-left"
        />
      </svg>
      <g transform="scale(-1, 1)">
        <svg height="100%" width="52%" x="-100%" y="0">
          <use
            className="chrome-tab-geometry"
            fill="currentcolor"
            height="40"
            width="150"
            xlinkHref="#chrome-tab-geometry-right"
          />
        </svg>
      </g>
    </svg>
  );
}
export function ChromeLikeTabItem({
  tab,
  active,
  onClose,
  onPin,
  tabsCount,
  ...props
}: LayoutTabItemProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative size-full min-w-30 max-w-38 cursor-pointer")}
      {...props}
    >
      <div
        className={cn(
          "-translate-y-1/2 absolute top-1/2 left-0 h-3.5 w-px bg-border",
          {
            "layout-tabs-chrome-tab-item-divider": true,
          }
        )}
      />
      <div className="-left-2.5 -right-2.5 pointer-events-none absolute top-1 bottom-0 overflow-hidden text-transparent opacity-0 transition-[opacity,color] duration-20 group-[.active]:text-background group-[.active]:opacity-100">
        <ChromeTabBackground />
      </div>
      <div className="relative h-full w-full px-1 pt-2 pb-1">
        <div className="h-full flex-y-center overflow-hidden rounded-md px-1 text-foreground leading-none hover:bg-background hover:text-foreground/70 group-[.active]:text-primary group-[.active]:hover:bg-background group-[.active]:hover:text-primary">
          <div className="flex-1 flex-y-center gap-1.5 truncate text-sm">
            {tab.icon && <Icon icon={tab.icon} size={16} />}
            <span className="flex-1 truncate text-sm" title={tab.title || ""}>
              {tab.title}
            </span>
          </div>
          <div className="shrink-0 cursor-pointer">
            <TabActionButton
              onClose={onClose}
              onPin={onPin}
              pinned={tab.pinned ?? false}
              tabKey={tab.key}
              tabsCount={tabsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

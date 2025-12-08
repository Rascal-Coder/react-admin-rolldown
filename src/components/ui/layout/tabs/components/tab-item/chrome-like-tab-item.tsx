/** biome-ignore-all lint:a11y/noSvgWithoutTitle */

import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";
import "./chrome-like-tab-item.css";
import Icon from "@/components/ui/icon/icon";
import TabActionButton from "../tab-action-button";

function ChromeTabBackground() {
  return (
    <svg
      className="w-full h-full"
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
          "absolute top-1/2 left-0 w-px h-3.5 -translate-y-1/2 bg-border",
          {
            "layout-tabs-chrome-tab-item-divider": true,
          }
        )}
      />
      <div className="absolute top-1 -left-2.5 -right-2.5 bottom-0 text-transparent group-[.active]:text-background opacity-0 group-[.active]:opacity-100 overflow-hidden pointer-events-none transition-[opacity,color] duration-20">
        <ChromeTabBackground />
      </div>
      <div className="relative w-full h-full p-1">
        <div className="flex-y-center h-full px-1 text-foreground hover:text-foreground/70 hover:bg-background group-[.active]:text-primary group-[.active]:hover:text-primary group-[.active]:hover:bg-background leading-none overflow-hidden rounded-md">
          <div className="flex-1 truncate text-sm flex-y-center gap-1.5">
            {tab.icon && <Icon icon={tab.icon} size={16} />}
            <span className="truncate text-sm flex-1" title={tab.title || ""}>
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

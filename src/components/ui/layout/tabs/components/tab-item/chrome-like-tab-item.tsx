/** biome-ignore-all lint:a11y/noSvgWithoutTitle */

import { X } from "lucide-react";
import { cn } from "@/utils";
import type { LayoutTabItemProps } from "../../types";
import "./chrome-like-tab-item.css";

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
          height="36"
          width="150"
          xlinkHref="#chrome-tab-geometry-left"
        />
      </svg>
      <g transform="scale(-1, 1)">
        <svg height="100%" width="52%" x="-100%" y="0">
          <use
            className="chrome-tab-geometry"
            fill="currentcolor"
            height="36"
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
  // active,
  onClose,
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
      <div className="absolute top-1 -left-2.5 -right-2.5 bottom-0 group-[.active]:text-background  opacity-0 group-[.active]:opacity-100 overflow-hidden pointer-events-none transition-opacity duration-20">
        <ChromeTabBackground />
      </div>
      <div className="relative w-full h-full p-1">
        <div className="flex-y-center h-full px-1 text-foreground hover:text-foreground/70 hover:bg-accent group-[.active]:text-primary group-[.active]:hover:text-primary group-[.active]:hover:bg-background leading-none overflow-hidden rounded-md">
          <span className="flex-1 truncate text-sm" title={tab.title || ""}>
            {tab.title}
          </span>
          {onClose && (
            <button
              className="flex-center size-4 text-muted-foreground hover:text-base hover:bg-muted rounded-full cursor-pointer transition-all duration-20"
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.key);
              }}
              type="button"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

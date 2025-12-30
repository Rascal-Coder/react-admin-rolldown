import { KeepAlive, type useKeepAliveRef } from "keepalive-for-react";
import { Minimize } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/base/button";
import { LineLoading } from "@/components/ui/loading/line-loading";
import { useSettingsActions } from "@/store/setting-store";
import { cn } from "@/utils";

interface LayoutMainProps {
  pathname: string;
  aliveRef: ReturnType<typeof useKeepAliveRef>;
  cacheKeys: string[];
  outlet: ReactNode;
  reloadFlag: boolean;
  transitionName: string;
  themeStretch: boolean;
  contentFullscreen: boolean;
  headerFixed: boolean;
  headerHeight: number;
  footerFixed: boolean;
  showFooter: boolean;
  footerHeight: number;
}

export function LayoutMain({
  pathname,
  aliveRef,
  cacheKeys,
  outlet,
  reloadFlag,
  transitionName,
  themeStretch,
  contentFullscreen,
  headerFixed,
  headerHeight,
  footerFixed,
  showFooter,
  footerHeight,
}: LayoutMainProps) {
  const { updateAppSettings } = useSettingsActions();

  return (
    <main
      className={cn(
        "flex w-full flex-auto flex-col text-foreground",
        "transition-all duration-300 ease-in-out",
        "mx-auto px-2 py-2 sm:px-4 sm:py-4 md:px-6",
        {
          "max-w-full": themeStretch || contentFullscreen,
          "xl:max-w-screen-xl": !(themeStretch || contentFullscreen),
        },
        contentFullscreen && "h-screen"
      )}
      data-layout="bug-admin-layout"
      style={{
        willChange: "max-width",
        marginTop: headerFixed && !contentFullscreen ? headerHeight : 0,
        marginBottom:
          footerFixed && showFooter && !contentFullscreen ? footerHeight : 0,
      }}
    >
      {/* 全屏模式下的退出按钮 */}
      {contentFullscreen && (
        <Button
          className="fixed top-4 right-4 z-50 h-10 w-10 rounded-full shadow-lg transition-transform hover:scale-110"
          onClick={() => updateAppSettings({ contentFullscreen: false })}
          size="icon"
          title="退出内容全屏"
          variant="secondary"
        >
          {/* <Shrink className="h-5 w-5" /> */}
          <Minimize className="h-4 w-4" />
        </Button>
      )}
      <KeepAlive
        activeCacheKey={pathname}
        aliveRef={aliveRef}
        cacheNodeClassName={cn(
          "h-full rounded-xl bg-muted p-4",
          reloadFlag ? "" : transitionName
        )}
        enableActivity
        include={cacheKeys}
      >
        {reloadFlag ? <LineLoading /> : outlet}
      </KeepAlive>
    </main>
  );
}

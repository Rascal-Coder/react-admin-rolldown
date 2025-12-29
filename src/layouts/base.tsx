import { useUpdateEffect } from "ahooks";
import { useKeepAliveRef } from "keepalive-for-react";
import { useMemo } from "react";
import { useLocation, useOutlet, useOutletContext } from "react-router";
import "./page-transitions.css";
import { AuthGuard } from "@/components/advanced/auth/auth-guard";
import { Footer } from "@/components/ui/layout/footer";
import LayoutSettings from "@/components/ui/layout/layout-settings";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/layout/resizable-sidebar";
import { Sidebar } from "@/components/ui/layout/sidebar";
import { useDirection } from "@/context/direction/direction-context";
import { useElementHeight } from "@/hooks/use-element-height";
import { useRouter, useRouterNavigation } from "@/hooks/use-router";
import Page403 from "@/pages/_built/page-403";
import { useCacheRoutes } from "@/store/cache-store";
import { useMenuData } from "@/store/menu-store";
import { useAppSettings } from "@/store/setting-store";
import { useReloadFlag } from "@/store/tabs-store";
import { cn } from "@/utils";
import { LayoutHeader } from "./components/layout-header";
import { LayoutMain } from "./components/layout-main";
import { useLayoutCache } from "./hooks/use-layout-cache";
import { useLayoutWatermark } from "./hooks/use-layout-watermark";

const BaseLayout = () => {
  const { curRoute } = useRouter();
  const { goHome } = useRouterNavigation();
  const { dir } = useDirection();
  const reloadFlag = useReloadFlag();
  const {
    themeStretch,
    multiTab,
    tabType,
    tabSortable,
    breadCrumbVariant,
    breadCrumb,
    sidebarVariant,
    showFooter,
    footerFixed,
    headerFixed,
    collapsibleType,
    icp,
    icpLink,
    companyName,
    companySiteLink,
    copyrightDate,
    pageTransition,
    showAllMenuWith403,
    contentFullscreen,
  } = useAppSettings();
  const [headerRef, headerHeight] = useElementHeight<HTMLElement>();
  const [footerRef, footerHeight] = useElementHeight<HTMLElement>();
  const menuData = useMenuData();
  const cacheKeys = useCacheRoutes();
  const previousRoute = useOutletContext();
  const outlet = useOutlet(previousRoute);
  const { pathname } = useLocation();
  const aliveRef = useKeepAliveRef();

  useLayoutWatermark();
  useLayoutCache(aliveRef);

  const transitionName = useMemo(
    () => (pageTransition ? `page-animate-${pageTransition}` : ""),
    [pageTransition]
  );
  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reloadFlag, transitionName]);

  return (
    <SidebarProvider>
      {/* 侧边栏 - 全屏时隐藏 */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          contentFullscreen && "pointer-events-none w-0 opacity-0"
        )}
      >
        <Sidebar
          collapsible={collapsibleType}
          side={dir === "ltr" ? "left" : "right"}
          variant={sidebarVariant}
        />
      </div>
      <SidebarInset
        className={cn(
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(5)))]",
          "min-w-0 overflow-x-hidden",
          "transition-all duration-300 ease-in-out",
          contentFullscreen && "mr-0! ml-0!"
        )}
      >
        {/* Header - 全屏时隐藏 */}
        <LayoutHeader
          breadCrumb={breadCrumb}
          breadCrumbVariant={breadCrumbVariant}
          collapsibleType={collapsibleType}
          contentFullscreen={contentFullscreen}
          goHome={goHome}
          headerFixed={headerFixed}
          headerRef={headerRef}
          menuItems={menuData?.menuItems}
          multiTab={multiTab}
          pathname={pathname}
          sidebarVariant={sidebarVariant}
          tabSortable={tabSortable}
          tabType={tabType}
        />
        <AuthGuard
          baseOn="role"
          check={showAllMenuWith403 ? curRoute?.permission : undefined}
          fallback={<Page403 />}
        >
          <LayoutMain
            aliveRef={aliveRef}
            cacheKeys={cacheKeys}
            contentFullscreen={contentFullscreen}
            footerFixed={footerFixed}
            footerHeight={footerHeight}
            headerFixed={headerFixed}
            headerHeight={headerHeight}
            outlet={outlet}
            pathname={pathname}
            reloadFlag={reloadFlag}
            showFooter={showFooter}
            themeStretch={themeStretch}
            transitionName={transitionName}
          />
        </AuthGuard>
        {/* Footer - 全屏时隐藏 */}
        {showFooter && !contentFullscreen && (
          <Footer
            companyName={companyName}
            companySiteLink={companySiteLink}
            date={copyrightDate}
            icp={icp}
            icpLink={icpLink}
            isFixed={footerFixed}
            ref={footerRef}
            variant={sidebarVariant}
          />
        )}
      </SidebarInset>
      {!contentFullscreen && <LayoutSettings />}
    </SidebarProvider>
  );
};

export default BaseLayout;

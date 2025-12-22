import { useMount, useUpdateEffect } from "ahooks";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { Home } from "lucide-react";
import { m, type Variants } from "motion/react";
import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
  useOutlet,
  useOutletContext,
} from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import { Button } from "@/components/base/button";
import { getVariant } from "@/components/ui/animate/variants";
import { Breadcrumb } from "@/components/ui/layout/breadcrumb";
import { Footer } from "@/components/ui/layout/footer";
import FullscreenButton from "@/components/ui/layout/fullscreen-button";
import { Header } from "@/components/ui/layout/header";
import LayoutSettings from "@/components/ui/layout/layout-settings";
import HorizontalMenu from "@/components/ui/layout/menu/horizontal";
import NoticeButton from "@/components/ui/layout/notice";
import { ProfileDropdown } from "@/components/ui/layout/profile-dropdown";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/layout/resizable-sidebar";
import { Sidebar } from "@/components/ui/layout/sidebar";
import { LayoutTabs } from "@/components/ui/layout/tabs";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { useDirection } from "@/context/direction/direction-context";
import { useElementHeight } from "@/hooks/use-element-height";
import { useWatermark } from "@/hooks/use-watermark";
import {
  useCacheActions,
  useCacheRoutes,
  useRemoveCacheKey,
} from "@/store/cache-store";
import { useMenuData } from "@/store/menu-store";
import { useAppSettings } from "@/store/setting-store";
import { cn } from "@/utils";

const BaseLayout = () => {
  const navigate = useNavigate();
  const { dir } = useDirection();
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
    watermarkEnabled,
    watermarkContent,
    watermarkColor,
  } = useAppSettings();
  const [headerRef, headerHeight] = useElementHeight<HTMLElement>();
  const [footerRef, footerHeight] = useElementHeight<HTMLElement>();
  const menuData = useMenuData();
  const cacheKeys = useCacheRoutes();
  const previousRoute = useOutletContext();
  const outlet = useOutlet(previousRoute);
  const { pathname } = useLocation();
  const aliveRef = useKeepAliveRef();
  const removeCacheKey = useRemoveCacheKey();
  const { setRemoveCacheKey } = useCacheActions();
  const { destroyWatermark, updateWatermark } = useWatermark();
  const handleWatermark = useCallback(() => {
    if (watermarkEnabled) {
      updateWatermark({
        content: watermarkContent,
        advancedStyle: {
          type: "linear",
          colorStops: [
            {
              color: watermarkColor,
              offset: 0,
            },
            {
              color: watermarkColor,
              offset: 1,
            },
          ],
        },
      });
    } else {
      destroyWatermark();
    }
  }, [
    watermarkEnabled,
    watermarkContent,
    watermarkColor,
    destroyWatermark,
    updateWatermark,
  ]);

  useMount(() => {
    handleWatermark();
  });
  useUpdateEffect(() => {
    handleWatermark();
  }, [watermarkEnabled, watermarkContent, watermarkColor]);

  useUpdateEffect(() => {
    if (!(aliveRef.current && removeCacheKey)) {
      return;
    }

    aliveRef.current.destroy(removeCacheKey);

    // 有的时候用户打开同一页面输入在关闭 不去切换新的页面 会造成无法二次删除缓存
    setRemoveCacheKey(null);
  }, [removeCacheKey]);
  return (
    <SidebarProvider>
      <Sidebar
        collapsible={collapsibleType}
        side={dir === "ltr" ? "left" : "right"}
        variant={sidebarVariant}
      />
      <SidebarInset
        className={cn(
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(5)))]",
          "min-w-0 overflow-x-hidden"
        )}
      >
        <Header
          className="border-b border-dashed"
          isFixed={headerFixed}
          ref={headerRef}
          variant={sidebarVariant}
        >
          {multiTab && <LayoutTabs sortable={tabSortable} tabType={tabType} />}
          <div className="flex justify-between gap-2 px-2 py-1.5">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {collapsibleType !== "offcanvas" && (
                <SidebarTrigger
                  className="shrink-0 cursor-pointer max-md:scale-125"
                  variant="outline"
                />
              )}
              <Button
                className="size-7 shrink-0 max-md:scale-125"
                onClick={() => navigate("/dashboard")}
                size="icon"
                variant="outline"
              >
                <Home />
              </Button>
              {collapsibleType !== "offcanvas" && breadCrumb && (
                <div className="shrink-0">
                  <Breadcrumb variant={breadCrumbVariant} />
                </div>
              )}
              {/* 水平布局时使用HorizontalMenu */}
              {menuData && collapsibleType === "offcanvas" && (
                <div className="min-w-0 flex-1 overflow-hidden">
                  <HorizontalMenu data={menuData.menuItems} />
                </div>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ThemeSwitch />
              <FullscreenButton />
              <NoticeButton />
              <ProfileDropdown
                user={{ name: "Bug", email: "bug@bug.com", avatar }}
              />
            </div>
          </div>
        </Header>

        <main
          className={cn(
            "flex w-full flex-auto flex-col text-foreground",
            "transition-[max-width] duration-300 ease-in-out",
            "mx-auto px-2 py-2 sm:px-4 sm:py-4 md:px-6",
            {
              "max-w-full": themeStretch,
              "xl:max-w-screen-xl": !themeStretch,
            }
          )}
          data-layout="bug-admin-layout"
          style={{
            willChange: "max-width",
            marginTop: headerFixed ? headerHeight : 0,
            marginBottom: footerFixed && showFooter ? footerHeight : 0,
          }}
        >
          <m.div
            animate="animate"
            className="h-full"
            exit="exit"
            initial="initial"
            key={pathname}
            variants={getVariant(pageTransition) as Variants}
          >
            <KeepAlive
              activeCacheKey={pathname}
              aliveRef={aliveRef}
              cacheNodeClassName="h-full rounded-xl bg-muted p-4"
              enableActivity
              include={cacheKeys}
            >
              {outlet}
            </KeepAlive>
          </m.div>
        </main>

        {showFooter && (
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
      <LayoutSettings />
    </SidebarProvider>
  );
};

export default BaseLayout;

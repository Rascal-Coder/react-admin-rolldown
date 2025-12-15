import { Home } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import { Button } from "@/components/base/button";
import { Breadcrumb } from "@/components/ui/layout/breadcrumb";
import { Footer } from "@/components/ui/layout/footer";
import { Header } from "@/components/ui/layout/header";
import LayoutSettings from "@/components/ui/layout/layout-settings";
import HorizontalMenu from "@/components/ui/layout/menu/horizontal";
import { ProfileDropdown } from "@/components/ui/layout/profile-dropdown";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/layout/resizable-sidebar";
import { Sidebar } from "@/components/ui/layout/sidebar";
import { LayoutTabs } from "@/components/ui/layout/tabs";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { useDirection } from "@/context/direction-context";
import { useElementHeight } from "@/hooks/use-element-height";
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
  } = useAppSettings();
  const [headerRef, headerHeight] = useElementHeight<HTMLElement>();
  const [footerRef, footerHeight] = useElementHeight<HTMLElement>();
  const menuData = useMenuData();
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
            <div className="flex items-center gap-2">
              <SidebarTrigger
                className="cursor-pointer max-md:scale-125"
                variant="outline"
              />
              <Button
                className="size-7 max-md:scale-125"
                onClick={() => navigate("/dashboard")}
                size="icon"
                variant="outline"
              >
                <Home />
              </Button>
              {breadCrumb && <Breadcrumb variant={breadCrumbVariant} />}
              {menuData && (
                <HorizontalMenu data={[{ items: menuData.menuItems }]} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitch />
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
          <div className="h-full rounded-xl bg-muted p-4">
            <Outlet />
          </div>
        </main>
        {showFooter && (
          <Footer
            companyName="Bug Admin"
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

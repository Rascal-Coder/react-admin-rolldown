import { Home } from "lucide-react";
import type { RefObject } from "react";
import type { TabType } from "#/enum";
import avatar from "@/assets/images/user/avatar.jpg";
import { Button } from "@/components/base/button";
import { Breadcrumb } from "@/components/ui/layout/breadcrumb";
import type { BreadcrumbVariant } from "@/components/ui/layout/breadcrumb/types";
import ContentFullscreenButton from "@/components/ui/layout/content-fullscreen-button";
import { Header } from "@/components/ui/layout/header";
import HorizontalMenu from "@/components/ui/layout/menu/horizontal";
import type { MenuItemData } from "@/components/ui/layout/menu/vertical/types";
import NoticeButton from "@/components/ui/layout/notice";
import { ProfileDropdown } from "@/components/ui/layout/profile-dropdown";
import { SidebarTrigger } from "@/components/ui/layout/resizable-sidebar";
import SearchBar from "@/components/ui/layout/search-bar";
import { LayoutTabs } from "@/components/ui/layout/tabs";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { GLOBAL_CONFIG } from "@/global-config";
import type { CollapsibleType, SidebarVariant } from "@/store/setting-store";
import { cn } from "@/utils";

interface LayoutHeaderProps {
  headerRef: RefObject<HTMLElement | null>;
  pathname: string;
  goHome: () => void;
  multiTab: boolean;
  tabSortable: boolean;
  tabType: TabType;
  collapsibleType: CollapsibleType;
  breadCrumb: boolean;
  breadCrumbVariant: BreadcrumbVariant;
  menuItems?: MenuItemData[];
  headerFixed: boolean;
  sidebarVariant: SidebarVariant;
  contentFullscreen: boolean;
}

export function LayoutHeader({
  headerRef,
  pathname,
  goHome,
  multiTab,
  tabSortable,
  tabType,
  collapsibleType,
  breadCrumb,
  breadCrumbVariant,
  menuItems,
  headerFixed,
  sidebarVariant,
  contentFullscreen,
}: LayoutHeaderProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        contentFullscreen &&
          "-translate-y-full pointer-events-none h-0 opacity-0"
      )}
    >
      <Header
        className="border-b border-dashed"
        isFixed={headerFixed && !contentFullscreen}
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
              onClick={() => {
                if (pathname !== GLOBAL_CONFIG.defaultRoute) {
                  goHome();
                }
              }}
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
            {menuItems && collapsibleType === "offcanvas" && (
              <div className="min-w-0 flex-1 overflow-hidden">
                <HorizontalMenu data={menuItems} />
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <SearchBar />
            <ThemeSwitch />
            <ContentFullscreenButton />
            {/* <FullscreenButton /> */}
            <NoticeButton />
            <ProfileDropdown
              user={{ name: "Bug", email: "bug@bug.com", avatar }}
            />
          </div>
        </div>
      </Header>
    </div>
  );
}

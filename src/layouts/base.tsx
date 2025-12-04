import { useEffect } from "react";
import { Outlet } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import { Breadcrumb } from "@/components/ui/layout/breadcrumb";
import { Footer } from "@/components/ui/layout/footer";
import { Header } from "@/components/ui/layout/header";
import { ProfileDropdown } from "@/components/ui/layout/profile-dropdown";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/layout/resizable-sidebar";
import { Sidebar } from "@/components/ui/layout/sidebar";
import { LayoutTabs } from "@/components/ui/layout/tabs";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { useMenuActions } from "@/store/menu-store";
import { cn } from "@/utils";
import { generateMenuItems } from "@/utils/menu";

const BaseLayout = () => {
  const { routes: routerRoutes } = useRouter(routes);
  const { setMenuData } = useMenuActions();

  useEffect(() => {
    const menuData = generateMenuItems(routerRoutes);
    setMenuData(menuData);
  }, [routerRoutes, setMenuData]);

  // const [footerFixed] = useState(true);
  // const [headerFixed] = useState(true);
  // const [showFooter] = useState(true);
  // const [sidebarVariant] = useState<"sidebar" | "floating" | "inset">(
  //   "sidebar"
  // );
  // const [tabType, setTabType] = useState<TabType>("chrome");
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset
        className={cn(
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(5)))]",
          "min-w-0 overflow-x-hidden"
        )}
      >
        <Header
          className="border-b border-dashed"
          // isFixed={headerFixed}
          // variant={sidebarVariant}
        >
          <LayoutTabs />
          <div className="flex justify-between gap-2 px-2 py-1.5">
            <div className="flex items-center gap-2">
              <SidebarTrigger
                className="cursor-pointer max-md:scale-125"
                variant="outline"
              />
              <Breadcrumb />
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
            "mx-auto px-2 py-2 sm:px-4 sm:py-4 md:px-6"
            // footerFixed && showFooter && "mb-8",
            // headerFixed && "mt-23",
            // showFooter && "pb-0!"
          )}
          data-layout="bug-admin-layout"
        >
          <div className="h-full rounded-xl bg-muted p-4">
            <Outlet />
            {/* <div className="flex gap-2">
              <Button onClick={() => setSidebarVariant("sidebar")}>
                sidebar
              </Button>
              <Button onClick={() => setSidebarVariant("floating")}>
                floating
              </Button>
              <Button onClick={() => setSidebarVariant("inset")}>inset</Button>
              <Button onClick={() => setFooterFixed(!footerFixed)}>
                {footerFixed ? "set unfixed" : "set fixed"}
              </Button>
            </div>
            <div>
              <Button onClick={() => setShowFooter(!showFooter)}>
                showFooter===={showFooter ? "true" : "false"}
              </Button>
              <Button onClick={() => setHeaderFixed(!headerFixed)}>
                headerFixed===={headerFixed ? "true" : "false"}
              </Button>
              <Button onClick={() => setTabType("chrome")}>chrome</Button>
              <Button onClick={() => setTabType("vscode")}>vscode</Button>
              <Button onClick={() => setTabType("card")}>card</Button>
            </div>
            fixed-status: {footerFixed ? "fixed" : "unfixed"}
            {Array.from({ length: 100 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: use index as key
              <div key={index}>content</div>
            ))} */}
          </div>
        </main>
        <Footer
          companyName="Bug Admin"
          // isFixed={footerFixed}
          // variant={sidebarVariant}
        />
        {/* {showFooter && (
          <Footer
            companyName="Bug Admin"
            isFixed={footerFixed}
            variant={sidebarVariant}
          />
        )} */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BaseLayout;

import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/layout/resizable-sidebar";
import { Button } from "./components/base/button";
import { Breadcrumb } from "./components/ui/layout/breadcrumb";
import { Footer } from "./components/ui/layout/footer";
import { Header } from "./components/ui/layout/header";
import { Sidebar } from "./components/ui/layout/sidebar";
import { LayoutTabs } from "./components/ui/layout/tabs";
import { ThemeProvider } from "./theme/theme-provider";
import { cn } from "./utils";

function App() {
  const [footerFixed, setFooterFixed] = useState(false);
  const [headerFixed] = useState(false);
  const [sidebarVariant, setSidebarVariant] = useState<
    "sidebar" | "floating" | "inset"
  >("sidebar");
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar variant={sidebarVariant} />
        <SidebarInset
          className={cn(
            "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(5)))]",

            "@container/content",
            "min-w-0 overflow-x-hidden"
          )}
        >
          <Header isFixed={headerFixed} variant={sidebarVariant}>
            <LayoutTabs />
            <Breadcrumb />
          </Header>

          <main
            className={cn(
              "flex w-full flex-auto flex-col bg-muted",
              "transition-[max-width] duration-300 ease-in-out",
              "mx-auto px-2 py-2 sm:px-4 sm:py-4 md:px-6",
              footerFixed && "mb-8",
              headerFixed && "mt-23"
              // {
              //   "max-w-full": themeStretch,
              //   "xl:max-w-screen-xl": !themeStretch,
              // }
            )}
            data-layout="bug-admin-layout"
            // style={{
            //   willChange: "max-width",
            // }}
          >
            <div className="h-full rounded-md bg-background">
              <div className="flex gap-2">
                <Button onClick={() => setSidebarVariant("sidebar")}>
                  sidebar
                </Button>
                <Button onClick={() => setSidebarVariant("floating")}>
                  floating
                </Button>
                <Button onClick={() => setSidebarVariant("inset")}>
                  inset
                </Button>
                <Button onClick={() => setFooterFixed(!footerFixed)}>
                  {footerFixed ? "set unfixed" : "set fixed"}
                </Button>
              </div>
              fixed-status: {footerFixed ? "fixed" : "unfixed"}
              {Array.from({ length: 100 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: use index as key
                <div key={index}>content</div>
              ))}
            </div>
          </main>
          <Footer companyName="Bug Admin" isFixed={footerFixed} />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;

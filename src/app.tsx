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
  const [headerFixed, setHeaderFixed] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [sidebarVariant, setSidebarVariant] = useState<
    "sidebar" | "floating" | "inset"
  >("sidebar");
  const [tabType, setTabType] = useState("chrome");
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar variant={sidebarVariant} />
        <SidebarInset
          className={cn(
            "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(5)))]",
            "min-w-0 overflow-x-hidden"
          )}
        >
          <Header
            className="border-b border-dashed"
            isFixed={headerFixed}
            variant={sidebarVariant}
          >
            <LayoutTabs tabType={tabType as any} />
            <Breadcrumb />
          </Header>

          <main
            className={cn(
              "flex w-full flex-auto flex-col",
              "transition-[max-width] duration-300 ease-in-out",
              "mx-auto px-2 py-2 sm:px-4 sm:py-4 md:px-6",
              footerFixed && showFooter && "mb-8",
              headerFixed && "mt-23",
              showFooter && "py-0!"
            )}
            data-layout="bug-admin-layout"
          >
            <div className="h-full rounded-xl bg-muted">
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
              ))}
            </div>
          </main>
          {showFooter && (
            <Footer
              companyName="Bug Admin"
              isFixed={footerFixed}
              variant={sidebarVariant}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;

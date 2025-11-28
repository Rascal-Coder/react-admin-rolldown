import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/layout/resizable-sidebar";
import { Sidebar } from "./components/ui/layout/sidebar";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          tabs
          <div className="h-9.5 bg-background">
            <header>header</header>
          </div>
          <div className="flex flex-1 flex-col gap-4 bg-muted p-4 pt-0">
            <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
              <div>content</div>
            </div>
          </div>
          <footer className="h-9.5 bg-background">footer</footer>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;

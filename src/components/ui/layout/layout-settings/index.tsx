import { Settings } from "lucide-react";
import type { CSSProperties } from "react";
import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import FloatButton from "@/components/ui/float-button";
import FontSettings from "./modules/font-settings";
import OtherSettings from "./modules/other-settings";
import SidebarSettings from "./modules/sidebar-settings";
import ThemeModeSelector from "./modules/theme-mode";
import ThemePresets from "./modules/theme-presets";

export default function LayoutSettings() {
  const sheetContentBgStyle: CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50%, 50%",
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FloatButton
          className="right-1 bottom-30"
          icon={
            <Settings className="size-6 animate-slow-spin text-foreground transition-all duration-200" />
          }
          tooltip="界面配置"
          tooltipTriggerMode="hover"
        />
      </SheetTrigger>
      <SheetContent
        className="w-[360px]! sm:max-w-[360px]!"
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={sheetContentBgStyle}
      >
        <SheetHeader>
          <SheetTitle>界面配置</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <Tabs className="h-0 w-full flex-1 px-2" defaultValue="appearance">
          <TabsList className="w-full">
            <TabsTrigger value="appearance">外观</TabsTrigger>
            <TabsTrigger value="layout">布局</TabsTrigger>
          </TabsList>
          {/* 外观 */}
          <TabsContent
            className="flex flex-col gap-2 overflow-y-auto px-6 py-2"
            value="appearance"
          >
            {/* 主题模式选择 */}
            <ThemeModeSelector />
            {/* 预设主题 */}
            <ThemePresets />
            {/* 字体设置 */}
            <FontSettings />
            {/* 其他设置 */}
            <OtherSettings />
          </TabsContent>
          {/* 布局 */}
          <TabsContent
            className="flex flex-col gap-2 overflow-y-auto px-6 py-2"
            value="layout"
          >
            <SidebarSettings />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

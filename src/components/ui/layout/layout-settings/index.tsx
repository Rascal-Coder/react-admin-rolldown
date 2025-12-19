import { Settings } from "lucide-react";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/base/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import FloatButton from "@/components/ui/float-button";
import { useDirection } from "@/context/direction-context";
import { cn } from "@/utils";
import AnimationSettings from "./modules/animation-settings";
import BreadcrumbSettings from "./modules/breadcrumb-settings";
import CheckUpdateSettings from "./modules/check-update-settings";
import ContentSettings from "./modules/content-settings";
import CopyrightSettings from "./modules/copyright-settings";
import DirectionSettings from "./modules/direction-settings";
import FontSettings from "./modules/font-settings";
import HeaderFooterSettings from "./modules/header-footer-settings";
import LayoutSettings from "./modules/layout-settings";
import OtherSettings from "./modules/other-settings";
import SidebarSettings from "./modules/sidebar-settings";
import TabsSettings from "./modules/tabs-settings";
import ThemeModeSelector from "./modules/theme-mode";
import ThemePresets from "./modules/theme-presets";
import WatermarkSettings from "./modules/watermark-settings";
export default function LayoutSettingsComponent() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Memoize expensive background style to avoid recalculation
  const sheetContentBgStyle: CSSProperties = useMemo(
    () => ({
      backdropFilter: "blur(20px)",
      backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "right top, left bottom",
      backgroundSize: "50%, 50%",
      willChange: "transform, opacity",
    }),
    []
  );

  const { dir } = useDirection();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Blur the button when opening to prevent focus issues
    if (isOpen && triggerRef.current) {
      triggerRef.current.blur();
    }
  };

  return (
    <>
      {/* Float button outside of Sheet to avoid aria-hidden conflicts */}
      <FloatButton
        className={cn(
          "bottom-30",
          dir === "ltr" ? "right-1" : "left-1",
          open && "pointer-events-none invisible"
        )}
        icon={
          <Settings className="size-6 animate-slow-spin text-foreground transition-all duration-200" />
        }
        onClick={() => setOpen(true)}
        ref={triggerRef}
        tabIndex={open ? -1 : 0}
        tooltip="偏好设置"
      />
      <Sheet onOpenChange={handleOpenChange} open={open}>
        <SheetContent
          className="w-[360px]! sm:max-w-[360px]!"
          onOpenAutoFocus={(e) => e.preventDefault()}
          side={dir === "ltr" ? "right" : "left"}
          style={sheetContentBgStyle}
        >
          <SheetHeader>
            <SheetTitle>偏好设置</SheetTitle>
            <SheetDescription>自定义偏好设置 & 实时预览</SheetDescription>
          </SheetHeader>
          <Tabs
            className="h-0 w-full flex-1 px-2"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="w-full">
              <TabsTrigger value="appearance">外观</TabsTrigger>
              <TabsTrigger value="layout">布局</TabsTrigger>
              <TabsTrigger value="general">通用</TabsTrigger>
            </TabsList>
            {/* 外观 */}
            <TabsContent
              className="flex flex-col gap-1 overflow-y-auto px-6 py-2"
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
              className="flex flex-col gap-1 overflow-y-auto px-6 py-2"
              value="layout"
            >
              {/* 标签栏设置 */}
              <TabsSettings />
              {/* 面包屑设置 */}
              <BreadcrumbSettings />
              {/* 布局设置 */}
              <LayoutSettings />
              {/* 侧边栏设置 */}
              <SidebarSettings />
              {/* 方向设置 */}
              <DirectionSettings />
              {/* 内容设置 */}
              <ContentSettings />

              {/* 顶栏和底栏设置 */}
              <HeaderFooterSettings />
              {/* 版权设置 */}
              <CopyrightSettings />
            </TabsContent>
            {/* 通用 */}
            <TabsContent
              className="flex flex-col gap-1 overflow-y-auto px-6 py-2"
              value="general"
            >
              {/* 页面切换动画设置 */}
              <AnimationSettings />
              {/* 水印设置 */}
              <WatermarkSettings />
              {/* 版本更新检测 */}
              <CheckUpdateSettings />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}

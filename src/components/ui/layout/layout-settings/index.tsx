import { Settings } from "lucide-react";
import type { CSSProperties } from "react";
import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { ScrollArea } from "@/components/base/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/sheet";
import { Text } from "@/components/base/typography";
import FloatButton from "@/components/ui/float-button";
import ThemePresets from "./modules/theme-presets";

export default function LayoutSettings() {
  const sheetContentBgStyle: CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50%, 50%",
  };
  // const settings = useAppSettings();
  // const { updateAppSettings } = useSettingsActions();
  // const { themeColorPresets } = settings;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FloatButton
          className="right-1 bottom-30"
          icon={
            <Settings className="size-6 animate-slow-spin transition-all duration-200" />
          }
          tooltip="界面配置"
          tooltipTriggerMode="hover"
        />
      </SheetTrigger>
      <SheetContent style={sheetContentBgStyle}>
        <SheetHeader>
          <SheetTitle>界面配置</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <ScrollArea>
          <div className="flex flex-col gap-6 px-6 py-2">
            {/* theme presets */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Text variant="subTitle1">预设主题</Text>
              </div>
              <ThemePresets />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

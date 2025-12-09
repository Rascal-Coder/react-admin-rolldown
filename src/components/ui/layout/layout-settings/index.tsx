import clsx from "clsx";
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
import Icon from "@/components/ui/icon/icon";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { ThemeMode } from "@/types/enum";
import { SwitchItem } from "./components/switch-item";
import ThemePresets from "./modules/theme-presets";

export default function LayoutSettings() {
  const sheetContentBgStyle: CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50%, 50%",
  };
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeMode, grayMode, colorWeakMode } = settings;
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
            {/* theme mode */}
            <Text variant="subTitle1">颜色主题风格</Text>
            <div className="flex gap-4">
              <button
                className={clsx(
                  "flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-1 text-foreground outline-box",
                  themeMode === ThemeMode.Light && "outline-box-active"
                )}
                onClick={() =>
                  updateAppSettings({ themeMode: ThemeMode.Light })
                }
                type="button"
              >
                <Icon icon="line-md:sun-rising-filled-loop" size="24" />
                <span className="text-sm">浅色</span>
              </button>
              <button
                className={clsx(
                  "flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-1 text-foreground outline-box",
                  themeMode === ThemeMode.Dark && "outline-box-active"
                )}
                onClick={() => updateAppSettings({ themeMode: ThemeMode.Dark })}
                type="button"
              >
                <Icon
                  icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition"
                  size="24"
                />
                <span className="text-sm">深色</span>
              </button>
              <button
                className={clsx(
                  "flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-1 text-foreground outline-box",
                  themeMode === ThemeMode.System && "outline-box-active"
                )}
                onClick={() =>
                  updateAppSettings({ themeMode: ThemeMode.System })
                }
                type="button"
              >
                <Icon icon="material-symbols-light:hdr-auto" size="24" />
                <span className="text-sm">系统</span>
              </button>
            </div>
            {/* theme presets */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Text variant="subTitle1">预设主题</Text>
              </div>
              <ThemePresets />
            </div>
            <SwitchItem
              checked={grayMode}
              onCheckedChange={(checked) =>
                updateAppSettings({ grayMode: checked })
              }
              tip="开启后界面将变为灰色调，减少色彩干扰"
            >
              灰色模式
            </SwitchItem>
            <SwitchItem
              checked={colorWeakMode}
              onCheckedChange={(checked) =>
                updateAppSettings({ colorWeakMode: checked })
              }
              tip="开启后调整色彩对比度，适合色弱用户使用"
            >
              色弱模式
            </SwitchItem>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

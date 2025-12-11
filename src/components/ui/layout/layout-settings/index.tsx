import clsx from "clsx";
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
import { Slider } from "@/components/base/slider";
import { Text } from "@/components/base/typography";
import FloatButton from "@/components/ui/float-button";
import Icon from "@/components/ui/icon/icon";
// import NumberInput from "@/components/ui/number-input";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { FontFamilyPreset } from "@/theme/tokens/typography";
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
  const { themeMode, grayMode, colorWeakMode, fontFamily, fontSize } = settings;
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
        <div className="flex flex-col gap-2 overflow-y-auto px-6 py-2">
          {/* theme mode */}
          <div className="flex flex-col gap-2">
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
          </div>
          {/* theme presets */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Text variant="subTitle1">预设主题</Text>
            </div>
            <ThemePresets />
          </div>
          {/* font */}
          <div className="flex flex-col gap-2">
            <Text variant="subTitle1">字体</Text>

            <Text variant="subTitle2">字体系列</Text>
            <div className="flex gap-3">
              {Object.entries(FontFamilyPreset).map(([font, family]) => (
                <button
                  className={clsx(
                    "card-box flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled outline-box",
                    fontFamily === family && "font-medium text-primary",
                    family === FontFamilyPreset.inter && "font-inter",
                    fontFamily === family && "outline-box-active",
                    family === FontFamilyPreset.openSans && "font-openSans"
                  )}
                  key={font}
                  onClick={() => updateAppSettings({ fontFamily: family })}
                  type="button"
                >
                  <div className="text-center text-lg">
                    <span>A</span>
                    <span className="ml-0.5 opacity-50">a</span>
                  </div>
                  <span className="text-sm text-text-primary">
                    {family.replace("Variable", "")}
                  </span>
                </button>
              ))}
            </div>

            <Text variant="subTitle2">字体大小</Text>
            <Slider
              defaultValue={[fontSize]}
              max={20}
              min={12}
              onValueChange={(value) =>
                updateAppSettings({ fontSize: value[0] })
              }
              step={1}
            />
          </div>
          {/* gray mode & color weak mode */}
          <div className="flex items-center">
            <Text variant="subTitle1">其他</Text>
          </div>
          <SwitchItem
            checked={grayMode}
            onCheckedChange={(checked) =>
              updateAppSettings({ grayMode: checked })
            }
            side="top"
            tip="开启后界面将变为灰色调，减少色彩干扰"
          >
            灰色模式
          </SwitchItem>
          <SwitchItem
            checked={colorWeakMode}
            onCheckedChange={(checked) =>
              updateAppSettings({ colorWeakMode: checked })
            }
            side="top"
            tip="开启后调整色彩对比度，适合色弱用户使用"
          >
            色弱模式
          </SwitchItem>
        </div>
      </SheetContent>
    </Sheet>
  );
}

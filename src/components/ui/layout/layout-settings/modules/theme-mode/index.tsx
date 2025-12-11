import clsx from "clsx";
import { Text } from "@/components/base/typography";
import Icon from "@/components/ui/icon/icon";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { ThemeMode } from "@/types/enum";

/**
 * 主题模式选择组件
 * 提供浅色、深色、系统三种主题模式切换
 */
export default function ThemeModeSelector() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeMode } = settings;

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">颜色主题风格</Text>
      <div className="flex gap-4">
        <button
          className={clsx(
            "flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-1 py-1 text-foreground outline-box",
            themeMode === ThemeMode.Light && "outline-box-active"
          )}
          onClick={() => updateAppSettings({ themeMode: ThemeMode.Light })}
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
          onClick={() => updateAppSettings({ themeMode: ThemeMode.System })}
          type="button"
        >
          <Icon icon="material-symbols-light:hdr-auto" size="24" />
          <span className="text-sm">系统</span>
        </button>
      </div>
    </div>
  );
}

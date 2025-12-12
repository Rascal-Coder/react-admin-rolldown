import { Text } from "@/components/base/typography";
import Icon from "@/components/ui/icon/icon";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { ThemeMode } from "@/types/enum";
import { RadioGroup } from "../../components/radio-group";

/**
 * 主题模式选择组件
 * 提供浅色、深色、系统三种主题模式切换
 */
export default function ThemeModeSelector() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeMode } = settings;

  return (
    <div className="flex flex-col gap-3">
      <Text variant="subTitle1">颜色主题风格</Text>
      <RadioGroup
        items={[
          {
            value: ThemeMode.Light,
            label: "light",
            content: <Icon icon="line-md:sun-rising-filled-loop" size="24" />,
          },
          {
            value: ThemeMode.Dark,
            label: "dark",
            content: (
              <Icon
                icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition"
                size="24"
              />
            ),
          },
          {
            value: ThemeMode.System,
            label: "system",
            content: <Icon icon="material-symbols-light:hdr-auto" size="24" />,
          },
        ]}
        onValueChange={(value) => updateAppSettings({ themeMode: value })}
        value={themeMode}
      />
      <div className="sr-only" id="theme-mode-description">
        Choose between light, dark or system theme mode
      </div>
    </div>
  );
}

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Text } from "@/components/base/typography";
import Icon from "@/components/ui/icon/icon";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { ThemeMode } from "@/types/enum";
import { RadioGroup } from "../../components/radio-group";

function ThemeIcon({ icon }: { icon: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex min-h-6 min-w-6 items-center justify-center">
      {!loaded && <Loader2 className="size-4 animate-spin" />}
      <Icon
        className={loaded ? "" : "hidden"}
        icon={icon}
        onLoad={() => setLoaded(true)}
        size="24"
      />
    </div>
  );
}

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
            content: <ThemeIcon icon="line-md:sun-rising-filled-loop" />,
          },
          {
            value: ThemeMode.Dark,
            label: "dark",
            content: (
              <ThemeIcon icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition" />
            ),
          },
          {
            value: ThemeMode.System,
            label: "system",
            content: <ThemeIcon icon="material-symbols-light:hdr-auto" />,
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

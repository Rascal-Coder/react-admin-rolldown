import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { SwitchItem } from "../../components/switch-item";
export default function ContentSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeStretch } = settings;
  return (
    <div className="flex flex-col gap-3">
      <Text variant="subTitle1">内容</Text>
      <SwitchItem
        checked={themeStretch}
        onCheckedChange={(checked) =>
          updateAppSettings({ themeStretch: checked })
        }
        tip="仅在屏幕宽度大于1280px时可用"
      >
        拉伸
      </SwitchItem>
      <div className="sr-only" id="content-settings-description">
        Choose between stretch or not stretch content
      </div>
    </div>
  );
}

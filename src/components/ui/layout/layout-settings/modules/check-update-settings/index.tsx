import { Text } from "@/components/base/typography";
import { SwitchItem } from "@/components/ui/layout/layout-settings/components/switch-item";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";

export default function CheckUpdateSettings() {
  const { checkUpdateEnabled } = useAppSettings();
  const { updateAppSettings } = useSettingsActions();

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">版本更新</Text>
      <SwitchItem
        checked={checkUpdateEnabled}
        onCheckedChange={(checked) =>
          updateAppSettings({ checkUpdateEnabled: checked })
        }
        tipContent="开启后将定时检查应用是否有新版本"
      >
        定时检查更新
      </SwitchItem>
    </div>
  );
}

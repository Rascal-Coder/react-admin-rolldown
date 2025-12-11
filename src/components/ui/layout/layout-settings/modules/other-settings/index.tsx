import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { SwitchItem } from "../../components/switch-item";

/**
 * 其他设置组件
 * 提供灰色模式和色弱模式的开关配置
 */
export default function OtherSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { grayMode, colorWeakMode } = settings;

  return (
    <>
      <div className="flex items-center">
        <Text variant="subTitle1">其他</Text>
      </div>
      <SwitchItem
        checked={grayMode}
        onCheckedChange={(checked) => updateAppSettings({ grayMode: checked })}
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
    </>
  );
}

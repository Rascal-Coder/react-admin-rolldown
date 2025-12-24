import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { SwitchItem } from "../../components/switch-item";

export default function ContentSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeStretch, showAllMenuWith403 } = settings;

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

      <SwitchItem
        checked={showAllMenuWith403}
        onCheckedChange={(checked) =>
          updateAppSettings({ showAllMenuWith403: checked })
        }
        tipContent={
          <>
            <p>仅前端路由模式生效。</p>
            <p>关闭时按角色过滤菜单，开启时显示所有菜单但无权限页面显示 403</p>
          </>
        }
      >
        显示所有菜单项
      </SwitchItem>

      <div className="sr-only" id="content-settings-description">
        Choose between stretch or not stretch content
      </div>
    </div>
  );
}

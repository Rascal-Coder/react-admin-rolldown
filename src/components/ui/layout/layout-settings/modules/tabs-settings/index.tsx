import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { TabType } from "@/types/enum";
import { SelectItem } from "../../components/select-item";
import { SwitchItem } from "../../components/switch-item";
export default function TabsSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { multiTab, tabType, tabSortable } = settings;
  const TAB_TYPE_OPTIONS = [
    {
      value: TabType.Chrome,
      label: "Chrome",
    },
    {
      value: TabType.Vscode,
      label: "Vscode",
    },
    {
      value: TabType.Card,
      label: "Card",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">标签栏</Text>
      <SwitchItem
        checked={multiTab}
        onCheckedChange={(checked) => updateAppSettings({ multiTab: checked })}
      >
        启用标签栏
      </SwitchItem>
      <div className="sr-only" id="tabs-settings-description">
        Choose whether to enable multiple tabs
      </div>
      <SelectItem
        items={TAB_TYPE_OPTIONS}
        onValueChange={(value) =>
          updateAppSettings({
            tabType: value as TabType,
          })
        }
        value={tabType}
      >
        标签栏风格
      </SelectItem>
      <div className="sr-only" id="tabs-settings-description">
        Choose type of tabs
      </div>
      <SwitchItem
        checked={tabSortable}
        onCheckedChange={(checked) =>
          updateAppSettings({ tabSortable: checked })
        }
      >
        启动拖拽排序
      </SwitchItem>
      <div className="sr-only" id="tabs-settings-description">
        Choose whether to enable drag and drop sorting
      </div>
    </div>
  );
}

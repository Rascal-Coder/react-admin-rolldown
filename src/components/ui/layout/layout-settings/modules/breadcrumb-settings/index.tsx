import { Text } from "@/components/base/typography";
import type { BreadcrumbVariant } from "@/components/ui/layout/breadcrumb/types";
import { SelectItem } from "@/components/ui/layout/layout-settings/components/select-item";
import { SwitchItem } from "@/components/ui/layout/layout-settings/components/switch-item";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
export default function BreadcrumbSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { breadCrumb, breadCrumbVariant } = settings;
  const BREADCRUMB_VARIANT_OPTIONS = [
    {
      value: "capsule",
      label: "Capsule",
    },
    {
      value: "parallelogram",
      label: "Parallelogram",
    },
    {
      value: "ribbon",
      label: "Ribbon",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">面包屑</Text>
      <SwitchItem
        checked={breadCrumb}
        onCheckedChange={(checked) =>
          updateAppSettings({ breadCrumb: checked })
        }
      >
        启用面包屑
      </SwitchItem>
      <div className="sr-only" id="breadcrumb-settings-description">
        Choose whether to enable breadcrumb
      </div>
      <SelectItem
        items={BREADCRUMB_VARIANT_OPTIONS}
        onValueChange={(value) =>
          updateAppSettings({
            breadCrumbVariant: value as BreadcrumbVariant,
          })
        }
        value={breadCrumbVariant}
      >
        面包屑风格
      </SelectItem>
      <div className="sr-only" id="breadcrumb-settings-description">
        Choose type of breadcrumb
      </div>
    </div>
  );
}

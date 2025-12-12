import { Slider } from "@/components/base/slider";
import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { RadioGroup } from "../../components/radio-group";

/**
 * 字体设置组件
 * 提供字体系列和字体大小的配置选项
 */
export default function FontSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { fontFamily, fontSize } = settings;

  const fontItems = [
    {
      value: FontFamilyPreset.inter,
      label: "Inter",
      content: (
        <div className="h-16 flex-center">
          <div className="text-center text-lg">
            <span>A</span>
            <span className="ml-0.5 opacity-50">a</span>
          </div>
        </div>
      ),
    },
    {
      value: FontFamilyPreset.openSans,
      label: "Open Sans",
      content: (
        <div className="h-16 flex-center">
          <div className="text-center text-lg">
            <span>A</span>
            <span className="ml-0.5 opacity-50">a</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">字体</Text>

      <Text variant="subTitle2">字体系列</Text>
      <RadioGroup
        ariaDescription="选择字体系列"
        ariaLabel="字体系列选择器"
        className="grid-cols-2"
        items={fontItems}
        onValueChange={(value) => updateAppSettings({ fontFamily: value })}
        value={fontFamily}
      />
      <div className="sr-only" id="font-family-description">
        Choose between Inter or Open Sans font family
      </div>
      <Text variant="subTitle2">字体大小</Text>
      <Slider
        defaultValue={[fontSize]}
        max={20}
        min={12}
        onValueChange={(value) => updateAppSettings({ fontSize: value[0] })}
        step={1}
      />
      <div className="sr-only" id="font-size-description">
        Choose between 12px and 20px font size
      </div>
    </div>
  );
}

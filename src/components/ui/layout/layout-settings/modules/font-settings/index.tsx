import clsx from "clsx";
import { Slider } from "@/components/base/slider";
import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { FontFamilyPreset } from "@/theme/tokens/typography";

/**
 * 字体设置组件
 * 提供字体系列和字体大小的配置选项
 */
export default function FontSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { fontFamily, fontSize } = settings;

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">字体</Text>

      <Text variant="subTitle2">字体系列</Text>
      <div className="flex gap-3">
        {Object.entries(FontFamilyPreset).map(([font, family]) => (
          <button
            className={clsx(
              "card-box flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled outline-box",
              fontFamily === family && "font-medium text-primary",
              family === FontFamilyPreset.inter && "font-inter",
              fontFamily === family && "outline-box-active",
              family === FontFamilyPreset.openSans && "font-openSans"
            )}
            key={font}
            onClick={() => updateAppSettings({ fontFamily: family })}
            type="button"
          >
            <div className="text-center text-lg">
              <span>A</span>
              <span className="ml-0.5 opacity-50">a</span>
            </div>
            <span className="text-sm text-text-primary">
              {family.replace("Variable", "")}
            </span>
          </button>
        ))}
      </div>

      <Text variant="subTitle2">字体大小</Text>
      <Slider
        defaultValue={[fontSize]}
        max={20}
        min={12}
        onValueChange={(value) => updateAppSettings({ fontSize: value[0] })}
        step={1}
      />
    </div>
  );
}

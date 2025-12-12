import { Text } from "@/components/base/typography";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import { RadioGroup } from "@/components/ui/layout/layout-settings/components/radio-group";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { presetsColors } from "@/theme/tokens/color";
import type { ThemeColorPresets } from "@/types/enum";
import { colorGroups, groupLabels } from "./constants";
import type { ColorGroup } from "./types";

/**
 * 预设主题
 * 暖色系主题包括红色、橙色、黄色、绿色、蓝色、紫色、粉色、玫瑰色
 * 冷色系主题包括绿色、蓝色、紫色、粉色、玫瑰色
 * 用户可以通过点击预设主题来选择不同的主题颜色
 */
export default function ThemePresets() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeColorPresets } = settings;

  // Find the color group of the current theme preset
  const getCurrentColorGroup = (): ColorGroup => {
    for (const [group, presets] of Object.entries(colorGroups)) {
      if (presets.includes(themeColorPresets)) {
        return group as ColorGroup;
      }
    }
    return "warm"; // fallback
  };

  const currentGroup = getCurrentColorGroup();

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">预设主题</Text>
      <div
        className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800"
        style={{ color: presetsColors[themeColorPresets].default }}
      >
        <div
          className="h-5 w-5 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-800"
          style={{
            backgroundColor: presetsColors[themeColorPresets].default,
          }}
        />
        <span className="font-bold text-xs capitalize opacity-80">
          {themeColorPresets}
        </span>
      </div>
      {/* Category Filters */}
      <Tabs className="w-full" defaultValue={currentGroup}>
        <TabsList className="w-full">
          {(Object.keys(groupLabels) as ColorGroup[]).map((group) => (
            <TabsTrigger className="flex-1" key={group} value={group}>
              {groupLabels[group]}
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(groupLabels) as ColorGroup[]).map((group) => {
          const groupItems = Object.entries(presetsColors)
            .filter(([preset]) =>
              colorGroups[group].includes(preset as ThemeColorPresets)
            )
            .map(([preset, color]) => ({
              value: preset as ThemeColorPresets,
              label: preset,
              content: (
                <svg
                  className="group-data-[state=unchecked]:-rotate-45 h-8 w-full transition-transform duration-500 ease-out group-data-[state=checked]:rotate-0"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{preset} color preset</title>
                  <ellipse
                    cx="50"
                    cy="50"
                    fill={color.default}
                    rx="35"
                    ry="20"
                  />
                </svg>
              ),
            }));

          return (
            <TabsContent key={group} value={group}>
              <RadioGroup
                ariaDescription="Select theme preset from warm or cool group"
                ariaLabel={`Select theme preset from ${groupLabels[group]} group`}
                items={groupItems}
                onValueChange={(value) =>
                  updateAppSettings({
                    themeColorPresets: value,
                  })
                }
                value={themeColorPresets}
              />
              <div className="sr-only" id="theme-presets-description">
                Choose between warm or cool theme presets
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

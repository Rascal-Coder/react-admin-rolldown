import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { presetsColors } from "@/theme/tokens/color";
import type { ThemeColorPresets } from "@/types/enum";
import { cn } from "@/utils";
import { colorGroups, groupLabels } from "./constants";
import type { ColorGroup } from "./types";

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
    <>
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

        {(Object.keys(groupLabels) as ColorGroup[]).map((group) => (
          <TabsContent key={group} value={group}>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(presetsColors)
                .filter(([preset]) =>
                  colorGroups[group].includes(preset as ThemeColorPresets)
                )
                .map(([preset, color]) => (
                  <button
                    className={cn(
                      "group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-transparent p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      themeColorPresets === preset &&
                        "border-primary/20 bg-primary/5 shadow-sm dark:bg-primary/10"
                    )}
                    key={preset}
                    onClick={() =>
                      updateAppSettings({
                        themeColorPresets: preset as ThemeColorPresets,
                      })
                    }
                    type="button"
                  >
                    <div
                      className={cn(
                        "h-4 w-6 rounded-full shadow-sm ring-1 ring-black/10 ring-inset transition-all duration-300 dark:ring-white/10",
                        themeColorPresets === preset
                          ? "w-6 rotate-0"
                          : "-rotate-45"
                      )}
                      style={{ backgroundColor: color.default }}
                    />
                    <span
                      className={cn(
                        "font-medium text-xs capitalize transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-200",
                        themeColorPresets === preset
                          ? "font-bold text-primary"
                          : "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      {preset}
                    </span>
                  </button>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

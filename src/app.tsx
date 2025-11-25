import { ThemeColorPresets, ThemeMode } from "#/enum";
import { useSettingActions, useSettings } from "@/store/setting-store";
import { useTheme } from "@/theme/hooks/use-theme";
import { ThemeProvider } from "@/theme/theme-provider";

function AppContent() {
  const settings = useSettings();
  const { setSettings } = useSettingActions();
  const { mode, setMode } = useTheme();

  const handleThemeModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const handleColorPresetChange = (preset: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets: preset,
    });
  };

  return (
    <div className="min-h-screen bg-bg-default p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-bold text-4xl text-text-primary">
            颜色 Token 测试
          </h1>

          {/* Theme Controls */}
          <div className="flex flex-wrap gap-4">
            {/* Theme Mode Toggle */}
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <p className="mb-2 font-medium text-sm text-text-secondary">
                主题模式
              </p>
              <div className="flex gap-2">
                <button
                  className={`rounded px-4 py-2 font-medium text-sm text-text-primary transition-colors ${
                    mode === ThemeMode.Light ? "bg-primary" : ""
                  }`}
                  onClick={() => handleThemeModeChange(ThemeMode.Light)}
                  type="button"
                >
                  浅色
                </button>
                <button
                  className={`rounded px-4 py-2 font-medium text-sm text-text-primary transition-colors ${
                    mode === ThemeMode.Dark ? "bg-primary" : ""
                  }`}
                  onClick={() => handleThemeModeChange(ThemeMode.Dark)}
                  type="button"
                >
                  深色
                </button>
              </div>
            </div>

            {/* Color Preset Selector */}
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <p className="mb-2 font-medium text-sm text-text-secondary">
                主色调
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(ThemeColorPresets).map((preset) => {
                  const getPresetLabel = (p: ThemeColorPresets) => {
                    const labels: Record<ThemeColorPresets, string> = {
                      [ThemeColorPresets.Default]: "默认",
                      [ThemeColorPresets.Cyan]: "青色",
                      [ThemeColorPresets.Purple]: "紫色",
                      [ThemeColorPresets.Blue]: "蓝色",
                      [ThemeColorPresets.Orange]: "橙色",
                      [ThemeColorPresets.Red]: "红色",
                    };
                    return labels[p];
                  };

                  return (
                    <button
                      className={`rounded px-3 py-1.5 font-medium text-text-primary text-xs transition-colors ${
                        settings.themeColorPresets === preset
                          ? "bg-primary"
                          : ""
                      }`}
                      key={preset}
                      onClick={() => handleColorPresetChange(preset)}
                      type="button"
                    >
                      {getPresetLabel(preset)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Palette Colors */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Palette 颜色
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Primary */}
            <ColorGroup
              colors={[
                { name: "lighter", class: "bg-primary-lighter" },
                { name: "light", class: "bg-primary-light" },
                { name: "default", class: "bg-primary" },
                { name: "dark", class: "bg-primary-dark" },
                { name: "darker", class: "bg-primary-darker" },
              ]}
              name="Primary"
            />

            {/* Success */}
            <ColorGroup
              colors={[
                { name: "lighter", class: "bg-success-lighter" },
                { name: "light", class: "bg-success-light" },
                { name: "default", class: "bg-success" },
                { name: "dark", class: "bg-success-dark" },
                { name: "darker", class: "bg-success-darker" },
              ]}
              name="Success"
            />

            {/* Warning */}
            <ColorGroup
              colors={[
                { name: "lighter", class: "bg-warning-lighter" },
                { name: "light", class: "bg-warning-light" },
                { name: "default", class: "bg-warning" },
                { name: "dark", class: "bg-warning-dark" },
                { name: "darker", class: "bg-warning-darker" },
              ]}
              name="Warning"
            />

            {/* Error */}
            <ColorGroup
              colors={[
                { name: "lighter", class: "bg-error-lighter" },
                { name: "light", class: "bg-error-light" },
                { name: "default", class: "bg-error" },
                { name: "dark", class: "bg-error-dark" },
                { name: "darker", class: "bg-error-darker" },
              ]}
              name="Error"
            />

            {/* Info */}
            <ColorGroup
              colors={[
                { name: "lighter", class: "bg-info-lighter" },
                { name: "light", class: "bg-info-light" },
                { name: "default", class: "bg-info" },
                { name: "dark", class: "bg-info-dark" },
                { name: "darker", class: "bg-info-darker" },
              ]}
              name="Info"
            />
          </div>
        </section>

        {/* Gray Scale */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Gray 灰度
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-9">
            <ColorSwatch class="bg-gray-100" name="Gray 100" />
            <ColorSwatch class="bg-gray-200" name="Gray 200" />
            <ColorSwatch class="bg-gray-300" name="Gray 300" />
            <ColorSwatch class="bg-gray-400" name="Gray 400" />
            <ColorSwatch class="bg-gray-500" name="Gray 500" />
            <ColorSwatch class="bg-gray-600" name="Gray 600" />
            <ColorSwatch class="bg-gray-700" name="Gray 700" />
            <ColorSwatch class="bg-gray-800" name="Gray 800" />
            <ColorSwatch class="bg-gray-900" name="Gray 900" />
          </div>
        </section>

        {/* Common Colors */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Common 通用颜色
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <ColorSwatch
              class="border border-border bg-common-white"
              name="White"
            />
            <ColorSwatch class="bg-common-black text-white" name="Black" />
          </div>
        </section>

        {/* Text Colors */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Text 文本颜色
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-bg-paper p-6">
              <p className="mb-2 text-lg text-text-primary">Primary Text</p>
              <p className="text-text-primary">
                这是主要文本颜色，用于重要的文本内容。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-6">
              <p className="mb-2 text-lg text-text-secondary">Secondary Text</p>
              <p className="text-text-secondary">
                这是次要文本颜色，用于辅助说明。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-6">
              <p className="mb-2 text-lg text-text-disabled">Disabled Text</p>
              <p className="text-text-disabled">
                这是禁用文本颜色，用于不可用状态。
              </p>
            </div>
          </div>
        </section>

        {/* Background Colors */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Background 背景颜色
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-bg-default p-6">
              <p className="mb-2 font-semibold text-text-primary">
                Default Background
              </p>
              <p className="text-text-secondary">
                默认背景色，用于页面主体背景。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-6">
              <p className="mb-2 font-semibold text-text-primary">
                Paper Background
              </p>
              <p className="text-text-secondary">
                纸张背景色，用于卡片和面板。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-neutral p-6">
              <p className="mb-2 font-semibold text-text-primary">
                Neutral Background
              </p>
              <p className="text-text-secondary">中性背景色，用于次要区域。</p>
            </div>
          </div>
        </section>

        {/* Action Colors */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-text-primary">
            Action 交互颜色
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <div className="mb-2 h-16 rounded bg-action-hover" />
              <p className="font-medium text-sm text-text-primary">Hover</p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <div className="mb-2 h-16 rounded bg-action-selected" />
              <p className="font-medium text-sm text-text-primary">Selected</p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <div className="mb-2 h-16 rounded bg-action-focus" />
              <p className="font-medium text-sm text-text-primary">Focus</p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <div className="mb-2 h-16 rounded bg-action-disabled" />
              <p className="font-medium text-sm text-text-primary">Disabled</p>
            </div>
            <div className="rounded-lg border border-border bg-bg-paper p-4">
              <div className="mb-2 h-16 rounded bg-action-active" />
              <p className="font-medium text-sm text-text-primary">Active</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Color Group Component
function ColorGroup({
  name,
  colors,
}: {
  name: string;
  colors: { name: string; class: string }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-paper p-6">
      <h3 className="mb-4 font-semibold text-lg text-text-primary">{name}</h3>
      <div className="space-y-3">
        {colors.map((color) => (
          <div className="flex items-center gap-4" key={color.name}>
            <div
              className={`h-20 w-20 rounded-lg ${color.class} shrink-0 border border-border`}
            />
            <div className="flex-1">
              <p className="font-medium text-sm text-text-primary">
                {color.name}
              </p>
              <p className="font-mono text-text-secondary text-xs">
                {color.class}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Color Swatch Component
function ColorSwatch({
  name,
  class: className,
}: {
  name: string;
  class: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-paper p-4">
      <div
        className={`h-24 w-full rounded-lg ${className} mb-3 border border-border`}
      />
      <p className="mb-1 font-medium text-sm text-text-primary">{name}</p>
      <p className="font-mono text-text-secondary text-xs">{className}</p>
    </div>
  );
}

export default App;

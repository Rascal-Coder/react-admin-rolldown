import { useDebounceFn } from "ahooks";
import { Text } from "@/components/base/typography";
import InputColor from "@/components/ui/input-color";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { InputItem } from "../../components/input-item";
import { SwitchItem } from "../../components/switch-item";
export default function WatermarkSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { watermarkEnabled, watermarkContent, watermarkColor } = settings;

  // 对颜色更新进行防抖处理，避免频繁触发状态更新
  const { run: debouncedUpdateColor } = useDebounceFn(
    (color: string) => {
      updateAppSettings({ watermarkColor: color });
    },
    { wait: 300 }
  );

  return (
    <>
      <div className="flex items-center">
        <Text variant="subTitle1">水印</Text>
      </div>
      <SwitchItem
        checked={watermarkEnabled}
        onCheckedChange={(checked) =>
          updateAppSettings({ watermarkEnabled: checked })
        }
        side="top"
        tip="开启后将在页面中添加水印"
      >
        开启水印
      </SwitchItem>
      <div className="sr-only" id="watermark-enabled-description">
        Enable watermark to display on the page
      </div>
      <InputItem
        onChange={(inputVal) =>
          updateAppSettings({ watermarkContent: inputVal })
        }
        value={watermarkContent}
      >
        水印内容
      </InputItem>
      <div className="sr-only" id="watermark-content-description">
        Enter the watermark content to display on the page
      </div>
      <div className="my-1 flex w-full cursor-default items-center justify-between rounded-md px-2 py-1 text-left hover:bg-accent">
        <span className="flex flex-1 shrink items-center text-foreground text-sm">
          水印颜色
        </span>
        <InputColor
          className="mt-0"
          onChange={debouncedUpdateColor}
          showInput={false}
          value={watermarkColor}
        />
      </div>
      <div className="sr-only" id="watermark-color-description">
        Enter the watermark color to display on the page
      </div>
    </>
  );
}

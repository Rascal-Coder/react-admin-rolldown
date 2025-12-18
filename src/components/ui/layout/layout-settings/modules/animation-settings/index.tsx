import { Text } from "@/components/base/typography";
import { SelectItem } from "@/components/ui/layout/layout-settings/components/select-item";
import type { PageTransitionType } from "@/store/setting-store";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";

export default function AnimationSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { pageTransition } = settings;

  // 页面切换动画选项
  const ANIMATION_OPTIONS = [
    {
      value: "fadeInLeft",
      label: "淡入（从左）",
    },
    {
      value: "fadeInRight",
      label: "淡入（从右）",
    },
    {
      value: "fadeInUp",
      label: "淡入（从下）",
    },
    {
      value: "fadeInDown",
      label: "淡入（从上）",
    },
    {
      value: "zoomIn",
      label: "缩放进入",
    },
    {
      value: "bounceIn",
      label: "弹跳进入",
    },
    {
      value: "flipInX",
      label: "翻转进入（X轴）",
    },
    {
      value: "scaleInX",
      label: "缩放进入（X轴）",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">页面切换动画</Text>
      <SelectItem
        items={ANIMATION_OPTIONS}
        onValueChange={(value) =>
          updateAppSettings({
            pageTransition: value as PageTransitionType,
          })
        }
        tipContent="选择页面切换时的动画效果"
        value={pageTransition}
      >
        动画效果
      </SelectItem>
      <div className="sr-only" id="animation-settings-description">
        Choose the page transition animation effect
      </div>
    </div>
  );
}

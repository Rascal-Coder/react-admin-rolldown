import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { SwitchItem } from "../../components/switch-item";

/**
 * 顶栏和底栏设置组件
 * 提供顶栏固定、底栏固定和显示底栏的开关配置
 */
export default function HeaderFooterSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { headerFixed, footerFixed, showFooter } = settings;

  return (
    <>
      <div className="flex items-center">
        <Text variant="subTitle1">顶栏 & 底栏</Text>
      </div>
      <SwitchItem
        checked={headerFixed}
        onCheckedChange={(checked) =>
          updateAppSettings({ headerFixed: checked })
        }
        side="top"
        tip="开启后顶栏将固定在页面顶部，滚动时不会移动"
      >
        固定顶栏
      </SwitchItem>
      <div className="sr-only" id="header-fixed-description">
        Enable fixed header to keep it at the top when scrolling
      </div>
      <SwitchItem
        checked={showFooter}
        onCheckedChange={(checked) =>
          updateAppSettings({ showFooter: checked })
        }
        side="top"
        tip="开启后将显示页面底栏"
      >
        显示底栏
      </SwitchItem>
      <div className="sr-only" id="show-footer-description">
        Enable footer to display at the bottom of the page
      </div>
      <SwitchItem
        checked={footerFixed}
        disabled={!showFooter}
        onCheckedChange={(checked) =>
          updateAppSettings({ footerFixed: checked })
        }
        side="top"
        tip={
          showFooter
            ? "开启后底栏将固定在页面底部，滚动时不会移动"
            : "请先开启显示底栏"
        }
      >
        固定底栏
      </SwitchItem>
      <div className="sr-only" id="footer-fixed-description">
        Enable fixed footer to keep it at the bottom when scrolling
      </div>
    </>
  );
}

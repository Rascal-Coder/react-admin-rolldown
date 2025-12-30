import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/base/button";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";

/**
 * Content Fullscreen Button Component
 * 内容区域全屏按钮，隐藏侧边栏、头部、底部，只保留 main 区域
 */
export default function ContentFullscreenButton() {
  const { contentFullscreen } = useAppSettings();
  const { updateAppSettings } = useSettingsActions();

  const toggleContentFullscreen = () => {
    updateAppSettings({ contentFullscreen: !contentFullscreen });
  };

  return (
    <Button
      className="h-8 w-8 rounded-full"
      onClick={toggleContentFullscreen}
      size="icon"
      title={contentFullscreen ? "退出内容全屏" : "内容全屏"}
      variant="ghost"
    >
      {contentFullscreen ? (
        <Minimize className="h-4 w-4" />
      ) : (
        <Maximize className="h-4 w-4" />
      )}
    </Button>
  );
}

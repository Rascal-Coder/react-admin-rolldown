import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/base/dialog";
import { Text } from "@/components/base/typography";
import { SwitchItem } from "@/components/ui/layout/layout-settings/components/switch-item";
import { useCheckUpdate } from "@/hooks/use-check-update";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";

export default function CheckUpdateSettings() {
  const { checkUpdateEnabled } = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { hasUpdate, refresh, dismiss } = useCheckUpdate({
    interval: 5,
    disableInDev: !checkUpdateEnabled,
  });

  return (
    <div className="flex flex-col gap-2">
      <Text variant="subTitle1">版本更新</Text>
      <SwitchItem
        checked={checkUpdateEnabled}
        onCheckedChange={(checked) =>
          updateAppSettings({ checkUpdateEnabled: checked })
        }
        tipContent="开启后将定时检查应用是否有新版本"
      >
        定时检查更新
      </SwitchItem>

      <Dialog onOpenChange={(open) => !open && dismiss()} open={hasUpdate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>发现新版本</DialogTitle>
            <DialogDescription>
              检测到应用有新版本可用，是否立即刷新页面以获取最新版本？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={dismiss} variant="outline">
              稍后再说
            </Button>
            <Button onClick={refresh}>立即刷新</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

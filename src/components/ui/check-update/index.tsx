import { useCheckUpdate } from "@/hooks/use-check-update";
import { useAppSettings } from "@/store/setting-store";
import { UpdateDialog } from "./update-dialog";

export function CheckUpdate() {
  const { checkUpdateEnabled } = useAppSettings();

  const { hasUpdate, refresh, dismiss } = useCheckUpdate({
    enabled: checkUpdateEnabled,
    interval: 5,
  });
  return (
    <UpdateDialog onDismiss={dismiss} onRefresh={refresh} open={hasUpdate} />
  );
}

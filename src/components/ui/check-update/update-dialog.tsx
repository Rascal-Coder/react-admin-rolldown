import { Button } from "@/components/base/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateDialogProps {
  open: boolean;
  onRefresh: () => void;
  onDismiss: () => void;
}

export function UpdateDialog({
  open,
  onRefresh,
  onDismiss,
}: UpdateDialogProps) {
  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && onDismiss()} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>发现新版本</DialogTitle>
          <DialogDescription>
            检测到应用有新版本可用，是否立即刷新页面以获取最新版本？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onDismiss} variant="outline">
            稍后再说
          </Button>
          <Button onClick={onRefresh}>立即刷新</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

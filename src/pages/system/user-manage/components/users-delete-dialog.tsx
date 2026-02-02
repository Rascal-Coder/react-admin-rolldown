import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/base/alert";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showSubmittedData } from "@/lib/show-submitted-data";
import type { User } from "../data/schema";

type UserDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
};

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: UserDeleteDialogProps) {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (value.trim() !== currentRow.userName) {
      return;
    }

    onOpenChange(false);
    showSubmittedData(currentRow, "The following user has been deleted:");
  };

  return (
    <ConfirmDialog
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.userName}</span>?
            <br />
            This action will permanently remove the user from the system. This
            cannot be undone.
          </p>

          <Label className="my-2">
            User Name:
            <Input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter username to confirm deletion."
              value={value}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      destructive
      disabled={value.trim() !== currentRow.userName}
      handleConfirm={handleDelete}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-destructive">
          <AlertTriangle
            className="me-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete User
        </span>
      }
    />
  );
}

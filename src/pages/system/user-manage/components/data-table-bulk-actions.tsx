import type { Table } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/base/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/tooltip";
import { DataTableBulkActions as BulkActionsToolbar } from "@/components/ui/data-table/bulk-actions";
import { UsersMultiDeleteDialog } from "./users-multi-delete-dialog";

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>;
};

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <BulkActionsToolbar entityName="user" table={table}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Delete selected users"
              className="size-8"
              onClick={() => setShowDeleteConfirm(true)}
              size="icon"
              title="Delete selected users"
              variant="destructive"
            >
              <Trash2 />
              <span className="sr-only">Delete selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected users</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        onOpenChange={setShowDeleteConfirm}
        open={showDeleteConfirm}
        table={table}
      />
    </>
  );
}

import type { RowSelectionState, Table } from "@tanstack/react-table";
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
  rowSelection: RowSelectionState;
};

export function DataTableBulkActions<TData>({
  table,
  rowSelection,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const selectedRowIds = Object.keys(rowSelection ?? {});
  const selectedCount = selectedRowIds.length;

  // Derive selected rows from current row model to avoid issues with
  // filtered selection APIs and ensure it always reflects latest state.

  return (
    <>
      <BulkActionsToolbar
        entityName="user"
        selectedCount={selectedCount}
        table={table}
      >
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

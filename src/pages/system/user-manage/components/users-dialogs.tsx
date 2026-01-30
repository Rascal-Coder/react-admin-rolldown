import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { useUsers } from "./users-provider";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();
  return (
    <>
      <UsersActionDialog
        key="user-add"
        onOpenChange={() => setOpen("add")}
        open={open === "add"}
      />

      {currentRow && (
        <>
          <UsersActionDialog
            currentRow={currentRow}
            key={`user-edit-${currentRow.id}`}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            open={open === "edit"}
          />

          <UsersDeleteDialog
            currentRow={currentRow}
            key={`user-delete-${currentRow.id}`}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            open={open === "delete"}
          />
        </>
      )}
    </>
  );
}

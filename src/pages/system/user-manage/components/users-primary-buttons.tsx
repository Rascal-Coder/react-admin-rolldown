import { UserPlus } from "lucide-react";
import { Button } from "@/components/base/button";
import { useUsers } from "./users-provider";

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Add User</span> <UserPlus size={18} />
      </Button>
    </div>
  );
}

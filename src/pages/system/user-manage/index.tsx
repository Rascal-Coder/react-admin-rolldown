import { useQuery } from "@tanstack/react-query";
import { user_usercontroller_page } from "@/api/api/user";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersProvider } from "./components/users-provider";
import UsersTable from "./components/users-table";

export default function UserManage() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      user_usercontroller_page({
        page: 1,
        size: 10,
      }),
  });
  return (
    <UsersProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="font-bold text-2xl tracking-tight">User List</h2>
          <p className="text-muted-foreground">
            Manage your users and their roles here.
          </p>
        </div>
        <UsersPrimaryButtons />
      </div>
      <div className="@container/content -mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <UsersTable data={data?.items ?? []} />
      </div>
      <UsersDialogs />
    </UsersProvider>
  );
}

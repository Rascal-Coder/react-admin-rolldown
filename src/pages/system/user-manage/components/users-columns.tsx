import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Checkbox } from "@/components/base/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { LongText } from "@/components/ui/long-text";
import { UserSex } from "@/types/user";
import { cn } from "@/utils";
import type { User } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const usersColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="translate-y-[2px]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    meta: {
      className: cn("sticky start-0 z-10 rounded-tl-[inherit] md:table-cell"),
    },
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="translate-y-[2px]"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="用户名称" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("userName")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]",
        "sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none",
        "w-36 min-w-36"
      ),
      title: "用户名称",
    },
    enableHiding: false,
  },
  {
    accessorKey: "avatarEntity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="头像" />
    ),
    cell: ({ row }) => {
      const avatar = row.getValue("avatarEntity") as API.FileVO;
      if (!avatar) {
        return <div>-</div>;
      }
      return <div className="text-nowrap">{avatar.fileName}</div>;
    },
    meta: {
      title: "头像",
    },
    enableSorting: false,
  },
  {
    accessorKey: "nickName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="昵称" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("nickName")}</LongText>
    ),
    meta: {
      title: "昵称",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="邮箱" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
    meta: {
      title: "邮箱",
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="手机号" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    meta: {
      title: "手机号",
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="性别" />
    ),
    cell: ({ row }) => {
      const sex = row.getValue("sex") as number;
      let sexText = "-";
      if (sex === UserSex.Male) {
        sexText = "男";
      } else if (sex === UserSex.Female) {
        sexText = "女";
      }
      return <div>{sexText}</div>;
    },
    meta: {
      title: "性别",
    },
    enableSorting: false,
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="创建时间" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createDate") as Date;
      if (!date) {
        return <div>-</div>;
      }
      const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      return <div className="text-nowrap">{formattedDate}</div>;
    },
    meta: {
      title: "创建时间",
    },
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];

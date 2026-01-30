import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/base/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/base/dropdown-menu";
import Icon from "../icon/icon";

type DataTableViewOptionsProps<TData> = {
  filterColumns: Column<TData>[];
};

export function DataTableViewOptions<TData>({
  filterColumns,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="ms-auto hidden h-8 lg:flex"
          size="sm"
          variant="outline"
        >
          <Icon icon="mdi:view-list" size={16} />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterColumns.map((column) => (
          <DropdownMenuCheckboxItem
            checked={column.getIsVisible()}
            className="capitalize"
            key={column.id}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

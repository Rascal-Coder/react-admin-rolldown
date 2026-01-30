import type { Column, Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { DataTableFacetedFilter } from "./faceted-filter";
import { DataTableViewOptions } from "./view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: {
    columnId: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  filterColumns: Column<TData>[];
};
export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Filter...",
  searchKey,
  filterColumns,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const columnFilters = table.options.state?.columnFilters ?? [];
  const globalFilter = table.options.state?.globalFilter ?? "";
  const isFiltered = columnFilters.length > 0 || globalFilter;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {searchKey ? (
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) => {
              const column = table
                .getAllColumns()
                .find((col) => col.id === searchKey);
              column?.setFilterValue(event.target.value);
            }}
            placeholder={searchPlaceholder}
            value={
              (columnFilters.find((f) => f.id === searchKey)
                ?.value as string) ?? ""
            }
          />
        ) : (
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
          />
        )}
        <div className="flex gap-x-2">
          {filters.map((filter) => {
            const column = table
              .getAllColumns()
              .find((col) => col.id === filter.columnId);
            if (!column) {
              return null;
            }
            return (
              <DataTableFacetedFilter
                column={column}
                key={filter.columnId}
                options={filter.options}
                title={filter.title}
              />
            );
          })}
        </div>
        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            variant="ghost"
          >
            Reset
            <X className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions filterColumns={filterColumns} />
    </div>
  );
}

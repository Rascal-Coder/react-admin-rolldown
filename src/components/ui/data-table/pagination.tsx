import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { Button } from "@/components/base/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import Icon from "@/components/ui/icon/icon";
import { cn, getPageNumbers } from "@/utils";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const paginationState = table.options.state?.pagination;
  const pageIndex = paginationState?.pageIndex;
  const pageSize = paginationState?.pageSize;
  const currentPage = (pageIndex ?? 0) + 1;
  const totalPages = table.getPageCount();
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <div
      className={cn(
        "flex items-center justify-between overflow-clip px-2",
        "@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4"
      )}
      style={{ overflowClipMargin: 1 }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex @2xl/content:hidden w-[100px] items-center justify-center font-medium text-sm">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex @max-2xl/content:flex-row-reverse items-center gap-2">
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={`${pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden font-medium text-sm sm:block">Rows per page</p>
        </div>
      </div>

      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex @max-3xl/content:hidden w-[100px] items-center justify-center font-medium text-sm">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="@max-md/content:hidden size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            variant="outline"
          >
            <span className="sr-only">Go to first page</span>
            <Icon className="h-4 w-4" icon="mdi:page-first" size={16} />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="outline"
          >
            <span className="sr-only">Go to previous page</span>
            <Icon className="h-4 w-4" icon="mdi:chevron-left" size={16} />
          </Button>

          {/* Page number buttons */}
          {pageNumbers.map((pageNumber, index) => {
            const isActive = currentPage === pageNumber;
            return (
              <div className="flex items-center" key={`${pageNumber}-${index}`}>
                {pageNumber === "..." ? (
                  <span className="px-1 text-muted-foreground text-sm">
                    ...
                  </span>
                ) : (
                  <Button
                    className="h-8 min-w-8 px-2"
                    onClick={() => {
                      const targetIndex = (pageNumber as number) - 1;
                      table.setPageIndex(targetIndex);
                    }}
                    variant={isActive ? "default" : "outline"}
                  >
                    <span className="sr-only">Go to page {pageNumber}</span>
                    {pageNumber}
                  </Button>
                )}
              </div>
            );
          })}

          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="outline"
          >
            <span className="sr-only">Go to next page</span>
            <Icon className="h-4 w-4" icon="mdi:chevron-right" size={16} />
          </Button>
          <Button
            className="@max-md/content:hidden size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            variant="outline"
          >
            <span className="sr-only">Go to last page</span>
            <Icon className="h-4 w-4" icon="mdi:page-last" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";

type DataTableColumnHeaderProps<TData, TValue> =
  React.HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortedState = column.getIsSorted() as false | "asc" | "desc";

  let sortIcon = (
    <Icon
      className="ms-2 h-4 w-4"
      icon="mdi:unfold-more-horizontal"
      size={16}
    />
  );

  if (sortedState === "desc") {
    sortIcon = (
      <Icon className="ms-2 h-4 w-4" icon="mdi:arrow-down" size={16} />
    );
  } else if (sortedState === "asc") {
    sortIcon = <Icon className="ms-2 h-4 w-4" icon="mdi:arrow-up" size={16} />;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ms-3 h-8 data-[state=open]:bg-accent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {sortIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icon
              className="size-3.5 text-muted-foreground/70"
              icon="mdi:arrow-up"
              size={14}
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icon
              className="size-3.5 text-muted-foreground/70"
              icon="mdi:arrow-down"
              size={14}
            />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <Icon
                  className="size-3.5 text-muted-foreground/70"
                  icon="mdi:eye-off-outline"
                  size={14}
                />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

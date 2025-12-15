import { cn } from "@/utils";
import { NavList } from "./nav-list";
import type { NavProps } from "./types";

export default function HorizontalMenu({
  data,
  className,
  ...props
}: NavProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-1 overflow-x-auto overflow-y-hidden",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
        "hover:scrollbar-thumb-muted-foreground/50",
        "max-w-full",
        className
      )}
      {...props}
    >
      <li className="flex items-center">
        <ul className="flex flex-row gap-1 whitespace-nowrap">
          {data.map((item, index) => (
            <NavList data={item} depth={1} key={item.label || index} />
          ))}
        </ul>
      </li>
    </nav>
  );
}

import { cn } from "@/utils";
import { NavGroup } from "./nav-group";
import type { NavProps } from "./types";

export default function HorizontalMenu({
  data,
  className,
  ...props
}: NavProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)} {...props}>
      {data.map((group, index) => (
        <NavGroup
          items={group.items}
          key={group.name || index}
          name={group.name}
        />
      ))}
    </nav>
  );
}

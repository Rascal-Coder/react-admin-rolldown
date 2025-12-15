import { NavList } from "./nav-list";
import type { NavGroupProps } from "./types";

export function NavGroup({ items }: NavGroupProps) {
  return (
    <li className="flex items-center">
      <ul className="flex flex-row gap-1">
        {items.map((item, index) => (
          <NavList data={item} depth={1} key={item.label || index} />
        ))}
      </ul>
    </li>
  );
}

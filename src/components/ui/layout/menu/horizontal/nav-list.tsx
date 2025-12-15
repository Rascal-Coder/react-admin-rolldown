import { useLocation } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/base/hover-card";
import { NavItem } from "./nav-item";
import type { NavListProps } from "./types";

export function NavList({ data, depth = 0 }: NavListProps) {
  const hasChild = data.children && data.children.length > 0;
  const location = useLocation();
  const isActive = location.pathname.includes(data.id);

  const renderNavItem = () => (
    <NavItem
      active={isActive}
      badgeText={data.badgeText}
      badgeType={data.badgeType}
      badgeVariant={data.badgeVariant}
      depth={depth}
      hasChild={hasChild}
      icon={data.icon}
      id={data.id}
      key={data.label}
      label={data.label}
    />
  );

  const renderRootItemWithHoverCard = () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>{renderNavItem()}</HoverCardTrigger>
      <HoverCardContent
        className="p-1"
        side={depth === 1 ? "bottom" : "right"}
        sideOffset={10}
      >
        {data.children?.map((child) => (
          <NavList data={child} depth={depth + 1} key={child.label} />
        ))}
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <li className="list-none">
      {hasChild ? renderRootItemWithHoverCard() : renderNavItem()}
    </li>
  );
}

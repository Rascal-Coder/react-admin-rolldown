import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/base/badge";
import DotBadge from "@/components/base/dot-badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/base/hover-card";
import Icon from "@/components/ui/icon/icon";
import { cn } from "@/utils";
import type { MenuItemData } from "./types";

const generateId = (id: string): string => `/${id.replace(/_/g, "-")}`;

// 渲染徽章
const renderBadge = (item: MenuItemData) => {
  if (item.badgeType === "text" && item.badgeText) {
    return (
      <span className="shrink-0">
        <Badge variant={item.badgeVariant || "default"}>{item.badgeText}</Badge>
      </span>
    );
  }
  if (item.badgeType === "normal") {
    return (
      <span className="shrink-0">
        <DotBadge variant={item.badgeVariant || "default"} />
      </span>
    );
  }
  return null;
};

// 渲染图标组件
const MenuItemIcon = ({
  icon,
  size = "sm",
  isSelected = false,
}: {
  icon?: string;
  size?: "sm" | "md";
  isSelected?: boolean;
}) => {
  if (!icon) {
    return null;
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <span
      className={cn(
        `${sizeClasses[size]} shrink-0 text-muted-foreground`,
        isSelected && size === "md" && "text-primary!"
      )}
    >
      {icon && <Icon icon={icon} size={16} />}
    </span>
  );
};

// 渲染标签组件
const MenuItemLabel = ({
  label,
  variant = "sub",
}: {
  label: string;
  variant?: "main" | "sub";
}) => {
  if (variant === "main") {
    return (
      <span className="w-full truncate text-center text-xs leading-tight">
        {label}
      </span>
    );
  }
  return <span className="flex-1 truncate">{label}</span>;
};

// 渲染菜单项内容（图标 + 标签 + 徽章）
const renderMenuItemContent = ({
  item,
  isSelected,
  variant = "sub",
  showChevron = false,
}: {
  item: MenuItemData;
  isSelected: boolean;
  variant?: "main" | "sub";
  showChevron?: boolean;
}) => {
  const iconSize = variant === "main" ? "md" : "sm";
  // 一级菜单不显示badge
  const showBadge = variant !== "main";

  return (
    <>
      <MenuItemIcon icon={item.icon} isSelected={isSelected} size={iconSize} />
      <MenuItemLabel label={item.label} variant={variant} />
      {showBadge && renderBadge(item)}
      {showChevron && <ChevronRight className="h-3 w-3" />}
    </>
  );
};

const handleSelectionChange = (
  onSelectionChange: (selectedIdsValue: string[]) => void,
  hasChildren: boolean,
  selectedIds: string[],
  pathIds: string[]
) => {
  if (hasChildren) {
    onSelectionChange?.(selectedIds || []);
    return;
  }
  if (!hasChildren) {
    onSelectionChange?.(pathIds);
  }
};
// 递归渲染子菜单项
const renderSubMenuItem = (params: {
  item: MenuItemData;
  selectedIds: string[];
  level: number;
  parentPath: MenuItemData[];
  onSelectionChange?: (selectedIds: string[]) => void;
  navigate: (to: string) => void;
}) => {
  const {
    item,
    selectedIds,
    level: _level,
    parentPath,
    onSelectionChange,
    navigate,
  } = params;
  // 构建当前节点的完整路径（包含当前节点）
  const subMenuPath = [...parentPath, item];
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isSelected = selectedIds.includes(item.id);
  const selectedClassName = "bg-accent text-accent-foreground";
  const baseClassName =
    "rounded-md text-sm transition-colors hover:bg-accent/80 hover:text-accent-foreground";

  const pathIds = subMenuPath.map((node: MenuItemData) => node.id);

  const handleNodeClick = () => {
    handleSelectionChange(
      onSelectionChange || (() => {}),
      hasChildren,
      selectedIds,
      pathIds
    );
    if (!hasChildren) {
      navigate(item.id);
    }
  };

  const content = renderMenuItemContent({
    item,
    isSelected,
    variant: "sub",
    showChevron: hasChildren,
  });

  // 如果有子菜单，使用 HoverCard
  if (hasChildren && item.children) {
    return (
      <HoverCard key={item.id} openDelay={100}>
        <HoverCardTrigger>
          <div className={cn(baseClassName, isSelected && selectedClassName)}>
            <button
              className="w-full flex-y-center cursor-pointer gap-2.5 px-2 py-1.5"
              onClick={handleNodeClick}
              type="button"
            >
              {content}
            </button>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-48 p-2" side="right">
          <div className="flex flex-col gap-1">
            {item.children.map((child) =>
              renderSubMenuItem({
                item: child,
                selectedIds,
                level: _level + 1,
                parentPath: subMenuPath,
                onSelectionChange,
                navigate,
              })
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  // 没有子菜单，直接渲染
  return (
    <div
      className={cn(baseClassName, isSelected && selectedClassName)}
      key={generateId(item.id)}
    >
      <button
        className="w-full flex-y-center cursor-pointer px-2 py-1.5"
        onClick={handleNodeClick}
        type="button"
      >
        {content}
      </button>
    </div>
  );
};

// 渲染主菜单项
const renderMainMenuItem = (
  item: MenuItemData,
  selectedIds: string[],
  onSelectionChange: ((selectedIdsValue: string[]) => void) | undefined,
  navigate: (to: string) => void
) => {
  const currentPath = [item];
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isSelected = selectedIds.includes(item.id);
  const level = 0;
  const selectedClassName = "bg-primary/10 text-primary! hover:bg-primary/20";
  const baseClassName =
    "rounded-md transition-colors hover:bg-accent/80 hover:text-accent-foreground";

  const pathIds = currentPath.map((node) => node.id);
  const handleNodeClick = () => {
    handleSelectionChange(
      onSelectionChange || (() => {}),
      hasChildren,
      selectedIds,
      pathIds
    );
    if (!hasChildren) {
      navigate(item.id);
    }
  };

  const content = renderMenuItemContent({
    item,
    isSelected,
    variant: "main",
  });

  // 如果有子菜单，使用 HoverCard
  if (hasChildren && item.children) {
    return (
      <li className="w-full list-none" key={item.id}>
        <HoverCard openDelay={100}>
          <HoverCardTrigger>
            <div className={cn(baseClassName, isSelected && selectedClassName)}>
              <button
                className="w-full flex-col-center cursor-pointer gap-2 px-2 py-2"
                onClick={handleNodeClick}
                type="button"
              >
                {content}
              </button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-48 p-2" side="right">
            <div className="flex flex-col gap-1">
              {item.children.map((child) =>
                renderSubMenuItem({
                  item: child,
                  selectedIds,
                  level: level + 1,
                  parentPath: currentPath,
                  onSelectionChange,
                  navigate,
                })
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </li>
    );
  }

  // 没有子菜单，直接渲染
  return (
    <li className="w-full list-none" key={item.id}>
      <div className={cn(baseClassName, isSelected && selectedClassName)}>
        <button
          className="w-full flex-col-center cursor-pointer gap-2 px-2 py-2"
          onClick={handleNodeClick}
          type="button"
        >
          {content}
        </button>
      </div>
    </li>
  );
};

const MiniTreeMenu = ({
  data,
  selectedIds,
  onSelectionChange,
}: {
  data: MenuItemData[];
  selectedIds: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col px-2 py-1">
      <ul className="flex flex-col items-center gap-1">
        {data.map((item) =>
          renderMainMenuItem(item, selectedIds, onSelectionChange, navigate)
        )}
      </ul>
    </nav>
  );
};

export default MiniTreeMenu;

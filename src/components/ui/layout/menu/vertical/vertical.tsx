import type { ReactNode } from "react";
import { Badge } from "@/components/base/badge";
import DotBadge from "@/components/base/dot-badge";
import TreeExpander from "@/components/base/tree/tree-expander";
import TreeIcon from "@/components/base/tree/tree-icon";
import TreeLabel from "@/components/base/tree/tree-label";
import TreeNode from "@/components/base/tree/tree-node";
import TreeNodeContent from "@/components/base/tree/tree-node-content";
import TreeNodeTrigger from "@/components/base/tree/tree-node-trigger";
import TreeProvider from "@/components/base/tree/tree-provider";
import TreeView from "@/components/base/tree/tree-view";
import type { TreeProviderProps } from "@/components/base/tree/types";
import Icon from "@/components/ui/icon/icon";
import { useRouterNavigation } from "@/hooks/use-router";
import { cn } from "@/utils";
import type { MenuItemData } from "./types";

const VerticalTreeMenu = ({
  data,
  selectedIds,
  defaultExpandedIds,
  onSelectionChange,
  ...props
}: Omit<TreeProviderProps, "children"> & {
  data: MenuItemData[];
}) => {
  const navigate = useRouterNavigation();

  // 递归渲染树节点
  const renderTreeNode = (
    item: MenuItemData,
    level = 0,
    isLast = false,
    parentPath: MenuItemData[] = []
  ): ReactNode => {
    // 构建当前节点的完整路径（包含当前节点）
    const currentPath = [...parentPath, item];

    const hasChildren = Boolean(item.children && item.children.length > 0);

    const handleNodeClick = () => {
      // 只有叶子节点才触发选中和导航
      // 父节点的展开/收起由 TreeNodeTrigger 的 toggleExpanded 自动处理
      if (!hasChildren) {
        // 选中整个路径（包括所有父节点和当前叶子节点）
        const pathIds = currentPath.map((node) => node.id);
        onSelectionChange?.(pathIds);
        navigate.push(item.id);
      }
    };

    // 渲染徽章
    const renderBadge = () => {
      if (item.badgeType === "text" && item.badgeText) {
        return (
          <Badge variant={item.badgeVariant || "default"}>
            {item.badgeText}
          </Badge>
        );
      }
      if (item.badgeType === "normal") {
        return <DotBadge variant={item.badgeVariant || "default"} />;
      }
      return null;
    };

    return (
      <TreeNode isLast={isLast} key={item.id} level={level} nodeId={item.id}>
        <TreeNodeTrigger onClick={handleNodeClick}>
          <TreeIcon
            className={cn(
              selectedIds?.includes(item.id) && level === 0 && "text-primary!"
            )}
            hasChildren={hasChildren}
            icon={item.icon && <Icon icon={item.icon} size={16} />}
          />
          <TreeLabel title={item.label}>{item.label}</TreeLabel>
          {renderBadge()}
          {hasChildren && <TreeExpander hasChildren />}
        </TreeNodeTrigger>
        {hasChildren && item.children && (
          <TreeNodeContent hasChildren>
            {item.children.map((child, index) => {
              const isLastChild = index === (item.children?.length ?? 0) - 1;
              return renderTreeNode(child, level + 1, isLastChild, currentPath);
            })}
          </TreeNodeContent>
        )}
      </TreeNode>
    );
  };

  return (
    <TreeProvider
      className="overflow-x-hidden"
      defaultExpandedIds={defaultExpandedIds}
      onSelectionChange={onSelectionChange}
      selectable={false}
      selectedIds={selectedIds}
      {...props}
    >
      <TreeView>
        {data.map((item, index) => {
          const isLast = index === data.length - 1;
          return renderTreeNode(item, 0, isLast);
        })}
      </TreeView>
    </TreeProvider>
  );
};

export default VerticalTreeMenu;

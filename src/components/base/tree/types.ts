import type { motion } from "motion/react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";

type TreeContextType = {
  expandedIds: Set<string>;
  selectedIds: string[];
  toggleExpanded: (nodeId: string) => void;
  handleSelection: (nodeId: string, ctrlKey: boolean) => void;
  showLines?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  indent?: number;
  animateExpand?: boolean;
};
type TreeNodeContextType = {
  nodeId: string;
  level: number;
  isLast: boolean;
  parentPath: boolean[];
};

type TreeProviderProps = {
  children: ReactNode;
  defaultExpandedIds?: string[];
  showLines?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  indent?: number;
  animateExpand?: boolean;
  className?: string;
};

type TreeViewProps = HTMLAttributes<HTMLDivElement>;

type TreeNodeProps = HTMLAttributes<HTMLDivElement> & {
  nodeId?: string;
  level?: number;
  isLast?: boolean;
  parentPath?: boolean[];
  children?: ReactNode;
};

type TreeNodeTriggerProps = ComponentProps<typeof motion.div>;

type TreeLabelProps = HTMLAttributes<HTMLSpanElement>;

type TreeIconProps = ComponentProps<typeof motion.div> & {
  icon?: ReactNode;
  hasChildren?: boolean;
};

type TreeNodeContentProps = ComponentProps<typeof motion.div> & {
  hasChildren?: boolean;
};

type TreeExpanderProps = ComponentProps<typeof motion.div> & {
  hasChildren?: boolean;
};

interface TreeNodeData {
  label: string;
  icon?: ReactNode;
  id: string | number;
  children?: TreeNodeData[];
}
interface TreeProps extends Omit<TreeProviderProps, "children"> {
  data: TreeNodeData[];
}
export type {
  TreeProps,
  TreeNodeData,
  TreeExpanderProps,
  TreeNodeContentProps,
  TreeLabelProps,
  TreeIconProps,
  TreeContextType,
  TreeNodeContextType,
  TreeProviderProps,
  TreeViewProps,
  TreeNodeProps,
  TreeNodeTriggerProps,
};

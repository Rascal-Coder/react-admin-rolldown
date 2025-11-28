import { motion } from "motion/react";
import { type ReactNode, useMemo } from "react";
import { cn } from "@/utils";
import { useTree, useTreeNode } from "./context";
import TreeLines from "./tree-lines";
import type { TreeNodeTriggerProps } from "./types";

const TreeNodeTrigger = ({
  children,
  className,
  onClick,
  ...props
}: TreeNodeTriggerProps) => {
  const { selectedIds, toggleExpanded, handleSelection, indent } = useTree();
  const { nodeId, level } = useTreeNode();

  const isSelected = selectedIds.includes(nodeId);
  const indentValue = level * (indent ?? 0);
  const selectedStyle = useMemo(() => {
    if (!isSelected) {
      return "";
    }

    if (level === 0) {
      return "bg-primary/hover text-primary hover:bg-primary/focus!";
    }

    return "bg-accent/50";
  }, [level, isSelected]);
  return (
    <motion.div
      className={cn(
        "group relative mx-1 mb-0.5 flex cursor-pointer items-center rounded-md px-3 py-2 transition-all duration-200 hover:bg-accent/80",
        selectedStyle,
        className
      )}
      onClick={(e) => {
        toggleExpanded(nodeId);
        handleSelection(nodeId, e.ctrlKey || e.metaKey);
        onClick?.(e);
      }}
      style={{
        paddingLeft: indentValue + 8,
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      {...props}
    >
      <TreeLines />
      {children as ReactNode}
    </motion.div>
  );
};

export default TreeNodeTrigger;

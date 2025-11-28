import { cn } from "@/utils";
import type { TreeViewProps } from "./types";

const TreeView = ({ className, children, ...props }: TreeViewProps) => (
  <div className={cn("p-2", className)} {...props}>
    {children}
  </div>
);

export default TreeView;

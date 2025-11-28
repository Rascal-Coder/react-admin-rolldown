import { cn } from "@/utils";
import type { TreeLabelProps } from "./types";

const TreeLabel = ({ className, title, ...props }: TreeLabelProps) => (
  <span className={cn("flex-1 truncate", className)} title={title} {...props} />
);

export default TreeLabel;

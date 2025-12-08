import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/utils";

interface AnimatedBreadcrumbItemProps
  extends Omit<HTMLMotionProps<"li">, "children"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedBreadcrumbItem({
  children,
  className = "inline-flex items-center gap-1.5",
  animate = { opacity: 1, scale: 1, y: 0 },
  exit = { opacity: 0, scale: 0.9, y: -10 },
  initial = { opacity: 0, scale: 0.9, y: 10 },
  transition = {
    duration: 0.25,
    ease: [0.4, 0, 0.2, 1],
  },
  ...props
}: AnimatedBreadcrumbItemProps) {
  return (
    <motion.li
      animate={animate}
      className={cn(className)}
      data-slot="breadcrumb-item"
      exit={exit}
      initial={initial}
      transition={transition}
      {...props}
    >
      {children}
    </motion.li>
  );
}

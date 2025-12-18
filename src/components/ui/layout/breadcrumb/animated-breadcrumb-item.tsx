import type { HTMLMotionProps } from "motion/react";
import { m } from "motion/react";
import { cn } from "@/utils";

interface AnimatedBreadcrumbItemProps extends HTMLMotionProps<"li"> {}

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
    <m.li
      animate={animate}
      className={cn(className)}
      data-slot="breadcrumb-item"
      exit={exit}
      initial={initial}
      transition={transition}
      {...props}
    >
      {children}
    </m.li>
  );
}

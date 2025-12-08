import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedBreadcrumbItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedBreadcrumbItem({
  children,
  className = "inline-flex items-center gap-1.5",
}: AnimatedBreadcrumbItemProps) {
  return (
    <motion.li
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={className}
      data-slot="breadcrumb-item"
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.li>
  );
}

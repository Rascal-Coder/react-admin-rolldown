import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import { BreadcrumbList } from "@/components/base/breadcrumb";

interface AnimatedBreadcrumbListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedBreadcrumbList({
  children,
  className,
}: AnimatedBreadcrumbListProps) {
  return (
    <BreadcrumbList className={className}>
      <AnimatePresence initial={false} mode="popLayout">
        {children}
      </AnimatePresence>
    </BreadcrumbList>
  );
}

import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";
import type { BreadcrumbItem } from "./types";
export function ParallelogramBreadcrumb({ list }: { list: BreadcrumbItem[] }) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden sm:gap-0">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((item, index) => (
            <motion.li
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="inline-flex items-center gap-1.5"
              data-slot="breadcrumb-item"
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              key={item.href}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {index === list.length - 1 ? (
                <BreadcrumbPage className="parallelogram-breadcrumb inline-flex items-center gap-0.5 bg-muted px-4 text-sm leading-[2.15] transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60">
                  <span className="flex-y-center gap-1.5 truncate">
                    {item.icon}
                    {item.label}
                  </span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className="parallelogram-breadcrumb mr-[-6px] inline-flex items-center gap-0.5 bg-muted px-4 text-sm leading-[2.15] transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60"
                >
                  <Link
                    className="flex-y-center gap-1.5 truncate"
                    to={item.href}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </BreadcrumbList>
    </BreadcrumbBase>
  );
}

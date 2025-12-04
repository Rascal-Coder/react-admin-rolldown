import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";
import { cn } from "@/utils";
import type { BreadcrumbItem } from "./types";

export function RibbonBreadcrumb({ list }: { list: BreadcrumbItem[] }) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center overflow-hidden rounded-sm">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((item, index) => {
            if (list.length <= 1) {
              return (
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
                  <BreadcrumbPage className="inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60">
                    <span className="flex-y-center gap-1.5 truncate">
                      {item.icon}
                      {item.label}
                    </span>
                  </BreadcrumbPage>
                </motion.li>
              );
            }
            if (index === list.length - 1) {
              return (
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
                  <BreadcrumbPage className="ribbon-breadcrumb-last inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60">
                    <span className="flex-y-center gap-1.5 truncate">
                      {item.icon}
                      {item.label}
                    </span>
                  </BreadcrumbPage>
                </motion.li>
              );
            }
            return (
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
                <BreadcrumbLink
                  asChild
                  className={cn(
                    "ribbon-breadcrumb mr-[calc(-1*10px+-8px)] inline-flex items-center gap-0.5 bg-muted px-4 py-0.5 text-sm leading-[1.75] transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60",
                    {
                      "ribbon-breadcrumb-first": index === 0,
                    }
                  )}
                >
                  <Link
                    className="flex-y-center gap-1.5 truncate"
                    to={item.href}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </BreadcrumbList>
    </BreadcrumbBase>
  );
}

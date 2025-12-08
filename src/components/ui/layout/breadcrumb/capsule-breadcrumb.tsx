import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import {
  Breadcrumb as BreadcrumbBase,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/base/breadcrumb";
import Icon from "@/components/ui/icon/icon";
import type { BreadcrumbItem } from "./types";

export function CapsuleBreadcrumb({ list }: { list: BreadcrumbItem[] }) {
  return (
    <BreadcrumbBase className="p-1">
      <BreadcrumbList className="w-max flex-y-center gap-0 overflow-hidden rounded-full border border-[currentColor] bg-[currentColor] text-border sm:gap-0">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((item, index) => (
            <motion.li
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="group inline-flex items-center gap-1.5 text-muted-foreground"
              data-slot="breadcrumb-item"
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              key={item.href}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {list.length >= 1 && index === list.length - 1 && (
                <BreadcrumbPage className="capsule-breadcrumb inline-flex items-center gap-0.5 bg-mutd px-4 pl-5 text-sm leading-loose transition-all duration-300 hover:bg-accent dark:hover:bg-accent-foreground/60">
                  <span className="flex-y-center gap-1.5 truncate">
                    {item.icon && <Icon icon={item.icon} size={16} />}
                    {item.label}
                  </span>
                </BreadcrumbPage>
              )}
              {list.length >= 1 && index !== list.length - 1 && (
                <BreadcrumbLink
                  asChild
                  className="group-not-first:capsule-breadcrumb mr-[-0.52lh] inline-flex items-center gap-0.5 rounded-r-full bg-muted px-4 pl-5 text-sm leading-loose transition-all duration-300 hover:bg-accent group-first:rounded-full group-not-first:pl-8 dark:hover:bg-accent-foreground/60"
                >
                  <Link
                    className="flex-y-center gap-1.5 truncate"
                    to={item.href}
                  >
                    {item.icon && <Icon icon={item.icon} size={16} />}
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

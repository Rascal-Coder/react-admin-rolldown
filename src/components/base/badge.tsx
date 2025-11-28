import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/index";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/20 text-primary-dark focus-visible:ring-primary/20 dark:text-primary-light dark:focus-visible:ring-primary/40 [a&]:hover:bg-primary/10",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        info: "border-transparent bg-info/20 text-info-dark focus-visible:ring-info/20 dark:text-info-light dark:focus-visible:ring-info/40 [a&]:hover:bg-info/10",
        warning:
          "border-transparent bg-warning/20 text-warning-dark focus-visible:ring-warning/20 dark:text-warning-light dark:focus-visible:ring-warning/40 [a&]:hover:bg-warning/10",
        success:
          "border-transparent bg-success/20 text-success-dark focus-visible:ring-success/20 dark:text-success-light dark:focus-visible:ring-success/40 [a&]:hover:bg-success/10",
        error:
          "border-transparent bg-error/20 text-error-dark focus-visible:ring-error/20 dark:text-error-light dark:focus-visible:ring-error/40 [a&]:hover:bg-error/10",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      shape: {
        circle: "h-5 w-5 rounded-full p-0",
        square: "rounded-md",
        dot: "h-2 w-2 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "square",
    },
  }
);

function Badge({
  className,
  variant,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  const computedClassName = React.useMemo(
    () => cn(badgeVariants({ variant, shape }), className),
    [variant, shape, className]
  );
  return <Comp className={computedClassName} data-slot="badge" {...props} />;
}

export { Badge, badgeVariants };

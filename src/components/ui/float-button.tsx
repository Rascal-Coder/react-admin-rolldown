import { Settings } from "lucide-react";
import { type HTMLMotionProps, m } from "motion/react";
import type { ReactNode, Ref } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/tooltip";
import { cn } from "@/utils";

interface FloatSettingsButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  icon?: ReactNode;
  tooltip?: string;
  ref?: Ref<HTMLButtonElement>;
}

export default function FloatSettingsButton({
  className,
  icon,
  tooltip,
  // tooltipTriggerMode = "always",
  ref,
  ...props
}: FloatSettingsButtonProps) {
  // const [isOpen, setIsOpen] = useState(false);

  const Button = (
    <m.button
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "fixed bottom-8 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      ref={ref}
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {icon || <Settings className="size-6" />}
    </m.button>
  );

  if (tooltip) {
    // if (tooltipTriggerMode === "hover") {
    //   return (
    //     <Tooltip
    //       onOpenChange={(open) => {
    //         if (!open) {
    //           setIsOpen(false);
    //         }
    //       }}
    //       open={isOpen}
    //     >
    //       <TooltipTrigger
    //         asChild
    //         onMouseEnter={() => setIsOpen(true)}
    //         onMouseLeave={() => setIsOpen(false)}
    //       >
    //         {Button}
    //       </TooltipTrigger>
    //       <TooltipContent side="left">{tooltip}</TooltipContent>
    //     </Tooltip>
    //   );
    // }
    return (
      <Tooltip>
        <TooltipTrigger asChild>{Button}</TooltipTrigger>
        <TooltipContent side="left">{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return Button;
}

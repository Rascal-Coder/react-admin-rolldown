import { cn } from "@/utils";
import type { BadgeProps } from "./types";

export default function DotBadge({
  variant = "default",
}: {
  variant?: BadgeProps["variant"];
}) {
  const getVariantClasses = (_variant: BadgeProps["variant"]) => {
    switch (_variant) {
      case "default":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  const baseClasses = "dot-badge";
  const variantClasses = getVariantClasses(variant);

  return (
    <div className="inline-grid *:[grid-area:1/1]">
      <div
        className={cn(baseClasses, variantClasses, "animate-ping opacity-75")}
      />
      <div className={cn(baseClasses, variantClasses)} />
    </div>
  );
}

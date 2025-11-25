import { Icon as IconifyIcon } from "@iconify/react";
import { cn } from "@/utils";
import type { IconProps } from "./types";

export default function Icon({
  icon,
  size = "1em",
  color = "currentColor",
  className = "",
  style = {},
  ...props
}: IconProps) {
  // Handle URL SVG
  if (icon.startsWith("url:")) {
    const url = icon.replace("url:", "");
    return (
      <img
        alt="icon"
        className={cn("inline-block", className)}
        height={size}
        src={url}
        style={{
          width: size,
          height: size,
          color,
          ...style,
        }}
        width={size}
      />
    );
  }

  // Handle local and third-party icon libraries
  return (
    <IconifyIcon
      className={cn("inline-block", className)}
      height={size}
      icon={icon}
      style={{
        color,
        height: size,
        width: size,
        ...style,
      }}
      width={size}
      {...props}
    />
  );
}

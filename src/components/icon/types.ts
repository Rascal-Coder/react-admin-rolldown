import type { IconProps as IconifyIconProps } from "@iconify/react";
import type { CSSProperties } from "react";

interface IconProps extends IconifyIconProps {
  /**
   * Icon name or path
   * - Local SVG: local:icon-name
   * - URL SVG: url:https://example.com/icon.svg
   * - Third-party icon library: iconify-icon-name
   */
  icon: string;
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}
interface IconifyIcon {
  body: string;
  width: number;
  height: number;
}

interface ParsedSVG {
  body: string;
  attribs?: {
    width?: string;
    height?: string;
    viewBox?: string;
  };
}

export type { IconProps, IconifyIcon, ParsedSVG };

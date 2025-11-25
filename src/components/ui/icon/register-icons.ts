import { addCollection } from "@iconify/react";
import { parseSVGContent } from "@iconify/utils/lib/svg/parse";
import type { IconifyIcon, ParsedSVG } from "./types";

// Cache for icon collection
let iconCollection: Record<string, IconifyIcon> | null = null;

/**
 * 从 viewBox 或属性中提取 SVG 尺寸
 * @param parsedSVG - 解析后的 SVG 内容
 * @returns 宽度和高度的对象
 * @example
 * const dimensions = extractDimensions(parsedSVG);
 * console.log(dimensions.width);
 * console.log(dimensions.height);
 */
function extractDimensions(parsedSVG: ParsedSVG): {
  width: number;
  height: number;
} {
  const DEFAULT_SIZE = 24;
  let width = DEFAULT_SIZE;
  let height = DEFAULT_SIZE;

  if (parsedSVG.attribs?.viewBox) {
    const viewBox = parsedSVG.attribs.viewBox.split(" ");
    if (viewBox.length === 4) {
      width = Number.parseInt(viewBox[2], 10);
      height = Number.parseInt(viewBox[3], 10);
    }
  }

  return { width, height };
}

/**
 * 处理单个 SVG 文件并返回图标名称和数据
 * @param path - SVG 文件路径
 * @param svgContent - SVG 文件内容
 * @returns 图标名称和数据
 * @example
 * const result = processSVGIcon("src/assets/icons/icon-name.svg", svgContent);
 * if (result) {
 *   console.log(result.name);
 *   console.log(result.icon);
 * }
 */
function processSVGIcon(
  path: string,
  svgContent: string
): { name: string; icon: IconifyIcon } | null {
  try {
    const iconName = path.split("/").pop()?.replace(".svg", "");
    if (!iconName) {
      return null;
    }

    // 解析 SVG 内容
    const parsedSVG = parseSVGContent(svgContent) as ParsedSVG;
    if (!parsedSVG) {
      console.warn(`Failed to parse SVG: ${iconName}`);
      return null;
    }
    if (!parsedSVG.body) {
      console.warn(`Failed to get SVG body for ${iconName}`);
      return null;
    }

    // 提取尺寸
    const { width, height } = extractDimensions(parsedSVG);

    return {
      name: iconName,
      icon: {
        body: parsedSVG.body,
        width,
        height,
      },
    };
  } catch (error) {
    console.error("Error processing SVG:", error);
    return null;
  }
}

/**
 * Auto import all SVG files to Iconify local collection
 *
 * @example
 * ├── src
 * │   ├── assets
 * │   │   └── icons
 * │   │       └── icon-name.svg
 *
 * @usage
 * import { Icon } from "@/components/icon/icon";
 * <Icon icon="local:icon-name" />
 */

export default function registerLocalIcons() {
  // 如果图标已注册，提前返回
  if (iconCollection) {
    return;
  }

  const svgModules = import.meta.glob("@/assets/icons/*.svg", {
    query: "?raw",
    eager: true,
    import: "default",
  });

  const icons: Record<string, IconifyIcon> = {};

  for (const [path, svgContent] of Object.entries(svgModules)) {
    const result = processSVGIcon(path, svgContent as string);
    if (result) {
      icons[result.name] = result.icon;
    }
  }

  // 缓存图标集合
  iconCollection = icons;

  // 一次性添加整个集合
  const result = addCollection({
    prefix: "local",
    icons,
    width: 24,
    height: 24,
  });

  if (!result) {
    console.warn("Failed to add icon collection");
  }
}

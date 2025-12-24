import type { RouteConfig } from "@/lib/router-toolset/types";

/**
 * 动态路由配置（前端路由模式）
 * 包含业务功能路由，这些路由可以根据用户权限、角色等运行时信息动态加载
 * 通过 import.meta.glob 自动加载 modules 目录下的所有路由模块
 */

// 动态加载所有路由模块文件
const dynamicRouteFiles = import.meta.glob("./modules/**/*.tsx", {
  eager: true,
});

/**
 * 从模块中提取路由配置
 * 每个模块文件应导出一个 RouteConfig[] 数组（支持 default 导出或命名导出）
 */
export const dynamicRoutes: RouteConfig[] = Object.values(dynamicRouteFiles)
  .flatMap((module: any) => module.default)
  .filter(Boolean);

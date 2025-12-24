import type { RouteConfig } from "@/lib/router-toolset/types";
import { createLazyComponent } from "../../utils";

/**
 * 多级菜单模块路由配置
 */
const menuLevelRoutes: RouteConfig[] = [
  {
    path: "menu_level",
    lazy: createLazyComponent("/pages/menu-level"),
    name: "多级菜单",
    icon: "lucide:layers",
    children: [
      { redirect: "1a" },
      {
        path: "1a",
        lazy: createLazyComponent("/pages/menu-level/menu-level-1a"),
        name: "多级菜单1a",
        icon: "lucide:menu",
      },
      {
        path: "1b",
        lazy: createLazyComponent("/pages/menu-level/menu-level-1b"),
        name: "多级菜单1b",
        icon: "lucide:menu",
        children: [
          {
            redirect: "2a",
          },
          {
            path: "2a",
            lazy: createLazyComponent(
              "/pages/menu-level/menu-level-1b/menu-level-1b-2a"
            ),
            name: "多级菜单2a",
            icon: "lucide:file-text",
          },
          {
            path: "2b",
            lazy: createLazyComponent(
              "/pages/menu-level/menu-level-1b/menu-level-1b-2b"
            ),
            name: "多级菜单2b",
            icon: "lucide:menu",
            children: [
              {
                redirect: "3a",
              },
              {
                path: "3a",
                lazy: createLazyComponent(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a"
                ),
                name: "多级菜单3a",
                icon: "lucide:file-text",
              },
              {
                path: "3b",
                lazy: createLazyComponent(
                  "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b"
                ),
                name: "多级菜单3b",
                icon: "lucide:file-text",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default menuLevelRoutes;

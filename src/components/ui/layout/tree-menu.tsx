import {
  BarChart3,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  Menu,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { useSidebar } from "./resizable-sidebar";
import MiniTreeMenu from "./tree-menu/mini";
import type { MenuItemData } from "./tree-menu/types";
import VerticalTreeMenu from "./tree-menu/vertical";

const TreeMenu = () => {
  const { state } = useSidebar();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "dashboard",
    "workbench",
  ]);
  const data: MenuItemData[] = [
    {
      label: "仪表盘",
      icon: <LayoutDashboard className="h-4 w-4" />,
      id: "dashboard",
      children: [
        {
          label: "工作台",
          icon: <Workflow className="h-4 w-4" />,
          id: "workbench",
        },
        {
          label: "分析",
          icon: <BarChart3 className="h-4 w-4" />,
          id: "analysis",
        },
      ],
    },
    {
      label: "多级菜单",
      icon: <Layers className="h-4 w-4" />,
      id: "menu_level",
      children: [
        {
          label: "多级菜单1a",
          icon: <Menu className="h-4 w-4" />,
          id: "menu_level_1a",
        },
        {
          label: "多级菜单1b",
          icon: <Menu className="h-4 w-4" />,
          id: "menu_level_1b",
          children: [
            {
              label: "多级菜单2a",
              icon: <FileText className="h-4 w-4" />,
              id: "menu_level_1b_2a",
            },
            {
              label: "多级菜单2b",
              icon: <Menu className="h-4 w-4" />,
              id: "menu_level_1b_2b",
              children: [
                {
                  label: "多级菜单3a",
                  icon: <FileText className="h-4 w-4" />,
                  id: "menu_level_1b_2b_3a",
                },
                {
                  label: "多级菜单3b",
                  icon: <FileText className="h-4 w-4" />,
                  id: "menu_level_1b_2b_3b",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "一级菜单",
      icon: <Home className="h-4 w-4" />,
      id: "first_level",
    },
    {
      label: "测试徽章1111111",
      icon: <Sparkles className="h-4 w-4" />,
      id: "test_badge",
      badgeType: "text",
      badgeText: "new",
      badgeVariant: "info",
      children: [
        {
          label: "测试徽章2222222",
          icon: <Sparkles className="h-4 w-4" />,
          id: "test_badge_1",
          badgeType: "normal",
          badgeVariant: "success",
        },
      ],
    },
  ];
  return (
    <div>
      {state === "expanded" ? (
        <VerticalTreeMenu
          data={data}
          defaultExpandedIds={["dashboard", "workbench"]}
          onSelectionChange={setSelectedIds}
          selectedIds={selectedIds}
        />
      ) : (
        <MiniTreeMenu
          data={data}
          onSelectionChange={setSelectedIds}
          selectedIds={selectedIds}
        />
      )}
    </div>
  );
};

export default TreeMenu;

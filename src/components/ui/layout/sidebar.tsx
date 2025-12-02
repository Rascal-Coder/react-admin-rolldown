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
import type * as React from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/layout/resizable-sidebar";
import { Logo } from "./logo";
import { NavUser } from "./nav-user";
import TreeMenu from "./tree-menu";
import type { MenuItemData } from "./tree-menu/types";
export type SidebarProps = React.ComponentProps<typeof BaseSidebar> & {
  logo?: string;
};
export function Sidebar({ ...props }: SidebarProps) {
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
    <BaseSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo onClick={() => {}} />
      </SidebarHeader>
      <SidebarContent>
        <TreeMenu data={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Bug",
            email: "bug@bug.com",
            avatar,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </BaseSidebar>
  );
}

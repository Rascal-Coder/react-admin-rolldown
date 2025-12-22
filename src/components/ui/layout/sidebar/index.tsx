import type * as React from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/layout/resizable-sidebar";
import { useMenuData } from "@/store/menu-store";
import { Logo } from "../logo";
import Nav from "../menu/vertical";
import { NavUser } from "../nav-user";

export type SidebarProps = React.ComponentProps<typeof BaseSidebar> & {
  logo?: string;
};

export function Sidebar({ ...props }: SidebarProps) {
  // const { collapsibleType } = useAppSettings();
  // 从全局菜单 store 中读取完整菜单数据（Source: 菜单全局状态）
  const menuData = useMenuData();

  // 如果还没有初始化菜单数据，这里可以简单返回 null 或占位内容
  if (!menuData) {
    return null;
  }

  return (
    <BaseSidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <Nav data={menuData.menuItems} />
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
      {props.collapsible === "icon" && <SidebarRail />}
    </BaseSidebar>
  );
}

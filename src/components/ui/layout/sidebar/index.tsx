import type * as React from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/layout/resizable-sidebar";
import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { Logo } from "../logo";
import { NavUser } from "../nav-user";
import TreeMenu from "../tree-menu";
import { generateMenuItems } from "./utils";
export type SidebarProps = React.ComponentProps<typeof BaseSidebar> & {
  logo?: string;
};
export function Sidebar({ ...props }: SidebarProps) {
  const { routes: routerRoutes } = useRouter(routes);
  const { menuItems } = generateMenuItems(routerRoutes);
  return (
    <BaseSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo onClick={() => {}} />
      </SidebarHeader>
      <SidebarContent>
        <TreeMenu data={menuItems} />
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

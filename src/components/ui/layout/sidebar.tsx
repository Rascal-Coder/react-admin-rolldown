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
export type SidebarProps = React.ComponentProps<typeof BaseSidebar> & {
  logo?: string;
};
export function Sidebar({ ...props }: SidebarProps) {
  return (
    <BaseSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo onClick={() => {}} />
      </SidebarHeader>
      <SidebarContent>
        <TreeMenu />
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

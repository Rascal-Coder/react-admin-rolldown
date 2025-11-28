import type * as React from "react";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/layout/resizable-sidebar";
import { Logo } from "./logo";
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
      <SidebarFooter>footer</SidebarFooter>
      <SidebarRail />
    </BaseSidebar>
  );
}

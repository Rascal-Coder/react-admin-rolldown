import { Outlet } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

const MenuLevel1bLayout = () => (
  <Card className="border-white/40 bg-[#6f5be7] text-white shadow-md">
    <CardHeader className="gap-1">
      <CardTitle className="text-white">多级菜单1b</CardTitle>
      <CardDescription className="text-white/80">
        /menu_level/1b
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <Outlet />
    </CardContent>
  </Card>
);

export default MenuLevel1bLayout;

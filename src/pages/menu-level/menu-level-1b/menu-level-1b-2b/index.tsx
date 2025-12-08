import { Outlet } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

const MenuLevel1b2bLayout = () => (
  <Card className="border-white/60 bg-[#f9c979] text-[#2d1900] shadow-md">
    <CardHeader className="gap-1">
      <CardTitle className="text-[#2d1900]">多级菜单2b</CardTitle>
      <CardDescription className="text-[#2d1900]/80">
        /menu_level/1b/2b
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <Outlet />
    </CardContent>
  </Card>
);

export default MenuLevel1b2bLayout;

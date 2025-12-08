import { Outlet } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

const MenuLevelLayout = () => (
  <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-950 via-purple-950 to-indigo-900 text-white shadow-lg">
    <CardHeader className="gap-1">
      <CardTitle className="text-white">多级菜单</CardTitle>
      <CardDescription className="text-indigo-200/90">
        /menu_level
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <Outlet />
    </CardContent>
  </Card>
);

export default MenuLevelLayout;

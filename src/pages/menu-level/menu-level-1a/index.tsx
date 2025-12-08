import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

const MenuLevel1a = () => (
  <Card className="border-white/30 bg-[#016795] text-white shadow-md">
    <CardHeader className="gap-1">
      <CardTitle className="text-white">多级菜单1a</CardTitle>
      <CardDescription className="text-white/80">
        /menu_level/1a
      </CardDescription>
    </CardHeader>
  </Card>
);

export default MenuLevel1a;

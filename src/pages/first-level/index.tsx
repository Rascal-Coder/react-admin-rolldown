import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

export default function FirstLevel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>一级菜单页面</CardTitle>
        <CardDescription>简单一级菜单示例</CardDescription>
      </CardHeader>
      <CardContent>
        <div>我是空的一级菜单</div>
      </CardContent>
    </Card>
  );
}

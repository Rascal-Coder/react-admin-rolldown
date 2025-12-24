import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Text } from "@/components/base/typography";
import { useRouterNavigation } from "@/hooks/use-router";

export default function UserList() {
  const navigate = useRouterNavigation();

  const users = [
    { id: "1", name: "张三" },
    { id: "2", name: "李四" },
    { id: "3", name: "王五" },
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <div
                className="flex items-center justify-between rounded-md border border-border p-3"
                key={user.id}
              >
                <Text color="default" variant="body1">
                  {user.name}
                </Text>
                <Button
                  onClick={() => {
                    const pathname = `/user/${user.id}`;
                    navigate.push(pathname, {
                      state: {
                        title: `用户详情 - ${user.name}`,
                        username: user.name,
                      },
                    });
                  }}
                >
                  查看详情
                </Button>
              </div>
            ))}
          </div>
          <Text color="secondary" variant="caption">
            点击"查看详情"按钮可以跳转到动态路由页面，URL 参数会传递用户 ID。
            页面标题可以在详情页组件中通过 React Helmet 动态设置。
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}

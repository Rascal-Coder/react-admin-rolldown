import { useNavigate } from "react-router";
import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

export default function UserList() {
  const navigate = useNavigate();

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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              >
                <span>{user.name}</span>
                <Button onClick={() => navigate(`/user/${user.id}`)}>
                  查看详情
                </Button>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "16px", color: "#666", fontSize: "14px" }}>
            点击"查看详情"按钮可以跳转到动态路由页面，URL 参数会传递用户 ID。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

export default function UserDetail() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>用户详情页（动态路由示例）</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>
              <strong>路由参数 ID:</strong> {params.id}
            </p>
            <p>
              <strong>完整路径:</strong> /user/{params.id}
            </p>
            <p style={{ marginTop: "16px", color: "#666" }}>
              这是一个动态路由示例，路径为 <code>/user/:id</code>，可以通过 URL
              参数传递用户 ID。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

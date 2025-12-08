import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Text } from "@/components/base/typography";

export default function UserDetail() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>用户详情页（动态路由示例）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Text color="default" variant="body1">
              <Text color="default" variant="subTitle1">
                路由参数 ID:
              </Text>{" "}
              {params.id}
            </Text>
            <Text color="default" variant="body1">
              <Text color="default" variant="subTitle1">
                完整路径:
              </Text>{" "}
              /user/{params.id}
            </Text>
            <Text color="secondary" variant="caption">
              这是一个动态路由示例，路径为{" "}
              <Text color="default" variant="code">
                /user/:id
              </Text>
              ，可以通过 URL 参数传递用户 ID。
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

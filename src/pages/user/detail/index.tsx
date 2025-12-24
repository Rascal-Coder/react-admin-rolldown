import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Text } from "@/components/base/typography";
import { useTabsActions } from "@/store/tabs-store";

export default function UserDetail() {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const { state } = location;
  const { updateTabs } = useTabsActions();

  // 动态更新 tab title
  useEffect(() => {
    if (!params.id) {
      return;
    }

    const pathname = location.pathname;

    // 如果已获取到用户名，使用用户名；否则使用用户 ID
    const newTitle = state?.title;

    updateTabs((draft) => {
      const tabIndex = draft.findIndex((tab) => tab.key === pathname);
      if (tabIndex !== -1) {
        draft[tabIndex].title = newTitle;
      }
    });
  }, [params.id, location.pathname, state, updateTabs]);

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
            {state?.username && (
              <Text color="default" variant="body1">
                <Text color="default" variant="subTitle1">
                  用户名称:
                </Text>{" "}
                {state.username}
              </Text>
            )}
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

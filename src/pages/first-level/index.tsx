import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { routes } from "@/routes";
import { Component } from "@/routes/utils";

/**
 * 获取随机字符串
 */
function getRandomString(options?: {
  prefix?: string;
  timestamp?: boolean;
  length?: number;
}) {
  const { prefix, timestamp, length = 6 } = options ?? {};
  const prefixChar = prefix ? `${prefix}_` : "";
  const timestampChar = timestamp ? `${Date.now()}_` : "";
  const stringChar = Math.random().toString(36).slice(-length);
  return `${prefixChar}${timestampChar}${stringChar}`;
}
export default function FirstLevel() {
  function genNewRoute() {
    const newPath = getRandomString();
    const newRoute = {
      path: newPath,
      name: `临时路由-${newPath}`,
      component: Component("/pages/temp"),
    };
    return newRoute;
  }
  function onClickAddTail() {
    routes.setSiblings((routesConfig) => {
      routesConfig.push(genNewRoute());
    });
  }

  function onClickAddHead() {
    routes.setSiblings((routesConfig) => {
      routesConfig.unshift(genNewRoute());
    });
  }

  function onClickAddMiddle(index: number) {
    routes.setSiblings((routesConfig) => {
      routesConfig.splice(index, 0, genNewRoute());
    });
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Button onClick={onClickAddTail}>新增尾部菜单</Button>
          <Button onClick={onClickAddHead}>新增头部菜单</Button>
          <Button onClick={() => onClickAddMiddle(2)}>新增中间菜单</Button>
        </CardContent>
      </Card>
    </div>
  );
}

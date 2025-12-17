import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/base/badge";
import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Switch } from "@/components/base/switch";
import { useCacheRoutes } from "@/store/cache-store";
import { useActiveTab } from "@/store/tabs-store";

export default function Alive() {
  // 表单管理
  const form = useForm({
    defaultValues: {
      input0: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    },
  });

  // 开关状态
  const [switchStates, setSwitchStates] = useState<
    Array<{ id: string; checked: boolean }>
  >([
    { id: "switch-1", checked: false },
    { id: "switch-2", checked: false },
    { id: "switch-3", checked: false },
  ]);

  // 计数器状态
  const [counter, setCounter] = useState(0);

  // 获取缓存和标签数据
  const cacheRoutes = useCacheRoutes();
  const activeTab = useActiveTab();

  // 处理开关变化
  const handleSwitchChange = (id: string, checked: boolean) => {
    const newStates = switchStates.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setSwitchStates(newStates);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      {/* 状态信息卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>页面缓存状态</CardTitle>
          <CardDescription>当前页面的缓存信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">缓存状态:</span>
              <Badge variant="success">已启用 KeepAlive</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">缓存路由数:</span>
              <Badge variant="default">{cacheRoutes.length} 个</Badge>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-muted/50 p-3">
            <p className="text-muted-foreground text-sm">
              当前激活标签: <span className="font-medium">{activeTab}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 使用说明卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>测试指南</CardTitle>
          <CardDescription>如何验证页面缓存功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">步骤 1:</span>{" "}
              在下方的各个测试区域输入内容或修改状态
            </p>
            <p>
              <span className="font-medium">步骤 2:</span>{" "}
              点击左侧菜单切换到其他页面（如"工作台"）
            </p>
            <p>
              <span className="font-medium">步骤 3:</span>{" "}
              再次返回本页面，查看所有输入的内容和状态是否保持不变
            </p>
            <p className="pt-2 text-muted-foreground">
              ✨ 如果数据完整保留，说明 KeepAlive 缓存功能正常工作！
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 文本输入测试卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>文本输入测试</CardTitle>
          <CardDescription>测试文本内容是否在页面切换后保持</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <FormField
                  control={form.control}
                  key={`input${index}`}
                  name={
                    `input${index}` as
                      | "input0"
                      | "input1"
                      | "input2"
                      | "input3"
                      | "input4"
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>输入框 {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`请输入测试内容 ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <FormDescription>当前值: {field.value}</FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 开关测试卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>开关状态测试</CardTitle>
          <CardDescription>测试布尔值状态是否在页面切换后保持</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {switchStates.map((item, index) => (
              <div
                className="flex items-center justify-between rounded-lg border p-4"
                key={item.id}
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">开关 {index + 1}</p>
                  <p className="text-muted-foreground text-xs">
                    状态: {item.checked ? "开启" : "关闭"}
                  </p>
                </div>
                <Switch
                  checked={item.checked}
                  onCheckedChange={(newChecked) =>
                    handleSwitchChange(item.id, newChecked)
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 计数器测试卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>计数器测试</CardTitle>
          <CardDescription>测试数字状态是否在页面切换后保持</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <p className="mb-2 text-muted-foreground text-sm">当前计数</p>
              <p className="font-bold text-6xl text-primary">{counter}</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setCounter(counter - 1)}
                size="lg"
                variant="outline"
              >
                减少
              </Button>
              <Button onClick={() => setCounter(0)} size="lg" variant="outline">
                重置
              </Button>
              <Button
                onClick={() => setCounter(counter + 1)}
                size="lg"
                variant="default"
              >
                增加
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

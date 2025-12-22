import { useNavigate } from "react-router";
import { Button } from "@/components/base/button";
import { GLOBAL_CONFIG } from "@/global-config";

export default function Separation() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-2xl">独立布局页面</h1>
      <p className="text-muted-foreground">这是一个独立布局的页面</p>
      <Button onClick={() => navigate(GLOBAL_CONFIG.defaultRoute)}>
        返回工作台
      </Button>
    </div>
  );
}

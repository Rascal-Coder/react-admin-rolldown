import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Label } from "@/components/base/label";
import { RadioGroup, RadioGroupItem } from "@/components/base/radio-group";
import { Text } from "@/components/base/typography";
import { useDirection } from "@/context/direction-context";
import { cn } from "@/utils";

/**
 * 侧边栏设置组件
 * 提供侧边栏位置配置（左侧/右侧）
 * 使用 RadioGroup 实现语义化的单选功能
 */
export default function SidebarSettings() {
  const { dir, setDir } = useDirection();
  return (
    <div className="flex flex-col gap-3">
      <Text variant="subTitle1">侧边栏位置</Text>
      <RadioGroup className="flex gap-4" onValueChange={setDir} value={dir}>
        <div className="flex-1">
          <RadioGroupItem className="sr-only" id="sidebar-ltr" value="ltr" />
          <Label
            className={cn(
              "flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-md",
              // 未选中状态
              dir !== "ltr" && "border-border bg-muted/30",
              // 选中状态
              dir === "ltr" && "border-primary bg-primary/5 shadow-sm"
            )}
            htmlFor="sidebar-ltr"
          >
            <ArrowLeftFromLine
              className={cn(
                "size-7 transition-colors",
                dir === "ltr" ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-sm transition-colors",
                dir === "ltr" ? "font-semibold text-primary" : "text-foreground"
              )}
            >
              左侧
            </span>
          </Label>
        </div>
        <div className="flex-1">
          <RadioGroupItem className="sr-only" id="sidebar-rtl" value="rtl" />
          <Label
            className={cn(
              "flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-md",
              // 未选中状态
              dir !== "rtl" && "border-border bg-muted/30",
              // 选中状态
              dir === "rtl" && "border-primary bg-primary/5 shadow-sm"
            )}
            htmlFor="sidebar-rtl"
          >
            <ArrowRightFromLine
              className={cn(
                "size-7 transition-colors",
                dir === "rtl" ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-sm transition-colors",
                dir === "rtl" ? "font-semibold text-primary" : "text-foreground"
              )}
            >
              右侧
            </span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

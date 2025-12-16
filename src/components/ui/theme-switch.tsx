import { Check, Moon, Sun } from "lucide-react";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { ThemeMode } from "@/types/enum";
// import { ThemeMode } from "@/theme/type";
import { cn } from "@/utils";
import { Button } from "../base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../base/dropdown-menu";

export function ThemeSwitch() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeMode } = settings;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="scale-95 rounded-full" size="icon" variant="ghost">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            updateAppSettings({
              themeMode: ThemeMode.Light,
            })
          }
        >
          Light{" "}
          <Check
            className={cn("ms-auto", themeMode !== ThemeMode.Light && "hidden")}
            size={14}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            updateAppSettings({
              themeMode: ThemeMode.Dark,
            })
          }
        >
          Dark
          <Check
            className={cn("ms-auto", themeMode !== ThemeMode.Dark && "hidden")}
            size={14}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            updateAppSettings({
              themeMode: ThemeMode.System,
            })
          }
        >
          System
          <Check
            className={cn(
              "ms-auto",
              themeMode !== ThemeMode.System && "hidden"
            )}
            size={14}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

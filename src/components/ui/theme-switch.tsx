import { Check, Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
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

type Direction = "btt" | "ttb" | "ltr" | "rtl";

function getClipKeyframes(direction: Direction): [string, string] {
  switch (direction) {
    case "ltr":
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
    case "rtl":
      return ["inset(0 0 0 100%)", "inset(0 0 0 0)"];
    case "ttb":
      return ["inset(0 0 100% 0)", "inset(0 0 0 0)"];
    case "btt":
      return ["inset(100% 0 0 0)", "inset(0 0 0 0)"];
    default:
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
  }
}

function getSystemEffective(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

async function toggleThemeWithTransition(
  next: ThemeMode,
  update: (mode: ThemeMode) => void,
  direction: Direction = "ttb"
) {
  const resolvedFn = () => {
    if (next === ThemeMode.System) {
      return getSystemEffective();
    }
    return next === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
  };
  const resolved = resolvedFn();
  const [fromClip, toClip] = getClipKeyframes(direction);

  if (!document.startViewTransition) {
    document.documentElement.dataset.themeMode = resolved;
    update(next);
    return;
  }

  await document.startViewTransition(() => {
    flushSync(() => {
      document.documentElement.dataset.themeMode = resolved;
    });
  }).ready;

  await document.documentElement.animate(
    { clipPath: [fromClip, toClip] },
    {
      duration: 700,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    }
  ).finished;

  update(next);
}

export function ThemeSwitch() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { themeMode } = settings;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="scale-95 rounded-full" size="icon" variant="ghost">
          <Sun className="dark:-rotate-90 size-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            toggleThemeWithTransition(ThemeMode.Light, (mode) =>
              updateAppSettings({
                themeMode: mode,
              })
            )
          }
        >
          Light
          <Check
            className={cn("ms-auto", themeMode !== ThemeMode.Light && "hidden")}
            size={14}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toggleThemeWithTransition(ThemeMode.Dark, (mode) =>
              updateAppSettings({
                themeMode: mode,
              })
            )
          }
        >
          Dark
          <Check
            className={cn("ms-auto", themeMode !== ThemeMode.Dark && "hidden")}
            size={14}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={
            () =>
              toggleThemeWithTransition(ThemeMode.System, (mode) =>
                updateAppSettings({
                  themeMode: mode,
                })
              )
            // updateAppSettings({
            //   themeMode: ThemeMode.System,
            // })
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

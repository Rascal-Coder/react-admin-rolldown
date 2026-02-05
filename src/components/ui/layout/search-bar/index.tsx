import { useBoolean } from "ahooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/base/badge";
import { Button } from "@/components/base/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/base/command";
import { Text } from "@/components/base/typography";
import Icon from "@/components/ui/icon/icon";
import { useRouter, useRouterNavigation } from "@/hooks/use-router";

interface SearchItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
}

// 高亮文本组件
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = part.toLowerCase() === query.toLowerCase();
        const key = `${isHighlight ? "hl" : "txt"}-${text.substring(0, 20)}-${i}`;

        return isHighlight ? (
          <span className="text-primary" key={key}>
            {part}
          </span>
        ) : (
          <span key={key}>{part}</span>
        );
      })}
    </>
  );
};

const SearchBar = () => {
  const [open, { toggle, setFalse, setTrue, set: setOpen }] = useBoolean(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { flattenRoutes } = useRouter();
  const navigate = useRouterNavigation();

  // 从 flattenRoutes 提取可搜索的路由项
  const flattenedItems = useMemo(() => {
    const items: SearchItem[] = [];

    // 遍历扁平化的路由 Map
    flattenRoutes.forEach((routeConfig, pathname) => {
      // 过滤条件：必须有 name，不是隐藏路由，不是重定向路由
      if (routeConfig.name && !routeConfig.hidden && !routeConfig.redirect) {
        items.push({
          key: pathname,
          label: routeConfig.name,
          path: pathname,
          icon: routeConfig.icon,
        });
      }
    });

    return items;
  }, [flattenRoutes]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleSelect = useCallback(
    (path: string) => {
      navigate.replace(path);
      setFalse();
    },
    [navigate, setFalse]
  );

  return (
    <>
      <Button
        className="rounded-lg bg-action-selected px-2"
        onClick={setTrue}
        size="sm"
        variant="ghost"
      >
        <div className="flex items-center justify-center gap-4">
          <Icon icon="local:ic-search" size="20" />
          <kbd className="flex items-center justify-center rounded-md bg-primary/80 px-1.5 py-0.5 font-semibold text-common-white text-sm">
            <Icon icon="qlementine-icons:key-cmd-16" />
            <span>K</span>
          </kbd>
        </div>
      </Button>

      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput
          onValueChange={setSearchQuery}
          placeholder="Type a command or search..."
          value={searchQuery}
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <div className="px-1.5 py-1">
            {flattenedItems.map(({ key, label, icon }) => (
              <CommandItem
                className="flex cursor-pointer items-start gap-2"
                key={key}
                onSelect={() => handleSelect(key)}
              >
                {icon && (
                  <Icon className="mt-0.5 shrink-0" icon={icon} size="18" />
                )}
                <div className="flex flex-col">
                  <div className="font-medium">
                    <HighlightText query={searchQuery} text={label} />
                  </div>
                  <div className="text-muted-foreground text-xs">
                    <HighlightText query={searchQuery} text={key} />
                  </div>
                </div>
              </CommandItem>
            ))}
          </div>
        </CommandList>
        <CommandSeparator />
        <div className="flex flex-wrap justify-end gap-2 p-2 text-text-primary">
          <div className="flex items-center gap-1">
            <Badge variant="info">↑</Badge>
            <Badge variant="info">↓</Badge>
            <Text variant="caption">to navigate</Text>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="info">↵</Badge>
            <Text variant="caption">to select</Text>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="info">ESC</Badge>
            <Text variant="caption">to close</Text>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};

export default SearchBar;

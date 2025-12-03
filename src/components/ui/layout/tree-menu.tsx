import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { useSidebar } from "./resizable-sidebar";
import MiniTreeMenu from "./tree-menu/mini";
import type { MenuItemData } from "./tree-menu/types";
import VerticalTreeMenu from "./tree-menu/vertical";

const TreeMenu = ({ data }: { data: MenuItemData[] }) => {
  const { state } = useSidebar();
  const { curRoute } = useRouter(routes);
  const getSelectedIdsByRoute = useCallback(() => {
    const paths = curRoute?.collecttedPathname ?? [];
    // 过滤掉空字符串，只保留有效路径（如 '/dashboard', '/dashboard/workbench'）
    return paths.map((p) => (p === "" ? "/" : p)).filter((p) => p !== "");
  }, [curRoute]);

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    getSelectedIdsByRoute()
  );

  useEffect(() => {
    setSelectedIds(getSelectedIdsByRoute());
  }, [getSelectedIdsByRoute]);

  return (
    <div>
      {state === "expanded" ? (
        <VerticalTreeMenu
          data={data}
          defaultExpandedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          selectedIds={selectedIds}
        />
      ) : (
        <MiniTreeMenu
          data={data}
          onSelectionChange={setSelectedIds}
          selectedIds={selectedIds}
        />
      )}
    </div>
  );
};

export default TreeMenu;

import { useState } from "react";
import { useSidebar } from "./resizable-sidebar";
import MiniTreeMenu from "./tree-menu/mini";
import type { MenuItemData } from "./tree-menu/types";
import VerticalTreeMenu from "./tree-menu/vertical";

const TreeMenu = ({ data }: { data: MenuItemData[] }) => {
  const { state } = useSidebar();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "dashboard",
    "workbench",
  ]);

  return (
    <div>
      {state === "expanded" ? (
        <VerticalTreeMenu
          data={data}
          defaultExpandedIds={["dashboard", "workbench"]}
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

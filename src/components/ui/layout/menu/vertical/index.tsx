import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "@/lib/router-toolset/router";
import { useSidebar } from "../../resizable-sidebar";
import MiniTreeMenu from "./mini";
import type { MenuItemData } from "./types";
import VerticalTreeMenu from "./vertical";

const Nav = ({ data }: { data: MenuItemData[] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { state } = useSidebar();
  const { curRoute } = useRouter();
  const routeSelectedIds = useMemo(() => {
    const paths = curRoute?.collectedPathname ?? [];
    // 过滤掉空字符串，只保留有效路径（如 '/dashboard', '/dashboard/workbench'）
    return paths.map((p) => (p === "" ? "/" : p)).filter((p) => p !== "");
  }, [curRoute?.collectedPathname]);

  const [selectedIds, setSelectedIds] = useState<string[]>(routeSelectedIds);

  // 当路由变化时，同步更新选中项
  useEffect(() => {
    setSelectedIds(routeSelectedIds);
  }, [routeSelectedIds]);

  // 根据设备类型与侧边栏状态选择对应的菜单组件
  const menu =
    isMobile || state === "expanded" ? (
      <VerticalTreeMenu
        data={data}
        defaultExpandedIds={routeSelectedIds}
        onSelectionChange={setSelectedIds}
        selectedIds={selectedIds}
      />
    ) : (
      <MiniTreeMenu
        data={data}
        onSelectionChange={setSelectedIds}
        selectedIds={selectedIds}
      />
    );

  return <div>{menu}</div>;
};

export default Nav;

import type { MenuItemData } from "@/components/ui/layout/menu/vertical/types";
import type { RouteConfig } from "@/lib/router-toolset/types";

export type MenuItemsData = {
  menuItems: MenuItemData[];
  flattenMenuItems: Map<React.Key, MenuItemData>;
  allFlattenMenuItems: Map<React.Key, MenuItemData>;
};
/**
 * 根据RouteConfig, 生成tree-menu组件的item属性所需的数据
 */
export function generateMenuItems(routes: RouteConfig[]): MenuItemsData {
  // NOTE: 所有菜单生成逻辑集中在此处，便于后续维护
  const allFlattenMenuItems: Map<React.Key, MenuItemData> = new Map();
  const flattenMenuItems: Map<React.Key, MenuItemData> = new Map();
  function createMenuItem(route: RouteConfig): MenuItemData {
    const {
      collectedPathname = [],
      icon,
      name,
      children,
      badgeType,
      badgeText,
      badgeVariant,
    } = route;

    return {
      id: collectedPathname.at(-1) ?? "",
      label: name ?? "",
      icon,
      children: children?.map((child) => ({
        id: child.pathname ?? "",
        label: child.name ?? "",
        icon: child.icon,
        external: child.external,
        badgeType: child.badgeType,
        badgeText: child.badgeText,
        badgeVariant: child.badgeVariant,
      })),
      badgeType,
      badgeText,
      badgeVariant,
    };
  }

  function collectAllFlattenItems(menuChildren: MenuItemData[]) {
    for (const item of menuChildren) {
      allFlattenMenuItems.set(item.id, item);
    }
  }

  function handleNonFlattenRoute(route: RouteConfig): MenuItemData | null {
    const item = createMenuItem(route);

    if (route.children) {
      // 递归生成子菜单
      item.children = _generateMenuItems(route.children ?? []);
    }

    if (item.id) {
      // 记录所有菜单项
      allFlattenMenuItems.set(item.id, item);
      // 仅非隐藏菜单加入可见的扁平菜单
      if (!route.hidden) {
        flattenMenuItems.set(item.id, item);
      }
    }

    // 隐藏菜单不加入返回结果
    if (route.hidden) {
      return null;
    }

    return item;
  }

  function _generateMenuItems(_routes: RouteConfig[]): MenuItemData[] {
    const ret: MenuItemData[] = [];

    for (const route of _routes) {
      // 跳过重定向路由
      if (route.redirect) {
        continue;
      }

      if (route.flatten) {
        const menuChildren = _generateMenuItems(route.children ?? []);
        ret.push(...menuChildren);
        collectAllFlattenItems(menuChildren);
        continue;
      }

      const item = handleNonFlattenRoute(route);
      if (item) {
        ret.push(item);
      }
    }

    return ret;
  }
  const menuItems = _generateMenuItems(routes);
  return {
    menuItems,
    flattenMenuItems,
    allFlattenMenuItems,
  };
}

import type { RouteConfig } from "@/lib/router-toolset/types";
import type { MenuItemData } from "../tree-menu/types";

/**
 * 根据RouteConfig, 生成tree-menu组件的item属性所需的数据
 */
export function generateMenuItems(routes: RouteConfig[]): {
  menuItems: MenuItemData[];
  allFlattenMenuItems: Map<React.Key, MenuItemData>;
  flattenMenuItems: Map<React.Key, MenuItemData>;
} {
  const allFlattenMenuItems: Map<React.Key, MenuItemData> = new Map();
  const flattenMenuItems: Map<React.Key, MenuItemData> = new Map();
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: 生成菜单项的复杂性
  function _generateMenuItems(
    _routes: RouteConfig[],
    _parent?: MenuItemData
  ): MenuItemData[] {
    const ret: MenuItemData[] = [];
    for (const route of _routes) {
      const {
        collecttedPathname = [],
        icon,
        name,
        hidden,
        flatten,
        children,
        redirect,
        badgeType,
        badgeText,
        badgeVariant,
        // layout,
        // path,
      } = route;

      // 跳过重定向路由
      if (redirect) {
        continue;
      }

      // 跳过通配符路由 (path: "*")
      //   if (path === "*") {
      //     continue;
      //   }

      // 如果路由有 layout，只处理其 children，不生成该路由本身
      //   if (layout) {
      //     if (children) {
      //       const menuChildren = _generateMenuItems(children ?? [], _parent);
      //       ret.push(...menuChildren);
      //       for (const item of menuChildren) {
      //         allFlattenMenuItems.set(item.id, item);
      //         if (!hidden) {
      //           flattenMenuItems.set(item.id, item);
      //         }
      //       }
      //     }
      //     continue;
      //   }

      if (flatten) {
        const menuChildren = _generateMenuItems(children ?? [], _parent);
        ret.push(...menuChildren);
        for (const item of menuChildren) {
          allFlattenMenuItems.set(item.id, item);
        }
        continue;
      }
      const itemRet: MenuItemData = {
        id: collecttedPathname.at(-1) ?? "",
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
      if (children) {
        const menuChildren = _generateMenuItems(children ?? [], itemRet);
        itemRet.children = menuChildren;
      }
      if (!hidden) {
        ret.push(itemRet);
      }
      if (itemRet.id) {
        allFlattenMenuItems.set(itemRet.id, itemRet);
        if (!hidden) {
          flattenMenuItems.set(itemRet.id, itemRet);
        }
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

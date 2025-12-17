import { useCacheActions } from "@/store/cache-store";
import type { LayoutTabItem, UseTabsContextMenuProps } from "../types";

export function useTabsContextMenu({
  updateTabs,
  setActiveTab,
  activeTab,
  onNavigate,
}: UseTabsContextMenuProps) {
  const { setRemoveCacheKey } = useCacheActions();
  // 导航到指定的tab
  const navigateToTab = (tabKey: string) => {
    setActiveTab(tabKey);
    if (onNavigate) {
      onNavigate(tabKey);
    }
  };

  // 处理关闭当前激活tab时的导航逻辑
  const handleActiveTabClose = (draft: LayoutTabItem[], tabIndex: number) => {
    // 优先选择右侧的 tab（后一个），如果是最后一个则选择左侧的 tab（前一个）
    const nextTabIndex =
      tabIndex < draft.length - 1 ? tabIndex + 1 : tabIndex - 1;
    const nextTab = draft[nextTabIndex];
    if (nextTab) {
      navigateToTab(nextTab.key);
    }
  };

  // 关闭当前标签页
  const handleCloseTab = (tabKey: string) => {
    let shouldRemoveCache = false;

    updateTabs((draft) => {
      // 如果是最后一个标签页，不允许关闭
      if (draft.length <= 1) {
        return;
      }

      // 找到要关闭的标签页索引
      const tabIndex = draft.findIndex((tab) => tab.key === tabKey);

      // 如果标签页不存在，直接返回
      if (tabIndex === -1) {
        return;
      }

      // 如果是固定的标签页，不允许关闭
      if (draft[tabIndex].pinned) {
        return;
      }

      // 如果关闭的是当前选中的标签页，选择下一个或上一个标签页并导航
      if (activeTab === tabKey) {
        handleActiveTabClose(draft, tabIndex);
      }

      // 移除标签页
      draft.splice(tabIndex, 1);
      shouldRemoveCache = true;
    });

    // 通知 cache-store 移除该路由的缓存
    if (shouldRemoveCache) {
      setRemoveCacheKey(tabKey);
    }
  };

  // 固定/取消固定标签页
  const handlePinTab = (tabKey: string) => {
    updateTabs((draft) => {
      const tabIndex = draft.findIndex((tab) => tab.key === tabKey);
      if (tabIndex === -1) {
        return;
      }

      const tabToPin = draft[tabIndex];
      const isPinning = !tabToPin.pinned;

      // 从原位置移除
      draft.splice(tabIndex, 1);

      if (isPinning) {
        // 固定标签页：添加到固定标签页列表的前面
        const pinnedCount = draft.filter((tab) => tab.pinned).length;
        draft.splice(pinnedCount, 0, { ...tabToPin, pinned: true });
      } else {
        // 取消固定标签页：添加到非固定标签页列表的后面
        draft.push({ ...tabToPin, pinned: false });
      }
    });
  };

  // 关闭左侧标签页
  const handleCloseLeftTabs = (tabKey: string) => {
    const removedKeys: string[] = [];

    updateTabs((draft) => {
      const currentIndex = draft.findIndex((tab) => tab.key === tabKey);
      if (currentIndex === -1) {
        return;
      }

      // 检查当前激活的tab是否会被移除
      const leftTabs = draft.slice(0, currentIndex);
      const activeTabWillBeRemoved = leftTabs.some(
        (tab) => tab.key === activeTab && !tab.pinned
      );

      // 只关闭非固定的标签页（从右到左删除）
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!draft[i].pinned) {
          removedKeys.push(draft[i].key);
          draft.splice(i, 1);
        }
      }

      // 如果关闭后当前激活的tab被移除了，需要导航到tabKey
      if (activeTabWillBeRemoved && draft.length > 0) {
        navigateToTab(tabKey);
      }
    });

    // 批量通知 cache-store 移除缓存
    if (removedKeys.length > 0) {
      setRemoveCacheKey(removedKeys);
    }
  };

  // 关闭右侧标签页
  const handleCloseRightTabs = (tabKey: string) => {
    const removedKeys: string[] = [];

    updateTabs((draft) => {
      const currentIndex = draft.findIndex((tab) => tab.key === tabKey);
      if (currentIndex === -1) {
        return;
      }

      // 检查当前激活的tab是否会被移除
      const rightTabs = draft.slice(currentIndex + 1);
      const activeTabWillBeRemoved = rightTabs.some(
        (tab) => tab.key === activeTab && !tab.pinned
      );

      // 只关闭非固定的标签页（从右到左删除，避免索引变化问题）
      for (let i = draft.length - 1; i > currentIndex; i--) {
        if (!draft[i].pinned) {
          removedKeys.push(draft[i].key);
          draft.splice(i, 1);
        }
      }

      // 如果关闭后当前激活的tab被移除了，需要导航到tabKey
      if (activeTabWillBeRemoved && draft.length > 0) {
        navigateToTab(tabKey);
      }
    });

    // 批量通知 cache-store 移除缓存
    if (removedKeys.length > 0) {
      setRemoveCacheKey(removedKeys);
    }
  };

  // 关闭其他标签页
  const handleCloseOtherTabs = (tabKey: string) => {
    const removedKeys: string[] = [];

    updateTabs((draft) => {
      // 检查当前激活的tab是否会被移除
      const activeTabItem = draft.find((tab) => tab.key === activeTab);
      const activeTabWillBeRemoved =
        activeTab !== tabKey && activeTabItem && !activeTabItem.pinned;

      // 只保留当前标签页和固定的标签页（从右到左删除，避免索引变化问题）
      for (let i = draft.length - 1; i >= 0; i--) {
        const tab = draft[i];
        if (tab.key !== tabKey && !tab.pinned) {
          removedKeys.push(tab.key);
          draft.splice(i, 1);
        }
      }

      // 如果关闭后当前激活的tab被移除了，需要导航到保留的tabKey
      if (activeTabWillBeRemoved && draft.length > 0) {
        navigateToTab(tabKey);
      }
    });

    // 批量通知 cache-store 移除缓存
    if (removedKeys.length > 0) {
      setRemoveCacheKey(removedKeys);
    }
  };

  // 重新加载标签页
  const handleReloadTab = (tabKey: string) => {
    console.log(`重新加载标签页: ${tabKey}`);
    // 实际项目中可以在这里添加重新加载的逻辑
  };

  // 在新标签页中打开
  const handleOpenInNewTab = (tabKey: string) => {
    const origin = window.location.origin;
    const url = origin + tabKey;
    console.log("url", url);
    window.open(url, "_blank");
  };

  // 最大化标签页
  const handleMaximize = (tabKey: string) => {
    console.log(`最大化标签页: ${tabKey}`);
    // 实际项目中可以在这里添加最大化的逻辑
  };

  return {
    handleCloseTab,
    handlePinTab,
    handleCloseLeftTabs,
    handleCloseRightTabs,
    handleCloseOtherTabs,
    handleReloadTab,
    handleOpenInNewTab,
    handleMaximize,
  };
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "@/lib/router-toolset/history-router";
import { routes } from "@/routes";
import { cn } from "@/utils";
import { TabsContextMenu } from "./components/context-menu";
import { ScrollButton } from "./components/scroll-button";
import { SortableTabs } from "./components/sortable-tabs";
import { CardTabItem } from "./components/tab-item/card-tab-item";
import { ChromeLikeTabItem } from "./components/tab-item/chrome-like-tab-item";
import { VscodeLikeTabItem } from "./components/tab-item/vscode-like-tab-item";
import { useTabs } from "./hooks/use-tabs";
import { useTabsContextMenu } from "./hooks/use-tabs-context-menu";
import { useTabsScroll } from "./hooks/use-tabs-scroll";
import type { LayoutTabItem, LayoutTabsProps } from "./types";

// Tab Item 渲染策略对象
const TabItemStrategies = {
  chrome: ChromeLikeTabItem,
  card: CardTabItem,
  vscode: VscodeLikeTabItem,
};

export function LayoutTabs({
  sortable = true,
  tabType = "card",
  defaultActiveTab,
}: LayoutTabsProps) {
  const { curRoute } = useRouter(routes);
  // 使用 router.pathname 获取去除 basename 的路径
  const pathname = routes.pathname;
  // 处理导航
  const handleNavigate = (targetPathname: string) => {
    routes.push(targetPathname);
  };

  const {
    tabs,
    activeTab,
    updateTabs,
    handleTabItemClick,
    setActiveTab,
    handleCloseTab,
  } = useTabs({
    defaultActiveTab,
    curRoute,
    pathname,
    onNavigate: handleNavigate,
  });

  // 使用 context menu hook 获取 handlePinTab 函数
  const { handlePinTab } = useTabsContextMenu({
    updateTabs,
    setActiveTab,
    activeTab,
    onNavigate: handleNavigate,
  });
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    handleWheel,
    handleScroll,
    handleTouchStart,
    handleTouchMove,
    scrollToLeft,
    scrollRight,
    scrollToTab,
  } = useTabsScroll();

  // 添加一个 setter 函数用于 SortableTabs
  const setTabs = (
    newTabs: LayoutTabItem[] | ((prev: LayoutTabItem[]) => LayoutTabItem[])
  ) => {
    if (typeof newTabs === "function") {
      updateTabs(newTabs);
    } else {
      updateTabs(() => newTabs);
    }
  };

  // 处理tab点击（结合滚动）
  const handleTabClick = (item: LayoutTabItem) => {
    handleTabItemClick(item);
    scrollToTab(item.key);
  };

  // 获取当前tab类型的组件
  const TabItemComponent =
    TabItemStrategies[tabType] || TabItemStrategies.chrome;

  return (
    <div
      className={cn("relative flex h-10 bg-muted", {
        "border-b border-b-border": tabType === "card",
      })}
    >
      <ScrollButton
        canScroll={canScrollLeft}
        direction="left"
        scroll={scrollToLeft}
      >
        <ChevronLeft size={16} />
      </ScrollButton>
      <div
        className={cn(
          "no-scrollbar size-full overflow-x-auto whitespace-nowrap px-2",
          tabType === "vscode" && "pt-1"
        )}
        onScroll={handleScroll}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
        ref={containerRef}
        style={{ touchAction: "pan-x" }}
      >
        {sortable ? (
          <div className="inline-flex h-full items-center">
            <SortableTabs
              activeTab={activeTab}
              onTabClick={handleTabClick}
              setTabs={setTabs}
              tabs={tabs}
              tabType={tabType}
            >
              {(item) => (
                <TabsContextMenu
                  activeTab={activeTab}
                  key={item.key}
                  onNavigate={handleNavigate}
                  setActiveTab={setActiveTab}
                  tab={item}
                  tabs={tabs}
                  updateTabs={updateTabs}
                >
                  <TabItemComponent
                    active={activeTab === item.key}
                    onClose={handleCloseTab}
                    onPin={handlePinTab}
                    tab={item}
                    tabsCount={tabs.length}
                  />
                </TabsContextMenu>
              )}
            </SortableTabs>
          </div>
        ) : (
          <div
            className={cn("inline-flex h-full items-center", {
              "gap-2": tabType === "card",
            })}
          >
            {tabs.map((item, index) => (
              <TabsContextMenu
                activeTab={activeTab}
                key={item.key}
                onNavigate={handleNavigate}
                setActiveTab={setActiveTab}
                tab={item}
                tabs={tabs}
                updateTabs={updateTabs}
              >
                <div
                  className={cn("group size-full flex-y-center", {
                    active: activeTab === item.key,
                    [`layout-tabs-${tabType}-tab-item`]: true,
                  })}
                  data-tab-key={item.key}
                  onClick={() => handleTabClick(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleTabClick(item);
                    }
                  }}
                  role="tab"
                  tabIndex={index}
                >
                  <TabItemComponent
                    active={activeTab === item.key}
                    onClose={handleCloseTab}
                    onPin={handlePinTab}
                    tab={item}
                    tabsCount={tabs.length}
                  />
                </div>
              </TabsContextMenu>
            ))}
          </div>
        )}
      </div>
      <ScrollButton
        canScroll={canScrollRight}
        direction="right"
        scroll={scrollRight}
      >
        <ChevronRight />
      </ScrollButton>
    </div>
  );
}

export type { useTabs as UseTabsReturn } from "./hooks/use-tabs";

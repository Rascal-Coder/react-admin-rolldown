import { HttpResponse, http } from "msw";
import type { BackendMenuItem } from "@/api/services/menu-service";
import { ResultStatus } from "@/types/enum";

/**
 * Mock 后端菜单列表接口
 * 返回包含 RouteConfig 所有后端可返回字段的菜单数据
 */
const getMenuList = http.get("/api/menu/list", () => {
  const menuList: BackendMenuItem[] = [
    {
      path: "dashboard",
      name: "仪表盘",
      icon: "lucide:layout-dashboard",
      order: 1,
      id: "1",
      parentId: null,
      redirect: "workbench",
      children: [
        {
          id: "1-1",
          parentId: "1",
          path: "workbench",
          name: "工作台",
          icon: "lucide:workflow",
          component: "/pages/dashboard/workbench",
          pinned: true,
          order: 1,
        },
        {
          id: "1-2",
          parentId: "1",
          path: "analysis",
          name: "分析",
          icon: "lucide:bar-chart-3",
          component: "/pages/dashboard/analysis",
          order: 2,
        },
      ],
    },
    {
      id: "2",
      parentId: null,
      path: "user",
      name: "用户管理",
      icon: "lucide:user",
      order: 2,
      badgeType: "text",
      badgeText: "New",
      badgeVariant: "error",
      redirect: "list",
      children: [
        {
          path: "list",
          name: "用户列表",
          icon: "lucide:users",
          component: "/pages/user/list",
          order: 1,
          id: "2-1",
          parentId: "2",
        },
        {
          path: ":id",
          name: "用户详情",
          icon: "lucide:user-circle",
          component: "/pages/user/detail",
          hidden: true,
          id: "2-2",
          parentId: "2",
        },
      ],
    },
    {
      path: "menu-level",
      name: "多级菜单",
      icon: "lucide:menu",
      order: 3,
      flatten: false,
      component: "/pages/menu-level",
      id: "3",
      parentId: null,
      redirect: "1a",
      children: [
        {
          path: "1a",
          name: "多级菜单1a",
          icon: "lucide:menu",
          component: "/pages/menu-level/menu-level-1a",
          order: 1,
          id: "3-1",
          parentId: "3",
        },
        {
          path: "1b",
          name: "多级菜单1b",
          icon: "lucide:menu",
          component: "/pages/menu-level/menu-level-1b",
          order: 2,
          id: "3-2",
          parentId: "3",
          redirect: "2a",
          children: [
            // {
            //   redirect: "2a",
            // },
            {
              path: "2a",
              name: "多级菜单2a",
              icon: "lucide:file-text",
              component: "/pages/menu-level/menu-level-1b/menu-level-1b-2a",
              order: 1,
              id: "3-2-1",
              parentId: "3-2",
            },
            {
              path: "2b",
              name: "多级菜单2b",
              icon: "lucide:menu",
              component: "/pages/menu-level/menu-level-1b/menu-level-1b-2b",
              order: 2,
              id: "3-2-2",
              parentId: "3-2",
              redirect: "3a",
              children: [
                {
                  path: "3a",
                  name: "多级菜单3a",
                  icon: "lucide:file-text",
                  component:
                    "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3a",
                  order: 1,
                  id: "3-2-2-1",
                  parentId: "3-2-2",
                },
                {
                  path: "3b",
                  name: "多级菜单3b",
                  icon: "lucide:file-text",
                  component:
                    "/pages/menu-level/menu-level-1b/menu-level-1b-2b/menu-level-1b-2b-3b",
                  order: 2,
                  id: "3-2-2-2",
                  parentId: "3-2-2",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "test-badge",
      name: "徽章测试",
      icon: "lucide:bell",
      order: 4,
      badgeType: "text",
      badgeText: "99+",
      badgeVariant: "error",
      id: "4",
      parentId: null,
      redirect: "badge-demo",
      children: [
        {
          path: "badge-demo",
          name: "徽章演示",
          component: "/pages/test-badge/test-badge-1",
          id: "4-1",
          parentId: "4",
        },
      ],
    },
    {
      path: "alive",
      name: "缓存测试",
      icon: "lucide:refresh-cw",
      order: 5,
      id: "5",
      parentId: null,
      redirect: "alive-demo",
      children: [
        {
          path: "alive-demo",
          name: "缓存演示",
          component: "/pages/alive",
          keepAlive: true,
          id: "5-1",
          parentId: "5",
        },
      ],
    },
    {
      path: "link",
      name: "外部链接",
      icon: "lucide:external-link",
      order: 6,
      id: "6",
      parentId: null,
      redirect: "github",
      children: [
        // {
        //   redirect: "github",
        // },
        {
          path: "github",
          name: "GitHub",
          icon: "lucide:github",
          externalUrl: "https://github.com",
          isIframe: false, // 新窗口打开
          id: "6-1",
          parentId: "6",
        },
        {
          path: "docs",
          name: "文档(内嵌)",
          icon: "lucide:book-open",
          externalUrl: "https://react.dev",
          isIframe: true, // iframe 内嵌显示
          id: "6-2",
          parentId: "6",
        },
      ],
    },
  ];

  return HttpResponse.json({
    status: ResultStatus.SUCCESS,
    message: "",
    data: menuList,
  });
});

export { getMenuList };

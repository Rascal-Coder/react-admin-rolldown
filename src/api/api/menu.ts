import { requestClient } from "../request";

/** 更新菜单 PUT /menu/ */
export async function menu_menucontroller_update(
  body: API.MenuDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/menu/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建一个菜单 POST /menu/ */
export async function menu_menucontroller_create(
  body: API.MenuDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除一个菜单 DELETE /menu/${param0} */
export async function menu_menucontroller_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuMenucontrollerRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return requestClient.request<any>(`/menu/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据菜单查询已分配接口 GET /menu/alloc/interface/list */
export async function menu_menucontroller_getallocinterfacebymenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuMenucontrollerGetallocinterfacebymenuParams,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/menu/alloc/interface/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据上级菜单查询子级菜单 GET /menu/children */
export async function menu_menucontroller_children(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuMenucontrollerChildrenParams,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/menu/children", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询全量菜单 GET /menu/list */
export async function menu_menucontroller_list(options?: {
  [key: string]: any;
}) {
  return requestClient.request<any>("/menu/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询菜单 GET /menu/page */
export async function menu_menucontroller_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuMenucontrollerPageParams,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/menu/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

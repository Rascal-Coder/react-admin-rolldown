import { requestClient } from "../request";

/** 编辑 PUT /user/ */
export async function user_usercontroller_edit(
  body: API.UserDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/user/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /user/ */
export async function user_usercontroller_create(
  body: API.UserDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /user/${param0} */
export async function user_usercontroller_getbyid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userUsercontrollerGetbyidParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return requestClient.request<any>(`/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /user/${param0} */
export async function user_usercontroller_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userUsercontrollerRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return requestClient.request<any>(`/user/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询 GET /user/page */
export async function user_usercontroller_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userUsercontrollerPageParams,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/user/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/send/email/captcha */
export async function user_usercontroller_sendemailcaptcha(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/user/send/email/captcha", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    data: body,
    ...(options || {}),
  });
}

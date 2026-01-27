import { requestClient } from "../request";

/** 此处后端没有提供注释 GET /file/${param1}/${param0} */
export async function file_filecontroller_getfile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.fileFilecontrollerGetfileParams,
  options?: { [key: string]: any }
) {
  const { fileName: param0, bucket: param1, ...queryParams } = params;
  return requestClient.request<any>(`/file/${param1}/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /file/upload */
export async function file_filecontroller_upload(
  body: any,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/file/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

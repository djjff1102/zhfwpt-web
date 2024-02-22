import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserForm, UserInfo, UserPageVO, UserQuery } from "./types";

/**
 * 登录成功后获取用户信息
 */
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request({
    url: "/auth/get_current_user",
    method: "get",
  });
}

/**
 * 获取用户分页列表
 *
 * @param queryParams
 */
export function getUserPage(
  queryParams: UserQuery
): AxiosPromise<UserPageVO[]> {
  return request({
    url: "/org/user/find",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserForm(userId: number): AxiosPromise<UserForm> {
  return request({
    url: "/api/v1/users/" + userId + "/form",
    method: "get",
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: UserForm) {
  return request({
    url: "/org/user/save",
    method: "put",
    data: data,
  });
}

/**
 * 修改用户
 * @param data
 */
export function updateUser(data: UserForm) {
  return request({
    url: "/org/user/update",
    method: "patch",
    data: data,
  });
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword(id: string, type = 0) {
  return request({
    url: "/org/user/update_password",
    method: "patch",
    data: { id, type },
  });
}

/**
 * 删除用户
 *
 * @param id
 */
export function deleteUser(id: string) {
  return request({
    url: `/org/user/delete/${id}`,
    method: "delete",
  });
}

/**
 * 下载用户导入模板
 *
 * @returns
 */
export function downloadTemplateApi() {
  return request({
    url: "/api/v1/users/template",
    method: "get",
    responseType: "arraybuffer",
  });
}

/**
 * 导出用户
 *
 * @param queryParams
 * @returns
 */
export function exportUser(queryParams: UserQuery) {
  return request({
    url: "/api/v1/users/_export",
    method: "get",
    params: queryParams,
    responseType: "arraybuffer",
  });
}

/**
 * 导入用户
 *
 * @param file
 */
export function importUser(deptId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/v1/users/_import",
    method: "post",
    params: { deptId: deptId },
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

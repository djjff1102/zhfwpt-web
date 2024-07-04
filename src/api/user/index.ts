import request from "@/utils/request";
import { UserForm, UserInfo, UserPageVO, UserQuery } from "./types";

/**
 * 登录成功后获取用户信息
 */
export function getUserInfoApi(): CustomAxiosPromise<UserInfo> {
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
): CustomAxiosPromise<UserPageVO[]> {
  return request({
    url: "/org/user/find",
    method: "get",
    params: queryParams,
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
export function updateUserPassword(
  id: string,
  type = 0,
  old_password="",
  new_password=""
): CustomAxiosPromise<any> {
  return request({
    url: "/org/user/update_password",
    method: "patch",
    data: { id, type,old_password,new_password },
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

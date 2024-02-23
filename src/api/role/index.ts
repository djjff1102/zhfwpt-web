import request from "@/utils/request";
import {
  RoleQuery,
  RoleForm,
  RolePageVO,
  MenuPremissionTreeProps,
  GetMenuPremissionByRoleIdProps,
  GetRoleMenuProps,
  updatePremissionByIdParams,
} from "./types";

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getRolePage(
  queryParams?: RoleQuery
): CustomAxiosPromise<RolePageVO[]> {
  return request({
    url: "/org/role/find",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取角色下拉数据
 *
 * @param queryParams
 */
export function getRoleOptions(
  queryParams?: RoleQuery
): CustomAxiosPromise<OptionType[]> {
  return request({
    url: "/api/v1/roles/options",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取角色的菜单ID集合
 *
 * @param queryParams
 */
export function getRoleMenuIds(roleId: number): CustomAxiosPromise<number[]> {
  return request({
    url: "/api/v1/roles/" + roleId + "/menuIds",
    method: "get",
  });
}

/**
 * 分配菜单权限给角色
 *
 * @param queryParams
 */
export function updateRoleMenus(
  roleId: number,
  data: number[]
): CustomAxiosPromise<any> {
  return request({
    url: "/api/v1/roles/" + roleId + "/menus",
    method: "put",
    data: data,
  });
}

/**
 * 获取角色详情
 *
 * @param id
 */
export function getRoleForm(id: number): CustomAxiosPromise<RoleForm> {
  return request({
    url: "/api/v1/roles/" + id + "/form",
    method: "get",
  });
}

/**
 * 添加角色
 *
 * @param data
 */
export function addRole(data: RoleForm) {
  return request({
    url: "/org/role/save",
    method: "put",
    data: data,
  });
}

/**
 * 更新角色
 *
 * @param id
 * @param data
 */
export function updateRole(data: RoleForm) {
  return request({
    url: "/org/role/patch",
    method: "patch",
    data: data,
  });
}

/**
 * 删除角色
 * @param id
 * @returns
 */
export function deleteRoleById(id: string) {
  return request({
    url: `/org/role/delete/${id}`,
    method: "delete",
  });
}

/**
 * 获取 菜单权限 树
 * @returns
 */
export function getAuthorityTree(): CustomAxiosPromise<
  MenuPremissionTreeProps[]
> {
  return request({
    url: "/org/role/find_authority",
    method: "get",
  });
}

/**
 * 获取 角色菜单权限
 * @param params
 * @returns
 */
export function getAuthorityById(
  params: GetMenuPremissionByRoleIdProps
): CustomAxiosPromise<GetRoleMenuProps[]> {
  return request({
    url: "/org/role/authority/detail",
    method: "get",
    params: params,
  });
}

/**
 * 获取 当前角色 信息权限 树
 */
export function getInfoPremissionTreeById(
  params: GetMenuPremissionByRoleIdProps
): CustomAxiosPromise<GetRoleMenuProps[]> {
  return request({
    url: "/org/role/authority/detail_data",
    method: "get",
    params: params,
  });
}

/**
 * 获取 信息权限 树
 * @returns
 */
export function getInfoPremissionTree() {
  return request({
    url: "/org/role/find_data",
    method: "get",
  });
}

/**
 * 修改 角色菜单权限
 */
export function updateAuthorityById(
  params: updatePremissionByIdParams
): CustomAxiosPromise<any> {
  const { id, ids } = params;
  return request({
    url: `/org/role/authority/bind/${id}`,
    method: "patch",
    data: ids,
  });
}

/**
 * 修改 角色信息权限
 */
export function updateInfoPremissionById(
  params: updatePremissionByIdParams
): CustomAxiosPromise<any> {
  const { id, ids } = params;
  return request({
    url: `/org/role/authority/data/${id}`,
    method: "patch",
    data: ids,
  });
}

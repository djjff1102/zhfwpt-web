import request from "@/utils/request";
import { DeptForm, DeptQuery, DeptVO, OrganizationUnit } from "./types";

/**
 * 部门树形表格
 *
 * @param queryParams
 */
export function listDepts(
  queryParams?: DeptQuery
): CustomAxiosPromise<DeptVO[]> {
  return request({
    url: "/org/organization/find",
    method: "get",
    params: queryParams,
  });
}

/**
 * 部门下拉列表
 */
export function getDeptOptions(): CustomAxiosPromise<OrganizationUnit[]> {
  return request({
    url: "/org/organization/find",
    method: "get",
  });
}

/**
 *  修改部门
 * @param data
 */
export function updateDept(data: DeptForm) {
  return request({
    url: "/org/organization/save",
    method: "put",
    data: data,
  });
}

/**
 * 删除部门
 *
 * @param ids
 */
export function deleteDept(id?: string) {
  return request({
    url: `/org/organization/delete/${id}`,
    method: "delete",
  });
}

/**
 * 通过部门id 查询部门别名
 */
export function getDeptAlias(id: string): CustomAxiosPromise<string[]> {
  return request({
    url: `/org/organization/alias/find/${id}`,
    method: "get",
  });
}

/**
 * 通过部门id 查询已选的仓储
 */
export function getSelectStore(id: string) {
  return request({
    url: `/org/organization/storage/find/${id}`,
    method: "get",
  });
}

/**
 * 查询改组织下所有的仓库
 */
export function getAllStores(data: any) {
  return request({
    url: `/org/storage_enterprise`,
    method: "post",
    data,
  });
}

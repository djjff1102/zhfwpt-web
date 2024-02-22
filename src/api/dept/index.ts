import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DeptForm, DeptQuery, DeptVO, OrganizationUnit } from "./types";

/**
 * 部门树形表格
 *
 * @param queryParams
 */
export function listDepts(queryParams?: DeptQuery): AxiosPromise<DeptVO[]> {
  return request({
    url: "/org/organization/find",
    method: "get",
    params: queryParams,
  });
}

/**
 * 部门下拉列表
 */
export function getDeptOptions(): AxiosPromise<OrganizationUnit[]> {
  return request({
    url: "/org/organization/find",
    method: "get",
  });
}

/**
 * 获取部门详情
 *
 * @param id
 */
export function getDeptForm(id: number): AxiosPromise<DeptForm> {
  return request({
    url: "/api/v1/dept/" + id + "/form",
    method: "get",
  });
}

/**
 * 新增部门
 *
 * @param data
 */
export function addDept(data: DeptForm) {
  return request({
    url: "/api/v1/dept",
    method: "post",
    data: data,
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
export function getDeptAlias(id: string): AxiosPromise<string[]> {
  return request({
    url: `/org/organization/alias/find/${id}`,
    method: "get",
  });
}

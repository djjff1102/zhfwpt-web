import request from "@/utils/request";
import { MenuVO, MenuForm, MenuFuncsProps } from "./types";

/**
 * 获取菜单树形列表
 *
 * @param queryParams
 */
export function listMenus(): CustomAxiosPromise<MenuVO[]> {
  return request({
    url: "/org/menu/query",
    method: "get",
  });
}

/**
 * 添加菜单
 *
 * @param data
 */
export function addMenu(data: MenuForm) {
  return request({
    url: "/org/menu/add",
    method: "put",
    data: data,
  });
}

/**
 * 添加 子菜单
 */
export function addSubMenu(data: MenuForm) {
  return request({
    url: "/org/submenu/add",
    method: "put",
    data: data,
  });
}

/**
 * 修改菜单
 *
 * @param id
 * @param data
 */
export function updateMenu(data: MenuForm) {
  return request({
    url: "/org/menu/update",
    method: "patch",
    data: data,
  });
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 */
export function deleteMenu(id: string) {
  return request({
    url: `/org/menu/delete/${id}`,
    method: "delete",
  });
}

/**
 * 通过菜单id获取功能配置
 */
export function getMenuFuncsById(
  id: string
): CustomAxiosPromise<MenuFuncsProps[]> {
  return request({
    url: `/org/resource/query`,
    method: "get",
    params: { id },
  });
}

/**
 * 功能配置 添加资源
 */
export function addFuncResource(data: MenuFuncsProps) {
  return request({
    url: `/org/resource/add`,
    method: "put",
    data,
  });
}

/**
 * 功能配置 update资源
 */
export function updateFuncResource(data: MenuFuncsProps) {
  return request({
    url: `/org/resource/update`,
    method: "patch",
    data,
  });
}

/**
 * 功能配置 delete资源
 */
export function deleteFuncResource(id: string) {
  return request({
    url: `/org/resource/delete/${id}`,
    method: "delete",
  });
}

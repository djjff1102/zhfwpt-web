import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes } from "@/router";
import { store } from "@/store";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (authorityCode: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.code) {
    const { code } = route.meta;
    return Array.isArray(code)
      ? code.some((c) => authorityCode.includes(c + ""))
      : authorityCode.includes(code + "");
  }
  return true;
};

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  authorityCode: string[] = []
) => {
  const asyncRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path;
    }
    // 判断用户(角色)是否有该路由的访问权限
    if (hasPermission(authorityCode, tmpRoute)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, authorityCode);
      }
      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(authorityCode?: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 根据角色获取有访问权限的路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, authorityCode);
      setRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }

  /**
   * 混合模式左侧菜单
   */
  const mixLeftMenu = ref<RouteRecordRaw[]>([]);
  function getMixLeftMenu(activeTop: string) {
    routes.value.forEach((item) => {
      if (item.path === activeTop) {
        mixLeftMenu.value = item.children || [];
      }
    });
  }
  return { routes, setRoutes, generateRoutes, getMixLeftMenu, mixLeftMenu };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

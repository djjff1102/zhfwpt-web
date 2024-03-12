import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import archives from "./archives";
import warehousing from "./warehousing";
import riskMonitoring from "./riskMonitoring";
import intellApproval from "./intellApproval";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        meta: {
          title: "dashboard",
          icon: "homepage",
          breadcrumb: false,
          affix: true,
          keepAlive: true,
          alwaysShow: false,
        },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
];

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "系统管理",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
      code: [100],
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "user",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [101],
          showMenu: true,
        },
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "role",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [102],
          showMenu: true,
        },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "Menu",
        meta: {
          title: "菜单管理",
          icon: "menu",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [103],
          showMenu: true,
        },
      },
      {
        path: "dept",
        component: () => import("@/views/system/dept/index.vue"),
        name: "Dept",
        meta: {
          title: "组织管理",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [104],
          showMenu: true,
        },
      },
      {
        path: "operator",
        component: () => import("@/views/system/operator/index.vue"),
        name: "Operator",
        meta: {
          title: "日志管理",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          showMenu: true,
        },
      },
    ],
  },
  ...archives,
  ...warehousing,
  ...riskMonitoring,
  ...intellApproval,
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;

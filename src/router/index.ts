import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import archives from "./archives";
import warehousing from "./warehousing";
import riskMonitoring from "./riskMonitoring";
import intellApproval from "./intellApproval";
import { encryptData } from "@/utils/encryptAndDecrypt";

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
    path: "/introduce",
    component: () => import("@/views/Introduce/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/intellApproval",
    meta: { hidden: true },
    children: [
      // {
      //   path: "dashboard",
      //   component: () => import("@/views/dashboard/index.vue"),
      //   name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
      //   // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
      //   meta: {
      //     title: "dashboard",
      //     icon: "homepage",
      //     breadcrumb: false,
      //     affix: true,
      //     keepAlive: true,
      //     alwaysShow: false,
      //     activeMenu: "/",
      //   },
      // },
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
  ...riskMonitoring,
  ...intellApproval,
  ...archives,
  ...warehousing,
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
      activeMenu: "/system",
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "icon-yonghuguanli",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [101],
          showMenu: true,
          activeMenu: "/system",
        },
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "icon-xitongguanli",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [102],
          showMenu: true,
          activeMenu: "/system",
        },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "Menu",
        meta: {
          title: "菜单管理",
          icon: "icon-shenbaoliebiao",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [103],
          showMenu: true,
          activeMenu: "/system",
        },
      },
      {
        path: "dept",
        component: () => import("@/views/system/dept/index.vue"),
        name: "Dept",
        meta: {
          title: "组织管理",
          icon: "icon-zuzhiguanli",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [104],
          showMenu: true,
          activeMenu: "/system",
        },
      },
      {
        path: "operator",
        component: () => import("@/views/system/operator/index.vue"),
        name: "Operator",
        meta: {
          title: "日志管理",
          icon: "icon-rizhiguanli",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          showMenu: true,
          activeMenu: "/system",
        },
      },
    ],
  },
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

// 重写push方法
const originalPush = router.push;
router.push = function push(location: any) {
  // 在这里可以添加自定义逻辑
  if(location.query) {
    const keys = Object.keys(location.query)
    let newQuery: any = {}
    keys.forEach(item => {
      newQuery[item] = encryptData(location.query[item]);
    })
    location.query = newQuery;
  }
  return originalPush.call(this, location);
};

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;

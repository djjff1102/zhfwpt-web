import { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/warehousing",
    component: Layout,
    redirect: "/warehousing/index",
    meta: {
      title: "物流仓储管家",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
      code: [400],
      activeMenu: "/warehousing",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/warehousing/index.vue"),
        name: "Warehousing",
        meta: {
          title: "仓储",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [401],
          showMenu: true,
          activeMenu: "/warehousing",
        },
      },
      {
        path: "Logistics",
        component: () => import("@/views/warehousing/index.vue"),
        name: "Logistics",
        meta: {
          title: "物流",
          icon: "tree",
          activeMenu: "/warehousing",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [402],
          showMenu: true,
        },
      },
      {
        path: "",
        component: () => import("@/views/warehousing/index.vue"),
        name: "MyRelation",
        meta: {
          title: "我联系的",
          icon: "tree",
          activeMenu: "/warehousing",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [403],
          showMenu: true,
        },
      },
    ],
  },
];

export default routes;

import { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/intellApproval",
    component: Layout,
    redirect: "/intellApproval/index",
    meta: {
      title: "发票智能审批",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
      code: [500],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/intellApproval/index.vue"),
        name: "IntellApproval",
        meta: {
          title: "申报列表",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [501],
          showMenu: true,
        },
      },
      {
        path: "operate",
        component: () => import("@/views/intellApproval/add/index.vue"),
        name: "IntellApprovalOperate",
        meta: {
          title: "申报",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          // code: [501],
          showMenu: false,
        },
      },
    ],
  },
];

export default routes;

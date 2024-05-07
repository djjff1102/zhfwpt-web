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
      activeMenu: "/intellApproval",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/intellApproval/index.vue"),
        name: "IntellApproval",
        meta: {
          title: "申报列表",
          icon: "icon-shenbaoliebiao",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [501],
          showMenu: true,
          activeMenu: "/intellApproval",
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
          activeMenu: "/intellApproval",
        },
      },
      {
        path: "intellApprovalOrderDetail",
        component: () => import("@/views/intellApproval/detailOrder/index.vue"),
        name: "IntellApprovalOrderDetail",
        meta: {
          title: "订单详情",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          showMenu: false,
          activeMenu: "/intellApproval",
        },
      },
      {
        path: "detailHT",
        component: () => import("@/views/intellApproval/detailHT/index.vue"),
        name: "IntellApprovalHTDetail",
        meta: {
          title: "合同详情",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          showMenu: false,
          activeMenu: "/intellApproval",
        },
      },
      {
        path: "detailFP",
        component: () => import("@/views/intellApproval/detailFP/index.vue"),
        name: "IntellApprovalFPDetail",
        meta: {
          title: "发票详情",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          showMenu: false,
          activeMenu: "/intellApproval",
        },
      },
    ],
  },
];

export default routes;

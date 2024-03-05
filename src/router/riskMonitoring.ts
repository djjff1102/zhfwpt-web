import { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/riskMonitoring",
    component: Layout,
    redirect: "/riskMonitoring/detail",
    meta: {
      title: "风险监控中心",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
      code: [200],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/riskMonitoring/index.vue"),
        name: "RiskMonitoring",
        meta: {
          title: "整体概况",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [201],
        },
      },
      {
        path: "attention",
        component: () => import("@/views/riskMonitoring/attention.vue"),
        name: "RiskMonitoringAttention",
        meta: {
          title: "重点关注企业",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [202],
        },
      },
      {
        path: "attention",
        component: () => import("@/views/riskMonitoring/attention.vue"),
        name: "RiskMonitoringAttention",
        meta: {
          title: "风险企业列表",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [203],
        },
      },
      {
        path: "detail",
        component: () => import("@/views/riskMonitoring/detail/index.vue"),
        name: "RiskMonitoringDetail",
        meta: {
          title: "详情",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [204],
        },
      },
    ],
  },
];

export default routes;

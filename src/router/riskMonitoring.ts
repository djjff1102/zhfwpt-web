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
      code: [100],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/riskMonitoring/index.vue"),
        name: "RiskMonitoring",
        meta: {
          title: "RiskMonitoring",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
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
        },
      },
      {
        path: "detail",
        component: () => import("@/views/riskMonitoring/detail/index.vue"),
        name: "RiskMonitoringDetail",
        meta: {
          title: "RiskMonitoringDetail",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
];

export default routes;

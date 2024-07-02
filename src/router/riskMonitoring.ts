import { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/riskMonitoring",
    component: Layout,
    redirect: "/riskMonitoring/index",
    meta: {
      title: "风险监控中心",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: false,
      code: [200],
      activeMenu: "/riskMonitoring",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/riskMonitoring/index.vue"),
        name: "RiskMonitoring",
        meta: {
          title: "整体概况",
          icon: "icon-zhengtigaikuang",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: false,
          code: [201],
          showMenu: true,
          activeMenu: "/riskMonitoring",
        },
      },
      {
        path: "attention",
        component: () => import("@/views/riskMonitoring/attention.vue"),
        name: "RiskMonitoringAttention",
        meta: {
          title: "重点关注企业",
          icon: "icon-zhongdianguanzhuqiye",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: false,
          code: [202],
          showMenu: true,
          activeMenu: "/riskMonitoring",
        },
      },
      {
        path: "detail",
        component: () => import("@/views/archives/company/index.vue"),
        name: "CompanyDetailRisk",
        meta: {
          title: "企业详情",
          activeMenu: "/riskMonitoring",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: false,
          code: [202],
          showMenu: false,
        },
      },
      {
        path: "companylist",
        component: () => import("@/views/riskMonitoring/CompanyList.vue"),
        name: "CompanyList",
        meta: {
          title: "风险企业列表",
          activeMenu: "/riskMonitoring",
          icon: "icon-shenbaoliebiao",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: false,
          code: [203],
          showMenu: false,
        },
      },
      // {
      //   path: "detail",
      //   component: () => import("@/views/riskMonitoring/detail/index.vue"),
      //   name: "RiskMonitoringDetail",
      //   meta: {
      //     title: "详情",
      //     icon: "tree",
      //     hidden: false,
      //     roles: ["ADMIN"],
      //     keepAlive: false,
      //     code: [204],
      //     showMenu: false,
      //     activeMenu: "/riskMonitoring",
      //   },
      // },
    ],
  },
];

export default routes;

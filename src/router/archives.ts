import { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/archives",
    component: Layout,
    redirect: "/archives/search",
    meta: {
      title: "企业资信档案库",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true,
      code: [300],
      activeMenu: "/archives",
    },
    children: [
      {
        path: "search",
        component: () => import("@/views/archives/search/index.vue"),
        name: "Search",
        meta: {
          title: "search",
          icon: "icon-quanjujiansuo",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [301],
          showMenu: true,
          activeMenu: "/archives",
        },
      },
      {
        path: "companyDetail",
        component: () => import("@/views/archives/company/index.vue"),
        name: "CompanyDetail",
        meta: {
          title: "companyDetail",
          activeMenu: "/archives",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [302],
          showMenu: false,
        },
      },
      {
        path: "orderDetail",
        component: () =>
          import("@/components/OrderInformation/detail/index.vue"),
        name: "OrderDetail",
        meta: {
          title: "orderDetail",
          activeMenu: "/archives",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [303],
          showMenu: false,
        },
      },
      {
        path: "transactDetail",
        component: () =>
          import("@/components/TransactionVoucher/detail/index.vue"),
        name: "transactDetail",
        meta: {
          title: "transactDetail",
          activeMenu: "/archives",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [303],
          showMenu: false,
        },
      },
      {
        path: "warehousingOrderDetail",
        component: () =>
          import(
            "@/components/LogisticsWarehousingInformation/SecondWarehousingDetail/index.vue"
          ),
        name: "WarehousingOrderDetail",
        meta: {
          title: "warehousingOrderDetail",
          activeMenu: "/archives",
          icon: "tree",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [304],
          showMenu: false,
        },
      },
      {
        path: "attention",
        component: () => import("@/views/archives/attention/index.vue"),
        name: "Attention",
        meta: {
          title: "attention",
          icon: "icon-woguanzhude",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [304],
          showMenu: true,
          activeMenu: "/archives",
        },
      },
      {
        path: "fpdetail",
        component: () => import("@/components/fpdetail/index.vue"),
        name: "Fpdetail",
        meta: {
          title: "发票详情",
          icon: "icon-woguanzhude",
          hidden: true,
          roles: ["ADMIN"],
          keepAlive: true,
          code: [304],
          activeMenu: "/archives",
          showMenu: false,
        },
      },
    ],
  },
];

export default routes;

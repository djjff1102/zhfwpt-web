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
      code: [100],
    },
    children: [
      {
        path: "search",
        component: () => import("@/views/archives/search/index.vue"),
        name: "Search",
        meta: {
          title: "search",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "companyDetail",
        component: () => import("@/views/archives/company/index.vue"),
        name: "CompanyDetail",
        meta: {
          title: "companyDetail",
          activeMenu: "/archives/search",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "orderDetail",
        component: () =>
          import("@/components/OrderInformation/detail/index.vue"),
        name: "OrderDetail",
        meta: {
          title: "orderDetail",
          activeMenu: "/archives/search",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
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
          activeMenu: "/archives/search",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "attention",
        component: () => import("@/views/archives/attention/index.vue"),
        name: "Attention",
        meta: {
          title: "attention",
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

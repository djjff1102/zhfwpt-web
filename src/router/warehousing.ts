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
      code: [100],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/warehousing/index.vue"),
        name: "LogisticsWarehousing",
        meta: {
          title: "LogisticsWarehousing",
          icon: "tree",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "warehousingDetail",
        component: () =>
          import(
            "@/components/LogisticsWarehousingInformation/detail/index.vue"
          ),
        name: "warehousingDetail",
        meta: {
          title: "warehousingDetail",
          icon: "tree",
          activeMenu: "/warehousing/index",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
      {
        path: "secondWarehousingDetail",
        component: () =>
          import(
            "@/components/LogisticsWarehousingInformation/SecondWarehousingDetail/index.vue"
          ),
        name: "SecondWarehousingDetail",
        meta: {
          title: "secondWarehousingDetail",
          icon: "tree",
          activeMenu: "/warehousing/index",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true,
        },
      },
    ],
  },
];

export default routes;

import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { decryptData } from "@/utils/encryptAndDecrypt";

NProgress.configure({ showSpinner: false }); // 进度条

const permissionStore = usePermissionStoreHook();

// 白名单路由
const whiteList = ["/login", "/introduce"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("accessToken");
  // if (to.query) {
  //   to.query.encryptedData = CryptoJS.AES.encrypt(
  //     JSON.stringify(to.query),
  //     "Secret Passphrase"
  //   ).toString();
  // }
  if (hasToken) {
    if (to.path === "/login" || to.path === "/introduce") {
      // 如果已登录，跳转首页
      next({ path: "/" });
      NProgress.done();
    } else {
      const userStore = useUserStoreHook();
      const hasRoles =
        userStore.user.authorityCode && userStore.user.authorityCode.length > 0;
      if (hasRoles) {
        // 未匹配到任何路由，跳转404
        if (to.matched.length === 0) {
          // from.name ? next({ name: from.name }) : next("/404");
          from.name
            ? next({ path: from.path, query: from.query })
            : next("/404");
        } else {
          next();
        }
      } else {
        const { authorityCode } = await userStore.getUserInfo();
        const accessRoutes =
          await permissionStore.generateRoutes(authorityCode);
        accessRoutes.forEach((route) => {
          router.addRoute(route);
        });
        next({ ...to, replace: true });
        // try {

        // } catch (error) {
        //   // 移除 token 并跳转登录页
        //   await userStore.resetToken();
        //   next(`/login?redirect=${to.path}`);
        //   NProgress.done();
        // }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/introduce?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  if (to.query) {
    const keys = Object.keys(to.query);
    let newQuery: any = {};
    keys.forEach((item) => {
      newQuery[item] = decryptData(to.query[item] as any);
    });
    to.query = newQuery;
  }
  NProgress.done();
});

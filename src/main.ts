import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupDirective } from "@/directive";
import WinboxUI from "winbox-ui-next";
import "winbox-ui-next/dist/winbox.css";

import "@/permission";

// 本地SVG图标
import "virtual:svg-icons-register";

// 国际化
import i18n from "@/lang/index";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "./styles/element-variables.scss";

// iconfont
import "./assets/iconfont/iconfont.css";
import infiniteScroll from "vue3-infinite-scroll-better";
// import VueCryptojs from "vue-cryptojs";

const app = createApp(App);
// 加载ElementUi-icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);
app.use(WinboxUI);
app.use(infiniteScroll);
// app.use(VueCryptojs);
app.use(router).use(i18n).mount("#app");

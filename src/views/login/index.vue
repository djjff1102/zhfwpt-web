<template>
  <div class="login-container">
    <div class="login-main">
      <div class="left-position">
        <img src="../../assets/login/position.png"/>
      </div>
      <div class="right-position">
        <img src="../../assets/login/logo.png"/>
        <div class="login-title">大宗贸易综合服务平台</div>
        <div class="login-msg">欢迎登录</div>
        <div class="login-form">
          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginData"
            :rules="loginRules"
            class="login-form"
          >
            <el-form-item prop="user_name" :style="{width: '360px', height: '48px'}">
              <div class="p-2">
                <svg-icon icon-class="user" />
              </div>
              <el-input
                ref="username"
                v-model="loginData.user_name"
                class="flex-1"
                :placeholder="$t('login.username')"
                name="username"
              />
            </el-form-item>

            <el-tooltip
              :disabled="isCapslock === false"
              content="Caps lock is On"
              placement="right"
            >
              <el-form-item prop="password">
                <span class="p-2">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="loginData.password"
                  class="flex-1"
                  :placeholder="$t('login.password')"
                  :type="passwordVisible === false ? 'password' : 'input'"
                  size="large"
                  name="password"
                  @keyup="checkCapslock"
                  @keyup.enter="handleLogin"
                />
                <span class="mr-2" @click="passwordVisible = !passwordVisible">
                  <svg-icon
                    :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
                    class="cursor-pointer"
                  />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-button
              :loading="loading"
              type="primary"
              class="w-full"
              :style="{width: '360px', height: '48px'}"
              @click.prevent="handleLogin"
              >{{ $t("login.login") }}
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 登录表单 -->
    <!-- <el-card
      class="z-1 !border-none w-100 !bg-transparent !rounded-4% <sm:w-83"
    >
      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="user_name">
          <div class="p-2">
            <svg-icon icon-class="user" />
          </div>
          <el-input
            ref="username"
            v-model="loginData.user_name"
            class="flex-1"
            size="large"
            :placeholder="$t('login.username')"
            name="username"
          />
        </el-form-item>

        <el-tooltip
          :disabled="isCapslock === false"
          content="Caps lock is On"
          placement="right"
        >
          <el-form-item prop="password">
            <span class="p-2">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="loginData.password"
              class="flex-1"
              :placeholder="$t('login.password')"
              :type="passwordVisible === false ? 'password' : 'input'"
              size="large"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="handleLogin"
            />
            <span class="mr-2" @click="passwordVisible = !passwordVisible">
              <svg-icon
                :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
                class="cursor-pointer"
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          class="w-full"
          @click.prevent="handleLogin"
          >{{ $t("login.login") }}
        </el-button>
      </el-form>
    </el-card> -->

    <!-- ICP备案 -->
    <!-- <div
      class="absolute bottom-1 text-[10px] text-center"
      v-show="useAppStore().device == 'desktop'"
    >
      <p>Copyright © 2021 - 2023 anonymity 版权所有</p>
      <p>皖ICP备xxx号</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { sha256 } from "js-sha256";
import router from "@/router";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useSettingsStore } from "@/store/modules/settings";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { LoginData } from "@/api/auth/types";

/**
 * 根据屏幕宽度切换设备模式
 */
const appStore = useAppStore();
const WIDTH = 992; // 响应式布局容器固定宽度  大屏（>=1200px） 中屏（>=992px） 小屏（>=768px）
const { width } = useWindowSize();
watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.toggleDevice("mobile");
  } else {
    appStore.toggleDevice("desktop");
  }
});

const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const passwordVisible = ref(false); // 密码是否可见
const loginFormRef = ref(ElForm); // 登录表单ref

const loginData = ref<LoginData>({
  user_name: "admin",
  password: "DJdzmy@2024~",
});

const { t } = useI18n();
const loginRules = computed(() => {
  const prefix = appStore.language === "en" ? "Please enter " : "请输入";
  return {
    user_name: [
      {
        required: true,
        trigger: "blur",
        message: `${prefix}${t("login.username")}`,
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: any, callback: any) => {
          if (value.length < 6) {
            callback(new Error("The password can not be less than 6 digits"));
          } else {
            callback();
          }
        },
        message: `${prefix}${t("login.password")}`,
      },
    ],
  };
});

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}

/**
 * 登录
 */
const route = useRoute();
const userStore = useUserStore();
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const { user_name, password } = loginData.value;
      userStore
        .login({
          user_name,
          password: sha256(password),
          // password,
        })
        .then(() => {
          const query: LocationQuery = route.query;

          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
          // 验证失败
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

onMounted(() => {
  // 主题初始化
  const theme = useSettingsStore().theme;
  useSettingsStore().changeSetting({ key: "theme", value: theme });
  if (theme == "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: myFont;
  src: url('@/assets/iconfont/aliht.ttf')
}
.login-main {
  display: flex;
  justify-content: center;
  .left-position {
    padding: 60px 24px 60px 8px;
    background-color: rgba(205, 226, 255, 1);
    border-radius: 12px 0px 0px 12px;
    img {
      width: 554px;
      height: 520px;
    }
  }
  .right-position {
    border-radius: 0px 12px 12px 0px;
    background-color: #fff;
    width: 457px;
  }
}

.right-position{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 78px;
  img {
    width: 64px;
    height: 52px;
  }
  .login-title {
    font-family: myFont;
    font-weight: bold;
    font-size: 30px;
    color: #333333;
    line-height: 36px;
    margin-top: 14px;
  }
  .login-msg {
    font-size: 20px;
    color: #333;
    line-height: 33px;
    font-weight: 300;
    margin-top: 20px;
  }
}

.dark .login-container {
  background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
}

.login-container {
  @apply w-full h-full flex-center;

  overflow-y: auto;
  background-image: url("@/assets/login/bg.png");
  // background: url("@/assets/images/login-bg.jpg") no-repeat center right;

  .login-form {
    padding: 30px 10px;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      .image-slot {
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: var(--el-text-color-secondary);
        background: var(--el-fill-color-light);

        svg {
          margin-right: 10px;
        }
      }
    }
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      transition: background-color 1000s ease-in-out 0s; /* 通过延时渲染背景色变相去除背景颜色 */
    }
  }
}
</style>

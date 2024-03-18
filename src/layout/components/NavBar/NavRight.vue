<template>
  <!-- 导航栏设置(窄屏隐藏)-->
  <div v-if="device !== 'mobile'" class="setting-container">
    <!--全屏 -->
    <!-- <div class="setting-item" @click="toggle">
      <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
    </div> -->
    <!-- 布局大小 -->
    <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
      <size-select class="setting-item" />
    </el-tooltip> -->
  </div>

  <!-- 用户头像 -->
  <div class="avatar-container">
    <div class="avatar_name text-[#FFF]">欢迎您，{{ userStore.user.name }}</div>
    <div class="avatar w-[36px] h-[36px] ml-[12px]">
      <img
        class="!w-full !h-full object-cover"
        src="@/assets/base/avatar.png"
        alt="avatar"
      />
    </div>
    <i
      @click="logout"
      class="mr-[17px] ml-[14px] iconfont icon-close text-[#FFF]"
    ></i>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { useTagsViewStore } from "@/store/modules/tagsView";
import { useUserStore } from "@/store/modules/user";

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const { device } = storeToRefs(appStore); // 设备类型：desktop-宽屏设备 || mobile-窄屏设备

/**
 * vueUse 全屏
 */
const { isFullscreen, toggle } = useFullscreen();

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.meta.activeMenu}`);
      });
  });
}

</script>
<style lang="scss" scoped>
.setting-container {
  display: flex;
  align-items: center;

  .setting-item {
    display: inline-block;
    width: 30px;
    height: 50px;
    line-height: 50px;
    color: var(--el-text-color-regular);
    text-align: center;
    cursor: pointer;

    &:hover {
      background: var(--el-disabled-bg-color);
    }
  }
}

.avatar-container {
  display: flex;
  place-items: center center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
}
</style>

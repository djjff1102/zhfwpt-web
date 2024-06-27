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
    <!-- 用户信息 trigger="click"-->
    <el-popover
      placement="bottom-start"
      :width="375"
    >
      <template #reference>
        <div class="avatar w-[36px] h-[36px] ml-[12px]">
          <img
            class="!w-full !h-full object-cover"
            src="@/assets/base/avatar.svg"
            alt="avatar"
          />
        </div>
      </template>
      <UserInfo></UserInfo>
    </el-popover>
    <!-- 消息通知 trigger="click"-->
    <el-popover
      placement="bottom-start"
      :width="507"
    >
      <template #reference>
        <div class="avatar w-[20px] h-[20px] ml-[12px]" @click="handleOpenNotice">
          <img class="!w-full !h-full object-cover" src="@/assets/base/notice.svg">
          <span class="notice-num">{{ total }}</span>
        </div>
      </template>
      <NoticeInfo></NoticeInfo>
    </el-popover>
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
import UserInfo from './UserInfo.vue'
import NoticeInfo from './NoticeInfo.vue'

import { useNoticeApprovalStore } from '@/store/modules/notice'

const noticeStore = useNoticeApprovalStore();

const total = computed(() => noticeStore.total)

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

const popover = ref();

// 打开消息列表
function handleOpenNotice() {
  
}

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm("请确认是否退出登录？", "提示", {
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

.avatar {
  position: relative;
  .notice-num {
    position: absolute;
    top: 0;
    right: -10px;
    font-size: 12px;
    line-height: 20px;;
    background: red;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
  }
}

:deep(.el-popper__arrow::before) {

    display: none!important;
    position: static;

    z-index: -1;

}
</style>

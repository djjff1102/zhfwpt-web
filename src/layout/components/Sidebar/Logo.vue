<script lang="ts" setup>
import defaultSettings from "@/settings";
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href);
</script>

<template>
  <div class="w-full h-[64px] dark:bg-[var(--el-bg-color-overlay)] logo-wrap">
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <img
          v-if="settingsStore.sidebarLogo"
          :src="logo"
          class="w-10 h-10 ml-[23px] mr-[9px]"
        />
        <img src="@/assets/base/title.png" alt="" class="h-[22px]" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>

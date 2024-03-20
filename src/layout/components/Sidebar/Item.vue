<template>
  <i class="iconfont" :class="icon"></i>
  <!-- <el-icon v-if="icon && icon.includes('el-icon')" class="sub-el-icon" />
  <SvgIcon v-else-if="icon" :icon-class="icon" /> -->
  <span class="title" v-if="title">{{ translateRouteTitle(title) }}</span>
</template>

<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentcolor;
}
.title {
  display: inline-block;
  padding-left: 8px;
  font-weight: 500;
}
</style>

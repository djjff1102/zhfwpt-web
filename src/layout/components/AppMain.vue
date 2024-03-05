<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView";

const tagsViewStore = useTagsViewStore();
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <!-- <keep-alive :include="tagsViewStore.cachedViews"> -->
          <div class="app-wrap">
            <component :is="Component" :key="route.fullPath" />
          </div>
          <!-- </keep-alive> -->
        </transition>
      </template>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  /* 50= navbar  50  */
  height: calc(100vh - 118px);

  /* 64= navbar  64  */
  min-height: calc(100vh - 64px);
  overflow: hidden;
  background-color: $pageBg;
}
.app-wrap {
  height: 100%;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 34px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}

.isMix {
  .app-main {
    margin-top: 54px;
    height: calc(100vh - 118px);
    padding-top: 40px;
    padding: 0px 16px 16px 16px;
    overflow-y: auto;
  }

  .hasTagsView {
    .app-main {
      /* 98 = navbar + tags-view = 64 + 34 */
      height: calc(100vh - 64px);
    }

    .fixed-header + .app-main {
      height: calc(100vh - 118px);
      padding-top: 40px;
      padding: 54px 16px 16px 16px;
    }
  }
}
</style>

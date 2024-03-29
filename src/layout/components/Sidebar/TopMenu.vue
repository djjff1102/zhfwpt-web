<script lang="ts" setup>
import { usePermissionStore } from "@/store/modules/permission";
import variables from "@/styles/variables.module.scss";
import { useAppStore } from "@/store/modules/app";
import { translateRouteTitle } from "@/utils/i18n";
import { useRouter, useRoute } from "vue-router";

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

watch(
  () => route,
  (path) => {
    nextTick(() => {
      if(path.meta.activeMenu != activePath.value) {
        activePath.value = path.meta.activeMenu as any
        // appStore.changeTopActive(path.meta.activeMenu as string);
      }
    })
  },{
    deep: true, // 确保深度监听路由对象的每一个属性
    immediate: true
  }
);

const activePath = ref('') // 全局不存储当前激活的菜单
// const activePath = computed(() => appStore.activeTopMenu);

// 递归跳转
const goFirst = (menu: any[]) => {
  if (!menu.length) return;
  const [first] = menu;
  if (first.children) {
    goFirst(first.children);
  } else {
    router.push({
      name: first.name,
    });
  }
};

const waitPath = reactive(['/warehousing', '/riskMonitoring']);
const selectMenu = (index: string, item: any) => {
  if(waitPath.includes(index)) {
    ElMessage.warning("敬请期待！");
  } else {
    appStore.changeTopActive(index);
    permissionStore.getMixLeftMenu(index);
    const { mixLeftMenu } = permissionStore;
    goFirst(mixLeftMenu);
  }
};
const permissionStore = usePermissionStore();
const topMenu = ref<any[]>([]);
onMounted(() => {
  topMenu.value = permissionStore.routes.filter(
    (item) => !item.meta || !item.meta.hidden
  );
});
</script>
<template>
  <el-scrollbar>
    <el-menu
      mode="horizontal"
      :default-active="activePath"
      :text-color="variables.topMenuText"
      :active-text-color="variables.topMenuActiveText"
      @select="selectMenu"
    >
      <el-menu-item
        v-for="route in topMenu"
        :key="route.path"
        :index="route.path"
      >
        <template #title>
          <!-- <svg-icon
            v-if="route.meta && route.meta.icon"
            :icon-class="route.meta.icon"
          /> -->
          <span v-if="route.path === '/'"> 首页 </span>
          <template v-else>
            <span v-if="route.meta && route.meta.title">
              {{ translateRouteTitle(route.meta.title) }}
            </span>
          </template>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.el-menu {
  height: 64px !important;
  padding-left: 84px;
  font-size: 18px;
}
:deep(.el-menu-item) {
  font-size: 18px;
  font-weight: 500;
}
:deep(.el-menu-item.is-active::after) {
  border-radius: 2px;
}
</style>

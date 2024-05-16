<script setup lang="ts">
import { TinyTable } from "@/components/TinyTable/index";

defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Menu",
  inheritAttrs: false,
});

import { MenuVO } from "@/api/menu/types";
import { listMenus, deleteMenu, updateMenu } from "@/api/menu";

import menuDialog from "./menuDialog.vue";
import functionDialog from "./functionDialog.vue";
import { MenuDialogConfigEnum, getMenuColumns } from "./menu.data";

const menuDialogRef = ref(menuDialog);
const functionDialogRef = ref(functionDialog);

const loading = ref(false);

const menuList = ref<MenuVO[]>([]);

/**
 * 查询
 */
function handleQuery() {
  // 重置父组件
  loading.value = true;
  listMenus()
    .then(({ data }) => {
      menuList.value = data;
    })
    .then(() => {
      loading.value = false;
    });
}

/**
 * 打开 功能配置 弹窗
 */
function openFunctionDialog(menuId: string) {
  functionDialogRef.value?.showDialog(menuId);
}

/**
 * 打开菜单Form弹窗
 */
function openDialog(
  type: MenuDialogConfigEnum = MenuDialogConfigEnum.ADD_MENU,
  row?: MenuVO
) {
  menuDialogRef.value?.showDialog(type, row);
}

/** 删除菜单 */
function handleDelete(menuId: string) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteMenu(menuId).then(() => {
        ElMessage.success("删除成功");
        handleQuery();
      });
    })
    .catch(() => ElMessage.info("已取消删除"));
}

/**
 * 修改菜单状态
 */
function updateMenuItem(row: MenuVO) {
  updateMenu(row)
    .then(() => {
      ElMessage.success("修改成功");
    })
    .catch(() => {
      ElMessage.info("修改失败");
    })
    .finally(() => {
      handleQuery();
    });
}

const menuColumns = getMenuColumns(
  updateMenuItem,
  openDialog,
  openFunctionDialog,
  handleDelete
);

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="table-container pt-[16px]">
      <template #header>
        <div class="flex justify-end items-center">
          <w-button type="primary" @click="openDialog()"> 新增</w-button>
        </div>
      </template>

      <tiny-table
        v-loading="loading"
        :data="menuList"
        highlight-current-row
        row-key="id"
        :expand-row-keys="['1']"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
        :columns="menuColumns"
      />
    </el-card>

    <!-- menu dialog -->
    <menuDialog ref="menuDialogRef" @success="handleQuery" />

    <!-- 功能配置 弹窗 -->
    <functionDialog ref="functionDialogRef" />
  </div>
</template>

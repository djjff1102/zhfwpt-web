<script setup lang="ts">
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Menu",
  inheritAttrs: false,
});

import { MenuForm, MenuVO } from "@/api/menu/types";
import { listMenus, deleteMenu, updateMenu } from "@/api/menu";

import SvgIcon from "@/components/SvgIcon/index.vue";
import menuDialog from "./menuDialog.vue";
import functionDialog from "./functionDialog.vue";
import { MenuDialogConfigEnum } from "./menu.data";

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
function handleStatusChange(row: MenuVO) {
  updateMenuItem(row);
}

function updateMenuItem(row: MenuForm) {
  updateMenu(row)
    .then(() => {
      ElMessage.success("修改成功");
    })
    .catch(() => {
      ElMessage.info("修改失败");
      row.enable_flag = !row.enable_flag;
    });
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button
          v-hasPerm="['sys:menu:add']"
          type="success"
          @click="openDialog()"
        >
          <template #icon><i-ep-plus /></template>
          新增</el-button
        >
      </template>

      <el-table
        v-loading="loading"
        :data="menuList"
        highlight-current-row
        row-key="id"
        :expand-row-keys="['1']"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
      >
        <el-table-column label="菜单名称" min-width="250">
          <template #default="scope">
            <svg-icon :icon-class="scope.row.icon" />
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column
          label="路由路径"
          align="left"
          width="150"
          prop="routing_address"
        />

        <el-table-column
          label="路由编码"
          align="left"
          width="250"
          prop="code"
        />

        <el-table-column label="排序" align="center" width="80" prop="sort" />

        <el-table-column label="状态" align="center" width="80">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable_flag"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="备注" align="left" width="250" prop="remark" />

        <el-table-column fixed="right" align="center" label="操作" width="320">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="
                openDialog(MenuDialogConfigEnum.UPDATE_MENU, scope.row)
              "
            >
              <i-ep-edit />编辑
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="
                openDialog(MenuDialogConfigEnum.ADD_SUB_MENU, scope.row)
              "
            >
              <i-ep-plus />子菜单配置
            </el-button>

            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openFunctionDialog(scope.row.id)"
            >
              <i-ep-plus />功能配置
            </el-button>

            <el-button
              type="primary"
              link
              size="small"
              @click.stop="handleDelete(scope.row.id)"
              ><i-ep-delete />
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- menu dialog -->
    <menuDialog ref="menuDialogRef" @success="handleQuery" />

    <!-- 功能配置 弹窗 -->
    <functionDialog ref="functionDialogRef" />
  </div>
</template>

<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    destroy-on-close
    append-to-body
    width="1000px"
    @close="closeDialog"
  >
    <el-card shadow="never" class="table-container">
      <template #header>
        <div class="flex justify-end items-center">
          <el-button
            @click="
              openFuncFormDialog(ResourceDialogConfigEnum.ADD_RESOURCE, {
                id: curMenuId,
              })
            "
            type="success"
            ><i-ep-plus />新增</el-button
          >
        </div>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="list"
        highlight-current-row
        @selection-change="handleSelectionChange"
        max-height="500"
      >
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column label="功能名称" prop="name" />
        <el-table-column label="功能编码" prop="code" />
        <el-table-column label="功能类型" prop="type">
          <template #default="scope">
            {{
              sourceOptions.find((item) => item.value === scope.row.type)?.label
            }}
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="
                openFuncFormDialog(
                  ResourceDialogConfigEnum.UPDATE_RESOURCE,
                  scope.row
                )
              "
              link
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              @click="handleDelete(scope.row.id)"
              size="small"
              link
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </template>
  </el-dialog>
  <editFuncDialog ref="editFuncDialogRef" @success="handleQuery" />
</template>

<script setup lang="ts">
import { deleteFuncResource, getMenuFuncsById } from "@/api/menu";
import { MenuFuncsProps } from "@/api/menu/types";
import { sourceOptions, ResourceDialogConfigEnum } from "./menu.data";

import editFuncDialog from "./editFuncDialog.vue";

defineOptions({
  name: "FunctionDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const editFuncDialogRef = ref(editFuncDialog);

const dialog = ref({
  visible: false,
  title: "功能配置",
});
const loading = ref(false);
const ids = ref<string[]>([]);
const list = ref<MenuFuncsProps[]>([]);
const curMenuId = ref("");

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

function handleQuery() {
  loading.value = true;
  getFuncsById(curMenuId.value);
}

function getFuncsById(menuId: string) {
  getMenuFuncsById(menuId)
    .then((res) => {
      list.value = res.data.filter((item) => {
        return item.type === "2" || item.type === "5";
      });
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 删除资源 */
function handleDelete(resourceId: string) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteFuncResource(resourceId)
      .then(() => {
        ElMessage.success("删除成功");
        handleQuery();
      })
      .finally(() => (loading.value = false));
  });
}

function showDialog(menuId: string) {
  curMenuId.value = menuId;
  handleQuery();
  dialog.value.visible = true;
}

function openFuncFormDialog(
  type: ResourceDialogConfigEnum,
  row?: MenuFuncsProps
) {
  editFuncDialogRef.value?.showDialog(type, row);
}

function closeDialog() {
  dialog.value.visible = false;
  resetForm();
}

function resetForm() {
  curMenuId.value = "";
}

defineExpose({
  showDialog,
});
</script>

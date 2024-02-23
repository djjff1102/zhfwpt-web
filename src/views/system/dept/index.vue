<script setup lang="ts">
import { deleteDept, listDepts } from "@/api/dept";

import { DeptVO, DeptQuery, DeptForm } from "@/api/dept/types";

import deptFormDialog from "./deptFormDialog.vue";

defineOptions({
  name: "Dept",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const deptFormDialogRef = ref(deptFormDialog);

const loading = ref(false);

const queryParams = reactive<DeptQuery>({
  page: 1,
  page_size: 999,
  name: "",
});

const deptList = ref<DeptVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  listDepts(queryParams).then(({ data }) => {
    deptList.value = data;
    loading.value = false;
  });
}

/**重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

/**
 * 打开弹窗
 */
async function openDialog(param?: DeptForm | string) {
  deptFormDialogRef.value?.showDialog(param);
}

/** 删除部门 */
function handleDelete(deptId?: string) {
  ElMessageBox.confirm(`确认删除已选中的数据项?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteDept(deptId).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

onMounted(() => {
  handleQuery();
});
</script>
<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model.trim="queryParams.name"
            placeholder="部门名称"
            maxlength="20"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-has-perm="['105']"
            class="filter-item"
            type="primary"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button v-has-perm="['106']" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <div class="flex justify-end items-center">
          <el-button v-has-perm="['107']" type="success" @click="openDialog()"
            ><i-ep-plus />新增</el-button
          >
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="deptList"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="部门名称" />

        <el-table-column label="操作" fixed="right" align="left" width="200">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              v-has-perm="['107']"
              @click.stop="openDialog(scope.row.id)"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              v-has-perm="['108']"
              @click.stop="openDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              v-has-perm="['109']"
              @click.stop="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 部门表单 弹窗 -->
    <deptFormDialog ref="deptFormDialogRef" @success="handleQuery" />
  </div>
</template>

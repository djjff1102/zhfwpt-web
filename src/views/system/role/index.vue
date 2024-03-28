<script setup lang="ts">
import { TinyTable } from "@/components/TinyTable/index";
import { getRolePage, deleteRoleById } from "@/api/role";

import { RolePageVO, RoleQuery } from "@/api/role/types";

import authorityDialog from "./authorityDialog.vue";
import infoPremissionDialog from "./infoPremissionDialog.vue";
import roleDialog from "./roleDialog.vue";
import {
  RoleDialogConfigEnum,
  areaTypeOptions,
  getRoleColumns,
} from "./role.data";

defineOptions({
  name: "Role",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const roleDialogRef = ref(roleDialog);
const authorityDialogRef = ref(authorityDialog);
const infoPremissionDialogRef = ref(infoPremissionDialog);

const dialogMap = {
  [RoleDialogConfigEnum.CREATE_ROLE]: roleDialogRef,
  [RoleDialogConfigEnum.UPDATE_ROLE]: roleDialogRef, // 假设用同一个 dialog，但不同的配置
  [RoleDialogConfigEnum.AUTHORITY_ROLE]: authorityDialogRef,
  [RoleDialogConfigEnum.INFOR_PERMISSION_ROLE]: infoPremissionDialogRef,
};

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<RoleQuery>({
  page: 1,
  page_size: 10,
  name: "",
  area_type: "",
  create_user_name: "",
});

const roleList = ref<RolePageVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  getRolePage(queryParams)
    .then((res) => {
      console.log(res);
      roleList.value = res.data;
      total.value = +(res?.total || 0);
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.page = 1;
  handleQuery();
}

/** 删除角色 */
function handleDelete(roleId: string) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    deleteRoleById(roleId)
      .then(() => {
        ElMessage.success("删除成功");
        resetQuery();
      })
      .finally(() => (loading.value = false));
  });
}

/**
 * 打开 权限 弹窗
 */
function openMenuDialog(type: RoleDialogConfigEnum, row?: RolePageVO) {
  dialogMap[type].value?.showDialog(row);
}

const roleColumns = getRoleColumns(openMenuDialog, handleDelete);

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="角色名称">
          <el-input
            v-model.trim="queryParams.name"
            placeholder="请输入角色名称"
            maxlength="40"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="层级" prop="area_type">
          <el-select
            class="!w-[100px]"
            v-model="queryParams.area_type"
            placeholder="全部"
            clearable
          >
            <el-option
              v-for="item in areaTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="create_user_name" label="添加人">
          <el-input
            v-model.trim="queryParams.create_user_name"
            placeholder="请输入添加人"
            maxlength="40"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <w-button type="primary" @click="handleQuery">搜索</w-button>
          <w-button @click="resetQuery">重置</w-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <div class="flex justify-end items-center">
          <w-button
            type="primary"
            @click="openMenuDialog(RoleDialogConfigEnum.CREATE_ROLE)"
            >新增</w-button
          >
        </div>
      </template>

      <tiny-table
        ref="dataTableRef"
        v-loading="loading"
        :data="roleList"
        highlight-current-row
        :columns="roleColumns"
        show-index-column
      />

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.page"
        v-model:limit="queryParams.page_size"
        @pagination="handleQuery"
      />
    </el-card>

    <!-- 角色表单弹窗 -->
    <roleDialog ref="roleDialogRef" @success="handleQuery" />

    <!-- 菜单权限 弹窗 -->
    <authorityDialog ref="authorityDialogRef" />

    <!-- 信息权限 弹窗 -->
    <infoPremissionDialog ref="infoPremissionDialogRef" />
  </div>
</template>

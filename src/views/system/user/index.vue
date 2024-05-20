<!-- 用户管理 -->
<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { TinyTable } from "@/components/TinyTable/index";
defineOptions({
  name: "User",
  inheritAttrs: false,
});

import { getUserPage, deleteUser, updateUserPassword } from "@/api/user";
import { getRolePage } from "@/api/role";

import { UserQuery, UserPageVO } from "@/api/user/types";

import userFormDialog from "./userFormDialog.vue";
import { RolePageVO } from "@/api/role/types";
import { getUserColumns, levelList } from "./user.data";

const queryFormRef = ref(ElForm); // 查询表单

const userFormDialogRef = ref(userFormDialog);

const loading = ref(false); //  加载状态
const queryParams = reactive<UserQuery>({
  page: 1,
  page_size: 10,
  organization_id: "1",
  system_type: 0,
  current: "",
});
const totalCount = ref(0); // 数据总数
const pageData = ref<UserPageVO[]>(); // 用户分页数据

const roleList = useStorage("roleList", [] as RolePageVO[]); // 角色下拉数据源
const filterLevelList = computed(() => {
  return curSelectedTreeNodeLevel.value !== 3
    ? levelList
    : levelList.slice(0, 2);
});

/** 查询 */
function handleQuery() {
  loading.value = true;
  getUserPage(queryParams)
    .then(({ data, total }) => {
      pageData.value = data;
      totalCount.value = +(total || 0);
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

/** 重置密码 */
function resetPassword(row: UserPageVO) {
  ElMessageBox.confirm("是否确定重置该用户密码", "重置密码", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(() => {
    updateUserPassword(row.id).then((res) => {
      ElMessage.success(res.message);
    });
  });
}

/**
 * 打开弹窗
 *
 */
async function openDialog(row?: UserPageVO) {
  userFormDialogRef.value?.showDialog(row);
}

/** 删除用户 */
function handleDelete(id: string) {
  ElMessageBox.confirm("确认删除用户?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(function () {
    deleteUser(id).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

// 修改状态
function handleStatusChange(row: UserPageVO) {
  userFormDialogRef.value?.updateUserByForm(row);
}

function getRoleOptions() {
  getRolePage(queryParams).then((res) => {
    roleList.value = res.data;
  });
}

const curSelectedTreeNodeLevel = ref(1);
function handleNodeClick(curLevel: number) {
  curSelectedTreeNodeLevel.value = curLevel;

  handleQuery();
}

const userColumns = getUserColumns(
  handleStatusChange,
  resetPassword,
  openDialog,
  handleDelete
);

onMounted(() => {
  // 角色options
  getRoleOptions();
  handleQuery()
});
</script>

<template>
  <div class="app-container">
    <el-row>
      <!-- 部门树 -->
      <el-col :lg="6" :xs="24">
        <dept-tree
          v-model="queryParams.organization_id"
          @node-click="handleNodeClick"
        />
      </el-col>

      <!-- 用户列表 -->
      <el-col :lg="18" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="层级" prop="current" class="!w-[200px]">
              <el-select
                clearable
                @clear="handleQuery"
                v-model="queryParams.current"
                placeholder="全部"
              >
                <el-option
                  v-for="(item, index) in filterLevelList"
                  :key="`level-${index}`"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="角色" prop="role_id" class="!w-[200px]">
              <el-select
                clearable
                @clear="handleQuery"
                v-model="queryParams.role_id"
                placeholder="全部"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :key="`role-${index}`"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="真实姓名" prop="real_name">
              <el-input
                v-model.trim="queryParams.real_name"
                placeholder="请输入真实姓名"
                maxlength="40"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item label="用户名称" prop="name">
              <el-input
                v-model.trim="queryParams.name"
                placeholder="请输入用户名称"
                maxlength="40"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model.trim="queryParams.phone"
                placeholder="请输入手机号"
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
              <div>
                <w-button type="primary" @click="openDialog()">新增</w-button>
              </div>
            </div>
          </template>

          <tiny-table
            ref="dataTableRef"
            v-loading="loading"
            :data="pageData"
            highlight-current-row
            :columns="userColumns"
            show-index-column
          />

          <pagination
            v-if="totalCount > 0"
            v-model:total="totalCount"
            v-model:page="queryParams.page"
            v-model:limit="queryParams.page_size"
            @pagination="handleQuery"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <userFormDialog
      ref="userFormDialogRef"
      @success="handleQuery"
      v-model="queryParams.organization_id"
    />
  </div>
</template>

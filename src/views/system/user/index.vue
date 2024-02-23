<!-- 用户管理 -->
<script setup lang="ts">
import { useStorage } from "@vueuse/core";
defineOptions({
  name: "User",
  inheritAttrs: false,
});

import { getUserPage, deleteUser, updateUserPassword } from "@/api/user";
import { getRolePage } from "@/api/role";

import { UserQuery, UserPageVO } from "@/api/user/types";

import userFormDialog from "./userFormDialog.vue";
import { RolePageVO } from "@/api/role/types";

const queryFormRef = ref(ElForm); // 查询表单

const userFormDialogRef = ref(userFormDialog);

const loading = ref(false); //  加载状态
const queryParams = reactive<UserQuery>({
  page: 1,
  page_size: 10,
  organization_id: "1",
  system_type: 0,
});
const totalCount = ref(0); // 数据总数
const pageData = ref<UserPageVO[]>(); // 用户分页数据

const roleList = useStorage("roleList", [] as RolePageVO[]); // 角色下拉数据源

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
function resetPassword(row: { [key: string]: any }) {
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
function handleStatusChange(row: any) {
  console.log(row);
  userFormDialogRef.value?.updateUserByForm(row);
}

function getRoleOptions() {
  getRolePage(queryParams).then((res) => {
    roleList.value = res.data;
  });
}

onMounted(() => {
  // 角色options
  getRoleOptions();
});
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 部门树 -->
      <el-col :lg="6" :xs="24" class="mb-[12px]">
        <dept-tree
          v-model="queryParams.organization_id"
          @node-click="handleQuery"
        />
      </el-col>

      <!-- 用户列表 -->
      <el-col :lg="18" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户名称" prop="name">
              <el-input
                v-model.trim="queryParams.name"
                placeholder="请输入用户名称"
                maxlength="40"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleQuery"
                ><i-ep-search />搜索</el-button
              >
              <el-button @click="resetQuery">
                <i-ep-refresh />
                重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <el-card shadow="never" class="table-container">
          <template #header>
            <div class="flex justify-end items-center">
              <div>
                <el-button
                  v-hasPerm="['sys:user:add']"
                  type="success"
                  @click="openDialog()"
                  ><i-ep-plus />新增</el-button
                >
              </div>
            </div>
          </template>

          <el-table v-loading="loading" :data="pageData">
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column
              key="name"
              label="用户名"
              width="120"
              show-overflow-tooltip
              align="center"
              prop="name"
            />
            <el-table-column
              label="真实姓名"
              width="120"
              align="center"
              prop="real_name"
            />

            <el-table-column
              label="部门"
              width="200"
              show-overflow-tooltip
              align="center"
              prop="organization_name"
            />

            <el-table-column
              label="角色"
              width="120"
              align="center"
              prop="role_name"
            />

            <el-table-column label="状态" align="center" prop="enable_flag">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.enable_flag"
                  @change="handleStatusChange(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="添加时间"
              align="center"
              prop="create_date"
              width="180"
            />
            <el-table-column label="操作" fixed="right" width="220">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  link
                  @click="resetPassword(scope.row)"
                  >重置密码</el-button
                >
                <el-button
                  type="primary"
                  link
                  size="small"
                  @click="openDialog(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="primary"
                  link
                  size="small"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

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

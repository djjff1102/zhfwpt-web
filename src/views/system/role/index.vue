<script setup lang="ts">
import { getRolePage, deleteRoleById } from "@/api/role";

import { RolePageVO, RoleQuery } from "@/api/role/types";

import authorityDialog from "./authorityDialog.vue";
import infoPremissionDialog from "./infoPremissionDialog.vue";
import roleDialog from "./roleDialog.vue";

defineOptions({
  name: "Role",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const roleDialogRef = ref(roleDialog);
const authorityDialogRef = ref(authorityDialog);
const infoPremissionDialogRef = ref(infoPremissionDialog);

const loading = ref(false);
const ids = ref<number[]>([]);
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

/** 行checkbox 选中事件 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
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
 * ref： 对应弹窗的ref
 */
function openMenuDialog(ref: any, row?: RolePageVO) {
  ref?.showDialog(row);
}

// 修改状态
function handleStatusChange(row: any) {
  // console.log(row);
}

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
            v-model="queryParams.name"
            placeholder="请输入角色名称"
            maxlength="20"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="层级" prop="area_type">
          <el-select
            v-model="queryParams.area_type"
            placeholder="全部"
            clearable
          >
            <el-option label="校级" :value="1" />
            <el-option label="院级" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item prop="create_user_name" label="添加人">
          <el-input
            v-model="queryParams.create_user_name"
            placeholder="请输入添加人"
            maxlength="20"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <!-- <el-form-item prop="keywords" label="角色编号">
          <el-input
            v-model="queryParams.keywords"
            placeholder="请输入角色编号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item> -->

        <!-- <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="全部"
            clearable
            class="!w-[100px]"
          >
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="handleQuery"
            ><i-ep-search />搜索</el-button
          >
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button type="success" @click="openMenuDialog(roleDialogRef)"
          ><i-ep-plus />新增</el-button
        >
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="roleList"
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="角色名称" prop="name" min-width="100" />
        <el-table-column label="描述" prop="remark" width="150" />
        <el-table-column label="编号" prop="code" width="150" />
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="创建人"
          align="center"
          prop="create_user_name"
        />
        <el-table-column label="创建时间" align="center" prop="create_date" />
        <el-table-column label="修改人" align="center" prop="sort" />
        <el-table-column label="修改时间" align="center" prop="sort" />

        <el-table-column fixed="right" label="操作" width="320">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="openMenuDialog(roleDialogRef, scope.row)"
            >
              <i-ep-edit />编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openMenuDialog(authorityDialogRef, scope.row)"
            >
              <i-ep-position />菜单权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="openMenuDialog(infoPremissionDialogRef, scope.row)"
            >
              <i-ep-position />信息权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="handleDelete(scope.row.id)"
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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

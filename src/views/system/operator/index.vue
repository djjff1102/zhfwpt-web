<script setup lang="ts">
import { getOperatorPage } from "@/api/operator";
import { OperatorPageVO, OperatorQuery } from "@/api/operator/types";

defineOptions({
  name: "Operator",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);

const loading = ref(false);
const total = ref(0);

const operatorTime = ref<any>([]);
const queryParams = reactive<OperatorQuery>({
  page: 1,
  page_size: 10,
  name: "",
  organization: "",
  role: "",
});

const operatorList = ref<OperatorPageVO[]>();
const organizationData = JSON.parse(localStorage.getItem("deptList") || "[]");
const orgProps: any = {
  expandTrigger: "hover",
  label: "name",
  value: "id",
  emitPath: false,
  checkStrictly: true,
};
const roleOptions = JSON.parse(localStorage.getItem("roleList") || "[]");

// 时间 operatorTime
watchEffect(() => {
  const time = operatorTime.value;
  if (!time || time?.length === 0) {
    queryParams.startTime = undefined;
    queryParams.endTime = undefined;
    return;
  } else {
    queryParams.startTime = time[0] + " 00:00:00";
    queryParams.endTime = time[1] + " 23:59:59";
  }
});

/** 查询 */
function handleQuery() {
  loading.value = true;
  getOperatorPage(queryParams)
    .then((res) => {
      operatorList.value = res.data;
      total.value = +(res?.total || 0);
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  operatorTime.value = [];
  queryParams.page = 1;

  nextTick(() => {
    handleQuery();
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
        <el-form-item label="部门" prop="organization">
          <el-cascader
            ref="elcascader"
            popper-class="mypopperclass"
            class="w-[100%]"
            clearable
            v-model="queryParams.organization"
            :options="organizationData"
            :props="orgProps"
            :show-all-levels="false"
          />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select
            v-model="queryParams.role"
            placeholder="请选择角色"
            clearable
            filterable
            class="!w-[200px]"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="name" label="操作人">
          <el-input
            v-model.trim="queryParams.name"
            placeholder="请输入操作人"
            maxlength="40"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item prop="keywords" label="操作时间">
          <el-date-picker
            v-model="operatorTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery"
            ><i-ep-search />搜索</el-button
          >
          <el-button @click="resetQuery"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never" class="table-container">
      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="operatorList"
        highlight-current-row
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="部门" prop="organization" width="200" />
        <el-table-column label="操作角色" prop="role" width="150" />

        <el-table-column
          label="操作人"
          align="center"
          prop="name"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作模块"
          align="center"
          prop="operationModule"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作描述"
          align="center"
          prop="operationDescription"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作时间"
          align="center"
          prop="updateDate"
          width="180"
        />
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.page"
        v-model:limit="queryParams.page_size"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>

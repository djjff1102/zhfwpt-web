<template>
  <!-- 审批信息 -->
  <div>
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="申报日期">
          <w-range-picker
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
            @select="onSelect"
            @ok="onOk"
          />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="审批状态">
          <w-select v-model="form.approveStatus" placeholder="请选择审批状态" style="width: 160px">
            <w-option v-for="(item, i) in statusList" :key="i" :value="item.value">{{ item.label }}</w-option>
          </w-select>
          <!-- <w-select v-model="form.post" placeholder="请输入审批状态" /> -->
        </w-form-item>
        <el-button type="primary" class="mr-8px">搜索</el-button>
        <el-button>重置</el-button>
      </w-form>
    </div>
    <div class="table-warp">
      <m-table
        style="width: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:status>
          <el-tag type="primary">待审核</el-tag>
          <el-tag type="success">通过</el-tag>
          <el-tag type="danger">驳回</el-tag>
        </template>
        <template v-slot:operations>
          <el-button type="text">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { statusList } from '@/typings/typeMap'

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "申报编号",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "申报日期",
    dataIndex: "salary",
  },
  {
    title: "申报额度",
    dataIndex: "address",
  },
  {
    title: "申报人",
    dataIndex: "email",
  },
  {
    title: "联系方式",
    dataIndex: "email",
  },
  {
    title: "审批人",
    dataIndex: "email",
  },
  {
    title: "审批时间",
    dataIndex: "email",
  },
  {
    title: "状态",
    dataIndex: "status",
    slotName: "status",
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const scroll = ref({
  y: 800,
  x: 1080,
});
const form = ref({
  name: "",
  post: "",
});
const changePagesize = (v) => {
  size.value = v;
  pagination.value.pageSize = v;
  init();
};
const changepage = (v) => {
  current.value = v;
  init();
};
function onSelect(dateString, date) {
  console.log("onSelect", dateString, date);
}

function onChange(dateString, date) {
  console.log("onChange: ", dateString, date);
}

function onOk(dateString, date) {
  console.log("onOk: ", dateString, date);
}
const init = async () => {};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

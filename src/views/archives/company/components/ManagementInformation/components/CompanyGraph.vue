<template>
  <el-tabs type="border-card">
    <el-tab-pane label="进出口信用"> </el-tab-pane>
    <el-tab-pane label="进出口信用"> </el-tab-pane>
  </el-tabs>
  <div class="search_box">
    <w-form :model="form" layout="inline">
      <w-form-item class="mr-16px" field="post" label="许可机关">
        <w-select v-model="form.post" placeholder="不限" />
      </w-form-item>
      <el-button type="primary" class="mr-8px">搜索</el-button>
      <el-button>重置</el-button>
    </w-form>
  </div>
  <div class="table-warp">
    <m-table
      style="height: 100%"
      :data="tableData"
      :columns="columns"
      :scroll="scroll"
      :pagination="pagination"
      @page-change="changepage"
      @page-size-change="changePagesize"
      :bordered="false"
    >
      <template v-slot:index="{ $index }">
        {{ $index + 1 }}
      </template>
      <template v-slot:operations>
        <el-button type="text">详情</el-button>
      </template>
    </m-table>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "订单编号",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "订单创建日期",
    dataIndex: "salary",
    fixed: "left",
  },
  {
    title: "商品类别",
    dataIndex: "address",
    fixed: "left",
  },
  {
    title: "买方名称",
    dataIndex: "email",
  },
  {
    title: "买方信用代码",
    dataIndex: "email",
  },
  {
    title: "卖方名称",
    dataIndex: "email",
  },
  {
    title: "卖方信用代码",
    dataIndex: "email",
  },
  {
    title: "商品所在地址",
    dataIndex: "email",
  },
  {
    title: "仓库名称",
    dataIndex: "email",
  },
  {
    title: "总金额",
    dataIndex: "email",
  },
  {
    title: "合同编号",
    dataIndex: "email",
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

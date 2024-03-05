<template>
  <!-- 订单信息 -->
  <div class="output-invoice-container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="发票类别">
          <w-select v-model="form.post" placeholder="全部" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="开票日期">
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
        <w-form-item field="name" label="开票单位">
          <w-input v-model="form.name" placeholder="请输入开票单位" />
        </w-form-item>
        <w-form-item field="name" label="发票号码">
          <w-input v-model="form.name" placeholder="请输入发票号码" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
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
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>
    <div class="title">企业进销项发票趋势1</div>
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
    title: "发票号码",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "开票日期",
    dataIndex: "salary",
    width: 180,
    fixed: "left",
  },
  {
    title: "发票类别",
    dataIndex: "address",
    width: 180,
  },
  {
    title: "开票单位",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "开票单位统一社会信用代码",
    dataIndex: "email",
    width: 220,
  },
  {
    title: "收票单位",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "email",
  },
  {
    title: "项目名称",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "规格型号",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "数量",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "计量单位",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "含税金额",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "税率",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "税额",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "单价",
    dataIndex: "email",
    width: 180,
  },
  {
    title: "价税合计",
    dataIndex: "email",
    width: 180,
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
.title {
  position: relative;
  margin: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

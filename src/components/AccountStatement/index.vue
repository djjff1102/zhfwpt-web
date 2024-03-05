<template>
  <!-- 银行流水 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="付款日期">
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
        <w-form-item field="name" label="银行网点">
          <w-input v-model="form.name" placeholder="检索付款银行/收款银行" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="付款方">
          <w-select v-model="form.post" placeholder="请输入付款方" />
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
    title: "付款编号",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "付款日期",
    dataIndex: "salary",
    fixed: "left",
  },
  {
    title: "付款状态",
    dataIndex: "address",
    fixed: "left",
  },
  {
    title: "付款银行",
    dataIndex: "email",
  },
  {
    title: "付款额度",
    dataIndex: "email",
  },
  {
    title: "付款方",
    dataIndex: "email",
  },
  {
    title: "付款账号",
    dataIndex: "email",
  },
  {
    title: "收款时间",
    dataIndex: "email",
  },
  {
    title: "收款方",
    dataIndex: "email",
  },
  {
    title: "收款银行",
    dataIndex: "email",
  },
  {
    title: "收款账号",
    dataIndex: "email",
  },
  {
    title: "关联订单编号",
    dataIndex: "email",
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

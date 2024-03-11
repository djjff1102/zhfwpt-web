<template>
  <!-- 交易凭证 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="合同编号">
          <w-input v-model="form.name" placeholder="请输入合同编号" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="甲方">
          <w-select v-model="form.post" placeholder="请输入关键字" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="乙方">
          <w-select v-model="form.post" placeholder="请输入关键字" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="签订日期">
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
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { qyzxTransactionCertificate } from '@/api/archives'

const props = defineProps({
  companyName: String
})

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
    title: "合同编号",
    dataIndex: "code",
    width: 180,
    fixed: "left",
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    fixed: "left",
  },
  {
    title: "乙方（卖方/销售方/供方）",
    dataIndex: "partyB",
    fixed: "left",
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
  },
  {
    title: "合同金额",
    dataIndex: "amount",
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
const searchPar = ref({
  page_size: 10,
  page: 1,
  signDateStart: '',
  signDateEnd: '',
  code: '',
  companyName: '', // 传过来的公司名称
  partyA: '', // 甲方
  partyB: '' // 乙方
})
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

// 交易凭证
function getqyzxTransactionCertificate() {
  qyzxTransactionCertificate(searchPar.value).then(res => {
    tableData.value = res.data;
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.companyName = props.companyName
  getqyzxTransactionCertificate()
};
init();
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

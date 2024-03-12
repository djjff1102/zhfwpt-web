<template>
  <!-- 银行流水 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
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
          />
        </w-form-item>
        <w-form-item field="bank" label="银行网点">
          <w-input v-model="searchPar.bank" placeholder="请输入银行网点" />
        </w-form-item>
        <w-form-item class="mr-16px" field="paymentCompany" label="付款方">
          <w-input v-model="searchPar.paymentCompany" placeholder="请输入付款方" />
        </w-form-item>
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
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
import { ref, reactive } from "vue";
import { qyzxBankStatement } from '@/api/archives'

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
    title: "付款编号",
    dataIndex: "paymentCode",
    width: 180,
    fixed: "left",
  },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    fixed: "left",
  },
  {
    title: "付款状态",
    dataIndex: "paymentStatus",
    fixed: "left",
  },
  {
    title: "付款银行",
    dataIndex: "paymentBank",
  },
  {
    title: "付款额度",
    dataIndex: "paymentAmount",
  },
  {
    title: "付款方",
    dataIndex: "paymentCompany",
  },
  {
    title: "付款账号",
    dataIndex: "paymentAccount",
  },
  {
    title: "收款时间",
    dataIndex: "collectionDate",
  },
  {
    title: "收款方",
    dataIndex: "collectionCompany",
  },
  {
    title: "收款银行",
    dataIndex: "collectionBank",
  },
  {
    title: "收款账号",
    dataIndex: "collectionAccount",
  },
  {
    title: "关联订单编号",
    dataIndex: "orderCode",
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
  paymentDateStart: '',
  paymentDateEnd: '',
  paymentCompany: '', // 付款方
  bank: '', // 银行网点
  companyName: '' // 带过来的参数
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
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  pagination.value.pageSize = v;
  getqyzxBankStatement()
};
const changepage = (v) => {
  searchPar.value.page = v;
  getqyzxBankStatement();
};

// 时间选择
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.paymentDateStart = dateString[0];
    searchPar.value.paymentDateEnd = dateString[1];
  } else {
    searchPar.value.paymentDateStart = '';
    searchPar.value.paymentDateEnd = '';
  }
}

function search() {
  searchPar.value.page = 1;
  getqyzxBankStatement();
}

function reset() {
  let name = searchPar.value.companyName;
  pagination.value.pageSize = 10;
  searchPar.value = {
    page_size: 10,
    page: 1,
    paymentDateStart: '',
    paymentDateEnd: '',
    paymentCompany: '', // 付款方
    bank: '', // 银行网点
    companyName: name // 带过来的参数
  }
  getqyzxBankStatement();
}

// 银行流水
function getqyzxBankStatement() {
  if(loading.value) return
  loading.value = true
  qyzxBankStatement(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  searchPar.value.companyName = props.companyName
  getqyzxBankStatement()
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

<template>
  <!-- 银行流水 -->
  <div>
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="name" label="付款日期">
          <!-- <w-range-picker
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            clearable
            format="YYYY-MM-DD"
            @change="onChange"
          /> -->
          <el-date-picker
            v-model="curDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            @change="onChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item field="bank" label="银行网点">
          <el-input v-model="searchPar.bank" placeholder="请输入银行网点" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="paymentCompany" label="付款方">
          <el-input v-model="searchPar.paymentCompany" placeholder="请输入付款方" clearable/>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
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
        <template v-slot:paymentAmountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(Number(tableData[rowIndex].paymentAmount)) }}
        </template>
        <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxBankStatement } from '@/api/archives'
import { formatNumber } from '@/utils/common' 

const props = defineProps({
  companyName: String,
  certificateCode: String
})

const curDate = ref('')
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
    width: 220,
    fixed: "left",
  },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    width: 220,
  },
  {
    title: "付款状态",
    dataIndex: "paymentStatus",
    width: 180,
  },
  {
    title: "付款银行",
    dataIndex: "paymentBank",
    width: 220,
  },
  {
    title: "付款额度",
    dataIndex: "paymentAmount",
    width: 220,
    slotName: 'paymentAmountSlot'
  },
  {
    title: "付款方",
    dataIndex: "paymentCompany",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "付款账号",
    dataIndex: "paymentAccount",
     width: 220,
  },
  {
    title: "收款时间",
    dataIndex: "collectionDate",
     width: 220,
  },
  {
    title: "收款方",
    dataIndex: "collectionCompany",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "收款银行",
    dataIndex: "collectionBank",
    width: 220,
  },
  {
    title: "收款账号",
    dataIndex: "collectionAccount",
     width: 220,
  },
  {
    title: "关联订单编号",
    dataIndex: "orderCode",
    width: 220,
    fixed: "right",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
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
  companyName: '', // 带过来的参数
  certificateCode: props.certificateCode
})
// const scroll = ref({
//   y: 800,
//   x: 1080,
// });

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  pagination.value.current = 1;
  pagination.value.pageSize = v;
  getqyzxBankStatement()
};
const changepage = (v) => {
  searchPar.value.page = v;
  pagination.value.current = v;
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
  curDate.value = ''
  searchPar.value = {
    page_size: 10,
    page: 1,
    paymentDateStart: '',
    paymentDateEnd: '',
    paymentCompany: '', // 付款方
    bank: '', // 银行网点
    companyName: name, // 带过来的参数
    certificateCode: props.certificateCode
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

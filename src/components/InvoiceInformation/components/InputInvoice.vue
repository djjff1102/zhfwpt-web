<template>
  <!-- 订单信息 -->
  <div>
    <div class="search_box">
      <el-form :model="searchPar" inline="true" class="demo-form-inline">
        <el-form-item class="mr-16px" field="post" label="发票类别">
          <el-select v-model="searchPar.type" placeholder="全部" clearable>
            <el-option value="专用发票"></el-option>
            <el-option value="普通发票"></el-option>
            <el-option value="手写发票"></el-option>
            <el-option value="定额发票"></el-option>
            <el-option value="统一发票"></el-option>
          </el-select>
          <!-- <el-input v-model="searchPar.type"></el-input> -->
        </el-form-item>
        <el-form-item class="mr-16px" field="post" label="开票日期">
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
        <el-form-item field="invoicingCompanyName" label="开票单位">
          <el-input v-model="searchPar.invoicingCompanyName" placeholder="请输入开票单位" clearable/>
        </el-form-item>
        <el-form-item field="code" label="发票号码">
          <el-input v-model="searchPar.code" placeholder="请输入发票号码" clearable/>
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
        <template v-slot:quantitySlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].quantity) }}
        </template>
        <template v-slot:amountIncludeTaxSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].allGoodMoneySum) }}
        </template>
        <template v-slot:taxRateSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxRate) }}
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].allGoodTaxSum) }}
        </template>
        <template v-slot:unitPriceSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].unitPrice) }}
        </template>
        <template v-slot:amountTotalSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].amountTotal) }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="handleDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
    <!-- <div class="title">企业进项发票趋势</div>
    <div class="tendencyChart w-full">
      <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
    </div> -->
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxInvoice, groupByInvoiceDate } from '@/api/archives'
import { useRoute, useRouter } from 'vue-router';
// import TendencyChart from "./TendencyChart/index.vue";
import { formatNumber, formatData } from '@/utils/common'

const route = useRoute();
const router = useRouter();

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
    title: "发票代码",
    dataIndex: "code",
    width: 180,
    fixed: "left",
  },
  {
    title: "发票号码",
    dataIndex: "number",
    width: 180,
    fixed: "left",
  },
  {
    title: "开票日期",
    dataIndex: "invoicingDate",
    width: 180,
  },
  {
    title: "发票类别",
    dataIndex: "type",
    width: 180,
  },
  {
    title: "开票单位",
    dataIndex: "invoicingCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "开票单位统一社会信用代码",
    dataIndex: "invoicingCreditNo",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "金额总计(元)",
    dataIndex: "allGoodMoneySum",
    width: 180,
    slotName: 'amountIncludeTaxSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "税额总计(元)",
    dataIndex: "allGoodTaxSum",
    width: 180,
    slotName: 'taxAmountSlot'
  },
  // {
  //   title: "受票单位",
  //   dataIndex: "receivingCompanyName",
  //   width: 220,
  //   ellipsis: true,
  //   tooltip: {position: 'left'},
  // },
  // {
  //   title: "受票单位统一社会信用代码",
  //   width: 220,
  //   dataIndex: "receivingCreditNo",
  //   ellipsis: true,
  //   tooltip: {position: 'left'},
  // },
  // {
  //   title: "项目名称",
  //   dataIndex: "goodName",
  //   width: 180,
  //   ellipsis: true,
  //   tooltip: {position: 'left'},
  // },
  // {
  //   title: "规格型号",
  //   dataIndex: "standard",
  //   width: 180,
  // },
  // {
  //   title: "数量",
  //   dataIndex: "quantity",
  //   width: 180,
  //   ellipsis: true,
  //   tooltip: {position: 'left'},
  //   slotName: 'quantitySlot'
  // },
  // {
  //   title: "计量单位",
  //   dataIndex: "measureUnit",
  //   width: 100,
  // },
  // {
  //   title: "含税金额",
  //   dataIndex: "amountIncludeTax",
  //   width: 180,
  //   slotName: 'amountIncludeTaxSlot',
  //   ellipsis: true,
  //   tooltip: {position: 'left'},
  // },
  // {
  //   title: "税率",
  //   dataIndex: "taxRate",
  //   width: 180,
  //   slotName: 'taxRateSlot'
  // },
  // {
  //   title: "税额",
  //   dataIndex: "taxAmount",
  //   width: 180,
  //   slotName: 'taxAmountSlot'
  // },
  // {
  //   title: "单价",
  //   dataIndex: "unitPrice",
  //   slotName: 'unitPriceSlot',
  //   width: 180,
  // },
  // {
  //   title: "价税合计",
  //   dataIndex: "amountTotal",
  //   width: 180,
  //   ellipsis: true,
  //   slotName: 'amountTotalSlot',
  //   tooltip: {position: 'left'},
  // },
  {
    title: "操作",
     width: 100,
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
// const echartData = ref({
//   x:[],
//   y: [],
//   sum : 0
// })
const searchPar = ref({
  page_size: 10,
  page: 1,
  invoiceDateStart: '',
  invoiceDateEnd: '',
  type: '',
  code: '',
  receivingCompanyName: '', // 受票单位（自己）
  invoicingCompanyName: '', // 开票单位(查询)
  invoiceType: 1,
  companyId: route.query.companyId,
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 跳转发票详情
function handleDetail(d) {
  // 标记从发票调走，针对back时，做模块定位
  sessionStorage.setItem('detailId', 'InvoiceInformation')
  router.push({
    path: '/archives/fpdetail',
    query: {
      // fapiao: JSON.stringify(d),
      name:'进项发票',
      number: d.number, // 发票号码
      code: d.code // 发票代码
    }
  })
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  getqyzxInvoice();
};
const changepage = (v) => {
  searchPar.value.page = v;
  getqyzxInvoice();
};

// 时间选择
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.invoiceDateStart = dateString[0];
    searchPar.value.invoiceDateEnd = dateString[1];
  } else {
    searchPar.value.invoiceDateStart = '';
    searchPar.value.invoiceDateEnd = '';
  }
}

// 搜索
function search() {
  searchPar.value.page = 1;
  getqyzxInvoice();
}

// 重置
function reset() {
  curDate.value = '';
  let name = searchPar.value.receivingCompanyName;
  pagination.value.pageSize = 10;
  searchPar.value = {
    page_size: 10,
    page: 1,
    invoiceDateStart: '',
    invoiceDateEnd: '',
    type: '',
    code: '',
    receivingCompanyName: name, // 受票单位（自己）
    invoicingCompanyName: '', // 开票单位(查询)
    invoiceType: 1, // 发票类型 1为进项发票
    companyId: route.query.companyId,
  }
  getqyzxInvoice();
}

// 发票列表
function getqyzxInvoice() {
  if(loading.value) return
  loading.value = true;
  qyzxInvoice(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

// function getgroupByInvoiceDate() {
//   groupByInvoiceDate({
//     receivingCompanyName: route.query.companyName
//   }).then(res => {
//     echartData.value = formatData(res.data.data);
//   }).catch(err => {})
// }

const init = async () => {
  searchPar.value.receivingCompanyName = route.query.companyName
  getqyzxInvoice();
  // getgroupByInvoiceDate();
};

init();
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

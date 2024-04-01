<template>
  <!-- 订单信息 -->
  <div>
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="post" label="发票类别">
          <w-select v-model="searchPar.type" placeholder="全部" clearable>
            <w-option>专用发票</w-option>
            <w-option>普通发票</w-option>
            <w-option>手写发票</w-option>
            <w-option>定额发票</w-option>
            <w-option>统一发票</w-option>
          </w-select>
          <!-- <w-input v-model="searchPar.type"></w-input> -->
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="开票日期">
          <w-range-picker
            v-model="curDate"
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
          />
        </w-form-item>
        <w-form-item field="invoicingCompanyName" label="开票单位">
          <w-input v-model="searchPar.invoicingCompanyName" placeholder="请输入开票单位" clearable/>
        </w-form-item>
        <w-form-item field="code" label="发票号码">
          <w-input v-model="searchPar.code" placeholder="请输入发票号码" clearable/>
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
        <template v-slot:quantitySlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].quantity) }}
        </template>
        <template v-slot:amountIncludeTaxSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].amountIncludeTax) }}
        </template>
        <template v-slot:taxRateSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxRate) }}
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxAmount) }}
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
    <div class="title">企业进项发票趋势</div>
    <!-- <PredictCom :data="echartData.sum"></PredictCom> -->
    <div class="tendencyChart w-full">
      <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { qyzxInvoice, groupByInvoiceDate } from '@/api/archives'
import { useRoute, useRouter } from 'vue-router';
import TendencyChart from "./TendencyChart/index.vue";
import PredictCom from './PredictCom.vue'
import { formatNumber, formatData } from '@/utils/common'

const route = useRoute();
const router = useRouter();

const curDate = ref([])
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
    dataIndex: "code",
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
    title: "收票单位",
    dataIndex: "receivingCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "receivingCreditNo",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "项目名称",
    dataIndex: "goodName",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "规格型号",
    dataIndex: "standard",
    width: 180,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
    slotName: 'quantitySlot'
  },
  {
    title: "计量单位",
    dataIndex: "measureUnit",
    width: 100,
  },
  {
    title: "含税金额",
    dataIndex: "amountIncludeTax",
    width: 180,
    slotName: 'amountIncludeTaxSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width: 180,
    slotName: 'taxRateSlot'
  },
  {
    title: "税额",
    dataIndex: "taxAmount",
    width: 180,
    slotName: 'taxAmountSlot'
  },
  {
    title: "单价",
    dataIndex: "unitPrice",
    slotName: 'unitPriceSlot',
    width: 180,
  },
  {
    title: "价税合计",
    dataIndex: "amountTotal",
    width: 180,
    ellipsis: true,
    slotName: 'amountTotalSlot',
    tooltip: {position: 'left'},
  },
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
const echartData = ref({
  x:[],
  y: [],
  sum : 0
})
const searchPar = ref({
  page_size: 10,
  page: 1,
  invoiceDateStart: '',
  invoiceDateEnd: '',
  type: '',
  code: '',
  receivingCompanyName: '', // 收票单位（自己）
  invoicingCompanyName: '' // 开票单位(查询)
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
      fapiao: JSON.stringify(d),
      name:'进项发票'
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
  curDate.value = [];
  let name = searchPar.value.receivingCompanyName;
  pagination.value.pageSize = 10;
  searchPar.value = {
    page_size: 10,
    page: 1,
    invoiceDateStart: '',
    invoiceDateEnd: '',
    type: '',
    code: '',
    receivingCompanyName: name, // 收票单位（自己）
    invoicingCompanyName: '' // 开票单位(查询)
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

function getgroupByInvoiceDate() {
  groupByInvoiceDate({
    receivingCompanyName: route.query.companyName
  }).then(res => {
    echartData.value = formatData(res.data.data);
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.receivingCompanyName = route.query.companyName
  getqyzxInvoice();
  getgroupByInvoiceDate();
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

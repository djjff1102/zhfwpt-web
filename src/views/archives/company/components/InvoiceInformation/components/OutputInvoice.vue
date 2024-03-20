<template>
  <!-- 发票信息 -->
  <div>
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="type" label="发票类别">
          <!-- <w-input v-model="searchPar.type" placeholder="请输入发票类别" ></w-input> -->
          <w-select v-model="searchPar.type" placeholder="全部">
            <w-option>专用发票</w-option>
            <w-option>普通发票</w-option>
            <w-option>手写发票</w-option>
            <w-option>定额发票</w-option>
            <w-option>统一发票</w-option>
          </w-select>
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
            format="YYYY-MM-DD"
            @change="onChange"
          />
        </w-form-item>
        <w-form-item field="receivingCompanyName" label="收票单位">
          <w-input v-model="searchPar.receivingCompanyName" placeholder="请输入收票单位" />
        </w-form-item>
        <w-form-item field="code" label="发票号码">
          <w-input v-model="searchPar.code" placeholder="请输入发票号码" />
        </w-form-item>
        <el-button type="primary" class="mr-8px" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
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
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="handleDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>

    <div class="title">企业用票需求预测</div>
    <PredictCom :data="echartData.sum"></PredictCom>
    <div class="tendencyChart w-full h-400px">
      <TendencyChart :dataList="echartData.x" :time="echartData.y"></TendencyChart>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import TendencyChart from "./TendencyChart/index.vue";
import PredictCom from './PredictCom.vue'
import { ref, reactive } from "vue";
import { qyzxInvoice, groupByInvoiceDate } from '@/api/archives'
import { useRoute, useRouter } from 'vue-router';
import { formatData } from '@/utils/common'

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
     width: 180,
    dataIndex: "invoicingDate",
  },
  {
    title: "发票类别",
     width: 180,
    dataIndex: "type",
  },
  {
    title: "开票单位",
     width: 180,
    dataIndex: "invoicingCompanyName",
  },
  {
    title: "开票单位统一社会信用代码",
     width: 220,
    dataIndex: "invoicingCreditNo",
  },
  {
    title: "收票单位",
     width: 180,
    dataIndex: "receivingCompanyName",
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "receivingCreditNo",
  },
  {
    title: "项目名称",
     width: 180,
    dataIndex: "goodName",
  },
  {
    title: "规格型号",
     width: 80,
    dataIndex: "standard",
  },
  {
    title: "数量",
     width: 80,
    dataIndex: "quantity",
  },
  {
    title: "计量单位",
     width: 100,
    dataIndex: "measureUnit",
  },
  {
    title: "含税金额",
     width: 180,
    dataIndex: "amountIncludeTax",
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width: 180,
  },
  {
    title: "税额",
     width: 180,
    dataIndex: "taxAmount",
  },
  {
    title: "单价",
     width: 180,
    dataIndex: "unitPrice",
  },
  {
    title: "价税合计",
     width: 180,
    dataIndex: "amountTotal",
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

const searchPar = ref({
  page_size: 10,
  page: 1,
  invoiceDateStart: '',
  invoiceDateEnd: '',
  type: '',
  code: '',
  receivingCompanyName: '', // 收票单位（查询）
  invoicingCompanyName: '' // 开票单位(自己)
})

const echartData = ref({
  x:[],
  y: [],
  sum : 0
})

const scroll = ref({
  y: 800,
  x: 1080,
});

// 跳转订单详情
function handleDetail(d) {
  router.push({
    path: '/archives/orderDetail',
    query: {
      fapiao: JSON.stringify(d),
      fromOrder: false
    }
  })
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
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
  let name = searchPar.value.invoicingCompanyName
  pagination.value.pageSize = 10;
  searchPar.value = {
    page_size: 10,
    page: 1,
    invoiceDateStart: '',
    invoiceDateEnd: '',
    type: '',
    code: '',
    receivingCompanyName: '', // 收票单位（查询）
    invoicingCompanyName: name
  }
  pagination.value.pageSize = 10;
  getqyzxInvoice();
}

function getqyzxInvoice() {
  if(loading.value) return;
  loading.value = true;
  qyzxInvoice(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = Number(res.total);
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

function getgroupByInvoiceDate() {
  groupByInvoiceDate({
    invoicingCompanyName: searchPar.value.invoicingCompanyName
  }).then(res => {
    echartData.value = formatData(res.data.data);
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.invoicingCompanyName = JSON.parse(route.query.company).companyName
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

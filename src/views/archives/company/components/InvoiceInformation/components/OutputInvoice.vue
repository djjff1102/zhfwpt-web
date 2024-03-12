<template>
  <!-- 发票信息 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="type" label="发票类别">
          <w-input v-model="searchPar.type" placeholder="请输入发票类别" ></w-input>
          <!-- <w-select v-model="searchPar.type" placeholder="全部" /> -->
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
          />
        </w-form-item>
        <w-form-item field="receivingCompanyName" label="收票单位">
          <w-input v-model="searchPar.receivingCompanyName" placeholder="请输入收票单位" />
        </w-form-item>
        <w-form-item field="code" label="发票号码">
          <w-input v-model="searchPar.code" placeholder="请输入发票号码" />
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
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>

    <div class="title">企业进销项发票趋势1</div>
    <div class="tendencyChart w-full h-400px">
      <TendencyChart></TendencyChart>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import TendencyChart from "./TendencyChart/index.vue";
import { ref, reactive } from "vue";
import { qyzxInvoice } from '@/api/archives'
import { useRoute } from 'vue-router';

const route = useRoute();

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
    dataIndex: "code",
    width: 180,
    fixed: "left",
  },
  {
    title: "开票日期",
    dataIndex: "invoicing_date",
    width: 180,
    fixed: "left",
  },
  {
    title: "发票类别",
    dataIndex: "type",
    width: 180,
  },
  {
    title: "开票单位",
    dataIndex: "invoicing_company_name",
    width: 180,
  },
  {
    title: "开票单位统一社会信用代码",
    dataIndex: "invoicing_credit_no",
    width: 220,
  },
  {
    title: "收票单位",
    dataIndex: "receiving_company_name",
    width: 180,
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "receiving_credit_no",
  },
  {
    title: "项目名称",
    dataIndex: "good_name",
    width: 180,
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
  },
  {
    title: "计量单位",
    dataIndex: "measure_unit",
    width: 180,
  },
  {
    title: "含税金额",
    dataIndex: "amount_include_tax",
    width: 180,
  },
  {
    title: "税率",
    dataIndex: "tax_rate",
    width: 180,
  },
  {
    title: "税额",
    dataIndex: "tax_amount",
    width: 180,
  },
  {
    title: "单价",
    dataIndex: "unit_price",
    width: 180,
  },
  {
    title: "价税合计",
    dataIndex: "amount_total",
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

const scroll = ref({
  y: 800,
  x: 1080,
});

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
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

const init = async () => {
  searchPar.value.invoicingCompanyName = JSON.parse(route.query.company).companyName
  getqyzxInvoice();
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

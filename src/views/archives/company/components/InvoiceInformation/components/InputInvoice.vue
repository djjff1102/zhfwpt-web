<template>
  <!-- 订单信息 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="post" label="发票类别">
          <!-- <w-select v-model="searchPar" placeholder="全部" /> -->
          <w-input v-model="searchPar.type"></w-input>
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
        <w-form-item field="invoicingCompanyName" label="开票单位">
          <w-input v-model="searchPar.invoicingCompanyName" placeholder="请输入开票单位" />
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
       <template v-slot:operations="{rowIndex}">
          <w-button type="text" @click="handleDetail(tableData[rowIndex])">详情</w-button>
        </template>
      </m-table>
    </div>
    <!-- TODO: 未开发 -->
    <!-- <div class="title">企业进销项发票趋势2</div> -->
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { qyzxInvoice } from '@/api/archives'
import { useRoute, useRouter } from 'vue-router';

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
    fixed: "left",
  },
  {
    title: "发票类别",
    dataIndex: "type",
    width: 180,
  },
  {
    title: "开票单位",
    dataIndex: "invoicingCompanyName",
    width: 180,
  },
  {
    title: "开票单位统一社会信用代码",
    dataIndex: "invoicingCreditNo",
    width: 220,
  },
  {
    title: "收票单位",
    dataIndex: "receivingCompanyName",
    width: 180,
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "receivingCreditNo",
  },
  {
    title: "项目名称",
    dataIndex: "goodName",
    width: 180,
  },
  {
    title: "规格型号",
    dataIndex: "standard",
    width: 80,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    width: 80,
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
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width: 180,
  },
  {
    title: "税额",
    dataIndex: "taxAmount",
    width: 180,
  },
  {
    title: "单价",
    dataIndex: "unitPrice",
    width: 180,
  },
  {
    title: "价税合计",
    dataIndex: "amountTotal",
    width: 180,
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
  receivingCompanyName: '', // 收票单位（自己）
  invoicingCompanyName: '' // 开票单位(查询)
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

const init = async () => {
  searchPar.value.receivingCompanyName = JSON.parse(route.query.company).companyName
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

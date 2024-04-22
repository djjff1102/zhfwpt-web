<template>
  <!-- 关联发票 -->
  <div>
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
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].amountIncludeTax) }}{{ tableData[rowIndex].measureUnit }}
        </template>
        <template v-slot:taxRateSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxRate) }}
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].taxAmount) }}{{ tableData[rowIndex].measureUnit }}
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
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxInvoice, groupByInvoiceDate } from '@/api/archives'
import { useRoute, useRouter } from 'vue-router';
import { formatNumber, formatData } from '@/utils/common'

const route = useRoute();
const router = useRouter();

const props = defineProps({ // 关联的合同号
  certificateCode: {
    default: ''
  }
})

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
    title: "受票单位",
    dataIndex: "receivingCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "受票单位统一社会信用代码",
    width: 220,
    dataIndex: "receivingCreditNo",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
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
  {
    title: "金额总计",
    dataIndex: "amountIncludeTax",
    width: 180,
    slotName: 'amountIncludeTaxSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  // {
  //   title: "税率",
  //   dataIndex: "taxRate",
  //   width: 180,
  //   slotName: 'taxRateSlot'
  // },
  {
    title: "税额总计",
    dataIndex: "taxAmount",
    width: 180,
    slotName: 'taxAmountSlot'
  },
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
  // {
  //   title: "操作",
  //    width: 100,
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  // },
]);
const pagination = ref({
  current: 1,
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  certificateCode: props.certificateCode
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 跳转发票详情
function handleDetail(d) {
  // 标记从发票调走，针对back时，做模块定位
  // sessionStorage.setItem('detailId', 'InvoiceInformation')
  // router.push({
  //   path: '/archives/fpdetail',
  //   query: {
  //     fapiao: JSON.stringify(d),
  //     name:'进项发票'
  //   }
  // })
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  pagination.value.current = 1;
  getqyzxInvoice();
};
const changepage = (v) => {
  searchPar.value.page = v;
  pagination.value.current = v;
  getqyzxInvoice();
};

// 时间选择
// function onChange(dateString, date) {
//   if(dateString && dateString.length > 0) {
//     searchPar.value.invoiceDateStart = dateString[0];
//     searchPar.value.invoiceDateEnd = dateString[1];
//   } else {
//     searchPar.value.invoiceDateStart = '';
//     searchPar.value.invoiceDateEnd = '';
//   }
// }

// 搜索
// function search() {
//   searchPar.value.page = 1;
//   getqyzxInvoice();
// }

// 重置
// function reset() {
//   curDate.value = '';
//   let name = searchPar.value.receivingCompanyName;
//   pagination.value.pageSize = 10;
//   searchPar.value = {
//     page_size: 10,
//     page: 1,
//     invoiceDateStart: '',
//     invoiceDateEnd: '',
//     type: '',
//     code: '',
//     receivingCompanyName: name, // 受票单位（自己）
//     invoicingCompanyName: '' // 开票单位(查询)
//   }
//   getqyzxInvoice();
// }

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

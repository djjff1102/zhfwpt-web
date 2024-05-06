<template>
  <!-- 订单信息 -->
  <div class="second-warehousing-container">
    <div class="mount-sum">
      <span class="mount-sum-item">金额总计：{{ currency}}{{ fapiao.allGoodMoneySum }}{{unit}} </span>
      <span> 税额总计：{{ currency }}{{ fapiao.allGoodTaxSum }}{{unit}}</span>
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
          {{  formatNumber(tableData[rowIndex].quantity) }} {{ tableData[rowIndex].measureUnit }}
        </template>
        <template v-slot:unitPriceSlot="{ rowIndex }">
         {{ formatNumber(tableData[rowIndex].unitPrice) }}{{ tableData[rowIndex].amountUnit }}/{{ tableData[rowIndex].measureUnit}}
        </template>
        <template v-slot:amountTotal="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].amountTotal) || 0 }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:slottaxRate="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxRate) }}%
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].taxAmount) || 0 }}{{ tableData[rowIndex].amountUnit }}
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { goods } from  '@/api/archives'
import { formatNumber } from '@/utils/common'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  },
  number: {
    type: String,
    default: ''
  },
  fapiao: {
    default: {
      allGoodTaxSum: 0,
      allGoodMoneySum: 0
    }
  }
})

const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "商品名称",
    dataIndex: "goodName",
    width: 220,
    fixed: "left",
  },
  // {
  //   title: "商品类别",
  //   dataIndex: "goodType",
  //   fixed: "left",
  // },
  {
    title: "规格",
    dataIndex: "standards",
  },
  //  {
  //   title: "单位",
  //   dataIndex: "measureUnit",
  // },
  {
    title: "数量",
    dataIndex: "quantity",
    slotName: 'quantitySlot'
  },
   {
    title: "单价",
    dataIndex: "unitPrice",
    fixed: "left",
    slotName: 'unitPriceSlot'
  },
  {
    title: "金额",
    dataIndex: "amountTotal",
    slotName: 'amountTotal'
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    slotName:'slottaxRate'
  },
  {
    title: "税额",
    dataIndex: "taxAmount",
    slotName: 'taxAmountSlot'
  },
  {
    title: "税收分类编码",
    dataIndex: "taxClassificationCode",
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
  goodType: '',
  orderCreateDateStart: '',
  orderCreateDateEnd: '',
  code: props.code,
  number: props.number
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const currency = ref(0) // 币种
const unit = ref(0) // 单位
const changePagesize = (v) => {
  pagination.value.pageSize = v;
  pagination.value.current = 1;
  searchPar.value.page_size = v;
  searchPar.value.page = 1
  init();
};
const changepage = (v) => {
  pagination.value.current = v;
  searchPar.value.page = V
  init();
};

function getSum(data) {
  if(data && data[0]) {
    currency.value = data[0].currency;
    unit.value = data[0].amountUnit;
  }
}

// 商品信息
function getqyzxOrderSub() {
  goods(searchPar.value).then(res => {
    tableData.value = res.data;
    getSum(res.data)
    pagination.value.total = res.total
  }).catch(err => {})
}

// function getsuborderDropDownBox() {
//   const data = {
//     page_size: 50,
//     page: 1,
//     sellerCompanyName: props.companyName
//   }
//   suborderDropDownBox(data).then(res => {
//     subOrderList.value = res.data;
//   }).catch(err => {})
// }

const init = async () => {
  // searchPar.value.parentOrderCode = props.parentCode;
  searchPar.value.code = props.code;
  searchPar.value.number = props.number;
  getqyzxOrderSub();
};

init();
</script>

<style lang="scss" scoped>
.mount-sum-item {
  display: inline-block;
  padding-right: 10px;;
}
.mount-sum {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

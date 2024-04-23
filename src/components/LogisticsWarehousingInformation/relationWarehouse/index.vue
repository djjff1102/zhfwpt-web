<template>
  <!-- 订单信息 -->
  <div class="second-warehousing-container">
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
          {{  formatNumber(tableData[rowIndex].quantity) }}
        </template>
        <template v-slot:unitPriceSlot="{ rowIndex }">
         {{ formatNumber(tableData[rowIndex].unitPrice) }}{{ tableData[rowIndex].amountUnit }}/{{ tableData[rowIndex].measureUnit}}
        </template>
        <template v-slot:amountIncludeTaxSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].amountIncludeTax) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:slottaxRate="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxRate) }}%
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].taxAmount) }}{{ tableData[rowIndex].amountUnit }}
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxWarehouseGood } from  '@/api/archives'
import { formatNumber } from '@/utils/common'

const props = defineProps({
  orderCode: {
    type: String,
    default: ''
  }
})

const loading = ref(false);
const tableData = ref([])
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "库存单编号",
    dataIndex: "inventoryListNo",
    width: 180,
    fixed: "left",
  },
  {
    title: "仓库名称",
    dataIndex: "shortName",
    width: 180,
  },
  {
    title: "仓库地址",
    dataIndex: "locationAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "库存单注册时间",
    dataIndex: "inventoryListRegistrationDate",
    slotName: ''
  },
  {
    title: "库存单注册人",
    dataIndex: "inventoryRegistrar",
    slotName: ''
  },
  {
    title: "注册重量",
    dataIndex: "registrationWeight",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "配货重量",
    dataIndex: "distributionWeight",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品名称",
    dataIndex: "",
    slotName: 'warehousingGoods'
  },
  {
    title: "商品类别",
    dataIndex: "cargoStatus",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物状态",
    dataIndex: "cargoStatus",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卡号/批次号",
    dataIndex: "batchNumber",
    slotName: 'orderMoneySumSlot'
  },
  {
    title: "件数",
    dataIndex: "warehousingQuantity",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "重量单位",
    dataIndex: "warehousingUnit",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "存货凭证地址",
    dataIndex: "inventoryCertificateAddress",
    ellipsis: true,
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
const searchPar = ref({
  page_size: 10,
  page: 1,
  orderCode: props.orderCode // 订单编号
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const jine = ref(0) // 金额总计
const shuie = ref(0) // 税额
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

// 商品信息
function getqyzxOrderSub() {
  qyzxWarehouseGood(searchPar.value).then(res => {
    tableData.value = res.data;
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

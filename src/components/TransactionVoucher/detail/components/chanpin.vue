<template>
  <!-- 订单详情信息 -->
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
        <template v-slot:amountOneSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].amountOne) }}{{ tableData[rowIndex].currency }}/{{ tableData[rowIndex].unit }}
        </template>
        <template v-slot:amountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].amount) }}{{ tableData[rowIndex].currency }}
        </template>
        <template v-slot:quantitySlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].quantity) }}
        </template>
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { getqyzxcertificategood } from  '@/api/archives'
import { formatNumber } from '@/utils/common'

const props = defineProps({
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
    title: "产品名称",
    dataIndex: "productName",
    width: 180,
    fixed: "left",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "规格型号",
    dataIndex: "productNo",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "品牌",
    dataIndex: "productBrand",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
    slotName: 'quantitySlot'
  },
  {
    title: "单价",
    dataIndex: "amountOne",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
    slotName: 'amountOneSlot'
  },
  {
    title: "金额",
    dataIndex: "amount",
    slotName:'amountSlot',
    width: 100,
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width: 100,
  },
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
  parent_code: '' // 父合同编号
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v
  pagination.value.current = 1
  searchPar.value.page = 1
  init();
};
const changepage = (v) => {
  pagination.value.current = v
  searchPar.value.page = v
  init();
};

// 合同关联的产品
function getGoods() {
  if(loading.value) return;
  loading.value = true;
  getqyzxcertificategood(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}


const init = async () => {
  searchPar.value.parent_code = props.certificateCode;
  getGoods();
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

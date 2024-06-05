<template>
  <!-- 商品信息 -->
  <div class="order-container">
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
        <template v-slot:index="{rowIndex}">
            <div>{{ rowIndex + 1 }}</div>
        </template> 
        <template v-slot:moneySlot="{rowIndex}">
           {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].totalMoney) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="toOrderDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive} from "vue";
import {  getOutGoodItems } from '@/api/archives'
import { useRoute } from 'vue-router'
import { formatNumber,formateDate } from '@/utils/common'

const route = useRoute()

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
    title: "商品类别",
    dataIndex: "productCategary",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品编号",
    fixed: "left",
    dataIndex: "productCode",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品名称",
    fixed: "left",
    dataIndex: "warehousingGoods",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "规格型号",
    dataIndex: "productNo",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "批次号",
    dataIndex: "batchNumber",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "总重量",
    dataIndex: "productWeight",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "件数",
    dataIndex: "warehousingQuantity",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货区",
    dataIndex: "area",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "垛",
    dataIndex: "region",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "每件重量",
    dataIndex: "unitWeight",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  }
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const orderPar = ref({
  page_size: 10,
  page: 1,
  outGoodId: route.query.id
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  orderPar.value.page_size = v;
  pagination.value.pageSize = v;
  getqyzxOrder()
};
const changepage = (v) => {
  orderPar.value.page = v;
  getqyzxOrder();
};


// 获取主订单列表及详情
function getqyzxOrder() {
  if(loading.value) return
  loading.value = true;
  getOutGoodItems(orderPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}


getqyzxOrder()
</script>

<style lang="scss" scoped>
.order-container {
  height: 100%;
  overflow: auto;
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

<template>
  <!-- 订单信息 -->
  <div class="order-container">
    <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="false"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{rowIndex}">
            <div>{{ rowIndex + 1 }}</div>
        </template> 
        <template v-slot:moneySlot="{rowIndex}">
            <div>{{ formatNumber(tableData[rowIndex].totalMoney) }}</div>
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
import { forReportDD } from '@/api/intellApproval/special'
import { useRouter } from 'vue-router'
import { formatNumber } from '@/utils/common'

const router = useRouter();

const props = defineProps({
  reportId: ''
})

const tableData = ref([]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "订单编号",
    fixed: "left",
    dataIndex: "code",
    width: 200,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "订单创建日期",
    dataIndex: "orderCreateDate",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "买方名称",
    dataIndex: "buyerCompanyName",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "买方信用代码",
    dataIndex: "buyerCreditNo",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卖方名称",
    dataIndex: "sellerCompanyName",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卖方信用代码",
    dataIndex: "sellerCreditNo",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品所在地址",
    dataIndex: "goodAddress",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
    width: 180,
    ellipsis: true,
    slotName: "moneySlot",
    tooltip: {position: 'left'},
  },
  {
    title: "合同编号",
    dataIndex: "certificateCode",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    width: 80,
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
const orderPar = ref({
  page_size: 100,
  page: 1
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 跳转订单详情
function toOrderDetail(d) {
  // 标记从订单调走，针对back时，做模块定位
  router.push({
    path: '/archives/orderDetail',
    query: {
      order: JSON.stringify(d)
    }
  })
}

// 获取主订单列表及详情
function getqyzxOrder() {
  orderPar.value.dataType = props.reportId;
  forReportDD(orderPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total;
  }).catch(err => {
  })
}

const init = async () => {
  getqyzxOrder()
};
init()
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

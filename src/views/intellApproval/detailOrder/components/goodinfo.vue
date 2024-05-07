<template>
  <!-- 订单关联商品  商品详情 -->
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
        <template v-slot:totalMoneySlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].totalMoney) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:quantityslot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].quantity) }}{{ tableData[rowIndex].unit }}
        </template>
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxOrderSub, suborderDropDownBox } from  '@/api/archives'
import { formatNumber,formateDate } from '@/utils/common'

const props = defineProps({
  parentCode: {
    type: String,
    default: ''
  },
  reportId: {
    type: String,
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
    title: "库存单编号",
    dataIndex: "stockListNo",
    width: 180,
    fixed: "left",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品编号",
    dataIndex: "goodNo",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品名称",
    dataIndex: "goodName",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地省",
    dataIndex: "goodProvince",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地市",
    dataIndex: "goodCity",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地址",
    dataIndex: "goodAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "规格",
    dataIndex: "standards",
    width: 100,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    slotName: 'quantityslot',
    width: 180,
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
    slotName: 'totalMoneySlot',
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "合同文件地址",
    dataIndex: "contractFileAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "交收方式",
    dataIndex: "settleMethod",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "交收凭证号",
    dataIndex: "settleCertificateNo",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "付款时间",
    dataIndex: "paymentDate",
    ellipsis: true,
    width: 180,
  },
  {
    title: "交货时间",
    dataIndex: "finishDate",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  }
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
  goodType: '',
  orderCreateDateStart: '',
  orderCreateDateEnd: '',
  goodName: '', // 商品名称
  code: '', // 子订单编号
  parentOrderCode: '',
  searchType: 2 // 0 查询真实数据  1仅查询审批 2不做限制
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 子订单信息
function getqyzxOrderSub() {
  if(loading.value) return;
  loading.value = true;
  qyzxOrderSub(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

const init = async () => {
  searchPar.value.parentOrderCode = props.parentCode;
  if(props.reportId) {
    searchPar.value.dataType = props.reportId;
  }
  getqyzxOrderSub();
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

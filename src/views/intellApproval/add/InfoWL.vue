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
        <template v-slot:materialslot="{rowIndex}">
          <attachFile v-model="tableData[rowIndex]" :row="tableData[rowIndex]" :type="pro.WL" v-bind="$attrs"></attachFile>
        </template>
        <template v-slot:materialErrorslot="{rowIndex}">
          <span v-for="(item, i) in tableData[rowIndex]?.material?.judgeResult" :key="i">
            {{ item }} {{ (tableData[rowIndex]?.material?.judgeResult.length - 1) == i ? '': '、' }}
          </span>
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation v-model="tableData[rowIndex]" :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.WL" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive} from "vue";
import { useRoute } from 'vue-router'
import { formatNumber, checkFileError } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'

const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.WLList
})

const route = useRoute();
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "发布企业名称",
    dataIndex: "publisherEnterpriseName",
    // fixed: "left",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "入库单号",
    dataIndex: "inboundOrder",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "仓库地址",
    dataIndex: "warehouseAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "发布方企业纳税人识别号",
    dataIndex: "publisherTaxCode",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "发单时间",
    dataIndex: "orderDispatchTime",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "接单时间-服务方接单签订协议时间",
    dataIndex: "acceptToSignTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "起始运输时间-运输货物发车时间",
    dataIndex: "transportationToShippingTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "订单结束时间-最终结算时间",
    dataIndex: "completionToSettlementTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "发布方(货主)订单金额",
    dataIndex: "publisherOrderAmount",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "起运地(始发地)",
    dataIndex: "originLocation",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "到达地(目的地)",
    dataIndex: "destinationLocation",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "所运货物",
    dataIndex: "transportGood",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物重量",
    dataIndex: "goodsWeight",
    slotName: 'slotgoodsWeight',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "服务方订单金额",
    dataIndex: "providerOrderAmount",
    slotName: 'slotproviderOrderAmount',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物运费金额",
    dataIndex: "transportationFeeAmount",
    slotName: 'slottransportationFeeAmount',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "银行流水-资金流水",
    dataIndex: "fundFlow",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "提货单",
    dataIndex: "ladingOrder",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "附件",
    width: 180,
    dataIndex: "material",
    width: 120,
    slotName: 'materialslot',
    fixed: "right",
  },
  {
    title: "操作",
    width: 160,
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
]);

const scroll = ref({
  y: 800,
  x: 1080,
});

const pageType = route.query.type // 当前页面add operate detail
if(pageType == 'detail') {
  columns.pop()
  let len = columns.length - 1;
  if(checkFileError()) {
    const item = {
      title: "错误情况",
      dataIndex: "material",
      width: 120,
      ellipsis: true,
      tooltip: {position: 'left'},
      slotName: 'materialErrorslot',
    }
    columns.splice(len, 0, item);
  }
}
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


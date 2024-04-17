<template>
  <!-- 发票信息--不区分进项和销项 -->
  <div class="input-invoice-container">
    <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="false"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.FP"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxInvoic } from '@/api/intellApproval/special'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.FPList
})

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
     width: 180,
    dataIndex: "invoicingDate",
  },
  {
    title: "发票类别",
     width: 180,
    dataIndex: "type",
  },
  {
    title: "开票单位",
     width: 180,
    dataIndex: "invoicingCompanyName",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "开票单位统一社会信用代码",
     width: 220,
    dataIndex: "invoicingCreditNo",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "收票单位",
     width: 220,
    dataIndex: "receivingCompanyName",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "收票单位统一社会信用代码",
    width: 220,
    dataIndex: "receivingCreditNo",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "项目名称",
     width: 180,
    dataIndex: "goodName",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "规格型号",
    width: 180,
    dataIndex: "standard",
  },
  {
    title: "数量",
    dataIndex: "quantity",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
    slotName: 'quantitySlot'
  },
  {
    title: "计量单位",
    width: 100,
    dataIndex: "measureUnit",
  },
  {
    title: "含税金额",
    width: 180,
    dataIndex: "amountIncludeTax",
    slotName: 'amountIncludeTaxSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width: 180,
    slotName: 'taxRateSlot'
  },
  {
    title: "税额",
     width: 180,
    dataIndex: "taxAmount",
    slotName: 'taxAmountSlot'
  },
  {
    title: "单价",
     width: 180,
    dataIndex: "unitPrice",
    slotName: 'unitPriceSlot',
  },
  {
    title: "价税合计",
    width: 180,
    dataIndex: "amountTotal",
    ellipsis: true,
    slotName: 'amountTotalSlot',
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    width: 220,
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
]);
const scroll = ref({
  y: 800,
  x: 1080,
});
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

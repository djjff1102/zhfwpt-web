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
        <template v-slot:materialslot="{rowIndex}">
          <attachFile v-model="tableData[rowIndex]" :row="tableData[rowIndex]" :type="pro.FP" v-bind="$attrs"></attachFile>
            <!-- <div>{{ tableData[rowIndex].material ? '已上传' : '未上传'  }}</div> -->
        </template>
        <template v-slot:materialErrorslot="{rowIndex}">
          <span v-for="(item, i) in tableData[rowIndex]?.material?.judgeResult" :key="i">
            {{ item }} {{ (tableData[rowIndex]?.material?.judgeResult.length - 1) == i ? '': '、' }}
          </span>
        </template>
        <template v-slot:amountIncludeTaxSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].allGoodMoneySum) }}
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].allGoodTaxSum) }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation v-model="tableData[rowIndex]" :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.FP" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { checkFileError } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'
import { useRoute } from "vue-router";
import { formatNumber, formatData } from '@/utils/common'
const route = useRoute()

const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.FPList
})

const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "发票代码",
    dataIndex: "code",
    width: 180,
  },
  {
    title: "发票号码",
    dataIndex: "number",
    width: 180,
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
    title: "受票单位",
     width: 220,
    dataIndex: "receivingCompanyName",
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
  {
    title: "金额总计(元)",
    dataIndex: "allGoodMoneySum",
    width: 180,
    slotName: 'amountIncludeTaxSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "税额总计(元)",
    dataIndex: "allGoodTaxSum",
    width: 180,
    slotName: 'taxAmountSlot'
  },
  {
    title: "附件",
    dataIndex: "material",
    width: 120,
    slotName: 'materialslot',
    fixed: "right",
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

const pageType = route.query.type // 发票详情页仅显示详情

if(pageType == 'detail') {
  columns[columns.length -1].width = 80;
  let len = columns.length - 2;
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

<template>
  <!-- 银行流水 -->
  <div>
    <div class="msg-tip">* 银行附件必须上传</div>
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
        <template v-slot:paymentAmountSlot="{ rowIndex }">
          {{ formatNumber(Number(tableData[rowIndex].paymentAmount)) }}
        </template>
        <template v-slot:materialslot="{rowIndex}">
          <attachFile :row="tableData[rowIndex]"></attachFile>
            <!-- <div>{{ tableData[rowIndex].material ? '已上传' : '未上传'  }}</div> -->
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.YH" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { formatNumber } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import attachFile from './attachFile.vue'

import { useApprovalStore } from '@/store/modules/approval'
const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.YHList
})

const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "付款编号",
    dataIndex: "paymentCode",
    width: 220,
    // fixed: "left",
  },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    width: 220,
  },
  {
    title: "付款状态",
    dataIndex: "paymentStatus",
    width: 180,
  },
  {
    title: "付款银行",
    dataIndex: "paymentBank",
    width: 220,
  },
  {
    title: "付款额度",
    dataIndex: "paymentAmount",
    width: 220,
    slotName: 'paymentAmountSlot'
  },
  {
    title: "付款方",
    dataIndex: "paymentCompany",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "付款账号",
    dataIndex: "paymentAccount",
     width: 220,
  },
  {
    title: "收款时间",
    dataIndex: "collectionDate",
     width: 220,
  },
  {
    title: "收款方",
    dataIndex: "collectionCompany",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "收款银行",
    dataIndex: "collectionBank",
    width: 220,
  },
  {
    title: "收款账号",
    dataIndex: "collectionAccount",
     width: 220,
  },
  {
    title: "关联订单编号",
    dataIndex: "orderCode",
    width: 220,
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
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

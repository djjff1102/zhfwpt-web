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
          {{ tableData[rowIndex].currency }}{{ formatNumber(Number(tableData[rowIndex].paymentAmount)) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:collectionAmountslot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(Number(tableData[rowIndex].collectionAmount)) }}{{tableData[rowIndex].amountUnit}}
        </template>
        <template v-slot:materialslot="{rowIndex}">
          <attachFile :row="tableData[rowIndex]" :type="pro.YH" v-bind="$attrs"></attachFile>
            <!-- <div>{{ tableData[rowIndex].material ? '已上传' : '未上传'  }}</div> -->
        </template>
        <template v-slot:materialErrorslot="{rowIndex}">
          <span v-for="(item, i) in tableData[rowIndex]?.material?.judgeResult" :key="i">
            {{ item }} {{ (tableData[rowIndex]?.material?.judgeResult.length - 1) == i ? '': '、' }}
          </span>
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
import { formatNumber, checkFileError } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import attachFile from './attachFile.vue'
import { useRoute } from "vue-router";
import { useApprovalStore } from '@/store/modules/approval'

const route = useRoute();
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
  // {
  //   title: "付款编号",
  //   dataIndex: "paymentCode",
  //   width: 220,
  //   // fixed: "left",
  // },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    width: 220,
  },
  {
    title: "付款方",
    dataIndex: "paymentCompany",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  // {
  //   title: "付款状态",
  //   dataIndex: "paymentStatus",
  //   width: 180,
  // },
  {
    title: "付款银行",
    dataIndex: "paymentBank",
    width: 220,
  },
  {
    title: "付款账号",
    dataIndex: "paymentAccount",
     width: 220,
  },
  {
    title: "付款额度",
    dataIndex: "paymentAmount",
    width: 220,
    slotName: 'paymentAmountSlot'
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
    title: "收款金额",
    dataIndex: "collectionAmount",
    slotName: 'collectionAmountslot',
    width: 220,
  },
  // {
  //   title: "关联订单编号",
  //   dataIndex: "orderCode",
  //   width: 220,
  // },
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
  y: 500,
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
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

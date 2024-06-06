<template>
  <div>
    <div class="msg-tip">* 合同附件必须上传</div>
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
        <template v-slot:amountSlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].amount) }} {{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:materialslot="{rowIndex}">
          <attachFile :row="tableData[rowIndex]" :type="pro.HT" v-bind="$attrs"></attachFile>
        </template>
        <template v-slot:materialErrorslot="{rowIndex}">
          <span v-for="(item, i) in tableData[rowIndex]?.material?.judgeResult" :key="i">
            {{ item }} {{ (tableData[rowIndex]?.material?.judgeResult.length - 1) == i ? '': '、' }}
          </span>
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.HT" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
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
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'
import { useRoute } from "vue-router";
const route = useRoute()

const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.HTList
})

const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
  {
    title: "合同编号",
    dataIndex: "code",
    width: 220,
    // fixed: "left",
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "乙方（卖方/销售方/供方）",
    width: 220,
    dataIndex: "partyB",
    fellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订日期",
    width: 220,
    dataIndex: "signDate",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "合同金额",
    width: 220,
    dataIndex: "amount",
    ellipsis: true,
    slotName: 'amountSlot',
    tooltip: {position: 'left'},
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
  y: 500,
  x: 1080,
});

const pageType = route.query.type // 合同详情页仅显示详情
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
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

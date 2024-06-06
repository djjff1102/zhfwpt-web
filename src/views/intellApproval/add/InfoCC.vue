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
        <template v-slot:productWeight="{rowIndex}">
          <div>{{ formatNumber(tableData[rowIndex].productWeight) }}{{tableData[rowIndex].warehousingUnit}}</div>
        </template>
        <template v-slot:warehousingQuantity="{rowIndex}">
          <div>{{ formatNumber(tableData[rowIndex].warehousingQuantity) }}</div>
        </template>
        
        <template v-slot:materialslot="{rowIndex}">
          <attachFile :row="tableData[rowIndex]" :type="pro.CC" v-bind="$attrs"></attachFile>
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.CC" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
        <template v-slot:materialErrorslot="{rowIndex}">
          <span v-for="(item, i) in tableData[rowIndex]?.material?.judgeResult" :key="i">
            {{ item }} {{ (tableData[rowIndex]?.material?.judgeResult.length - 1) == i ? '': '、' }}
          </span>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive} from "vue";
import { useRouter } from 'vue-router'
import { formatNumber, checkFileError } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'
import { useRoute } from "vue-router";

const approvalStore = useApprovalStore();
const route = useRoute()

const tableData = computed(() => {
  return approvalStore.CCList
})

const columns = reactive([
   {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "过户/出库单号",
    dataIndex: "transferCode",
    width: 180,
    fixed: "left",
  },
  {
    title: "仓库名称",
    dataIndex: "shortName",
    width: 180,
  },
  {
    title: "仓库地址",
    width: 180,
    dataIndex: "locationAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "过户/出库日期",
    width: 180,
    dataIndex: "transferDate",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "原货主",
    width: 180,
    dataIndex: "originalOwner",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
     width: 120,
    dataIndex: "productCategary",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品名称",
     width: 120,
    dataIndex: "warehousingGoods",
    ellipsis: true,
    tooltip: {position: 'left'},
    // slotName: 'warehousingGoods'
  },
  {
    title: "总重量",
    width: 120,
    dataIndex: "productWeight",
    slotName: 'productWeight',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "件数",
    width: 120,
    dataIndex: "warehousingQuantity",
    slotName: 'warehousingQuantity',
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
    dataIndex: "operations",
    slotName: "operations",
    width: 220,
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
.order-container {
  height: 100%;
  overflow: auto;
}
.table-warp {
  height: calc(100% - 100px);
}
</style>


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
        <!-- <template v-slot:moneySlot="{rowIndex}">
            <div>{{ formatNumber(tableData[rowIndex].totalMoney) }}</div>
        </template> -->
        <template v-slot:warehousingQuantitySlot="{rowIndex}">
            <div>{{ formatNumber(tableData[rowIndex].warehousingQuantity) }}</div>
        </template>
        <template v-slot:registrationWeightSlot="{rowIndex}">
          <div>{{ formatNumber(tableData[rowIndex].registrationWeight) }}</div>
        </template>
        <template v-slot:distributionWeightSlot="{rowIndex}">
          <div>{{ formatNumber(tableData[rowIndex].distributionWeight) }}</div>
        </template>
        <template v-slot:warehousingUnitSlot="{rowIndex}">
          <div>{{ formatNumber(tableData[rowIndex].warehousingUnit) }}</div>
        </template>
        <template v-slot:materialslot="{rowIndex}">
          <attachFile :row="tableData[rowIndex]"></attachFile>
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.CC" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive} from "vue";
import { useRouter } from 'vue-router'
import { formatNumber } from '@/utils/common'
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'

const approvalStore = useApprovalStore();

const tableData = computed(() => {
  return approvalStore.CCList
})

const router = useRouter();

const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    // fixed: "left",
  },
    {
    title: "库存单编号",
    dataIndex: "inventoryListNo",
    width: 180,
    // fixed: "left",
  },
  {
    title: "仓库名称",
    dataIndex: "shortName",
    width: 180,
  },
  {
    title: "仓库地址",
    dataIndex: "locationAddress",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "库存单注册时间",
    width: 180,
    dataIndex: "inventoryListRegistrationDate	",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "库存单注册人",
    width: 180,
    dataIndex: "inventoryRegistrar",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "注册重量",
    width: 180,
    dataIndex: "registrationWeight",
    slotName: 'registrationWeightSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "配货重量",
    width: 180,
    dataIndex: "distributionWeight",
    slotName: 'distributionWeightSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品名称",
    width: 180,
    dataIndex: "warehousingGoods",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
    width: 180,
    dataIndex: "productCategary",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物状态",
    width: 180,
    dataIndex: "cargoStatus",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "卡号/批次号",
    width: 180,
    dataIndex: "batchNumber",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "件数",
    width: 180,
    dataIndex: "warehousingQuantity",
    ellipsis: true,
    tooltip: {position: 'left'},
    slotName: 'warehousingQuantitySlot'
  },
  {
    title: "重量单位",
    width: 180,
    dataIndex: "warehousingUnit",
    slotName: 'warehousingUnitSlot',
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "存货凭证地址",
    width: 180,
    dataIndex: "inventoryCertificateAddress",
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
  y: 800,
  x: 1080,
});

// 跳转订单详情
function toDetail(d) {
  // 标记从订单调走，针对back时，做模块定位
  router.push({
    path: '',
    query: {
      order: JSON.stringify(d)
    }
  })
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


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
          <attachFile :row="tableData[rowIndex]"></attachFile>
            <!-- <div v-if="!tableData[rowIndex].material">未上传</div>
            <div v-if="tableData[rowIndex]?.material && tableData[rowIndex]?.materia?.judgeCode == 2" style="color: red">
              {{ tableData[rowIndex]?.materia.fileName}} fileUrl</div>
            <div v-if="tableData[rowIndex]?.material && tableData[rowIndex]?.materia?.judgeCode == 1" style="color: green">
              {{ tableData[rowIndex]?.materia.fileName}} fileUrl</div> -->
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.DD" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
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
  return approvalStore.DDList
})

const router = useRouter();

// const tableData = ref([]);
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
    title: "附件",
    dataIndex: "material",
    width: 120,
    slotName: 'materialslot'
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
function toOrderDetail(d) {
  // 标记从订单调走，针对back时，做模块定位
  router.push({
    path: '/archives/orderDetail',
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

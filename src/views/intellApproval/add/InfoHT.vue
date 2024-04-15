<template>
  <div>
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
          {{ formatNumber(tableData[rowIndex].amount) }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :tableData="tableData" :row="tableData[rowIndex]" :type="pro.HT"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { qyzxTransactionCertificate } from '@/api/intellApproval/special'
import { formatNumber } from '@/utils/common' 
import reportOperation from './reportOperation.vue'
import { pro } from '../type'

const props = defineProps({
  reportId: ''
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
    title: "合同编号",
    dataIndex: "code",
    width: 220,
    fixed: "left",
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "乙方（卖方/销售方/供方）",
    dataIndex: "partyB",
    fellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "合同金额",
    dataIndex: "amount",
    ellipsis: true,
    slotName: 'amountSlot',
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
const searchPar = ref({
  page_size: 100,
  page: 1,
 dataType: ''
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 交易凭证
function getqyzxTransactionCertificate() {
  if(loading.value) return
  loading.value = true
  qyzxTransactionCertificate(searchPar.value).then(res => {
    tableData.value = res.data;
    loading.value = false
    pagination.value.total = res.total;
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  searchPar.value.dataType = props.reportId
  getqyzxTransactionCertificate()
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

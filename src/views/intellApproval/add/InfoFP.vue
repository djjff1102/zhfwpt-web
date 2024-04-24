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
          <attachFile :row="tableData[rowIndex]"></attachFile>
            <!-- <div>{{ tableData[rowIndex].material ? '已上传' : '未上传'  }}</div> -->
        </template>
        <template v-slot:operations="{rowIndex}">
          <reportOperation :rowIndex="rowIndex" :rowId="tableData[rowIndex].id" :type="pro.FP" :row="tableData[rowIndex]" v-bind="$attrs"></reportOperation>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import reportOperation from './reportOperation.vue'
import { pro } from '../type'
import { useApprovalStore } from '@/store/modules/approval'
import attachFile from './attachFile.vue'
import { useRoute } from "vue-router";
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
    title: "发票号码",
    dataIndex: "code",
    width: 180,
    // fixed: "left",
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

const pageType = route.query.type // 当前页面add operate detail
if(pageType == 'detail') {
  columns.pop()
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

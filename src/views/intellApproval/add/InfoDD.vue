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
        <template v-slot:operations="{rowIndex}">
          <div class="flex-base-around">
            <SingleUpload
            :row="tableData[rowIndex]"
            @updateUpload="updateUpload">
            </SingleUpload>
            <el-button
              type="text"
              @click="handleError(tableData[rowIndex])"
              :disabled="checkError(tableData[rowIndex])"
            >错误情况</el-button>
            <el-button type="text" @click="toOrderDetail(tableData[rowIndex])">详情</el-button>
            <el-button type="text" disabled>取消</el-button>
          </div>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed} from "vue";
import { forReportDD } from '@/api/intellApproval/special'
import { useRouter } from 'vue-router'
import { formatNumber } from '@/utils/common'
import { useApprovalStore } from '@/store/modules/approval'

const approvalStore = useApprovalStore();

const router = useRouter();

const props = defineProps({
  reportId: ''
})

const tableData = ref([]);
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
    title: "合同编号",
    dataIndex: "certificateCode",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    width: 220,
    fixed: "right",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const orderPar = ref({
  page_size: 100,
  page: 1
})
const scroll = ref({
  y: 800,
  x: 1080,
});

// 上传的附件信息先保存到每条订单上
function updateUpload(file, row) {
  row.businessDataMaterialList = {
    fileType: "1",   //订单例子
    fileUrl: file,
    judgeId: row.id
  }
  approvalStore.setListData(tableData.value)
}

// 检验错误信息的状态
function checkError(row) {
  if( row?.material?.judgeCode == 2 ) {
    return false;
  } else {
    return true
  }
}

// 上传附件
function upload() {

}

// 附件错误信息
function handleError() {

}

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

// 获取主订单列表及详情
function getqyzxOrder() {
  orderPar.value.dataType = props.reportId;
  forReportDD(orderPar.value).then(res => {
    tableData.value = res.data
    approvalStore.setListData(tableData.value)
  }).catch(err => {
  })
}

const init = async () => {
  getqyzxOrder()
};
init()
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

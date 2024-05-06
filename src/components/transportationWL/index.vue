<template>
  <!-- 物流 -->
  <div>
    <!-- <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item field="code" label="合同编号">
          <el-input v-model="searchPar.code" placeholder="请输入合同编号" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="partyA" label="甲方">
          <el-input v-model="searchPar.partyA" placeholder="请输入关键字" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="partyB" label="乙方">
          <el-input v-model="searchPar.partyB" placeholder="请输入关键字" clearable/>
        </el-form-item>
        <el-form-item class="mr-16px" field="post" label="签订日期">
          <el-date-picker
              v-model="curDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              @change="onChange"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:slotgoodsWeight="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].goodsWeight) }}
        </template>
        <template v-slot:slotproviderOrderAmount="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].providerOrderAmount) }}
        </template>
        <template v-slot:slottransportationFeeAmount="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].transportationFeeAmount) }}
        </template>
        <template v-slot:operations>
          <w-button type="text" disabled>2原件</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { transportationWL } from '@/api/archives'
import { formatNumber, formateDate } from '@/utils/common' 
const props = defineProps({
  companyName: String,
  orderCode: String
})

// const curDate = ref('')
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
    title: "发布企业名称",
    dataIndex: "publisherEnterpriseName",
    fixed: "left",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "入库单号",
    dataIndex: "inboundOrder",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "仓库地址",
    dataIndex: "warehouseAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "发布方企业纳税人识别号",
    dataIndex: "signAddress",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "发单时间",
    dataIndex: "orderDispatchTime",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "接单时间-服务方接单签订协议时间",
    dataIndex: "acceptToSignTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "起始运输时间-运输货物发车时间",
    dataIndex: "transportationToShippingTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "订单结束时间-最终结算时间",
    dataIndex: "completionToSettlementTime",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "发布方(货主)订单金额",
    dataIndex: "publisherOrderAmount",
    width: 280,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "起运地(始发地)",
    dataIndex: "originLocation",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "到达地(目的地)",
    dataIndex: "destinationLocation",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "所运货物",
    dataIndex: "transportGood",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物重量",
    dataIndex: "goodsWeight",
    slotName: 'slotgoodsWeight',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "服务方订单金额",
    dataIndex: "providerOrderAmount",
    slotName: 'slotproviderOrderAmount',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "货物运费金额",
    dataIndex: "transportationFeeAmount",
    slotName: 'slottransportationFeeAmount',
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
    {
    title: "银行流水-资金流水",
    dataIndex: "fundFlow",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "提货单",
    dataIndex: "ladingOrder",
    width: 220,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  // {
  //   title: "操作",
  //   width:100,
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  // },
]);

const pagination = ref({
  total: 0,
  pageSize: 10,
  current: 1,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  orderCode: props.orderCode // 订单关联合同
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  searchPar.value.page_size = v;
  pagination.value.pageSize = v;
  pagination.value.current = 1;
  searchPar.value.page = 1;
  gettransportationWL();
};
const changepage = (v) => {
  searchPar.value.page = v;
  pagination.value.current = v
  gettransportationWL();
};

// 时间选择
// function onChange(dateString, date) {
//   if(dateString && dateString.length > 0) {
//     searchPar.value.signDateStart = formateDate(dateString[0]);
//     searchPar.value.signDateEnd = formateDate(dateString[1]);
//   } else {
//     searchPar.value.signDateStart = '';
//     searchPar.value.signDateEnd = '';
//   }
// }

function search() {
  searchPar.value.page = 1;
  pagination.value.current = 1
  gettransportationWL();
}

function reset() {
  pagination.value.pageSize = 10;
  pagination.value.current = 1
  // curDate.value = ''
  searchPar.value = {
    page_size: 10,
    page: 1,
    orderCode: props.orderCode
  }
  gettransportationWL()
}

// 交易凭证
function gettransportationWL() {
  if(loading.value) return
  loading.value = true
  transportationWL(searchPar.value).then(res => {
    tableData.value = res.data;
    loading.value = false
    pagination.value.total = res.total;
  }).catch(err => {
    loading.value = false
  })
}

const init = async () => {
  gettransportationWL()
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

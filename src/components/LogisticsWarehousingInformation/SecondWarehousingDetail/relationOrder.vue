<template>
  <!-- 订单信息 -->
  <div class="order-container">
    <div class="search_box">
      <el-form :model="orderPar" inline="true" class="demo-form-inline">
        <el-form-item class="mr-16px" field="goodType" label="商品类别" >
          <w-select v-model="orderPar.goodType" placeholder="全部" clearable style="width: 188px">
            <w-option v-for="(item,i) in orderList" :key="i">{{item}}</w-option>
          </w-select>
        </el-form-item>
        <el-form-item class="mr-16px" field="post" label="订单创建日期">
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
        <el-form-item field="buyerCompanyName" label="买方名称">
          <w-input v-model="orderPar.buyerCompanyName" placeholder="请输入买方名称" clearable/>
        </el-form-item>
        <el-form-item field="code" label="订单编号">
          <w-input v-model="orderPar.code" placeholder="请输入订单编号" clearable/>
        </el-form-item>
        <el-form-item>
          <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
          <w-button @click="reset">重置</w-button>
        </el-form-item>
      </el-form>
    </div>
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
        <template v-slot:index="{rowIndex}">
            <div>{{ rowIndex + 1 }}</div>
        </template> 
        <template v-slot:moneySlot="{rowIndex}">
           {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].totalMoney) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="toOrderDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive} from "vue";
import { getwarehouseAsscoiationOrderList, getAssociationDropDownBox } from '@/api/archives'
import { useRouter, useRoute } from 'vue-router'
import { formatNumber,formateDate } from '@/utils/common'

const router = useRouter();
const route = useRoute()

const curDate = ref('')
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
    title: "总金额",
    dataIndex: "totalMoney",
    width: 180,
    ellipsis: true,
    slotName: "moneySlot",
    tooltip: {position: 'left'},
  }
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const orderPar = ref({
  page_size: 10,
  page: 1,
  goodType: '', // 商品类别
  orderCreateDateStart: '',
  orderCreateDateEnd: '',
  buyerCompanyName: '', // 买方名称
  companyName: '', // 路由公司名称
  code: '', // 订单编号
  shortName: '', // 仓库名称
  locationAddress: '' // 仓库地址
})
const orderList = ref([]) // 订单商品类别
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  orderPar.value.page_size = v;
  pagination.value.pageSize = v;
  getqyzxOrder()
};
const changepage = (v) => {
  orderPar.value.page = v;
  getqyzxOrder();
};

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    orderPar.value.orderCreateDateStart = formateDate(dateString[0]);
    orderPar.value.orderCreateDateEnd = formateDate(dateString[1]);
  } else {
    orderPar.value.orderCreateDateStart = '';
    orderPar.value.orderCreateDateEnd = '';
  }
}

// 搜索-重置分页
function search() {
  orderPar.value.page = 1;
  getqyzxOrder();
}

// 重置
function reset() {
  pagination.value.pageSize = 10;
  curDate.value = '';
  orderPar.value = {
    page_size: 10,
    page: 1,
    goodType: '', // 商品类别
    orderCreateDateStart: '',
    orderCreateDateEnd: '',
    buyerCompanyName: '', // 买方名称
    companyName: route.query.companyName, // 上个页面带过来的公司名称
    code: '', // 订单编号
    shortName: route.query.shortName, // 仓库名称
    locationAddress: route.query.locationAddress // 仓库地址
  }
  getqyzxOrder();
}

// 获取主订单列表及详情
function getqyzxOrder() {
  if(loading.value) return
  loading.value = true;
  getwarehouseAsscoiationOrderList(orderPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

function getSelect() {
  getAssociationDropDownBox(orderPar.value).then(res => {
    orderList.value = res.data
  })
}

const init = async () => {
  orderPar.value.companyName = route.query.companyName
  orderPar.value.shortName = route.query.shortName
  orderPar.value.locationAddress = route.query.locationAddress
  getqyzxOrder()
  getSelect()
};

init();
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

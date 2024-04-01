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
          <!-- <w-range-picker
            v-model="curDate"
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
          /> -->
        </el-form-item>
        <el-form-item field="buyerCompanyName" label="买方名称">
          <w-input v-model="orderPar.buyerCompanyName" placeholder="请输入买方名称" clearable/>
        </el-form-item>
        <el-form-item field="code" label="订单编号">
          <w-input v-model="orderPar.code" placeholder="请输入订单编号" clearable/>
        </el-form-item>
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
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
            <div>{{ formatNumber(tableData[rowIndex].totalMoney) }}</div>
        </template>
        <template v-slot:operations="{rowIndex}">
          <el-button type="text" @click="toOrderDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, reactive} from "vue";
import { qyzxOrder, orderDropDownBox } from '@/api/archives'
import { useRouter } from 'vue-router'
import { formatNumber,formateDate } from '@/utils/common'

const router = useRouter();

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  }
})

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
    dataIndex: "sellerCompnayName",
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
    width: 80,
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
  page_size: 10,
  page: 1,
  goodType: '', // 商品类别
  orderCreateDateStart: '',
  orderCreateDateEnd: '',
  buyerCompanyName: '', // 买方名称
  sellerCompnayName: '', // 上个页面带过来的公司名称
  code: '' // 订单编号
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
    sellerCompnayName: props.companyName, // 上个页面带过来的公司名称
    code: '' // 订单编号
  }
  getqyzxOrder();
}

// 跳转订单详情
function toOrderDetail(d) {
  // 标记从订单调走，针对back时，做模块定位
  sessionStorage.setItem('detailId', 'OrderInformation')
  router.push({
    path: '/archives/orderDetail',
    query: {
      order: JSON.stringify(d)
    }
  })
}

// 获取主订单列表及详情
function getqyzxOrder() {
  if(loading.value) return
  loading.value = true;
  qyzxOrder(orderPar.value).then(res => {
    tableData.value = res.data
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

function getorderDropDownBox() {
  const data = {
    page_size: 50,
    page: 1,
    sellerCompnayName: props.companyName
  }
  orderDropDownBox(data).then(res => {
    orderList.value = res.data
  }).catch(err => {})
}

const init = async () => {
  orderPar.value.sellerCompnayName = props.companyName;
  getqyzxOrder()
  getorderDropDownBox();
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

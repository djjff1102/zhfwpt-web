<template>
  <!-- 订单信息 -->
  <div class="order-container">
    <div class="search_box">
      <w-form :model="orderPar" layout="inline">
        <w-form-item class="mr-16px" field="goodType" label="商品类别">
          <w-select v-model="orderPar.goodType" placeholder="全部" clearable>
            <w-option v-for="(item,i) in orderList" :key="i">{{item}}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="订单创建日期">
          <w-range-picker
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
          />
        </w-form-item>
        <w-form-item field="buyerCompanyName" label="买方名称">
          <w-input v-model="orderPar.buyerCompanyName" placeholder="请输入买方名称" clearable/>
        </w-form-item>
        <w-form-item field="code" label="订单编号">
          <w-input v-model="orderPar.code" placeholder="请输入订单编号" clearable/>
        </w-form-item>
        <el-button type="primary" class="mr-8px" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </w-form>
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

const router = useRouter();

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  }
})

const curDate = ref([])
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
    dataIndex: "code",
    width: 180,
    fixed: "left",
  },
  {
    title: "订单创建日期",
    dataIndex: "orderCreateDate",
    fixed: "left",
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    fixed: "left",
  },
  {
    title: "买方名称",
    dataIndex: "buyerCompanyName",
  },
  {
    title: "买方信用代码",
    dataIndex: "buyerCreditNo",
  },
  {
    title: "卖方名称",
    dataIndex: "sellerCompnayName",
  },
  {
    title: "卖方信用代码",
    dataIndex: "sellerCreditNo",
  },
  {
    title: "商品所在地址",
    dataIndex: "goodAddress",
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
  },
  {
    title: "交易凭证（合同）编号",
    dataIndex: "certificateCode",
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
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
    orderPar.value.orderCreateDateStart = dateString[0];
    orderPar.value.orderCreateDateEnd = dateString[1];
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
  curDate.value = [];
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
  router.push({
    path: '/archives/orderDetail',
    query: {
      order: JSON.stringify(d),
      fromOrder: true
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

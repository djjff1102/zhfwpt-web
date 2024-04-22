<template>
  <!-- 订单详情信息 -->
  <div class="second-warehousing-container">
    <div class="search_box">
      <el-form :model="searchPar" inline="true" class="demo-form-inline">
        <el-form-item class="mr-16px" field="goodType" label="商品类别">
          <el-select v-model="searchPar.goodType" placeholder="全部" clearable style="width: 188px">
            <el-option v-for="(item, i) in subOrderList" :key="i" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="mr-16px" field="post" label="订单创建日期">
          <el-date-picker
              v-model="currentDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              @change="onChange"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item field="goodName" label="商品名称">
          <el-input v-model="searchPar.goodName" placeholder="请输入商品名称" clearable/>
        </el-form-item>
        <!-- <el-form-item field="code" label="子订单编号">
          <el-input v-model="searchPar.code" placeholder="请输入子订单编号" clearable/>
        </el-form-item> -->
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
        <template v-slot:totalMoneySlot="{ rowIndex }">
          {{ tableData[rowIndex].currency }}{{ formatNumber(tableData[rowIndex].totalMoney) }}{{ tableData[rowIndex].amountUnit }}
        </template>
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { qyzxOrderSub, suborderDropDownBox } from  '@/api/archives'
import { formatNumber,formateDate } from '@/utils/common'

const props = defineProps({
  parentCode: {
    type: String,
    default: ''
  }
})

const currentDate = ref('')

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
    title: "库存单编号",
    dataIndex: "stockListNo",
    width: 180,
    fixed: "left",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品编号",
    dataIndex: "goodNo",
    width: 180,
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品名称",
    dataIndex: "goodName",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地省",
    dataIndex: "goodProvince",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地市",
    dataIndex: "goodCity",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "商品所在地址",
    dataIndex: "goodAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "规格",
    dataIndex: "standards",
    width: 100,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    width: 180,
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
    slotName: 'totalMoneySlot',
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "合同文件地址",
    dataIndex: "contractFileAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "交收方式",
    dataIndex: "settleMethod",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "交收凭证号",
    dataIndex: "settleCertificateNo",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  },
  {
    title: "付款时间",
    dataIndex: "paymentDate",
    ellipsis: true,
    width: 180,
  },
  {
    title: "交货时间",
    dataIndex: "finishDate",
    ellipsis: true,
    tooltip: {position: 'left'},
    width: 180,
  }
]);

const pagination = ref({
  current: 1,
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  goodType: '',
  orderCreateDateStart: '',
  orderCreateDateEnd: '',
  goodName: '', // 商品名称
  code: '', // 子订单编号
  parentOrderCode: '',
  searchType: 2 // 0 查询真实数据  1仅查询审批 2不做限制
})
const subOrderList = ref([]) // 子订单商品类别
const scroll = ref({
  y: 800,
  x: 1080,
});

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.orderCreateDateStart = formateDate(dateString[0]);
    searchPar.value.orderCreateDateEnd = formateDate(dateString[1]);
  } else {
    searchPar.value.orderCreateDateStart = '';
    searchPar.value.orderCreateDateEnd = '';
  }
}

function reset() {
  searchPar.value = {
    page: 1,
    goodType: '',
    orderCreateDateStart: '',
    orderCreateDateEnd: '',
    goodName: '',
    code: '',
    parentOrderCode: props.parentCode,
    searchType: 2
  }
  currentDate.value = '';
  pagination.value.current = 1;
  getqyzxOrderSub();
}

function search() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  getqyzxOrderSub()
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v
  pagination.value.current = 1
  searchPar.value.page = 1
  init();
};
const changepage = (v) => {
  pagination.value.current = v
  searchPar.value.page = v
  init();
};

// 子订单信息
function getqyzxOrderSub() {
  if(loading.value) return;
  loading.value = true;
  qyzxOrderSub(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

function getsuborderDropDownBox() {
  const data = {
    page_size: 50,
    page: 1,
    parentOrderCode: props.parentCode
  }
  suborderDropDownBox(data).then(res => {
    subOrderList.value = res.data;
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.parentOrderCode = props.parentCode;
  getqyzxOrderSub();
  getsuborderDropDownBox()
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

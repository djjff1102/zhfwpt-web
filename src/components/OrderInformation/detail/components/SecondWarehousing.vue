<template>
  <!-- 订单信息 -->
  <div class="second-warehousing-container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="goodType" label="商品类别">
          <w-select v-model="searchPar.goodType" placeholder="全部" >
            <w-option v-for="(item, i) in subOrderList" :key="i">{{ item }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="订单创建日期">
          <w-range-picker
            v-model="currentDate"
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
        <w-form-item field="goodName" label="商品名称">
          <w-input v-model="searchPar.goodName" placeholder="请输入买方名称" />
        </w-form-item>
        <w-form-item field="code" label="子订单编号">
          <w-input v-model="searchPar.code" placeholder="请输入子订单编号" />
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
        <template v-slot:totalMoneySlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].totalMoney) }}
        </template>
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations>
          <el-button type="text">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { qyzxOrderSub, suborderDropDownBox } from  '@/api/archives'
import { formatNumber } from '@/utils/common'

const props = defineProps({
  parentCode: {
    type: String,
    default: ''
  }
})

const currentDate = ref()
const current = ref(1);
const size = ref(10);
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
    title: "子订单编号",
    dataIndex: "code",
    width: 220,
    fixed: "left",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "订单创建日期",
    dataIndex: "orderCreateDate",
    fixed: "left",
    // width: 220,
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    fixed: "left",
    ellipsis: true,
    tooltip: {position: 'left'},
    // width: 220,
  },
  {
    title: "规格",
    dataIndex: "standards",
    fixed: "left",
    // width: 100,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    fixed: "left",
    // width: 220,
  },
  {
    title: "单位",
    dataIndex: "unit",
    fixed: "left",
    // width: 100,
  },
  {
    title: "总金额",
    dataIndex: "totalMoney",
    slotName: 'totalMoneySlot',
    ellipsis: true,
    tooltip: {position: 'left'},
    // width: 220,
  },
  {
    title: "币种",
    dataIndex: "currency",
    // width: 100,
  },
  {
    title: "金额单位",
    dataIndex: "amountUnit",
    // width: 100,
  },
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
  parentOrderCode: ''
})
const subOrderList = ref([]) // 子订单商品类别
const scroll = ref({
  y: 800,
  x: 1080,
});

// 选择时间
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.orderCreateDateStart = dateString[0];
    searchPar.value.orderCreateDateEnd = dateString[1];
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
    parentOrderCode: props.parentCode
  }
  currentDate.value = [];
  pagination.value.current = 1;
  getqyzxOrderSub();
}

function search() {
  pagination.value.current = 1;
  searchPar.value.page = 1;
  getqyzxOrderSub()
}

const changePagesize = (v) => {
  size.value = v;
  pagination.value.pageSize = v;
  init();
};
const changepage = (v) => {
  current.value = v;
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

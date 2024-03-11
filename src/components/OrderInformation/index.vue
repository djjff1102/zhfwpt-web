<template>
  <!-- 订单信息 -->
  <div class="order-container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="商品类别">
          <w-select v-model="form.post" placeholder="全部">
            <w-option v-for="(item,i) in orderList" :key="i">{{item}}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="订单创建日期">
          <w-range-picker
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
            @select="onSelect"
            @ok="onOk"
          />
        </w-form-item>
        <w-form-item field="name" label="买方名称">
          <w-input v-model="form.name" placeholder="请输入买方名称" />
        </w-form-item>
        <w-form-item field="name" label="订单编号">
          <w-input v-model="form.name" placeholder="请输入订单编号" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
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
          <w-button type="text" @click="toOrderDetail(tableData[rowIndex])">详情</w-button>
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
const orderPar = reactive({
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
const form = ref({
  name: "",
  post: "",
});
const changePagesize = (v) => {
  size.value = v;
  pagination.value.pageSize = v;
  init();
};
const changepage = (v) => {
  current.value = v;
  init();
};
function onSelect(dateString, date) {
  console.log("onSelect", dateString, date);
}

function onChange(dateString, date) {
  console.log("onChange: ", dateString, date);
}

function onOk(dateString, date) {
  console.log("onOk: ", dateString, date);
}
// 跳转订单详情
function toOrderDetail(d) {
  router.push({
    path: '/archives/orderDetail',
    query: {
      order: JSON.stringify(d)
    }
  })
}

// 获取主订单列表及详情
function getqyzxOrder() {
  qyzxOrder(orderPar).then(res => {
    tableData.value.push(...res.data);
  }).catch(err => { })
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
  orderPar.sellerCompnayName = props.companyName;
  getqyzxOrder()
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

<template>
  <!-- 订单信息 -->
  <div class="input-invoice-container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="post" label="发票类别">
          <w-input v-model="searchPar.type" placeholder="请输入发票类别" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="开票日期">
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
        <w-form-item field="invoicingCompanyName" label="开票单位">
          <w-input v-model="searchPar.invoicingCompanyName" placeholder="请输入开票单位" />
        </w-form-item>
        <w-form-item field="receivingCompanyName" label="收票单位">
          <w-input v-model="searchPar.receivingCompanyName" placeholder="请输入收票单位" />
        </w-form-item>
        <w-form-item field="code" label="发票号码">
          <w-input v-model="searchPar.code" placeholder="请输入发票号码" />
        </w-form-item>
        <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
        <w-button @click="reset">重置</w-button>
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
        <template v-slot:index="{ $index }">
          {{ $index + 1 }}
        </template>
        <template v-slot:operations>
          <w-button type="text">详情</w-button>
        </template>
      </m-table>
    </div>
    <!-- TODO: 未开发 -->
    <!-- <div class="title">企业进销项发票趋势</div>
    <div class="tendencyChart w-full h-400px">
      <TendencyChart></TendencyChart>
    </div> -->
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import { qyzxInvoic } from '@/api/archives'

const props = defineProps({
  parentCode: {
    type: String,
    default: ''
  }
})

const curDate = ref([])
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
    title: "发票号码",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "开票日期",
    dataIndex: "salary",
    width: 180,
    fixed: "left",
  },
  {
    title: "发票类别",
    width: 180,
    dataIndex: "address",
  },
  {
    title: "开票单位",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "开票单位统一社会信用代码",
    width: 220,
    dataIndex: "email",
  },
  {
    title: "商品类别",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "数量",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "计量单位",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "含税金额",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "税率",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "税额",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "单价",
    width: 180,
    dataIndex: "email",
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const scroll = ref({
  y: 800,
  x: 1080,
});

const searchPar = ref({
  page_size: 10,
  page: 1,
  orderCode: props.parentCode,    //订单编号（在关联订单发票查询接口是需要前端传入的）
  invoiceDateStart:"",
  invoiceDateEnd:"",
  type:"",    //专用发票/普通发票，为空的话查询全部
  code:"",    //发票号码
  receivingCompanyName:"",    //收票单位
  invoicingCompanyName:""    //开票单位
})

const changePagesize = (v) => {
  size.value = v;
  pagination.value.pageSize = v;
  init();
}

const changepage = (v) => {
  current.value = v;
  init();
};

// 时间选择
function onChange(dateString, date) {
  if(dateString && dateString.length > 0) {
    searchPar.value.invoiceDateStart = dateString[0];
    searchPar.value.invoiceDateEnd = dateString[1];
  } else {
    searchPar.value.invoiceDateStart = '';
    searchPar.value.invoiceDateEnd = '';
  }
}

function search() {
  searchPar.value.page = 1;
  getqyzxInvoic();
}

function reset() {
  curDate.value = []
  searchPar.value = {
    page_size: 10,
    page: 1,
    orderCode: props.parentCode,   //订单编号（在关联订单发票查询接口是需要前端传入的）
    invoiceDateStart:"",
    invoiceDateEnd:"",
    type:"",    //专用发票/普通发票，为空的话查询全部
    code:"",    //发票号码
    receivingCompanyName: "",    //收票单位
    invoicingCompanyName: ""    //开票单位
  }
  getqyzxInvoic();
}

// 获取关联发票列表
function getqyzxInvoic() {
  if(loading.value) return
  loading.value = true;
  qyzxInvoic(searchPar.value).then(res => {
    tableData.value = res.data;
    pagination.value.total = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

const init = async () => {
  getqyzxInvoic();
};

init();
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

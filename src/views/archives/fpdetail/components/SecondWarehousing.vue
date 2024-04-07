<template>
  <!-- 订单信息 -->
  <div class="second-warehousing-container">
    <div class="mount-sum">
      <span class="mount-sum-item">金额总计：{{ formatNumber(jine) }} </span>
      <span> 税额总计：{{ formatNumber(shuie) }}</span>
    </div>
    <!-- <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="商品类别">
          <w-select v-model="form.post" placeholder="全部" >
            <w-option v-for="(item, i) in subOrderList" :key="i">{{ item }}</w-option>
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

        <template v-slot:quantitySlot="{ rowIndex }">
          {{  formatNumber(tableData[rowIndex].quantity) }}
        </template>
        <template v-slot:unitPriceSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].unitPrice) }}
        </template>
        <template v-slot:amountIncludeTaxSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].amountIncludeTax) }}
        </template>
        <template v-slot:taxAmountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].taxAmount) }}
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { goods,  suborderDropDownBox } from  '@/api/archives'
import { formatNumber } from '@/utils/common'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  },
  number: {
    type: String,
    default: ''
  },
})

const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "商品名称",
    dataIndex: "goodName",
    width: 220,
    fixed: "left",
  },
  // {
  //   title: "商品类别",
  //   dataIndex: "goodType",
  //   fixed: "left",
  // },
  {
    title: "规格",
    dataIndex: "standards",
  },
   {
    title: "单位",
    dataIndex: "unit",
  },
  {
    title: "数量",
    dataIndex: "quantity",
    slotName: 'quantitySlot'
  },
   {
    title: "单价",
    dataIndex: "unitPrice",
    fixed: "left",
    slotName: 'unitPriceSlot'
  },
  {
    title: "金额",
    dataIndex: "amountIncludeTax",
    slotName: 'amountIncludeTaxSlot'
  },
  {
    title: "税率",
    dataIndex: "taxRate",
  },
  {
    title: "税额",
    dataIndex: "taxAmount",
    slotName: 'taxAmountSlot'
  },
  {
    title: "税收分类编码",
    dataIndex: "taxClassificationCode",
  },
]);
const pagination = ref({
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
})
const scroll = ref({
  y: 800,
  x: 1080,
});

const jine = ref(0) // 金额总计
const shuie = ref(0) // 税额
const changePagesize = (v) => {
  pagination.value.pageSize = v;
  pagination.value.current = 1;
  searchPar.value.page_size = v;
  searchPar.value.page = 1
  init();
};
const changepage = (v) => {
  pagination.value.current = v;
  searchPar.value.page = V
  init();
};

function getSum(data) {
  let sum = 0;
let n = 0
  data.forEach(e => {
    let total = e.amountIncludeTax || 0
    let taxAmount = e.taxAmount || 0
    sum += total;
    n += taxAmount
  });
  jine.value = sum
  shuie.value = n
}

// 子订单信息
function getqyzxOrderSub() {
  goods(searchPar.value).then(res => {
    tableData.value = res.data;
    getSum(res.data)
    pagination.value.total = res.total
  }).catch(err => {})
}

// function getsuborderDropDownBox() {
//   const data = {
//     page_size: 50,
//     page: 1,
//     sellerCompnayName: props.companyName
//   }
//   suborderDropDownBox(data).then(res => {
//     subOrderList.value = res.data;
//   }).catch(err => {})
// }

const init = async () => {
  // searchPar.value.parentOrderCode = props.parentCode;
  searchPar.value.code = props.code;
  searchPar.value.number = props.number;
  getqyzxOrderSub();
};

init();
</script>

<style lang="scss" scoped>
.mount-sum-item {
  display: inline-block;
  padding-right: 10px;;
}
.mount-sum {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

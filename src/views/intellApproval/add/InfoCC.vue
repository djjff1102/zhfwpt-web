<template>
  <!-- 物流仓储信息 -->
  <div class="warehousing-container">
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
        <template v-slot:orderMoneySumSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].orderMoneySum) }}
        </template>
        <template v-slot:orderCountSlot="{ rowIndex }">
          {{ formatNumber(tableData[rowIndex].orderCount) }}
        </template>
        <!-- <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>orderMoneySumSlot -->
        <template v-slot:operations>
          <w-button type="text" disabled>详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { qyzxWarehouse, warehouseDropDownBox } from '@/api/archives';
import { Warehouse } from '@/api/archives/type'
import { formatNumber } from '@/utils/common'

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  },
  showSearch: {
    default: true
  }
})

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref<Warehouse[]>([]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "仓库简称",
    dataIndex: "shortName",
    width: 180,
    fixed: "left",
  },
  {
    title: "所属地区",
    dataIndex: "locationProvince",
    width: 180,
  },
  {
    title: "仓库地址",
    dataIndex: "locationAddress",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "涉及订单数量",
    dataIndex: "orderCount",
    slotName: 'orderCountSlot'
  },
  {
    title: "货物运输总金额",
    dataIndex: "orderMoneySum",
    slotName: 'orderMoneySumSlot'
  },
  {
    title: "仓库企业名称",
    dataIndex: "companyName",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "企业纳税人识别号",
    dataIndex: "creditNo",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  // {
  //   title: "操作",
  //   width: 100,
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  // },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  current:1,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const searchPar = ref({
  page_size: 10,
  page: 1,
  companyName: '', // 带过来的公司名称
  locationProvince: '', // 所属地区
  locationAddress: '', //仓库地址
  shortName: '' //仓库简称
})
const wareList = ref([])
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  pagination.value.current = 1;
  getqyzxWarehouse();
};

const changepage = (v) => {
  pagination.value.current = v;
  searchPar.value.page = v;
  getqyzxWarehouse();
};

function search() {
  searchPar.value.page = 1;
  getqyzxWarehouse();
}

function reset() {
  let name = searchPar.value.companyName
  searchPar.value = {
    page_size: 10,
    page: 1,
    companyName: name, // 带过来的公司名称
    locationProvince: '', // 所属地区
    locationAddress: '', //仓库地址
    shortName: '' //仓库简称
  }
  searchPar.value.page = 1;
  getqyzxWarehouse();
}

// 仓储物流信息
function getqyzxWarehouse() {
  if(loading.value) return
  loading.value = true
  qyzxWarehouse(searchPar.value).then(res => {
    const data = res.data;
    tableData.value = data as any;
    pagination.value.total = res.total as any;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

function getwarehouseDropDownBox() {
  const data = {
    page_size: 50,
    page: 1,
    companyName: props.companyName
  }
  warehouseDropDownBox(data).then(res => {
    wareList.value = res.data as any;
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.companyName = props.companyName;
  getqyzxWarehouse();
  getwarehouseDropDownBox();
};
init();
</script>

<style lang="scss" scoped>
.warehousing-container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>

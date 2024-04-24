<template>
  <!-- 物流仓储信息 -->
  <div class="warehousing-container">
    <div class="search_box">
      <el-form :model="searchPar" :inline="true" class="demo-form-inline">
        <el-form-item class="mr-16px" field="locationProvince" label="所属地区">
          <!-- <w-input v-model="searchPar.locationProvince" laceholder="请输入地区"></w-input> -->
          <el-select v-model="searchPar.locationProvince" placeholder="请选择地区" clearable>
            <el-option v-for="(item ,i) in wareList" :key="i" :value="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item field="locationAddress" label="仓库地址">
          <w-input v-model="searchPar.locationAddress" placeholder="请输入仓库地址" clearable/>
        </el-form-item>
        <el-form-item field="shortName" label="仓库简称">
          <w-input v-model="searchPar.shortName" placeholder="请输入仓库简称" clearable/>
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
        <template v-slot:operations="{ rowIndex }">
          <el-button type="text" @click="toDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import { qyzxWarehouse, warehouseDropDownBox } from '@/api/archives';
import { Warehouse } from '@/api/archives/type'
import { formatNumber } from '@/utils/common'

const router = useRouter();

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  }
})

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
  {
    title: "操作",
    width: 100,
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
  },
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

function toDetail(item: any) {
  // 标记从发票调走，针对back时，做模块定位
  sessionStorage.setItem('detailId', 'LogisticsWarehousingInformation')
  router.push({
    path: '/archives/warehousingOrderDetail',
    query: {
      companyName: props.companyName, // 公司名称
      shortName: item.shortName, // 仓储名称
      locationAddress: item.locationAddress // 仓储地址
    }
  })
}

const changePagesize = (v: any) => {
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

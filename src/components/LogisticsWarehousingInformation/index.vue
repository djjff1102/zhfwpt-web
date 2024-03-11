<template>
  <!-- 物流仓储信息 -->
  <div class="warehousing-container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="所属地区">
          <w-select v-model="form.post" placeholder="请选择地区">
            <w-option v-for="(item ,i) in wareList" :key="i">{{ item }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item field="name" label="仓库地址">
          <w-input v-model="form.name" placeholder="请输入仓库地址" />
        </w-form-item>
        <w-form-item field="name" label="仓库简称">
          <w-input v-model="form.name" placeholder="请输入仓库简称" />
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
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
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

const props = defineProps({
  companyName: {
    type: String,
    default: ''
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
    fixed: "left",
  },
  {
    title: "仓库地址",
    dataIndex: "locationAddress",
    fixed: "left",
  },
  {
    title: "涉及订单数量",
    dataIndex: "email",
  },
  {
    title: "货物运输总金额",
    dataIndex: "email",
  },
  {
    title: "仓库企业名称",
    dataIndex: "companyName",
  },
  {
    title: "企业纳税人识别号",
    dataIndex: "creditNo",
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

// 仓储物流信息
function getqyzxWarehouse() {
  qyzxWarehouse(searchPar.value).then(res => {
    const data = res.data;
    tableData.value = data as any;
  }).catch(err => {})
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

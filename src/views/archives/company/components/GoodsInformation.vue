<template>
  <!-- 主营商品信息 -->
  <div class="container">
    <div class="search_box">
      <w-form :model="searchPar" layout="inline">
        <w-form-item class="mr-16px" field="post" label="计量单位">
          <w-select v-model="searchPar.measureUnit" placeholder="请选择计量单位">
            <w-option v-for="(item, i) in goodList" :key="i">{{ item }}</w-option>
          </w-select>
        </w-form-item>
        <w-form-item field="good" label="商品名称">
          <w-input v-model="searchPar.good" placeholder="请输入商品名称" />
        </w-form-item>
        <w-form-item field="standard" label="规格型号">
          <w-input v-model="searchPar.standard" placeholder="请输入规格型号" />
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
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { qyzxGood, goodDropDownBox } from '@/api/archives'

const props = defineProps({
  companyName: String
})

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
    title: "商品名称",
    dataIndex: "good",
    width: 180,
    fixed: "left",
  },
  {
    title: "规格型号",
    dataIndex: "standard",
    fixed: "left",
  },
  {
    title: "计量单位",
    dataIndex: "measureUnit",
    fixed: "left",
  },
  {
    title: "最近一笔交易时间",
    dataIndex: "lastestTransactionDate",
  },
  {
    title: "最近一笔订单售价",
    dataIndex: "lastestOrderAmount",
  },
  {
    title: "市场单价",
    dataIndex: "marketAmount",
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
  page:1,
  measureUnit: '', // 计量单位
  good: '', // 商品名称
  standard: '', // 规格
  companyName: '' // 带过来的公司名称
});
const goodList = ref([]);
const scroll = ref({
  y: 800,
  x: 1080,
});

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page_size = v;
  searchPar.value.page = 1;
  getqyzxGood();
};
const changepage = (v) => {
  searchPar.value.page = v;
  getqyzxGood();
};

function search() {
  searchPar.value.page = 1;
  getqyzxGood();
}

function reset() {
  searchPar.value.page = 1;
  pagination.value.pageSize = 10;
  searchPar.value.page_size = 10;
  let name = searchPar.value.companyName;
  searchPar.value = {
    page_size: 10,
    page:1,
    measureUnit: '', // 计量单位
    good: '', // 商品名称
    standard: '', // 规格
    companyName: name // 带过来的公司名称
  }
  getqyzxGood();
}

// 主营商品信息
function getqyzxGood() {
  if(loading.value) return
  loading.value = true
  qyzxGood(searchPar.value).then(res => {
    tableData.value = res.data as any;
    pagination.value.total = res.total as any;
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}

function getgoodDropDownBox() {
  const data = {
    page_size:50,
    page: 1,
    companyName: props.companyName as any
  }
  goodDropDownBox(data).then(res => {
    goodList.value = res.data as any;
  }).catch(err => {})
}

const init = async () => {
  searchPar.value.companyName = props.companyName as any;
  getqyzxGood();
  getgoodDropDownBox();
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
